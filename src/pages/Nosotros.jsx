import PageHero from '../components/PageHero.jsx';
import { Reveal, SectionTitle, Icon } from '../components/ui.jsx';

const VALORES = [
  { icon: 'award', titulo: 'Responsabilidad', desc: 'Cumplimos nuestros compromisos con determinación y acción planificada.' },
  { icon: 'users', titulo: 'Respeto', desc: 'Trabajamos en equipo con aprecio por la diversidad de las personas.' },
  { icon: 'shield', titulo: 'Ética', desc: 'Comportamiento reflexivo hacia un fin positivo para las personas y el medioambiente.' },
  { icon: 'check', titulo: 'Profesionalismo', desc: 'Equipo asertivo y competente que brinda servicios educativos de excelencia.' },
];

const HITOS = [
  { ano: '2010', texto: 'Fundación de AVIOR Corporation S.R.L. en La Paz con la primera cohorte de Tripulantes de Cabina.' },
  { ano: '2014', texto: 'Habilitación RAB 141 como Centro de Instrucción de Aeronáutica Civil por la DGAC.' },
  { ano: '2018', texto: 'Apertura de sedes satélite en Cochabamba, Tarija y Sucre. Doble habilitación BOEING 737 / AVRO RJ.' },
  { ano: '2026', texto: 'Más de 1,200 egresados operando en las principales líneas aéreas del continente.' },
];

const NORMAS = [
  { icon: 'file', code: 'RAB 141', desc: 'Centros de Instrucción de Aeronáutica Civil aprobados por la autoridad.' },
  { icon: 'landmark', code: 'DGAC', desc: 'Certificados y supervisados por la Dirección General de Aeronáutica Civil.' },
  { icon: 'globe', code: 'OACI', desc: 'Manuales y procedimientos alineados a estándares internacionales.' },
  { icon: 'chart', code: 'Sistema SGC', desc: 'Gestión de Calidad con auditorías internas y mejora continua.' },
  { icon: 'shield', code: 'Ley 2902', desc: 'Ley de Aeronáutica Civil de Bolivia del 29 de octubre de 2004.' },
  { icon: 'check', code: 'RAB 142', desc: 'Instructores calificados con evaluaciones periódicas de desempeño.' },
];

export default function Nosotros() {
  return (
    <main>
      <PageHero
        breadcrumb="Conócenos"
        title="Sobre"
        span="AVIOR"
        subtitle="Una entidad educativa legalmente establecida, avalada por la DGAC Bolivia, líder en formación aeronáutica."
      />

      <section className="section">
        <div className="container">
          <Reveal className="narrativa">
            <h3>Líderes en Formación Aeronáutica Boliviana</h3>
            <p>
              AVIOR Corporation S.R.L. es una entidad educativa privada, legalmente establecida y
              reconocida por el Estado Plurinacional de Bolivia, avalada por la Dirección General de
              Aeronáutica Civil (DGAC) bajo la normativa RAB 141 y 142. Con años de trayectoria,
              nuestros programas de alta calidad académica forman profesionales de la aviación
              comercial capaces de responder a las exigencias del mercado aeronáutico nacional e
              internacional.
            </p>
          </Reveal>

          <div className="mission-grid">
            <Reveal className="mission-card accent">
              <div className="about-card-icon"><Icon name="award" size={22} /></div>
              <h4>Misión</h4>
              <p>Comprometidos con la formación y desarrollo profesional de Pilotos y Personal Técnico Aeronáutico altamente calificados, trabajando de manera permanente para formar los mejores profesionales de la Aviación boliviana.</p>
            </Reveal>
            <Reveal delay={90} className="mission-card">
              <div className="about-card-icon"><Icon name="radar" size={22} /></div>
              <h4>Visión</h4>
              <p>Ser líderes en el programa de formación de Pilotos y Personal Aeronáutico, buscando el primer lugar en aceptación en el medio de la Aviación por la calidad y practicidad de los programas.</p>
            </Reveal>
          </div>

          <div className="sub-block">
            <SectionTitle pre="Nuestros" span="Valores" />
            <div className="values-grid wide">
              {VALORES.map((v, i) => (
                <Reveal key={v.titulo} delay={i * 70} className="value-item">
                  <div className="value-icon"><Icon name={v.icon} size={20} /></div>
                  <div><h4>{v.titulo}</h4><p>{v.desc}</p></div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="sub-block">
            <SectionTitle pre="Nuestra" span="Trayectoria" />
            <div className="timeline">
              {HITOS.map((h, i) => (
                <Reveal key={h.ano} delay={i * 80} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-card">
                    <span className="timeline-ano">{h.ano}</span>
                    <p>{h.texto}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="sub-block">
            <SectionTitle pre="Política de" span="Calidad" />
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
    </main>
  );
}
