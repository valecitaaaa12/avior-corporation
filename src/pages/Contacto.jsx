import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import { Reveal, Icon } from '../components/ui.jsx';
import { SEDES } from '../data/initialData.js';

const CARRERAS_SELECT = [
  'Tripulante de Cabina (TCP)',
  'Piloto Civil Comercial',
  'Especialista en Operaciones de Vuelo (EOV)',
  'Técnicas de Enseñanza (TDE)',
  'Sistema de Gestión de la Seguridad Operacional (SMS)',
];

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({
    nombre: '', telefono: '', email: '', carrera: '', sede: '', mensaje: '',
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // Demo institucional: se guarda el mensaje en localStorage
    const msgs = JSON.parse(localStorage.getItem('avior_mensajes') || '[]');
    msgs.push({ ...form, fecha: new Date().toISOString() });
    localStorage.setItem('avior_mensajes', JSON.stringify(msgs));
    setEnviado(true);
    setForm({ nombre: '', telefono: '', email: '', carrera: '', sede: '', mensaje: '' });
    setTimeout(() => setEnviado(false), 6000);
  };

  return (
    <main>
      <PageHero
        breadcrumb="Contacto"
        title="¿Listo para"
        span="volar?"
        subtitle="Contáctanos y un asesor te orientará en la carrera que deseas. Sin compromiso."
      />

      <section className="section">
        <div className="container contacto-page-grid">
          {/* Información */}
          <Reveal className="contacto-info-col">
            <h3 className="col-title">Información de contacto</h3>
            <div className="contacto-items">
              {SEDES.map((s) => (
                <div key={s.id} className="contacto-item">
                  <div className="contacto-icon"><Icon name={s.icono} size={20} /></div>
                  <div>
                    <h4>{s.ciudad} {s.tipo === 'Base Central' && <span className="chip chip-guindo">Central</span>}</h4>
                    <p>
                      {s.direccion}<br />
                      <small>{s.ref}</small><br />
                      <a href={`tel:${s.tel.replace(/\s/g, '')}`} className="link-guindo">{s.tel}</a><br />
                      {s.horario}
                    </p>
                  </div>
                </div>
              ))}
              <div className="contacto-item">
                <div className="contacto-icon"><Icon name="mail" size={20} /></div>
                <div>
                  <h4>Correo</h4>
                  <p>info@aviorcorporation.com.bo<br />admisiones@aviorcorporation.com.bo</p>
                </div>
              </div>
              <div className="contacto-item">
                <div className="contacto-icon"><Icon name="globe" size={20} /></div>
                <div>
                  <h4>Sitio Web</h4>
                  <p><a href="https://www.aviorcorporation.com.bo" target="_blank" rel="noreferrer" className="link-guindo">www.aviorcorporation.com.bo</a></p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Formulario */}
          <Reveal delay={90} className="contact-form">
            <h3>Solicitar información</h3>
            {enviado && (
              <div className="alert alert-ok">
                <Icon name="check" size={16} /> ¡Solicitud enviada! Un asesor de AVIOR te contactará pronto.
              </div>
            )}
            <form onSubmit={onSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre completo *</label>
                  <input name="nombre" type="text" placeholder="Tu nombre" value={form.nombre} onChange={onChange} required />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input name="telefono" type="tel" placeholder="+591 XXXXXXXX" value={form.telefono} onChange={onChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Correo electrónico *</label>
                <input name="email" type="email" placeholder="tu@email.com" value={form.email} onChange={onChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Carrera de interés</label>
                  <select name="carrera" value={form.carrera} onChange={onChange}>
                    <option value="">Seleccionar carrera...</option>
                    {CARRERAS_SELECT.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Sede</label>
                  <select name="sede" value={form.sede} onChange={onChange}>
                    <option value="">Seleccionar sede...</option>
                    {SEDES.map((s) => <option key={s.id}>{s.ciudad}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Mensaje (opcional)</label>
                <textarea name="mensaje" rows={4} placeholder="¿Tienes alguna pregunta específica?" value={form.mensaje} onChange={onChange} />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                <Icon name="send" size={16} /> Enviar solicitud
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
