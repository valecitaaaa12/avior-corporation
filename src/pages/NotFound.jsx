import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section notfound">
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '6rem', color: 'var(--guindo)' }}>404</div>
        <h1 style={{ fontSize: '1.8rem', marginBottom: 10 }}>Página no encontrada</h1>
        <p style={{ color: 'var(--texto-muted)', marginBottom: 28 }}>
          La ruta que buscas no existe o fue movida.
        </p>
        <Link to="/" className="btn btn-primary">Volver al inicio</Link>
      </div>
    </section>
  );
}
