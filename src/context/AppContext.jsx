import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AVIOR_DATA, DATA_VERSION } from '../data/initialData.js';
import { getNextId } from '../utils/helpers.js';

/* ============================================================
   AVIOR — Contexto global: Datos (localStorage) + Sesión
   ============================================================ */

const DataContext = createContext(null);

const LS_DATA = 'avior_data';
const LS_VERSION = 'avior_data_version';
const SS_SESSION = 'avior_session';

/** Carga los datos frescos desde localStorage (o reinicia si cambió la versión) */
function loadDb() {
  try {
    const stored = localStorage.getItem(LS_DATA);
    const version = localStorage.getItem(LS_VERSION);
    if (!stored || version !== DATA_VERSION) {
      localStorage.setItem(LS_DATA, JSON.stringify(AVIOR_DATA));
      localStorage.setItem(LS_VERSION, DATA_VERSION);
      return structuredClone(AVIOR_DATA);
    }
    return JSON.parse(stored);
  } catch {
    return structuredClone(AVIOR_DATA);
  }
}

function loadSession() {
  try {
    const s = sessionStorage.getItem(SS_SESSION);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

export function DataProvider({ children }) {
  const [db, setDb] = useState(loadDb);
  const [session, setSession] = useState(loadSession);

  // Persistir cambios en localStorage
  useEffect(() => {
    localStorage.setItem(LS_DATA, JSON.stringify(db));
  }, [db]);

  /* ---- Mutaciones genéricas ---- */
  const mutate = (fn) => setDb((prev) => {
    const clone = structuredClone(prev);
    fn(clone);
    return clone;
  });

  const api = useMemo(() => ({
    /* Colecciones */
    add: (coleccion, item) => {
      const record = { ...item, id: getNextId(db[coleccion] || []) };
      mutate((d) => d[coleccion].push(record));
      return record;
    },
    update: (coleccion, id, patch) =>
      mutate((d) => {
        const idx = d[coleccion].findIndex((r) => r.id === id);
        if (idx >= 0) d[coleccion][idx] = { ...d[coleccion][idx], ...patch };
      }),
    remove: (coleccion, id) =>
      mutate((d) => {
        d[coleccion] = d[coleccion].filter((r) => r.id !== id);
      }),
    reset: () => {
      localStorage.removeItem(LS_DATA);
      localStorage.removeItem(LS_VERSION);
      setDb(loadDb());
    },

    /* Ayudas */
    usuarioPorId: (id) => db.usuarios.find((u) => u.id === id),
    cursoPorId: (id) => db.cursos.find((c) => c.id === id),
    nombreUsuario: (id) => db.usuarios.find((u) => u.id === id)?.nombre || '—',
    nombreCurso: (id) => db.cursos.find((c) => c.id === id)?.nombre || '—',

    /* Sesión */
    login: (email, password) => {
      const user = db.usuarios.find(
        (u) => u.email === email && u.password === password && u.estado === 'activo'
      );
      if (!user) return { ok: false, error: 'Credenciales incorrectas o cuenta inactiva.' };
      const s = {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        carnet: user.carnet,
        carrera: user.carrera || null,
        sede: user.sede || null,
        especialidad: user.especialidad || null,
        loginAt: new Date().toISOString(),
      };
      sessionStorage.setItem(SS_SESSION, JSON.stringify(s));
      setSession(s);
      return { ok: true, user: s };
    },
    logout: () => {
      sessionStorage.removeItem(SS_SESSION);
      setSession(null);
    },
  }), [db]);

  const value = useMemo(() => ({ db, session, ...api }), [db, session, api]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}

export function useAuth() {
  const { session, login, logout } = useContext(DataContext);
  return { session, login, logout };
}
