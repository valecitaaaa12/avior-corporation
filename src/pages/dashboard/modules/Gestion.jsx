import { useState } from 'react';
import { useAuth, useData } from '../../../context/AppContext.jsx';
import { Section, StatusBadge, Table, Modal, Field, ActionBtn, Empty } from '../shared.jsx';
import { Icon } from '../../../components/ui.jsx';

/* ============================================================
   Gestión: Estudiantes · Instructores · Cursos · Inscripciones
   ============================================================ */

export function Estudiantes() {
  const { db, add, update, remove, cursoPorId } = useData();
  const [q, setQ] = useState('');
  const [modal, setModal] = useState(null); // {mode:'new'|'edit', data}
  const [form, setForm] = useState({});

  const lista = db.usuarios.filter((u) => u.rol === 'estudiante');
  const filtrados = lista.filter((u) =>
    [u.nombre, u.email, u.carnet, u.carrera, u.sede].join(' ').toLowerCase().includes(q.toLowerCase())
  );

  const openNew = () => { setForm({ carrera: 'TCP', sede: 'La Paz', estado: 'activo', password: '' }); setModal({ mode: 'new' }); };
  const openEdit = (u) => { setForm({ ...u }); setModal({ mode: 'edit', id: u.id }); };

  const save = () => {
    if (!form.nombre || !form.email) return alert('Nombre y correo son obligatorios.');
    if (modal.mode === 'new') {
      if (!form.password) return alert('Define una contraseña inicial.');
      const nextCarnet = `EST-${String(lista.length + 1).padStart(3, '0')}`;
      add('usuarios', { ...form, rol: 'estudiante', carnet: nextCarnet });
    } else {
      update('usuarios', modal.id, form);
    }
    setModal(null);
  };

  const del = (u) => {
    if (window.confirm(`¿Eliminar al estudiante ${u.nombre}?`)) remove('usuarios', u.id);
  };

  return (
    <>
      <Section
        title={`Estudiantes (${lista.length})`}
        actions={
          <>
            <input className="search-input" placeholder="Buscar por nombre, correo, carnet…" value={q} onChange={(e) => setQ(e.target.value)} />
            <button className="btn btn-primary btn-sm" onClick={openNew}>+ Nuevo estudiante</button>
          </>
        }
      >
        {filtrados.length ? (
          <Table head={['Carnet', 'Nombre', 'Correo', 'Carrera', 'Sede', 'Estado', 'Acciones']}>
            {filtrados.map((u) => (
              <tr key={u.id}>
                <td><code className="code-guindo">{u.carnet}</code></td>
                <td><strong>{u.nombre}</strong></td>
                <td className="muted">{u.email}</td>
                <td>{u.carrera || '—'}</td>
                <td>{u.sede || '—'}</td>
                <td><StatusBadge estado={u.estado} /></td>
                <td>
                  <div className="table-actions">
                    <ActionBtn icon="file" title="Ver inscripciones" onClick={() => {
                      const ins = db.inscripciones.filter((i) => i.estudiante_id === u.id).map((i) => cursoPorId(i.curso_id)?.nombre).join(', ') || 'Sin inscripciones';
                      window.alert(`Inscripciones de ${u.nombre}:\n${ins}`);
                    }} />
                    <ActionBtn icon="clipboard" tone="edit" title="Editar" onClick={() => openEdit(u)} />
                    <ActionBtn icon="close" tone="del" title="Eliminar" onClick={() => del(u)} />
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        ) : <Empty>No se encontraron estudiantes.</Empty>}
      </Section>

      <Modal
        open={!!modal}
        title={modal?.mode === 'new' ? 'Nuevo estudiante' : 'Editar estudiante'}
        onClose={() => setModal(null)}
        footer={<>
          <button className="btn btn-outline" onClick={() => setModal(null)}>Cancelar</button>
          <button className="btn btn-primary" onClick={save}>Guardar</button>
        </>}
      >
        <Field label="Nombre completo">
          <input value={form.nombre || ''} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Nombre completo" />
        </Field>
        <Field label="Correo electrónico">
          <input type="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@avior.edu.bo" />
        </Field>
        <div className="form-row">
          <Field label="Contraseña">
            <input type="password" value={form.password || ''} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••" />
          </Field>
          <Field label="Carnet / CI">
            <input value={form.carnet || ''} onChange={(e) => setForm({ ...form, carnet: e.target.value })} placeholder="EST-000" />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Carrera">
            <select value={form.carrera || ''} onChange={(e) => setForm({ ...form, carrera: e.target.value })}>
              <option value="">—</option><option>TCP</option><option>Piloto Civil</option><option>EOV</option>
            </select>
          </Field>
          <Field label="Sede">
            <select value={form.sede || 'La Paz'} onChange={(e) => setForm({ ...form, sede: e.target.value })}>
              <option>La Paz</option><option>Cochabamba</option><option>Tarija</option><option>Sucre</option>
            </select>
          </Field>
        </div>
        <Field label="Estado">
          <select value={form.estado || 'activo'} onChange={(e) => setForm({ ...form, estado: e.target.value })}>
            <option value="activo">activo</option><option value="inactivo">inactivo</option>
          </select>
        </Field>
      </Modal>
    </>
  );
}

export function Instructores() {
  const { db, add } = useData();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ especialidad: 'TCP', estado: 'activo' });

  const lista = db.usuarios.filter((u) => u.rol === 'instructor');

  const save = () => {
    if (!form.nombre || !form.email || !form.password) return alert('Completa nombre, correo y contraseña.');
    const n = lista.length + 1;
    add('usuarios', { ...form, rol: 'instructor', carnet: `INS-${String(n).padStart(3, '0')}` });
    setOpen(false);
  };

  return (
    <>
      <Section
        title={`Instructores (${lista.length})`}
        actions={<button className="btn btn-primary btn-sm" onClick={() => setOpen(true)}>+ Nuevo instructor</button>}
      >
        <Table head={['Carnet', 'Nombre', 'Correo', 'Especialidad', 'Materias', 'Estado']}>
          {lista.map((ins) => (
            <tr key={ins.id}>
              <td><code className="code-guindo">{ins.carnet}</code></td>
              <td><strong>{ins.nombre}</strong></td>
              <td className="muted">{ins.email}</td>
              <td>{ins.especialidad || '—'}</td>
              <td><span className="badge">{db.cursos.filter((c) => c.instructor_id === ins.id).length}</span></td>
              <td><StatusBadge estado={ins.estado} /></td>
            </tr>
          ))}
        </Table>
      </Section>

      <Modal
        open={open}
        title="Nuevo instructor"
        onClose={() => setOpen(false)}
        footer={<>
          <button className="btn btn-outline" onClick={() => setOpen(false)}>Cancelar</button>
          <button className="btn btn-primary" onClick={save}>Guardar</button>
        </>}
      >
        <Field label="Nombre completo"><input value={form.nombre || ''} onChange={(e) => setForm({ ...form, nombre: e.target.value })} /></Field>
        <Field label="Correo"><input type="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
        <div className="form-row">
          <Field label="Contraseña"><input type="password" value={form.password || ''} onChange={(e) => setForm({ ...form, password: e.target.value })} /></Field>
          <Field label="Especialidad">
            <select value={form.especialidad} onChange={(e) => setForm({ ...form, especialidad: e.target.value })}>
              <option>TCP</option><option>Piloto Civil</option><option>EOV</option>
            </select>
          </Field>
        </div>
      </Modal>
    </>
  );
}

export function Cursos() {
  const { db, add, nombreUsuario } = useData();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ carrera: 'TCP', creditos: 4, estado: 'activo' });

  const instructores = db.usuarios.filter((u) => u.rol === 'instructor');

  const save = () => {
    if (!form.codigo || !form.nombre) return alert('Código y nombre son obligatorios.');
    add('cursos', { ...form, instructor_id: Number(form.instructor_id) || instructores[0].id });
    setOpen(false);
  };

  return (
    <>
      <Section
        title={`Cursos (${db.cursos.length})`}
        actions={<button className="btn btn-primary btn-sm" onClick={() => setOpen(true)}>+ Nuevo curso</button>}
      >
        <Table head={['Código', 'Nombre', 'Carrera', 'Instructor', 'Duración', 'Créditos', 'Estado']}>
          {db.cursos.map((c) => (
            <tr key={c.id}>
              <td><code className="code-guindo">{c.codigo}</code></td>
              <td><strong>{c.nombre}</strong><br /><small className="muted">{c.descripcion}</small></td>
              <td>{c.carrera}</td>
              <td>{nombreUsuario(c.instructor_id)}</td>
              <td>{c.duracion}</td>
              <td>{c.creditos}</td>
              <td><StatusBadge estado={c.estado} /></td>
            </tr>
          ))}
        </Table>
      </Section>

      <Modal
        open={open}
        title="Nuevo curso"
        onClose={() => setOpen(false)}
        footer={<>
          <button className="btn btn-outline" onClick={() => setOpen(false)}>Cancelar</button>
          <button className="btn btn-primary" onClick={save}>Guardar</button>
        </>}
      >
        <div className="form-row">
          <Field label="Código"><input value={form.codigo || ''} onChange={(e) => setForm({ ...form, codigo: e.target.value })} placeholder="TCP-103" /></Field>
          <Field label="Nombre"><input value={form.nombre || ''} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Nombre del curso" /></Field>
        </div>
        <Field label="Descripción"><textarea rows={2} value={form.descripcion || ''} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} /></Field>
        <div className="form-row">
          <Field label="Carrera">
            <select value={form.carrera} onChange={(e) => setForm({ ...form, carrera: e.target.value })}>
              <option>TCP</option><option>PC</option><option>EOV</option>
            </select>
          </Field>
          <Field label="Instructor">
            <select value={form.instructor_id || ''} onChange={(e) => setForm({ ...form, instructor_id: e.target.value })}>
              {instructores.map((i) => <option key={i.id} value={i.id}>{i.nombre}</option>)}
            </select>
          </Field>
        </div>
        <div className="form-row">
          <Field label="Duración"><input value={form.duracion || ''} onChange={(e) => setForm({ ...form, duracion: e.target.value })} placeholder="3 meses" /></Field>
          <Field label="Créditos"><input type="number" min="1" value={form.creditos} onChange={(e) => setForm({ ...form, creditos: e.target.value })} /></Field>
        </div>
      </Modal>
    </>
  );
}

export function Inscripciones() {
  const { db, add, remove, nombreUsuario, nombreCurso } = useData();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ periodo: '2026-I', fecha: new Date().toISOString().split('T')[0] });

  const estudiantes = db.usuarios.filter((u) => u.rol === 'estudiante' && u.estado === 'activo');
  const cursos = db.cursos.filter((c) => c.estado === 'activo');

  const save = () => {
    if (!form.estudiante_id || !form.curso_id) return alert('Selecciona estudiante y curso.');
    add('inscripciones', {
      estudiante_id: Number(form.estudiante_id),
      curso_id: Number(form.curso_id),
      periodo: form.periodo,
      fecha: form.fecha,
      estado: 'activo',
    });
    setOpen(false);
  };

  return (
    <>
      <Section
        title={`Inscripciones (${db.inscripciones.length})`}
        actions={<button className="btn btn-primary btn-sm" onClick={() => setOpen(true)}>+ Nueva inscripción</button>}
      >
        <Table head={['#', 'Estudiante', 'Curso', 'Período', 'Fecha', 'Estado', '']}>
          {db.inscripciones.map((i) => (
            <tr key={i.id}>
              <td className="muted">{i.id}</td>
              <td><strong>{nombreUsuario(i.estudiante_id)}</strong></td>
              <td>{nombreCurso(i.curso_id)}</td>
              <td><span className="badge">{i.periodo}</span></td>
              <td className="muted">{i.fecha}</td>
              <td><StatusBadge estado={i.estado} /></td>
              <td><ActionBtn icon="close" tone="del" title="Anular" onClick={() => remove('inscripciones', i.id)} /></td>
            </tr>
          ))}
        </Table>
      </Section>

      <Modal
        open={open}
        title="Nueva inscripción"
        onClose={() => setOpen(false)}
        footer={<>
          <button className="btn btn-outline" onClick={() => setOpen(false)}>Cancelar</button>
          <button className="btn btn-primary" onClick={save}>Inscribir</button>
        </>}
      >
        <Field label="Estudiante">
          <select value={form.estudiante_id || ''} onChange={(e) => setForm({ ...form, estudiante_id: e.target.value })}>
            <option value="">—</option>
            {estudiantes.map((u) => <option key={u.id} value={u.id}>{u.nombre} ({u.carnet})</option>)}
          </select>
        </Field>
        <Field label="Curso">
          <select value={form.curso_id || ''} onChange={(e) => setForm({ ...form, curso_id: e.target.value })}>
            <option value="">—</option>
            {cursos.map((c) => <option key={c.id} value={c.id}>{c.codigo} — {c.nombre}</option>)}
          </select>
        </Field>
        <div className="form-row">
          <Field label="Período"><input value={form.periodo} onChange={(e) => setForm({ ...form, periodo: e.target.value })} /></Field>
          <Field label="Fecha"><input type="date" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} /></Field>
        </div>
      </Modal>
    </>
  );
}

/** Vista "Mis Materias" del instructor (cursos asignados + estudiantes inscritos) */
export function MisMaterias() {
  const { session } = useAuth();
  const { db, nombreUsuario } = useData();
  const cursos = db.cursos.filter((c) => c.instructor_id === session.id);

  return (
    <>
      <Section title={`Mis materias (${cursos.length})`}>
        {cursos.length ? (
          <div className="materias-grid">
            {cursos.map((c) => {
              const inscritos = db.inscripciones.filter((i) => i.curso_id === c.id);
              return (
                <div key={c.id} className="materia-card">
                  <div className="materia-head">
                    <code className="code-guindo">{c.codigo}</code>
                    <StatusBadge estado={c.estado} />
                  </div>
                  <h4>{c.nombre}</h4>
                  <p className="muted">{c.descripcion}</p>
                  <div className="materia-meta">
                    <span><Icon name="clock" size={14} /> {c.duracion}</span>
                    <span><Icon name="file" size={14} /> {c.creditos} créditos</span>
                    <span><Icon name="graduation" size={14} /> {inscritos.length} inscritos</span>
                  </div>
                  {inscritos.length > 0 && (
                    <div className="materia-alumnos">
                      {inscritos.map((i) => <span key={i.id} className="chip">{nombreUsuario(i.estudiante_id)}</span>)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : <Empty>No tienes materias asignadas.</Empty>}
      </Section>
    </>
  );
}
