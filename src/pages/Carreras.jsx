import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import { Reveal, Icon } from '../components/ui.jsx';
import { CARRERAS, ESPECIALIZACIONES } from '../data/initialData.js';

export default function Carreras() {
  const location = useLocation();

  // Desplazamiento a la sección del hash (#piloto-civil, #tcp, #eov, #especializaciones)
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
  }, [location]);

  return (
    <main>
      <PageHero
        breadcrumb="Carreras"
        title="Nuestras"
        span="Carreras"
        subtitle="Programas de formación aeronáutica certificados por la DGAC Bolivia, diseñados para el mercado laboral de la aviación comercial."
      />

      <section className="section">
        <div className="container">
          {/* Índice rápido */}
          <div className="carreras-index">
            {CARRERAS.map((c) => (
              <a key={c.slug} href={`#${c.slug}`} className="index-chip">
                <Icon name={c.icono} size={17} /> {c.nombre}
              </a>
            ))}
            <a href="#especializaciones" className="index-chip">
              <Icon name="graduation" size={17} /> Especializaciones
            </a>
          </div>

          {CARRERAS.map((c, i) => (
            <div key={c.slug} id={c.slug}>
              <Reveal className={`carrera-detalle ${i % 2 ? 'reverse' : ''}`}>
                <div className="carrera-visual">
                  <div className="carrera-visual-icon"><Icon name={c.icono} size={54} /></div>
                  <h3>{c.nombre}</h3>
                  <div className="carrera-stats-side">
                    {c.stats.map((s) => (
                      <div key={s.label} className="cs-item"><strong>{s.valor}</strong><span>{s.label}</span></div>
                    ))}
                  </div>
                </div>
                <div className="carrera-detalle-info">
                  <span className="badge">{c.codigo}</span>
                  <h2>{c.nombre}</h2>
                  <p className="carrera-lead">{c.lead}</p>
                  <p className="carrera-desc">{c.desc}</p>
                  <h4 className="subtitulo-fases">Fases del programa</h4>
                  <div className="fases-grid">
                    {c.fases.map((f) => (
                      <div key={f.nombre} className="fase-item">
                        <div className="fase-num">{f.n}</div>
                        <div><strong>{f.nombre}</strong><p>{f.desc}</p></div>
                      </div>
                    ))}
                  </div>
                  <div className="carrera-actions">
                    <Link to="/contacto" className="btn btn-primary">Inscribirme ahora</Link>
                    <Link to="/contacto" className="btn btn-outline">Solicitar información</Link>
                  </div>
                </div>
              </Reveal>
              {i < CARRERAS.length - 1 && <div className="carrera-separator" />}
            </div>
          ))}

          {/* Especializaciones */}
          <div id="especializaciones" className="sub-block">
            <Reveal className="section-head">
              <span className="section-kicker">— Formación continua —</span>
              <h2 className="section-title">Cursos de <span>Especialización</span></h2>
              <div className="divider" />
            </Reveal>
            <div className="esp-grid">
              {ESPECIALIZACIONES.map((e, i) => (
                <Reveal key={e.codigo} delay={i * 90} className="esp-card">
                  <div className="esp-icon"><Icon name="graduation" size={24} /></div>
                  <div className="esp-body">
                    <span className="badge">{e.codigo}</span>
                    <h4>{e.nombre}</h4>
                    <p>{e.desc}</p>
                    <Link to="/contacto" className="btn btn-outline btn-sm">Solicitar información</Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
