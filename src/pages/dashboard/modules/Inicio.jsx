import { useAuth, useData } from '../../../context/AppContext.jsx';
import { StatCard, Section } from '../shared.jsx';
import { Icon } from '../../../components/ui.jsx';

export default function Inicio() {
  const { session } = useAuth();
  const { db } = useData();

  let stats = [];

  if (session.rol === 'estudiante') {
    const misInsc = db.inscripciones.filter((i) => i.estudiante_id === session.id);
    const misNotas = db.notas.filter((n) => n.estudiante_id === session.id);
    const prom = misNotas.length
      ? (misNotas.reduce((a, n) => a + n.promedio, 0) / misNotas.length).toFixed(1)
      : '—';
    const idsCursos = misInsc.map((i) => i.curso_id);
    const pendTar = (db.tareas || []).filter(
      (t) => idsCursos.includes(t.curso_id) && !(db.entregas || []).some((e) => e.tarea_id === t.id && e.estudiante_id === session.id)
    ).length;
    stats = [
      { icon: 'book', label: 'Cursos inscritos', value: misInsc.length },
      { icon: 'chart', label: 'Promedio general', value: prom },
      { icon: 'check', label: 'Cursos aprobados', value: misNotas.filter((n) => n.estado === 'aprobado').length },
      { icon: 'clipboard', label: 'Tareas pendientes', value: pendTar, change: pendTar > 0 ? '⚠ Revisar' : '' },
    ];
  } else if (session.rol === 'instructor') {
    const mc = db.cursos.filter((c) => c.instructor_id === session.id);
    const cids = mc.map((c) => c.id);
    const nEst = new Set(db.inscripciones.filter((i) => cids.includes(i.curso_id)).map((i) => i.estudiante_id)).size;
    const nTar = (db.tareas || []).filter((t) => cids.includes(t.curso_id)).length;
    const nPend = (db.entregas || []).filter((e) => {
      const t = (db.tareas || []).find((x) => x.id === e.tarea_id);
      return t && cids.includes(t.curso_id) && e.estado === 'pendiente';
    }).length;
    stats = [
      { icon: 'book', label: 'Mis materias', value: mc.length },
      { icon: 'graduation', label: 'Estudiantes', value: nEst },
      { icon: 'clipboard', label: 'Tareas creadas', value: nTar },
      { icon: 'send', label: 'Entregas por revisar', value: nPend, change: nPend > 0 ? '⚠ Pendientes' : '' },
    ];
  } else {
    const tEst = db.usuarios.filter((u) => u.rol === 'estudiante').length;
    const tInst = db.usuarios.filter((u) => u.rol === 'instructor').length;
    const tCur = db.cursos.filter((c) => c.estado === 'activo').length;
    const tPend = (db.entregas || []).filter((e) => e.estado === 'pendiente').length;
    stats = [
      { icon: 'graduation', label: 'Estudiantes', value: tEst, change: '↑ activos' },
      { icon: 'users', label: 'Instructores', value: tInst },
      { icon: 'book', label: 'Cursos activos', value: tCur },
      { icon: 'send', label: 'Entregas pendientes', value: tPend, change: tPend > 0 ? '⚠ Sin revisar' : '' },
    ];
  }

  const anuncios = [...(db.anuncios || [])].reverse().slice(0, 4);

  return (
    <>
      <div className="welcome-banner">
        <div>
          <h3>Bienvenido, {session.nombre.split(' ')[0]} 👋</h3>
          <p>Panel del Sistema Académico AVIOR — {new Date().toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <Icon name="plane" size={44} />
      </div>

      <div className="stats-grid">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <Section title="Anuncios recientes" className="mt-24">
        <div className="anuncios-list">
          {anuncios.length ? (
            anuncios.map((a) => (
              <div key={a.id} className="anuncio-item">
                <div className="anuncio-head">
                  <strong>{a.titulo}</strong>
                  <span>{a.fecha} · {a.autor}</span>
                </div>
                <p>{a.contenido}</p>
              </div>
            ))
          ) : (
            <div className="empty-state">Sin anuncios recientes.</div>
          )}
        </div>
      </Section>
    </>
  );
}
