import { Link } from 'react-router-dom';
import { Logo, Icon } from './ui.jsx';
import { SEDES } from '../data/initialData.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo">
              <Logo size={46} />
              <div className="nav-logo-text">
                <strong>AVIOR</strong>
                <span>Corporation S.R.L.</span>
              </div>
            </div>
            <p>
              Centro de Instrucción de Aeronáutica Civil certificado por la DGAC Bolivia.
              Formando los profesionales de la aviación desde hace más de 15 años.
            </p>
            <div className="footer-badges">
              <span className="chip">RAB 141</span>
              <span className="chip">RAB 142</span>
              <span className="chip">OACI</span>
            </div>
          </div>

          <div className="footer-col">
            <h4>Carreras</h4>
            <ul>
              <li><Link to="/carreras#piloto-civil">Piloto Civil Comercial</Link></li>
              <li><Link to="/carreras#tcp">Tripulante de Cabina</Link></li>
              <li><Link to="/carreras#eov">Despachador de Vuelo</Link></li>
              <li><Link to="/carreras#especializaciones">Especializaciones</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Sedes</h4>
            <ul>
              {SEDES.map((s) => (
                <li key={s.id}><Link to="/sedes">{s.ciudad} · {s.tel}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Aula Virtual</h4>
            <ul>
              <li><Link to="/login">Acceso Estudiantes</Link></li>
              <li><Link to="/login">Acceso Instructores</Link></li>
              <li><Link to="/login">Administración</Link></li>
              <li><Link to="/nosotros">Política de Calidad</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} AVIOR Corporation S.R.L. — Todos los derechos reservados.</p>
          <div className="footer-contact-line">
            <span><Icon name="mail" size={14} /> info@aviorcorporation.com.bo</span>
            <span><Icon name="globe" size={14} /> www.aviorcorporation.com.bo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
