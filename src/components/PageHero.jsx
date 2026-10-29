import { Link } from 'react-router-dom';

export default function PageHero({ breadcrumb, title, span, subtitle }) {
  return (
    <section className="page-hero">
      <div className="page-hero-glow" />
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Inicio</Link> <span className="sep">›</span> <span>{breadcrumb}</span>
        </div>
        <h1>
          {title} <span>{span}</span>
        </h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}
