import { useState } from 'react';
import { useAuth, useData } from '../../../context/AppContext.jsx';
import { Section, StatusBadge, Table, Modal, Field, ActionBtn, BarAsis, Empty } from '../shared.jsx';
import { Icon } from '../../../components/ui.jsx';
import { calcPromedio, today } from '../../../utils/helpers.js';

/* ============================================================
   Académico: Calificaciones · Asistencia
   ============================================================ */

export function Calificaciones() {
  const { session } = useAuth();
  const { db, add, update, nombreUsuario, nombreCurso, cursoPorId } = useData();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  const cursosVisibles = session.rol === 'instructor'
    ? db.cursos.filter((c) => c.instructor_id === session.id).map((c) => c.id)
    : db.cursos.map((c) => c.id);

  const notas = db.notas.filter((n) => cursosVisibles.includes(n.curso_id));

  const openNew = () => { setForm({ parcial1: 0, parcial2: 0, final: 0 }); setModal({ mode: 'new' }); };
  const openEdit = (n) => { setForm({ ...n }); setModal({ mode: 'edit', id: n.id }); };

  const changeNota = (campo, valor) => {
    const next = { ...form, [campo]: valor };
    const prom = calcPromedio(next.parcial1, next.parcial2, next.final);
    next.promedio = prom;
    next.estado = prom == null ? '' : prom >= 51 ? 'aprobado' : 'reprobado';
    setForm(next);
  };

  const save = () => {
    if (!form.estudiante_id || !form.curso_id) return alert('Selecciona estudiante y curso.');
    const payload = {
      estudiante_id: Number(form.estudiante_id),
      curso_id: Number(form.curso_id),
      parcial1: Number(form.parcial1) || 0,
      parcial2: Number(form.parcial2) || 0,
      final: Number(form.final) || 0,
      promedio: calcPromedio(form.parcial1, form.parcial2, form.final),
    };
    payload.estado = payload.promedio >= 51 ? 'aprobado' : 'reprobado';
    if (modal.mode === 'new') add('notas', payload);
    else update('notas', modal.id, payload);
    setModal(null);
  };

  return (
    <>
      <Section
        title="Calificaciones"
        actions={<button className="btn btn-primary btn-sm" onClick={openNew}>+ Registrar nota</button>}
      >
        {notas.length ? (
          <Table head={['Estudiante', 'Curso', 'P1', 'P2', 'Final', 'Promedio', 'Estado', 'Acciones']}>
            {notas.map((n) => {
              const color = n.promedio >= 51 ? 'var(--verde-ok)' : 'var(--rojo-bad)';
              return (
                <tr key={n.id}>
                  <td><strong>{nombreUsuario(n.estudiante_id)}</strong></td>
                  <td>{nombreCurso(n.curso_id)}</td>
                  <td className="center">{n.parcial1}</td>
                  <td className="center">{n.parcial2}</td>
                  <td className="center">{n.final}</td>
                  <td className="center"><strong style={{ color }}>{Number(n.promedio).toFixed(1)}</strong></td>
                  <td><StatusBadge estado={n.estado} /></td>
                  <td><ActionBtn icon="clipboard" tone="edit" title="Editar" onClick={() => openEdit(n)} /></td>
                </tr>
              );
            })}
          </Table>
        ) : <Empty>Sin calificaciones registradas.</Empty>}
      </Section>

      <Modal
        open={!!modal}
        title={modal?.mode === 'new' ? 'Registrar nota' : 'Editar nota'}
        onClose={() => setModal(null)}
        footer={<>
          <button className="btn btn-outline" onClick={() => setModal(null)}>Cancelar</button>
          <button className="btn btn-primary" onClick={save}>Guardar</button>
        </>}
      >
        <div className="form-row">
          <Field label="Estudiante">
            <select value={form.estudiante_id || ''} onChange={(e) => setForm({ ...form, estudiante_id: e.target.value })}>
              <option value="">—</option>
              {db.usuarios.filter((u) => u.rol === 'estudiante').map((u) => (
                <option key={u.id} value={u.id}>{u.nombre} ({u.carnet})</option>
              ))}
            </select>
          </Field>
          <Field label="Curso">
            <select value={form.curso_id || ''} onChange={(e) => setForm({ ...form, curso_id: e.target.value })}>
              <option value="">—</option>
              {db.cursos.filter((c) => cursosVisibles.includes(c.id)).map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="form-row">
          <Field label="Parcial 1"><input type="number" min="0" max="100" value={form.parcial1 ?? 0} onChange={(e) => changeNota('parcial1', e.target.value)} /></Field>
          <Field label="Parcial 2"><input type="number" min="0" max="100" value={form.parcial2 ?? 0} onChange={(e) => changeNota('parcial2', e.target.value)} /></Field>
        </div>
        <div className="form-row">
          <Field label="Examen final"><input type="number" min="0" max="100" value={form.final ?? 0} onChange={(e) => changeNota('final', e.target.value)} /></Field>
          <Field label="Promedio (auto)">
            <input readOnly value={form.promedio ?? '—'} style={{ opacity: 0.7 }} />
          </Field>
        </div>
        {form.estado && (
          <div className={`alert ${form.estado === 'aprobado' ? 'alert-ok' : 'alert-bad'}`}>
            {form.estado === 'aprobado' ? '✓ Aprobado' : '✕ Reprobado (mínimo 51 pts)'}
          </div>
        )}
      </Modal>
    </>
  );
}

/* ============================================================
   Asistencia — pestañas: Registros · Pasar lista · Resumen · Licencias
   ============================================================ */

export function Asistencia() {
  const { session, db, add, update, remove, nombreUsuario, nombreCurso, cursoPorId } = useData();
  const [tab, setTab] = useState('registros');
  const [filtroCurso, setFiltroCurso] = useState('');

  const cursosVisibles = session.rol === 'instructor'
    ? db.cursos.filter((c) => c.instructor_id === session.id)
    : db.cursos;
  const idsCursos = cursosVisibles.map((c) => c.id);

  const registros = (db.registros_asistencia || []).filter((r) => idsCursos.includes(r.curso_id) && (!filtroCurso || r.curso_id === Number(filtroCurso)));
  const licencias = db.solicitudes_licencia || [];
  const licPend = licencias.filter((l) => l.estado === 'pendiente').length;

  /* ---- Pasar lista (estado local) ---- */
  const [lsCurso, setLsCurso] = useState('');
  const [lsFecha, setLsFecha] = useState(today());
  const [lsSesion, setLsSesion] = useState('');
  const [lista, setLista] = useState(null); // [{estudiante_id, estado, hora_llegada, nota}]

  const cargarAlumnos = () => {
    if (!lsCurso) return alert('Selecciona un curso.');
    const alumnos = db.inscripciones.filter((i) => i.curso_id === Number(lsCurso)).map((i) => ({
      estudiante_id: i.estudiante_id, estado: 'presente', hora_llegada: '08:00', nota: '',
    }));
    setLista(alumnos.length ? alumnos : []);
  };

  const marcar = (idx, estado) => {
    const next = [...lista];
    next[idx] = { ...next[idx], estado };
    setLista(next);
  };

  const marcarTodos = (estado) => setLista(lista.map((l) => ({ ...l, estado })));

  const guardarLista = () => {
    if (!lista || !lista.length) return;
    const registro = {
      curso_id: Number(lsCurso),
      fecha: lsFecha,
      sesion: lsSesion || 'Sesión sin título',
      creado_por: session.id,
      detalle: lista,
    };
    add('registros_asistencia', registro);
    // Actualizar resumen por alumno
    lista.forEach((l) => {
      const existente = db.asistencia.find((a) => a.estudiante_id === l.estudiante_id && a.curso_id === Number(lsCurso));
      if (existente) {
        const asistidas = existente.asistidas + (l.estado === 'presente' ? 1 : 0);
        update('asistencia', existente.id, {
          asistidas,
          total_clases: existente.total_clases + 1,
          porcentaje: Math.round((asistidas / (existente.total_clases + 1)) * 100),
        });
      } else {
        add('asistencia', {
          estudiante_id: l.estudiante_id, curso_id: Number(lsCurso),
          total_clases: 1, asistidas: l.estado === 'presente' ? 1 : 0,
          porcentaje: l.estado === 'presente' ? 100 : 0,
        });
      }
    });
    setLista(null);
    setLsSesion('');
    setTab('registros');
  };

  /* ---- Resumen ---- */
  const [resumenCurso, setResumenCurso] = useState('');
  const resumen = db.asistencia.filter((a) => a.curso_id === Number(resumenCurso));

  /* ---- Licencias ---- */
  const [licOpen, setLicOpen] = useState(false);
  const [licForm, setLicForm] = useState({ motivo: 'Cita médica', fecha_inicio: today(), fecha_fin: today() });

  const guardarLicencia = () => {
    if (!licForm.estudiante_id || !licForm.curso_id) return alert('Selecciona estudiante y curso.');
    add('solicitudes_licencia', {
      estudiante_id: Number(licForm.estudiante_id),
      curso_id: Number(licForm.curso_id),
      fecha_inicio: licForm.fecha_inicio,
      fecha_fin: licForm.fecha_fin,
      motivo: licForm.motivo,
      documento: licForm.documento || '',
      estado: 'pendiente',
      revisado_por: null,
      fecha_solicitud: today(),
    });
    setLicOpen(false);
  };

  const resolverLicencia = (id, estado) => update('solicitudes_licencia', id, { estado, revisado_por: session.id });

  return (
    <>
      <div className="tabs-bar">
        <button className={`tab-btn ${tab === 'registros' ? 'active' : ''}`} onClick={() => setTab('registros')}>
          <Icon name="clipboard" size={15} /> Registros
        </button>
        <button className={`tab-btn ${tab === 'nueva' ? 'active' : ''}`} onClick={() => setTab('nueva')}>
          <Icon name="check" size={15} /> Pasar lista
        </button>
        <button className={`tab-btn ${tab === 'resumen' ? 'active' : ''}`} onClick={() => setTab('resumen')}>
          <Icon name="chart" size={15} /> Resumen
        </button>
        <button className={`tab-btn ${tab === 'licencias' ? 'active' : ''}`} onClick={() => setTab('licencias')}>
          <Icon name="file" size={15} /> Licencias {licPend > 0 && <span className="item-badge">{licPend}</span>}
        </button>
      </div>

      {tab === 'registros' && (
        <Section
          title="Registros de asistencia"
          actions={
            <>
              <select className="filter-select" value={filtroCurso} onChange={(e) => setFiltroCurso(e.target.value)}>
                <option value="">Todos los cursos</option>
                {cursosVisibles.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
              <button className="btn btn-primary btn-sm" onClick={() => setTab('nueva')}>+ Pasar lista</button>
            </>
          }
        >
          {registros.length ? (
            <Table head={['Fecha', 'Sesión', 'Curso', 'Presentes', 'Tardanzas', 'Ausentes', 'Acciones']}>
              {registros.map((r) => {
                const pres = r.detalle.filter((x) => x.estado === 'presente').length;
                const tard = r.detalle.filter((x) => x.estado === 'tardanza').length;
                const aus = r.detalle.filter((x) => x.estado === 'ausente').length;
                return (
                  <tr key={r.id}>
                    <td><strong>{r.fecha}</strong></td>
                    <td>{r.sesion}</td>
                    <td className="muted">{cursoPorId(r.curso_id)?.nombre || '—'}</td>
                    <td className="center"><strong style={{ color: 'var(--verde-ok)' }}>{pres}</strong></td>
                    <td className="center"><strong style={{ color: 'var(--ambar)' }}>{tard}</strong></td>
                    <td className="center"><strong style={{ color: 'var(--rojo-bad)' }}>{aus}</strong></td>
                    <td><ActionBtn icon="close" tone="del" title="Eliminar" onClick={() => remove('registros_asistencia', r.id)} /></td>
                  </tr>
                );
              })}
            </Table>
          ) : <Empty>Sin registros todavía. Usa «Pasar lista» para crear el primero.</Empty>}
        </Section>
      )}

      {tab === 'nueva' && (
        <div className="asist-grid">
          <Section title="Configurar sesión">
            <div className="panel-pad">
              <Field label="Curso">
                <select value={lsCurso} onChange={(e) => setLsCurso(e.target.value)}>
                  <option value="">Seleccionar…</option>
                  {cursosVisibles.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              </Field>
              <Field label="Fecha"><input type="date" value={lsFecha} onChange={(e) => setLsFecha(e.target.value)} /></Field>
              <Field label="Nombre de la sesión"><input placeholder="Ej: Clase 3 — Emergencias" value={lsSesion} onChange={(e) => setLsSesion(e.target.value)} /></Field>
              <button className="btn btn-primary btn-block" onClick={cargarAlumnos}>Cargar alumnos</button>
            </div>
          </Section>

          <Section
            title={lista ? `Lista — ${lista.length} alumnos` : 'Selecciona un curso para comenzar'}
            actions={lista?.length ? (
              <>
                <button className="btn btn-sm btn-ok" onClick={() => marcarTodos('presente')}>✓ Todos presentes</button>
                <button className="btn btn-sm btn-bad" onClick={() => marcarTodos('ausente')}>✗ Todos ausentes</button>
              </>
            ) : null}
          >
            {lista ? (
              lista.length ? (
                <>
                  <Table head={['Alumno', 'Estado', 'Hora', 'Nota']}>
                    {lista.map((l, idx) => (
                      <tr key={l.estudiante_id}>
                        <td><strong>{nombreUsuario(l.estudiante_id)}</strong></td>
                        <td>
                          <div className="estado-toggle">
                            {['presente', 'tardanza', 'ausente'].map((est) => (
                              <button
                                key={est}
                                className={`toggle-btn ${est} ${l.estado === est ? 'on' : ''}`}
                                onClick={() => marcar(idx, est)}
                              >
                                {est}
                              </button>
                            ))}
                          </div>
                        </td>
                        <td><input className="mini-input" value={l.hora_llegada} onChange={(e) => { const n = [...lista]; n[idx] = { ...n[idx], hora_llegada: e.target.value }; setLista(n); }} /></td>
                        <td><input className="mini-input wide" value={l.nota} placeholder="Observación" onChange={(e) => { const n = [...lista]; n[idx] = { ...n[idx], nota: e.target.value }; setLista(n); }} /></td>
                      </tr>
                    ))}
                  </Table>
                  <div className="panel-pad" style={{ borderTop: '1px solid var(--negro-border)' }}>
                    <button className="btn btn-primary btn-block" onClick={guardarLista}>Guardar lista de asistencia</button>
                  </div>
                </>
              ) : <Empty>Este curso aún no tiene estudiantes inscritos.</Empty>
            ) : <Empty>Selecciona un curso y haz clic en «Cargar alumnos».</Empty>}
          </Section>
        </div>
      )}

      {tab === 'resumen' && (
        <Section
          title="Resumen por alumno"
          actions={
            <>
              <select className="filter-select" value={resumenCurso} onChange={(e) => setResumenCurso(e.target.value)}>
                <option value="">Seleccionar curso…</option>
                {cursosVisibles.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </>
          }
        >
          {resumenCurso && resumen.length ? (
            <Table head={['Alumno', 'Asistidas / Total', 'Asistencia', 'Estado']}>
              {resumen.map((a) => (
                <tr key={a.id}>
                  <td><strong>{nombreUsuario(a.estudiante_id)}</strong></td>
                  <td className="center">{a.asistidas} / {a.total_clases}</td>
                  <td><BarAsis pct={a.porcentaje} /></td>
                  <td><StatusBadge estado={a.porcentaje >= 75 ? 'aprobado' : a.porcentaje >= 60 ? 'pendiente' : 'reprobado'} /></td>
                </tr>
              ))}
            </Table>
          ) : <Empty>Selecciona un curso para ver el resumen.</Empty>}
        </Section>
      )}

      {tab === 'licencias' && (
        <Section
          title="Solicitudes de licencia / justificación"
          actions={<button className="btn btn-primary btn-sm" onClick={() => setLicOpen(true)}>+ Nueva solicitud</button>}
        >
          {licencias.length ? (
            <Table head={['Estudiante', 'Curso', 'Fechas', 'Motivo', 'Documento', 'Estado', 'Acciones']}>
              {licencias.map((l) => (
                <tr key={l.id}>
                  <td><strong>{nombreUsuario(l.estudiante_id)}</strong></td>
                  <td className="muted">{nombreCurso(l.curso_id)}</td>
                  <td><small>{l.fecha_inicio}{l.fecha_fin !== l.fecha_inicio ? ` → ${l.fecha_fin}` : ''}</small></td>
                  <td><small>{l.motivo}</small></td>
                  <td><code className="code-guindo">{l.documento || 'Sin doc.'}</code></td>
                  <td><StatusBadge estado={l.estado} /></td>
                  <td>
                    <div className="table-actions">
                      {l.estado === 'pendiente' ? (
                        <>
                          <ActionBtn icon="check" tone="ok" title="Aprobar" onClick={() => resolverLicencia(l.id, 'aprobado')} />
                          <ActionBtn icon="close" tone="del" title="Rechazar" onClick={() => resolverLicencia(l.id, 'rechazado')} />
                        </>
                      ) : (
                        <ActionBtn icon="close" tone="del" title="Eliminar" onClick={() => remove('solicitudes_licencia', l.id)} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
          ) : <Empty>Sin solicitudes de licencia.</Empty>}
        </Section>
      )}

      <Modal
        open={licOpen}
        title="Nueva solicitud de licencia"
        onClose={() => setLicOpen(false)}
        footer={<>
          <button className="btn btn-outline" onClick={() => setLicOpen(false)}>Cancelar</button>
          <button className="btn btn-primary" onClick={guardarLicencia}>Enviar solicitud</button>
        </>}
      >
        <Field label="Estudiante">
          <select value={licForm.estudiante_id || ''} onChange={(e) => setLicForm({ ...licForm, estudiante_id: e.target.value })}>
            <option value="">—</option>
            {db.usuarios.filter((u) => u.rol === 'estudiante').map((u) => (
              <option key={u.id} value={u.id}>{u.nombre} ({u.carnet})</option>
            ))}
          </select>
        </Field>
        <Field label="Curso">
          <select value={licForm.curso_id || ''} onChange={(e) => setLicForm({ ...licForm, curso_id: e.target.value })}>
            <option value="">—</option>
            {cursosVisibles.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
        </Field>
        <div className="form-row">
          <Field label="Fecha inicio"><input type="date" value={licForm.fecha_inicio} onChange={(e) => setLicForm({ ...licForm, fecha_inicio: e.target.value })} /></Field>
          <Field label="Fecha fin"><input type="date" value={licForm.fecha_fin} onChange={(e) => setLicForm({ ...licForm, fecha_fin: e.target.value })} /></Field>
        </div>
        <Field label="Motivo">
          <select value={licForm.motivo} onChange={(e) => setLicForm({ ...licForm, motivo: e.target.value })}>
            <option>Cita médica</option><option>Enfermedad</option><option>Viaje familiar</option>
            <option>Emergencia familiar</option><option>Trámite oficial</option><option>Otro</option>
          </select>
        </Field>
        <Field label="Documento adjunto (nombre)"><input placeholder="certificado_medico.pdf" value={licForm.documento || ''} onChange={(e) => setLicForm({ ...licForm, documento: e.target.value })} /></Field>
      </Modal>
    </>
  );
}
