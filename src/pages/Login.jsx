import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AppContext.jsx';
import { Logo, Icon } from '../components/ui.jsx';

const DEMOS = {
  admin: ['admin@avior.edu.bo', 'admin123', 'Administrador'],
  instructor: ['cmamani@avior.edu.bo', 'inst123', 'Instructor'],
  estudiante: ['acondori@avior.edu.bo', 'est123', 'Estudiante'],
};

export default function Login() {
  const { session, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState('admin');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (session) navigate('/dashboard', { replace: true });
  }, [session, navigate]);

  const setDemo = (rol) => {
    setTab(rol);
    setEmail(DEMOS[rol][0]);
    setPass(DEMOS[rol][1]);
    setError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');
    // Simula una breve latencia de red para una experiencia realista
    setTimeout(() => {
      const res = login(email, pass);
      setCargando(false);
      if (res.ok) navigate('/dashboard', { replace: true });
      else setError(res.error);
    }, 450);
  };

  return (
    <div className="login-page">
      <div className="login-bg" />
      <div className="login-card">
        <Link to="/" className="login-back-top">← Volver al sitio institucional</Link>

        <div className="login-logo">
          <Logo size={64} />
          <h1>AVIOR</h1>
          <p>Centro de Instrucción Aeronáutica Civil</p>
        </div>

        <div className="login-tabs">
          {Object.keys(DEMOS).map((rol) => (
            <button
              key={rol}
              type="button"
              className={`login-tab ${tab === rol ? 'active' : ''}`}
              onClick={() => setDemo(rol)}
            >
              {DEMOS[rol][2]}
            </button>
          ))}
        </div>

        <form className="login-form" onSubmit={onSubmit}>
          {error && <div className="alert alert-bad"><Icon name="close" size={15} /> {error}</div>}

          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              placeholder="usuario@avior.edu.bo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={cargando}>
            {cargando ? 'Ingresando…' : (<><Icon name="graduation" size={16} /> Ingresar al Sistema</>)}
          </button>
        </form>

        <div className="demo-box">
          <strong>Cuentas de demostración</strong>
          <code>admin@avior.edu.bo / admin123</code>
          <code>cmamani@avior.edu.bo / inst123</code>
          <code>acondori@avior.edu.bo / est123</code>
        </div>
      </div>
    </div>
  );
}
