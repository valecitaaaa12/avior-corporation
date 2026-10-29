import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import { Reveal, Icon } from '../components/ui.jsx';
import { SEDES } from '../data/initialData.js';

export default function Sedes() {
  const [activa, setActiva] = useState(SEDES[0].id);
  const sede = SEDES.find((s) => s.id === activa);

  return (
    <main>
      <PageHero
        breadcrumb="Sedes"
        title="Nuestras"
        span="Sedes"
        subtitle="La escuela de aviación más grande de Bolivia. Presentes en 4 ciudades para brindarte formación aeronáutica de calidad."
      />

      <section className="section">
        <div className="container">
          <Reveal className="sede-tabs">
            {SEDES.map((s) => (
              <button
                key={s.id}
                className={`sede-tab ${activa === s.id ? 'active' : ''}`}
                onClick={() => setActiva(s.id)}
              >
                <Icon name={s.icono} size={18} />
                <span>{s.ciudad}</span>
                <small>{s.codigo}</small>
              </button>
            ))}
          </Reveal>

          <Reveal key={sede.id} className="sede-detalle">
            <div className="sede-detalle-main">
              <div className="sede-detalle-head">
                <div className="sede-icon big"><Icon name={sede.icono} size={30} /></div>
                <div>
                  <h2>{sede.ciudad}</h2>
                  <span className={`chip ${sede.tipo === 'Base Central' ? 'chip-guindo' : ''}`}>{sede.tipo}</span>
                </div>
              </div>
              <div className="sede-info big">
                <div className="sede-info-item"><Icon name="pin" size={18} /><span>{sede.direccion}<small>{sede.ref}</small></span></div>
                <div className="sede-info-item"><Icon name="phone" size={18} /><span><a href={`tel:${sede.tel.replace(/\s/g, '')}`}>{sede.tel}</a></span></div>
                <div className="sede-info-item"><Icon name="clock" size={18} /><span>{sede.horario}</span></div>
                <div className="sede-info-item"><Icon name="book" size={18} /><span>Carreras disponibles: <strong>{sede.carreras}</strong></span></div>
              </div>
            </div>

            <div className="sede-detalle-side">
              <div className="sede-map-placeholder">
                <Icon name="pin" size={44} />
                <span>{sede.ciudad}, Bolivia</span>
                <small>Coordenadas de referencia de la sede</small>
              </div>
              <div className="sede-stats">
                <div className="sede-stat"><strong>{SEDES.length}</strong><span>Sedes a nivel nacional</span></div>
                <div className="sede-stat"><strong>RAB 141</strong><span>Habilitación DGAC</span></div>
                <div className="sede-stat"><strong>3</strong><span>Líneas aéreas convenidas</span></div>
              </div>
            </div>
          </Reveal>

          <div className="sedes-grid all">
            {SEDES.map((s, i) => (
              <Reveal key={s.id} delay={i * 70} className={`sede-card ${s.tipo === 'Base Central' ? 'central' : ''}`}>
                {s.tipo === 'Base Central' && <div className="sede-badge">Base Central</div>}
                <div className="sede-icon"><Icon name={s.icono} size={24} /></div>
                <h3>{s.ciudad} <span className="sede-code">{s.codigo}</span></h3>
                <div className="sede-info">
                  <div className="sede-info-item"><Icon name="pin" size={16} /><span>{s.direccion}<small>{s.ref}</small></span></div>
                  <div className="sede-info-item"><Icon name="phone" size={16} /><span>{s.tel}</span></div>
                  <div className="sede-info-item"><Icon name="clock" size={16} /><span>{s.horario}</span></div>
                  <div className="sede-info-item"><Icon name="book" size={16} /><span>{s.carreras}</span></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
