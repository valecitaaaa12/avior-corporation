/* ============================================================
   AVIOR — Componentes compartidos del Sistema Académico
   ============================================================ */
import { Icon } from '../../components/ui.jsx';
import { statusClass } from '../../utils/helpers.js';

/** Tarjeta de estadística */
export function StatCard({ icon, label, value, change }) {
  const tone = change ? (change.includes('↑') ? 'up' : 'down') : '';
  return (
    <div className="stat-card">
      <div className="stat-card-icon"><Icon name={icon} size={20} /></div>
      <div className="stat-card-body">
        <div className="stat-card-value">{value}</div>
        <div className="stat-card-label">{label}</div>
      </div>
      {change && <div className={`stat-card-change ${tone}`}>{change}</div>}
    </div>
  );
}

/** Insignia de estado */
export function StatusBadge({ estado }) {
  return <span className={`status ${statusClass(estado)}`}>{estado || '—'}</span>;
}

/** Barra de asistencia */
export function BarAsis({ pct }) {
  const color = pct >= 75 ? 'var(--verde-ok)' : pct >= 60 ? 'var(--ambar)' : 'var(--rojo-bad)';
  return (
    <div className="bar-asist">
      <strong style={{ color }}>{pct}%</strong>
      <div className="asistencia-bar"><div className="asistencia-fill" style={{ width: `${pct}%`, background: color }} /></div>
    </div>
  );
}

/** Sección de datos (tarjeta con cabecera) */
export function Section({ title, actions, children, className = '' }) {
  return (
    <div className={`data-section ${className}`}>
      <div className="data-section-header">
        <h3>{title}</h3>
        {actions && <div className="data-controls">{actions}</div>}
      </div>
      {children}
    </div>
  );
}

/** Modal reutilizable */
export function Modal({ open, title, onClose, children, footer, wide = false }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal ${wide ? 'wide' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar"><Icon name="close" size={18} /></button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

/** Campo de formulario */
export function Field({ label, children }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      {children}
    </div>
  );
}

/** Botón de acción de tabla */
export function ActionBtn({ icon, title, tone = '', onClick }) {
  return (
    <button className={`action-btn ${tone}`} title={title} onClick={onClick}>
      <Icon name={icon} size={15} />
    </button>
  );
}

/** Tabla con scroll horizontal */
export function Table({ head, children }) {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead><tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

/** Vacío amigable */
export function Empty({ children }) {
  return <div className="empty-state">{children}</div>;
}
