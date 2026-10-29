import { useData } from '../../../context/AppContext.jsx';
import { Section } from '../shared.jsx';
import { Icon } from '../../../components/ui.jsx';

export default function Reportes() {
  const { db, nombreUsuario, nombreCurso } = useData();

  /* Indicadores generales */
  const totalEst = db.usuarios.filter((u) => u.rol === 'estudiante').length;
  const estActivos = db.usuarios.filter((u) => u.rol === 'estudiante' && u.estado === 'activo').length;
  const aprobadas = db.notas.filter((n) => n.estado === 'aprobado').length;
  const promGeneral = db.notas.length
    ? (db.notas.reduce((a, n) => a + n.promedio, 0) / db.notas.length).toFixed(1)
    : '—';
  const asisProm = db.asistencia.length
    ? Math.round(db.asistencia.reduce((a, x) => a + x.porcentaje, 0) / db.asistencia.length)
    : 0;

  /* Distribución por carrera (estudiantes) */
  const porCarrera = ['TCP', 'Piloto Civil', 'EOV'].map((c) => ({
    label: c,
    value: db.usuarios.filter((u) => u.rol === 'estudiante' && u.carrera === c).length,
  }));
  const maxCarrera = Math.max(...porCarrera.map((c) => c.value), 1);

  /* Rendimiento por curso (promedio) */
  const porCurso = db.cursos.map((c) => {
    const notas = db.notas.filter((n) => n.curso_id === c.id);
    const prom = notas.length ? notas.reduce((a, n) => a + n.promedio, 0) / notas.length : 0;
    return { nombre: c.nombre, codigo: c.codigo, prom: Number(prom.toFixed(1)), n: notas.length };
  });

  return (
    <>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-card-icon"><Icon name="graduation" size={20} /></div><div className="stat-card-body"><div className="stat-card-value">{estActivos}/{totalEst}</div><div className="stat-card-label">Estudiantes activos</div></div></div>
        <div className="stat-card"><div className="stat-card-icon"><Icon name="chart" size={20} /></div><div className="stat-card-body"><div className="stat-card-value">{promGeneral}</div><div className="stat-card-label">Promedio general</div></div></div>
        <div className="stat-card"><div className="stat-card-icon"><Icon name="check" size={20} /></div><div className="stat-card-body"><div className="stat-card-value">{aprobadas}/{db.notas.length}</div><div className="stat-card-label">Notas aprobatorias</div></div></div>
        <div className="stat-card"><div className="stat-card-icon"><Icon name="clipboard" size={20} /></div><div className="stat-card-body"><div className="stat-card-value">{asisProm}%</div><div className="stat-card-label">Asistencia promedio</div></div></div>
      </div>

      <div className="reportes-grid mt-24">
        <Section title="Estudiantes por carrera">
          <div className="panel-pad chart-bars">
            {porCarrera.map((c) => (
              <div key={c.label} className="chart-row">
                <span className="chart-label">{c.label}</span>
                <div className="chart-track"><div className="chart-fill" style={{ width: `${(c.value / maxCarrera) * 100}%` }} /></div>
                <strong className="chart-value">{c.value}</strong>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Rendimiento por curso (promedio)">
          <div className="panel-pad chart-bars">
            {porCurso.map((c) => (
              <div key={c.codigo} className="chart-row">
                <span className="chart-label">{c.codigo}</span>
                <div className="chart-track">
                  <div className="chart-fill" style={{ width: `${c.prom}%`, background: c.prom >= 70 ? 'var(--guindo-light)' : 'var(--ambar)' }} />
                </div>
                <strong className="chart-value">{c.n ? c.prom : '—'}</strong>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <div className="reportes-grid mt-24">
        <Section title="Inscripciones por período">
          <div className="panel-pad chart-bars">
            {['2025-I', '2025-II', '2026-I'].map((p) => {
              const n = db.inscripciones.filter((i) => i.periodo === p).length;
              const max = Math.max(...['2025-I', '2025-II', '2026-I'].map((x) => db.inscripciones.filter((i) => i.periodo === x).length), 1);
              return (
                <div key={p} className="chart-row">
                  <span className="chart-label">{p}</span>
                  <div className="chart-track"><div className="chart-fill" style={{ width: `${(n / max) * 100}%` }} /></div>
                  <strong className="chart-value">{n}</strong>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Top calificaciones">
          <div className="panel-pad rank-list">
            {[...db.notas].sort((a, b) => b.promedio - a.promedio).slice(0, 5).map((n, i) => (
              <div key={n.id} className="rank-row">
                <span className={`rank-num ${i === 0 ? 'gold' : ''}`}>{i + 1}</span>
                <div>
                  <strong>{nombreUsuario(n.estudiante_id)}</strong>
                  <small className="muted">{nombreCurso(n.curso_id)}</small>
                </div>
                <strong style={{ color: 'var(--guindo-light)' }}>{Number(n.promedio).toFixed(1)}</strong>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
