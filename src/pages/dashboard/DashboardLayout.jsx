import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useAuth, useData } from '../../context/AppContext.jsx';
import { Logo, Icon } from '../../components/ui.jsx';
import { initials, rolLabel } from '../../utils/helpers.js';

import Inicio from './modules/Inicio.jsx';
import { Estudiantes, Instructores, Cursos, Inscripciones, MisMaterias } from './modules/Gestion.jsx';
import { Calificaciones, Asistencia } from './modules/Academico.jsx';
import { Tareas, Entregas, Anuncios } from './modules/AulaVirtual.jsx';
import Reportes from './modules/Reportes.jsx';
import { MisCursos, MisNotas, MiAsistencia, MisTareas, MisEntregas } from './modules/Alumno.jsx';

/* ---- Menú lateral por rol ---- */
const MENU = {
  admin: [
    { label: 'General', type: 'label' },
    { to: '/dashboard', icon: 'building', text: 'Inicio', end: true },
    { label: 'Gestión', type: 'label' },
    { to: '/dashboard/estudiantes', icon: 'graduation', text: 'Estudiantes' },
    { to: '/dashboard/instructores', icon: 'users', text: 'Instructores' },
    { to: '/dashboard/cursos', icon: 'book', text: 'Cursos' },
    { to: '/dashboard/inscripciones', icon: 'clipboard', text: 'Inscripciones' },
    { label: 'Académico', type: 'label' },
    { to: '/dashboard/notas', icon: 'file', text: 'Calificaciones' },
    { to: '/dashboard/asistencia', icon: 'check', text: 'Lista / Asistencia' },
    { to: '/dashboard/tareas', icon: 'clipboard', text: 'Tareas y Exámenes' },
    { to: '/dashboard/entregas', icon: 'send', text: 'Entregas' },
    { label: 'Sistema', type: 'label' },
    { to: '/dashboard/reportes', icon: 'chart', text: 'Reportes' },
    { to: '/dashboard/anuncios', icon: 'bell', text: 'Anuncios' },
  ],
  instructor: [
    { label: 'General', type: 'label' },
    { to: '/dashboard', icon: 'building', text: 'Inicio', end: true },
    { label: 'Mis Materias', type: 'label' },
    { to: '/dashboard/mis-materias', icon: 'book', text: 'Mis Materias' },
    { label: 'Aula Virtual', type: 'label' },
    { to: '/dashboard/tareas', icon: 'clipboard', text: 'Tareas y Exámenes' },
    { to: '/dashboard/entregas', icon: 'send', text: 'Entregas' },
    { label: 'Académico', type: 'label' },
    { to: '/dashboard/notas', icon: 'file', text: 'Calificaciones' },
    { to: '/dashboard/asistencia', icon: 'check', text: 'Lista / Asistencia' },
    { to: '/dashboard/anuncios', icon: 'bell', text: 'Anuncios' },
  ],
  estudiante: [
    { label: 'General', type: 'label' },
    { to: '/dashboard', icon: 'building', text: 'Inicio', end: true },
    { label: 'Mi Académico', type: 'label' },
    { to: '/dashboard/mis-cursos', icon: 'book', text: 'Mis Cursos' },
    { to: '/dashboard/mis-notas', icon: 'file', text: 'Mis Notas' },
    { to: '/dashboard/mi-asistencia', icon: 'check', text: 'Mi Asistencia' },
    { label: 'Aula Virtual', type: 'label' },
    { to: '/dashboard/mis-tareas', icon: 'clipboard', text: 'Tareas Pendientes' },
    { to: '/dashboard/mis-entregas', icon: 'send', text: 'Mis Entregas' },
    { to: '/dashboard/anuncios', icon: 'bell', text: 'Anuncios' },
  ],
};

const TITLES = {
  '/dashboard': 'Inicio',
  '/dashboard/estudiantes': 'Estudiantes',
  '/dashboard/instructores': 'Instructores',
  '/dashboard/cursos': 'Cursos',
  '/dashboard/inscripciones': 'Inscripciones',
  '/dashboard/mis-materias': 'Mis Materias',
  '/dashboard/notas': 'Calificaciones',
  '/dashboard/asistencia': 'Lista / Asistencia',
  '/dashboard/tareas': 'Tareas y Exámenes',
  '/dashboard/entregas': 'Entregas Recibidas',
  '/dashboard/reportes': 'Reportes',
  '/dashboard/anuncios': 'Anuncios',
  '/dashboard/mis-cursos': 'Mis Cursos',
  '/dashboard/mis-notas': 'Mis Notas',
  '/dashboard/mi-asistencia': 'Mi Asistencia',
  '/dashboard/mis-tareas': 'Tareas Pendientes',
  '/dashboard/mis-entregas': 'Mis Entregas',
};

export default function DashboardLayout() {
  const { session, logout } = useAuth();
  const { reset, db } = useData();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [reloj, setReloj] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setReloj(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Ruta actual para el título del topbar
  const path = '/dashboard' + (window.location.pathname.replace(/^\/dashboard/, '').replace(/\/$/, '') || '');
  const title = TITLES[path] || 'Panel';

  const items = MENU[session.rol] || MENU.estudiante;

  const onLogout = () => { logout(); navigate('/login', { replace: true }); };

  const onReset = () => {
    if (window.confirm('¿Resetear los datos de demostración? Se perderán los cambios locales.')) {
      reset();
      window.location.reload();
    }
  };

  return (
    <div className="dash-layout">
      {/* ===== Sidebar ===== */}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Logo size={38} />
          <div className="sidebar-brand">
            <strong>AVIOR</strong>
            <span>Sistema Académico</span>
          </div>
          <button className="sidebar-close" onClick={() => setOpen(false)} aria-label="Cerrar menú">
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">{initials(session.nombre)}</div>
          <div className="user-info">
            <strong>{session.nombre}</strong>
            <span>{rolLabel(session.rol)} · {session.carnet}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {items.map((it, i) =>
            it.type === 'label' ? (
              <div key={i} className="nav-section-label">{it.label}</div>
            ) : (
              <NavLink
                key={it.to}
                to={it.to}
                end={it.end}
                className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => setOpen(false)}
              >
                <Icon name={it.icon} size={17} />
                <span>{it.text}</span>
              </NavLink>
            )
          )}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}><Icon name="logout" size={16} /> Cerrar sesión</button>
          <button className="logout-btn ghost" onClick={onReset}><Icon name="refresh" size={14} /> Reset datos demo</button>
        </div>
      </aside>

      {open && <div className="sidebar-backdrop" onClick={() => setOpen(false)} />}

      {/* ===== Main ===== */}
      <div className="dash-main">
        <header className="dash-topbar">
          <div className="topbar-left">
            <button className="menu-toggle" onClick={() => setOpen(true)} aria-label="Abrir menú">
              <Icon name="menu" size={20} />
            </button>
            <h2>{title}</h2>
          </div>
          <div className="topbar-right">
            <span className="topbar-chip"><Icon name="bell" size={14} /> {(db.anuncios || []).length} anuncios</span>
            <span className="topbar-time">
              {reloj.toLocaleDateString('es-BO', { weekday: 'short', day: '2-digit', month: 'short' })} ·{' '}
              {reloj.toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
        </header>

        <main className="dash-content">
          <Routes>
            <Route index element={<Inicio />} />
            <Route path="estudiantes" element={session.rol === 'admin' ? <Estudiantes /> : <Navigate to="/dashboard" />} />
            <Route path="instructores" element={session.rol === 'admin' ? <Instructores /> : <Navigate to="/dashboard" />} />
            <Route path="cursos" element={session.rol === 'admin' ? <Cursos /> : <Navigate to="/dashboard" />} />
            <Route path="inscripciones" element={session.rol === 'admin' ? <Inscripciones /> : <Navigate to="/dashboard" />} />
            <Route path="mis-materias" element={session.rol === 'instructor' ? <MisMaterias /> : <Navigate to="/dashboard" />} />
            <Route path="notas" element={<Calificaciones />} />
            <Route path="asistencia" element={<Asistencia />} />
            <Route path="tareas" element={<Tareas />} />
            <Route path="entregas" element={<Entregas />} />
            <Route path="reportes" element={session.rol === 'admin' ? <Reportes /> : <Navigate to="/dashboard" />} />
            <Route path="anuncios" element={<Anuncios />} />
            <Route path="mis-cursos" element={session.rol === 'estudiante' ? <MisCursos /> : <Navigate to="/dashboard" />} />
            <Route path="mis-notas" element={session.rol === 'estudiante' ? <MisNotas /> : <Navigate to="/dashboard" />} />
            <Route path="mi-asistencia" element={session.rol === 'estudiante' ? <MiAsistencia /> : <Navigate to="/dashboard" />} />
            <Route path="mis-tareas" element={session.rol === 'estudiante' ? <MisTareas /> : <Navigate to="/dashboard" />} />
            <Route path="mis-entregas" element={session.rol === 'estudiante' ? <MisEntregas /> : <Navigate to="/dashboard" />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
