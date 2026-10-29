import { useState } from 'react';
import { useAuth, useData } from '../../../context/AppContext.jsx';
import { Section, StatusBadge, Table, BarAsis, Empty, ActionBtn } from '../shared.jsx';
import { Icon } from '../../../components/ui.jsx';
import { fechaCorta, today } from '../../../utils/helpers.js';

/* ============================================================
   Módulos del Estudiante
   ============================================================ */

export function MisCursos() {
  const { session } = useAuth();
  const { db, nombreUsuario } = useData();
  const insc = db.inscripciones.filter((i) => i.estudiante_id === session.id);

  if (!insc.length) return <Section title="Mis cursos"><Empty>No tienes cursos inscritos todavía.</Empty></Section>;

  return (
    <Section title={`Mis cursos (${insc.length})`}>
      <div className="materias-grid">
        {insc.map((i) => {
          const c = db.cursos.find((x) => x.id === i.curso_id);
          if (!c) return null;
          const asis = db.asistencia.find((a) => a.estudiante_id === session.id && a.curso_id === c.id);
          return (
            <div key={i.id} className="materia-card">
              <div className="materia-head">
                <code className="code-guindo">{c.codigo}</code>
                <StatusBadge estado={c.estado} />
              </div>
              <h4>{c.nombre}</h4>
              <p className="muted">{c.descripcion}</p>
              <div className="materia-meta">
                <span><Icon name="users" size={14} /> {nombreUsuario(c.instructor_id)}</span>
                <span><Icon name="clock" size={14} /> {c.duracion}</span>
                <span><Icon name="file" size={14} /> {c.creditos} créditos</span>
                <span><Icon name="clipboard" size={14} /> {i.periodo}</span>
              </div>
              {asis && <div className="materia-asist"><BarAsis pct={asis.porcentaje} /></div>}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export function MisNotas() {
  const { session } = useAuth();
  const { db, nombreCurso } = useData();
  const notas = db.notas.filter((n) => n.estudiante_id === session.id);
  const prom = notas.length ? (notas.reduce((a, n) => a + n.promedio, 0) / notas.length).toFixed(1) : '—';

  return (
    <>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-card-icon"><Icon name="chart" size={20} /></div><div className="stat-card-body"><div className="stat-card-value">{prom}</div><div className="stat-card-label">Promedio general</div></div></div>
        <div className="stat-card"><div className="stat-card-icon"><Icon name="check" size={20} /></div><div className="stat-card-body"><div className="stat-card-value">{notas.filter((n) => n.estado === 'aprobado').length}</div><div className="stat-card-label">Aprobados</div></div></div>
        <div className="stat-card"><div className="stat-card-icon"><Icon name="close" size={20} /></div><div className="stat-card-body"><div className="stat-card-value">{notas.filter((n) => n.estado === 'reprobado').length}</div><div className="stat-card-label">Reprobados</div></div></div>
      </div>

      <Section title="Mis calificaciones" className="mt-24">
        {notas.length ? (
          <Table head={['Curso', 'P1', 'P2', 'Final', 'Promedio', 'Estado']}>
            {notas.map((n) => (
              <tr key={n.id}>
                <td><strong>{nombreCurso(n.curso_id)}</strong></td>
                <td className="center">{n.parcial1}</td>
                <td className="center">{n.parcial2}</td>
                <td className="center">{n.final}</td>
                <td className="center"><strong style={{ color: n.promedio >= 51 ? 'var(--verde-ok)' : 'var(--rojo-bad)' }}>{Number(n.promedio).toFixed(1)}</strong></td>
                <td><StatusBadge estado={n.estado} /></td>
              </tr>
            ))}
          </Table>
        ) : <Empty>Aún no tienes calificaciones registradas.</Empty>}
      </Section>
    </>
  );
}

export function MiAsistencia() {
  const { session } = useAuth();
  const { db, nombreCurso } = useData();
  const registros = db.asistencia.filter((a) => a.estudiante_id === session.id);
  const licencias = db.solicitudes_licencia.filter((l) => l.estudiante_id === session.id);
  const prom = registros.length
    ? Math.round(registros.reduce((a, x) => a + x.porcentaje, 0) / registros.length)
    : 0;

  return (
    <>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-card-icon"><Icon name="check" size={20} /></div><div className="stat-card-body"><div className="stat-card-value">{prom}%</div><div className="stat-card-label">Asistencia promedio</div></div></div>
        <div className="stat-card"><div className="stat-card-icon"><Icon name="book" size={20} /></div><div className="stat-card-body"><div className="stat-card-value">{registros.length}</div><div className="stat-card-label">Cursos con seguimiento</div></div></div>
        <div className="stat-card"><div className="stat-card-icon"><Icon name="file" size={20} /></div><div className="stat-card-body"><div className="stat-card-value">{licencias.filter((l) => l.estado === 'aprobado').length}</div><div className="stat-card-label">Licencias aprobadas</div></div></div>
      </div>

      <Section title="Mi asistencia por curso" className="mt-24">
        {registros.length ? (
          <Table head={['Curso', 'Asistidas / Total', 'Asistencia', 'Estado']}>
            {registros.map((a) => (
              <tr key={a.id}>
                <td><strong>{nombreCurso(a.curso_id)}</strong></td>
                <td className="center">{a.asistidas} / {a.total_clases}</td>
                <td><BarAsis pct={a.porcentaje} /></td>
                <td><StatusBadge estado={a.porcentaje >= 75 ? 'aprobado' : a.porcentaje >= 60 ? 'pendiente' : 'reprobado'} /></td>
              </tr>
            ))}
          </Table>
        ) : <Empty>Sin registros de asistencia.</Empty>}
      </Section>

      <Section title="Mis licencias / justificaciones" className="mt-24">
        {licencias.length ? (
          <Table head={['Curso', 'Fechas', 'Motivo', 'Documento', 'Estado']}>
            {licencias.map((l) => (
              <tr key={l.id}>
                <td>{nombreCurso(l.curso_id)}</td>
                <td><small>{l.fecha_inicio}{l.fecha_fin !== l.fecha_inicio ? ` → ${l.fecha_fin}` : ''}</small></td>
                <td>{l.motivo}</td>
                <td><code className="code-guindo">{l.documento || 'Sin doc.'}</code></td>
                <td><StatusBadge estado={l.estado} /></td>
              </tr>
            ))}
          </Table>
        ) : <Empty>No tienes solicitudes de licencia.</Empty>}
      </Section>
    </>
  );
}

export function MisTareas() {
  const { session } = useAuth();
  const { db, add, nombreCurso } = useData();
  const idsInsc = db.inscripciones.filter((i) => i.estudiante_id === session.id).map((i) => i.curso_id);
  const tareas = (db.tareas || []).filter((t) => idsInsc.includes(t.curso_id));

  const [entrega, setEntrega] = useState(null); // {tarea, comentario, archivo}
  const [aviso, setAviso] = useState('');

  const yaEntregada = (tareaId) => (db.entregas || []).some((e) => e.tarea_id === tareaId && e.estudiante_id === session.id);

  const enviar = () => {
    if (!entrega.archivo) return alert('Indica el nombre del archivo entregado.');
    add('entregas', {
      tarea_id: entrega.tarea.id,
      estudiante_id: session.id,
      comentario: entrega.comentario || '',
      archivo: entrega.archivo,
      fecha_entrega: today(),
      estado: 'pendiente',
      nota: null,
      feedback: null,
    });
    setEntrega(null);
    setAviso('Entrega enviada correctamente. Espera la revisión del instructor.');
    setTimeout(() => setAviso(''), 5000);
  };

  return (
    <>
      {aviso && <div className="alert alert-ok" style={{ marginBottom: 18 }}><Icon name="check" size={16} /> {aviso}</div>}
      <Section title={`Tareas pendientes y publicadas (${tareas.length})`}>
        {tareas.length ? (
          <div className="tareas-list">
            {tareas.map((t) => {
              const vencida = new Date(t.fecha_limite) < new Date();
              const entregada = yaEntregada(t.id);
              return (
                <div key={t.id} className="tarea-row">
                  <div className="tarea-icon"><Icon name="clipboard" size={18} /></div>
                  <div className="tarea-main">
                    <div className="tarea-titulo">
                      <strong>{t.titulo}</strong>
                      <StatusBadge estado={entregada ? 'aprobado' : vencida ? 'inactivo' : 'activo'} />
                    </div>
                    <p className="muted">{nombreCurso(t.curso_id)} · Límite: {fechaCorta(t.fecha_limite)} · {t.puntos} pts</p>
                    {t.descripcion && <p className="tarea-desc">{t.descripcion}</p>}
                  </div>
                  <div className="tarea-side">
                    {entregada ? (
                      <span className="chip chip-guindo">Entregada ✓</span>
                    ) : (
                      <button className="btn btn-primary btn-sm" onClick={() => setEntrega({ tarea: t, comentario: '', archivo: '' })}>Entregar</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : <Empty>No hay tareas publicadas en tus cursos.</Empty>}
      </Section>

      {entrega && (
        <div className="modal-overlay" onClick={() => setEntrega(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Entregar: {entrega.tarea.titulo}</h3>
              <button className="modal-close" onClick={() => setEntrega(null)}><Icon name="close" size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Archivo (nombre del archivo)</label>
                <input placeholder="mi_tarea.pdf" value={entrega.archivo} onChange={(e) => setEntrega({ ...entrega, archivo: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Comentario (opcional)</label>
                <textarea rows={3} placeholder="Indica algo para el instructor…" value={entrega.comentario} onChange={(e) => setEntrega({ ...entrega, comentario: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setEntrega(null)}>Cancelar</button>
              <button className="btn btn-primary" onClick={enviar}>Enviar entrega</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function MisEntregas() {
  const { session } = useAuth();
  const { db } = useData();
  const entregas = (db.entregas || []).filter((e) => e.estudiante_id === session.id);
  const tareas = db.tareas || [];

  return (
    <Section title={`Mis entregas (${entregas.length})`}>
      {entregas.length ? (
        <Table head={['Tarea', 'Archivo', 'Entregado', 'Estado', 'Nota', 'Retroalimentación']}>
          {entregas.map((e) => {
            const t = tareas.find((x) => x.id === e.tarea_id);
            return (
              <tr key={e.id}>
                <td><strong>{t?.titulo || '—'}</strong></td>
                <td><code className="code-guindo">{e.archivo}</code></td>
                <td><small>{fechaCorta(e.fecha_entrega)}</small></td>
                <td><StatusBadge estado={e.estado} /></td>
                <td className="center"><strong style={{ color: e.nota >= 51 ? 'var(--verde-ok)' : 'var(--rojo-bad)' }}>{e.nota ?? '—'}</strong></td>
                <td className="muted">{e.feedback || '—'}</td>
              </tr>
            );
          })}
        </Table>
      ) : <Empty>Aún no has enviado entregas.</Empty>}
    </Section>
  );
}
