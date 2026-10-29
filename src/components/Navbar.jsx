import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo, Icon } from './ui.jsx';

const CARRERAS_DD = [
  { slug: 'piloto-civil', icon: 'plane', nombre: 'Piloto Civil', meta: '30 meses · 200 hrs vuelo' },
  { slug: 'tcp', icon: 'crew', nombre: 'Tripulante de Cabina', meta: '12 meses · 598 hrs académicas' },
  { slug: 'eov', icon: 'radar', nombre: 'Despachador de Vuelo', meta: '9 meses · 350 hrs académicas' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => { setOpen(false); }, [location]);

  const linkClass = ({ isActive }) => (isActive ? 'active' : '');

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">
          <Logo size={44} />
          <div className="nav-logo-text">
            <strong>AVIOR</strong>
            <span>Corporation S.R.L.</span>
          </div>
        </Link>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          <li><NavLink to="/" end className={linkClass}>Inicio</NavLink></li>
          <li className="nav-dropdown">
            <NavLink to="/carreras" className="nav-dropdown-toggle">
              Carreras <span className="caret">▾</span>
            </NavLink>
            <div className="nav-dropdown-menu">
              {CARRERAS_DD.map((c) => (
                <Link key={c.slug} to={`/carreras#${c.slug}`}>
                  <span className="dd-icon"><Icon name={c.icon} size={18} /></span>
                  <div>
                    <strong>{c.nombre}</strong>
                    <small>{c.meta}</small>
                  </div>
                </Link>
              ))}
              <div className="dd-divider" />
              <Link to="/carreras#especializaciones">
                <span className="dd-icon"><Icon name="graduation" size={18} /></span>
                <div>
                  <strong>Especializaciones</strong>
                  <small>TDE · SMS</small>
                </div>
              </Link>
            </div>
          </li>
          <li><NavLink to="/nosotros" className={linkClass}>Conócenos</NavLink></li>
          <li><NavLink to="/sedes" className={linkClass}>Sedes</NavLink></li>
          <li><NavLink to="/contacto" className={linkClass}>Contacto</NavLink></li>
          <li>
            <NavLink to="/login" className="nav-cta">
              <Icon name="graduation" size={16} /> Aula Virtual
            </NavLink>
          </li>
        </ul>

        <button className={`nav-hamburger ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menú">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
