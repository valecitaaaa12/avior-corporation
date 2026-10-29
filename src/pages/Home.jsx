import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal, SectionTitle, Icon } from '../components/ui.jsx';
import { SEDES, CARRERAS, ESPECIALIZACIONES } from '../data/initialData.js';

/* ---- Contador animado del hero ---- */
function Counter({ to, suffix = '' }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        obs.unobserve(e.target);
        const dur = 1600;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{n}{suffix}</span>;
}

const VALORES = [
  { icon: 'award', titulo: 'Responsabilidad', desc: 'Cumplimos nuestros compromisos con determinación y acción planificada.' },
  { icon: 'users', titulo: 'Respeto', desc: 'Trabajamos en equipo con aprecio por la diversidad de las personas.' },
  { icon: 'shield', titulo: 'Ética', desc: 'Comportamiento reflexivo hacia un fin positivo para personas y el medioambiente.' },
  { icon: 'check', titulo: 'Profesionalismo', desc: 'Equipo asertivo y competente que brinda servicios educativos de excelencia.' },
];

const DIFERENCIADORES = [
  { icon: 'radar', titulo: 'Simuladores de Vuelo Avanzados', desc: 'Entrena en simuladores de vanguardia que replican condiciones del mundo real y sistemas de aeronaves.' },
  { icon: 'crew', titulo: 'Instructores Certificados', desc: 'Aprende de instructores con amplia experiencia en la industria aeronáutica nacional e internacional.' },
  { icon: 'plane', titulo: 'Doble Habilitación Aeronáutica', desc: 'Única escuela del país con habilitaciones BOEING 737 CL/NG y AVRO RJ 70/85/100 para tripulantes.' },
  { icon: 'clock', titulo: 'Horarios Flexibles', desc: 'Clases por la mañana y tarde que se adaptan a tu tiempo y preferencias personales.' },
  { icon: 'building', titulo: '4 Bases en Bolivia', desc: 'La escuela de aviación más grande del país: La Paz, Cochabamba, Tarija y Sucre.' },
  { icon: 'shield', titulo: 'Alianzas Estratégicas', desc: 'Única escuela con convenios con las tres líneas aéreas bolivianas para práctica real.' },
];

const NORMAS = [
  { icon: 'file', code: 'RAB 141', desc: 'Reglamentación Aeronáutica Boliviana para Centros de Instrucción de Aeronáutica Civil.' },
  { icon: 'landmark', code: 'DGAC', desc: 'Certificados y supervisados por la Dirección General de Aeronáutica Civil de Bolivia.' },
  { icon: 'globe', code: 'OACI', desc: 'Estructura de manuales alineada a los estándares de la Organización de Aviación Civil Internacional.' },
  { icon: 'chart', code: 'Sistema SGC', desc: 'Sistema de Gestión de Calidad con auditorías internas programadas y mejora continua.' },
  { icon: 'shield', code: 'Ley 2902', desc: 'Cumplimiento de la Ley de Aeronáutica Civil de Bolivia del 29 de octubre de 2004.' },
  { icon: 'check', code: 'RAB 142', desc: 'Instructores calificados bajo normativa RAB 142 con evaluaciones periódicas de desempeño.' },
];

export default function Home() {
  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="hero" id="inicio">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-plane">✈</div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="pulse-dot" /> Centro de Instrucción Aeronáutica Civil — RAB 141
            </div>
            <h1 className="hero-title">
              Forma tu carrera en el<br />
              <span className="highlight">mundo de la aviación</span>
            </h1>
            <p className="hero-desc">
              AVIOR Corporation SRL es la escuela líder en formación aeronáutica de Bolivia.
              Certificados por la DGAC, con sedes en La Paz, Cochabamba, Tarija y Sucre.
            </p>
            <div className="hero-actions">
              <Link to="/carreras" className="btn btn-primary">Ver Carreras</Link>
              <Link to="/login" className="btn btn-outline">
                <Icon name="graduation" size={17} /> Sistema Académico
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><span><Counter to={15} suffix="+" /></span><p>Años de experiencia</p></div>
              <div className="hero-stat"><span><Counter to={1200} suffix="+" /></span><p>Egresados</p></div>
              <div className="hero-stat"><span><Counter to={4} /></span><p>Sedes en Bolivia</p></div>
              <div className="hero-stat"><span><Counter to={3} /></span><p>Carreras certificadas</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NOSOTROS ================= */}
      <section className="section" id="nosotros">
        <div className="container">
          <SectionTitle pre="Sobre" span="AVIOR Corporation" />
          <div className="about-grid">
            <div className="about-text">
              <Reveal>
                <h3>Líderes en Formación Aeronáutica Boliviana</h3>
                <p>
                  AVIOR Corporation S.R.L. es una entidad educativa privada, legalmente establecida
                  y reconocida por el Estado Plurinacional de Bolivia, avalada por la Dirección General
                  de Aeronáutica Civil (DGAC) bajo la normativa RAB 141 y 142.
                </p>
                <p>
                  Nuestros programas de alta calidad académica forman profesionales de la aviación
                  comercial capaces de responder a las exigencias del mercado aeronáutico nacional
                  e internacional.
                </p>
              </Reveal>
              <div className="values-grid">
                {VALORES.map((v, i) => (
                  <Reveal key={v.titulo} delay={i * 70} className="value-item">
                    <div className="value-icon"><Icon name={v.icon} size={20} /></div>
                    <div>
                      <h4>{v.titulo}</h4>
                      <p>{v.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="about-cards">
              <Reveal delay={80} className="about-card-item accent">
                <div className="about-card-icon"><Icon name="award" size={22} /></div>
                <div>
                  <h4>Misión</h4>
                  <p>Comprometidos con la formación y desarrollo profesional de Pilotos y Personal Técnico Aeronáutico altamente calificados, trabajando de manera permanente para formar los mejores profesionales de la Aviación boliviana.</p>
                </div>
              </Reveal>
              <Reveal delay={160} className="about-card-item">
                <div className="about-card-icon"><Icon name="radar" size={22} /></div>
                <div>
                  <h4>Visión</h4>
                  <p>Ser líderes en el programa de formación de Pilotos y Personal Aeronáutico, buscando el primer lugar en aceptación en el medio de la Aviación por la calidad y practicidad de los programas.</p>
                </div>
              </Reveal>
              <Reveal delay={240} className="about-card-item">
                <div className="about-card-icon"><Icon name="shield" size={22} /></div>
                <div>
                  <h4>Certificación DGAC</h4>
                  <p>Operamos bajo estricto cumplimiento de la RAB 141 y 142, con programas de instrucción aprobados por la Autoridad Aeronáutica Civil de Bolivia.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CARRERAS ================= */}
      <section className="section section-alt" id="carreras">
        <div className="container">
          <SectionTitle
            pre="Nuestras"
            span="Carreras"
            subtitle="Programas de formación aeronáutica certificados por la DGAC, diseñados para el mercado laboral de la aviación comercial."
          />
          <div className="careers-grid">
            {CARRERAS.map((c, i) => (
              <Reveal key={c.slug} delay={i * 90} className="career-card">
                <div className="career-header">
                  <div className="career-icon"><Icon name={c.icono} size={26} /></div>
                  <div>
                    <h3>{c.nombre}</h3>
                    <span className="career-meta">{c.duracion} · {c.horas}</span>
                  </div>
                </div>
                <div className="career-body">
                  <p>{c.lead}</p>
                  <div className="career-phases">
                    {c.fases.map((f) => <span key={f.nombre} className="phase-tag">{f.nombre}</span>)}
                  </div>
                  <div className="career-details">
                    <div className="career-detail"><Icon name="clock" size={15} /> Duración: <strong>{c.duracion}</strong></div>
                    <div className="career-detail"><Icon name="plane" size={15} /> <strong>{c.horas}</strong></div>
                    <div className="career-detail"><Icon name="shield" size={15} /> Certificación DGAC Bolivia</div>
                    <div className="career-detail"><Icon name="pin" size={15} /> {c.sedes}</div>
                  </div>
                  <div className="career-footer">
                    <span className="badge">{c.codigo}</span>
                    <Link to={`/carreras#${c.slug}`} className="btn btn-outline btn-sm">Más información</Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Especializaciones */}
          <div className="sub-block" id="especializaciones">
            <SectionTitle
              pre="Cursos de"
              span="Especialización"
              subtitle="Capacitación continua para profesionales que buscan excelencia en la industria aeronáutica, conforme a la OACI."
            />
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

          {/* Diferenciadores */}
          <div className="sub-block">
            <SectionTitle pre="¿Por qué elegir" span="AVIOR?" />
            <div className="dif-grid">
              {DIFERENCIADORES.map((d, i) => (
                <Reveal key={d.titulo} delay={i * 60} className="dif-card">
                  <div className="dif-icon"><Icon name={d.icon} size={22} /></div>
                  <h4>{d.titulo}</h4>
                  <p>{d.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SEDES ================= */}
      <section className="section" id="sedes">
        <div className="container">
          <SectionTitle
            pre="Nuestras"
            span="Sedes"
            subtitle="La escuela de aviación más grande de Bolivia. Presentes en 4 ciudades para brindarte formación aeronáutica de calidad."
          />
          <div className="sedes-grid">
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

      {/* ================= CALIDAD ================= */}
      <section className="section section-alt" id="calidad">
        <div className="container">
          <SectionTitle pre="Política de" span="Calidad" />
          <div className="calidad-grid">
            <div className="calidad-text">
              <Reveal>
                <h3>Compromiso con la Excelencia Aeronáutica</h3>
                <p>
                  Nuestra política de calidad manifiesta el firme compromiso con los estudiantes
                  de satisfacer plenamente sus requerimientos y expectativas en la instrucción
                  aeronáutica, basada en principios fundamentales.
                </p>
                <ul className="calidad-list">
                  <li><strong>Integridad:</strong> Compromiso sincero y permanente de practicar una relación honesta y confiable.</li>
                  <li><strong>Responsabilidad:</strong> Trabajar con excelencia los asuntos encomendados, velando por la efectividad personal y de equipo.</li>
                  <li><strong>Agilidad y Seguridad:</strong> Actitud proactiva y acciones dinámicas preservando la seguridad de las operaciones.</li>
                </ul>
                <div className="objetivos">
                  <h4>Objetivos de Calidad</h4>
                  <ul className="calidad-list">
                    <li>Lograr que los estudiantes culminen la carrera escogida.</li>
                    <li>Incrementar el número de estudiantes inscritos.</li>
                    <li>Disminuir el índice de deserción de los estudiantes.</li>
                    <li>Incrementar el grado de satisfacción del cliente.</li>
                  </ul>
                </div>
              </Reveal>
            </div>
            <div className="norms-grid">
              {NORMAS.map((n, i) => (
                <Reveal key={n.code} delay={i * 60} className="norm-card">
                  <div className="norm-icon"><Icon name={n.icon} size={20} /></div>
                  <h4>{n.code}</h4>
                  <p>{n.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACTO ================= */}
      <section className="section cta-final" id="contacto">
        <div className="container">
          <SectionTitle
            pre="¿Listo para"
            span="volar?"
            subtitle="Contáctanos o visita una de nuestras sedes. Nuestro equipo está listo para orientarte en la carrera que deseas."
          />
          <Reveal className="cta-card">
            <div className="cta-info">
              <h3>Información de contacto</h3>
              <div className="cta-items">
                <div className="cta-item"><Icon name="pin" size={18} /><div><strong>Sede Central — La Paz</strong><p>Av. 6 de Agosto #2530 · +591 62530806</p></div></div>
                <div className="cta-item"><Icon name="mail" size={18} /><div><strong>Correo</strong><p>info@aviorcorporation.com.bo<br />admisiones@aviorcorporation.com.bo</p></div></div>
                <div className="cta-item"><Icon name="globe" size={18} /><div><strong>Sitio Web</strong><p>www.aviorcorporation.com.bo</p></div></div>
              </div>
              <Link to="/contacto" className="btn btn-primary">Enviar un mensaje</Link>
            </div>
            <div className="cta-side">
              <Icon name="plane" size={64} />
              <p>Convenios con las tres líneas aéreas bolivianas para práctica real en línea.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
