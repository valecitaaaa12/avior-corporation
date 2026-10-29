/* ============================================================
   AVIOR — Utilidades generales
   ============================================================ */

/** Iniciales de un nombre ("Ana Condori" -> "AC") */
export function initials(nombre = '') {
  return nombre
    .split(' ')
    .map((p) => p[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

/** Siguiente id dentro de una colección */
export function getNextId(arr = []) {
  return arr.length ? Math.max(...arr.map((i) => i.id)) + 1 : 1;
}

/** Clase CSS para estados (activo/inactivo/pendiente/aprobado/reprobado) */
export function statusClass(estado) {
  const map = {
    activo: 'ok',
    aprobado: 'ok',
    revisado: 'ok',
    presente: 'ok',
    inactivo: 'bad',
    reprobado: 'bad',
    rechazado: 'bad',
    ausente: 'bad',
    pendiente: 'warn',
    tardanza: 'warn',
  };
  return map[estado] || '';
}

/** Color de acento según porcentaje de asistencia */
export function asistenciaColor(pct) {
  if (pct >= 75) return 'var(--verde-ok)';
  if (pct >= 60) return 'var(--ambar)';
  return 'var(--rojo-bad)';
}

/** Fecha actual en formato YYYY-MM-DD */
export function today() {
  return new Date().toISOString().split('T')[0];
}

/** Formato corto de fecha DD/MM/YYYY */
export function fechaCorta(iso = '') {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return d && m && y ? `${d}/${m}/${y}` : iso;
}

/** Etiqueta legible de rol */
export function rolLabel(rol) {
  const m = { admin: 'Administrador', instructor: 'Instructor', estudiante: 'Estudiante' };
  return m[rol] || rol;
}

/** Calcula promedio de 3 notas */
export function calcPromedio(p1, p2, fin) {
  const n = [p1, p2, fin].map(Number);
  if (n.some(isNaN)) return null;
  return Number(((n[0] + n[1] + n[2]) / 3).toFixed(1));
}
