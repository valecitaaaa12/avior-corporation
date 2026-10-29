import { useState } from 'react';
import { useAuth, useData } from '../../../context/AppContext.jsx';
import { Section, StatusBadge, Table, Modal, Field, ActionBtn, Empty } from '../shared.jsx';
import { Icon } from '../../../components/ui.jsx';
import { today, fechaCorta } from '../../../utils/helpers.js';

/* ============================================================
   Aula Virtual: Tareas · Entregas · Anuncios
   ============================================================ */

const TIPO_ICON = { tarea: 'file', examen: 'clipboard', practica: 'refresh', proyecto: 'award' };

export function Tareas() {
  const { session } = useAuth();
  const { db, add, update, remove, nombreCurso } = useData();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ tipo: 'tarea', puntos: 100 });
  const [filtro, setFiltro] = useState('');

  const esAdmin = session.rol === 'admin';
  const cursos = esAdmin ? db.cursos : db.cursos.filter((c) => c.instructor_id === session.id);
  const ids = cursos.map((c) => c.id);
  const tareas = (db.tareas || []).filter((t) => ids.includes(t.curso_id) && (!filtro || t.curso_id === Number(filtro)));

  const openNew = () => { setForm({ tipo: 'tarea', puntos: 100, fecha_limite: today() }); setModal({ mode: 'new' }); };
  const openEdit = (t) => { setForm({ ...t }); setModal({ mode: 'edit', id: t.id }); };

  const save = () => {
    if (!form.curso_id || !form.titulo) return alert('Selecciona materia y escribe un título.');
    const payload = {
      curso_id: Number(form.curso_id),
      titulo: form.titulo,
      tipo: form.tipo,
      descripcion: form.descripcion || '',
      fecha_limite: form.fecha_limite,
      puntos: Number(form.puntos) || 100,
    };
    if (modal.mode === 'new') add('tareas', { ...payload, creado_por: session.id, fecha_creacion: today() });
    else update('tareas', modal.id, payload);
    setModal(null);
  };

  return (
    <div className="tareas-layout">
      <Section
        title={`Tareas y exámenes (${tareas.length})`}
        actions={
          <select className="filter-select" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="">Todos los cursos</option>
            {cursos.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
        }
      >
        {tareas.length ? (
          <div className="tareas-list">
            {tareas.map((t) => {
              const vencida = new Date(t.fecha_limite) < new Date();
              const nEnt = (db.entregas || []).filter((e) => e.tarea_id === t.id).length;
              const nPend = (db.entregas || []).filter((e) => e.tarea_id === t.id && e.estado === 'pendiente').length;
              return (
                <div key={t.id} className="tarea-row">
                  <div className="tarea-icon"><Icon name={TIPO_ICON[t.tipo] || 'file'} size={18} /></div>
                  <div className="tarea-main">
                    <div className="tarea-titulo">
                      <strong>{t.titulo}</strong>
                      <StatusBadge estado={vencida ? 'inactivo' : 'activo'} />
                      <span className="chip">{t.tipo}</span>
                    </div>
                    <p className="muted">{nombreCurso(t.curso_id)} · Límite: {fechaCorta(t.fecha_limite)} · {t.puntos} pts</p>
                    {t.descripcion && <p className="tarea-desc">{t.descripcion}</p>}
                  </div>
                  <div className="tarea-side">
                    <div className="tarea-entregas">
                      <strong>{nEnt}</strong>
                      <span>entregas</span>
                    </div>
                    {nPend > 0 && <span className="item-badge">{nPend} pend.</span>}
                    <ActionBtn icon="clipboard" tone="edit" title="Editar" onClick={() => openEdit(t)} />
                    <ActionBtn icon="close" tone="del" title="Eliminar" onClick={() => remove('tareas', t.id)} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : <Empty>No hay tareas en tus cursos.</Empty>}
      </Section>

      <div className="tareas-form sticky">
        <Section title={modal?.mode === 'edit' ? 'Editar tarea' : 'Nueva tarea'}>
          <div className="panel-pad">
            <Field label="Materia">
              <select value={form.curso_id || ''} onChange={(e) => setForm({ ...form, curso_id: e.target.value })}>
                <option value="">Seleccionar…</option>
                {cursos.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </Field>
            <Field label="Título"><input placeholder="Título de la tarea" value={form.titulo || ''} onChange={(e) => setForm({ ...form, titulo: e.target.value })} /></Field>
            <Field label="Tipo">
              <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
                <option value="tarea">Tarea</option>
                <option value="examen">Examen</option>
                <option value="practica">Práctica</option>
                <option value="proyecto">Proyecto</option>
              </select>
            </Field>
            <Field label="Instrucciones"><textarea rows={3} placeholder="Describe la tarea…" value={form.descripcion || ''} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} /></Field>
            <div className="form-row">
              <Field label="Fecha límite"><input type="date" value={form.fecha_limite || ''} onChange={(e) => setForm({ ...form, fecha_limite: e.target.value })} /></Field>
              <Field label="Puntos"><input type="number" min="1" value={form.puntos} onChange={(e) => setForm({ ...form, puntos: e.target.value })} /></Field>
            </div>
            <button className="btn btn-primary btn-block" onClick={save}>
              {modal?.mode === 'edit' ? 'Guardar cambios' : 'Publicar tarea'}
            </button>
            {modal?.mode === 'edit' && (
              <button className="btn btn-outline btn-block" onClick={() => { setModal(null); setForm({ tipo: 'tarea', puntos: 100 }); }}>Cancelar edición</button>
            )}
          </div>
        </Section>
      </div>
    </div>
  );
}

export function Entregas() {
  const { session } = useAuth();
  const { db, update, nombreUsuario, nombreCurso } = useData();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  const esAdmin = session.rol === 'admin';
  const idsCursos = esAdmin
    ? db.cursos.map((c) => c.id)
    : db.cursos.filter((c) => c.instructor_id === session.id).map((c) => c.id);
  const idsTareas = (db.tareas || []).filter((t) => idsCursos.includes(t.curso_id)).map((t) => t.id);
  const entregas = (db.entregas || []).filter((e) => idsTareas.includes(e.tarea_id));

  const openCalificar = (e) => {
    const t = (db.tareas || []).find((x) => x.id === e.tarea_id);
    setForm({ nota: e.nota ?? '', feedback: e.feedback || '' });
    setModal({ id: e.id, tarea: t });
  };

  const guardar = () => {
    const nota = Number(form.nota);
    update('entregas', modal.id, {
      nota: isNaN(nota) ? null : nota,
      feedback: form.feedback,
      estado: 'revisado',
    });
    setModal(null);
  };

  return (
    <>
      <Section title={`Entregas recibidas (${entregas.length})`}>
        {entregas.length ? (
          <Table head={['Estudiante', 'Tarea', 'Materia', 'Entregado', 'Archivo', 'Estado', 'Nota', 'Acción']}>
            {entregas.map((e) => {
              const t = (db.tareas || []).find((x) => x.id === e.tarea_id);
              return (
                <tr key={e.id}>
                  <td><strong>{nombreUsuario(e.estudiante_id)}</strong></td>
                  <td>{t?.titulo || '—'}</td>
                  <td className="muted">{t ? nombreCurso(t.curso_id) : '—'}</td>
                  <td><small>{fechaCorta(e.fecha_entrega)}</small></td>
                  <td><code className="code-guindo">{e.archivo || 'Sin archivo'}</code></td>
                  <td><StatusBadge estado={e.estado} /></td>
                  <td className="center"><strong style={{ color: e.nota >= 51 ? 'var(--verde-ok)' : 'var(--rojo-bad)' }}>{e.nota ?? '—'}</strong></td>
                  <td><button className="btn btn-primary btn-sm" onClick={() => openCalificar(e)}>{e.estado === 'revisado' ? 'Editar' : 'Calificar'}</button></td>
                </tr>
              );
            })}
          </Table>
        ) : <Empty>Sin entregas pendientes de revisión.</Empty>}
      </Section>

      <Modal
        open={!!modal}
        title="Calificar entrega"
        onClose={() => setModal(null)}
        footer={<>
          <button className="btn btn-outline" onClick={() => setModal(null)}>Cancelar</button>
          <button className="btn btn-primary" onClick={guardar}>Guardar nota</button>
        </>}
      >
        {modal?.tarea && (
          <div className="detalle-box">
            <strong>{modal.tarea.titulo}</strong>
            <p>{modal.tarea.descripcion}</p>
            <span>Puntos posibles: {modal.tarea.puntos}</span>
          </div>
        )}
        <Field label="Nota (0 a 100)"><input type="number" min="0" max="100" value={form.nota} onChange={(e) => setForm({ ...form, nota: e.target.value })} /></Field>
        <Field label="Retroalimentación"><textarea rows={3} placeholder="Comentario para el estudiante…" value={form.feedback} onChange={(e) => setForm({ ...form, feedback: e.target.value })} /></Field>
      </Modal>
    </>
  );
}

export function Anuncios() {
  const { session } = useAuth();
  const { db, add, remove } = useData();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ tipo: 'academico' });
  const puedeCrear = session.rol !== 'estudiante';

  const anuncios = [...(db.anuncios || [])].reverse();

  const save = () => {
    if (!form.titulo || !form.contenido) return alert('Título y contenido son obligatorios.');
    add('anuncios', {
      titulo: form.titulo,
      tipo: form.tipo,
      contenido: form.contenido,
      autor: session.nombre,
      fecha: new Date().toLocaleDateString('es-BO'),
    });
    setOpen(false);
  };

  return (
    <>
      <Section
        title={`Anuncios (${anuncios.length})`}
        actions={puedeCrear ? <button className="btn btn-primary btn-sm" onClick={() => setOpen(true)}>+ Nuevo anuncio</button> : null}
      >
        {anuncios.length ? (
          <div className="anuncios-list">
            {anuncios.map((a) => (
              <div key={a.id} className="anuncio-item">
                <div className="anuncio-head">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="chip chip-guindo">{a.tipo}</span>
                    <strong>{a.titulo}</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span>{a.fecha} · {a.autor}</span>
                    {puedeCrear && <ActionBtn icon="close" tone="del" title="Eliminar" onClick={() => remove('anuncios', a.id)} />}
                  </div>
                </div>
                <p>{a.contenido}</p>
              </div>
            ))}
          </div>
        ) : <Empty>Sin anuncios publicados.</Empty>}
      </Section>

      <Modal
        open={open}
        title="Nuevo anuncio"
        onClose={() => setOpen(false)}
        footer={<>
          <button className="btn btn-outline" onClick={() => setOpen(false)}>Cancelar</button>
          <button className="btn btn-primary" onClick={save}>Publicar</button>
        </>}
      >
        <Field label="Título"><input value={form.titulo || ''} onChange={(e) => setForm({ ...form, titulo: e.target.value })} /></Field>
        <Field label="Tipo">
          <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
            <option value="academico">Académico</option>
            <option value="info">Informativo</option>
          </select>
        </Field>
        <Field label="Contenido"><textarea rows={4} value={form.contenido || ''} onChange={(e) => setForm({ ...form, contenido: e.target.value })} /></Field>
      </Modal>
    </>
  );
}
