/* ============================================================
   AVIOR Corporation SRL — Datos semilla del Sistema Académico
   ============================================================ */

export const DATA_VERSION = '5';

export const SEDES = [
  {
    id: 'lp',
    ciudad: 'La Paz',
    tipo: 'Base Central',
    icono: 'building',
    direccion: 'Av. 6 de Agosto, entre Pedro Salazar y Lisímaco Gutiérrez #2530',
    ref: '(Frente al Banco Mutual La Primera)',
    tel: '+591 62530806',
    horario: 'Lun–Vie: 08:30–12:30 / 14:30–18:30',
    carreras: 'TCP · Piloto Civil · EOV',
    codigo: 'LPB',
  },
  {
    id: 'cbb',
    ciudad: 'Cochabamba',
    tipo: 'Sede Satélite',
    icono: 'landmark',
    direccion: 'Av. Segunda, esquina Marina Núñez del Prado',
    ref: '(A 3 cuadras del Mercado 10 de Febrero)',
    tel: '+591 77218909',
    horario: 'Lun–Vie: 08:30–17:10',
    carreras: 'TCP · Piloto Civil · EOV',
    codigo: 'CBB',
  },
  {
    id: 'tja',
    ciudad: 'Tarija',
    tipo: 'Sede Satélite',
    icono: 'landmark',
    direccion: 'Calle Ramón Rojas, entre Ingavi y Madrid #573',
    ref: '(Cerca Plaza Uriondo)',
    tel: '+591 75145330',
    horario: 'Lun–Vie: 08:30–12:30 / 14:30–18:30',
    carreras: 'TCP · Piloto Civil · EOV',
    codigo: 'TJA',
  },
  {
    id: 'sre',
    ciudad: 'Sucre',
    tipo: 'Sede Satélite',
    icono: 'landmark',
    direccion: 'Calle J. Pérez, entre La Paz y Azurduy #342',
    ref: '(Frente al Supermercado SAS)',
    tel: '+591 69322199',
    horario: 'Lun–Vie: 08:30–12:30 / 14:30–18:30',
    carreras: 'TCP · EOV',
    codigo: 'SRE',
  },
];

export const CARRERAS = [
  {
    slug: 'piloto-civil',
    codigo: 'PC',
    nombre: 'Piloto Civil Comercial',
    icono: 'plane',
    duracion: '30 meses',
    horas: '200 horas de vuelo reales',
    sedes: 'LPB · CBB · TJA · SRE',
    lead: 'Domina los cielos con nuestra formación integral de vuelo. Conviértete en piloto comercial certificado con 200 horas de vuelo real.',
    desc: 'El programa de Piloto Civil está diseñado para formar pilotos altamente capacitados, con dominio técnico y operativo bajo los estándares internacionales de la OACI y la normativa RAB 141 de Bolivia.',
    fases: [
      { n: '01', nombre: 'Piloto Privado (PPL)', desc: 'Fundamentos de vuelo, meteorología, navegación básica y reglamentos aeronáuticos.' },
      { n: '02', nombre: 'Piloto Comercial (CPL)', desc: 'Técnicas avanzadas de vuelo, operaciones en aeropuertos controlados y procedimientos IFR.' },
      { n: '03', nombre: 'Habilitación IFR', desc: 'Vuelo instrumental, navegación por instrumentos y procedimientos de aproximación.' },
      { n: '04', nombre: 'Habilitación Multimotor', desc: 'Operación de aeronaves multimotor y procedimientos de emergencia con motor.' },
    ],
    stats: [
      { valor: '30', label: 'meses' },
      { valor: '200', label: 'hrs vuelo' },
      { valor: '4', label: 'fases' },
    ],
  },
  {
    slug: 'tcp',
    codigo: 'TCP',
    nombre: 'Tripulante de Cabina de Pasajeros',
    icono: 'crew',
    duracion: '12 meses',
    horas: '598 horas académicas',
    sedes: 'LPB · CBB · TJA · SRE',
    lead: 'Garantiza la seguridad y el servicio a bordo con excelencia. Única escuela con doble habilitación aeronáutica en Bolivia.',
    desc: 'Programa intensivo que forma profesionales en atención al pasajero, seguridad aeronáutica, manejo de emergencias y protocolos de servicio a bordo de aeronaves comerciales.',
    fases: [
      { n: '737', nombre: 'Habilitación BOEING 737 CL/NG', desc: 'Única escuela en Bolivia con habilitación oficial para la flota Boeing 737.' },
      { n: 'RJ', nombre: 'Habilitación AVRO RJ 70/85/100', desc: 'Certificación para la operación en aeronaves AVRO de las líneas aéreas bolivianas.' },
      { n: 'SEA', nombre: 'Práctica de Ditching', desc: 'Entrenamiento real en piscina para procedimientos de evacuación acuática.' },
      { n: 'FIRE', nombre: 'Combate al Fuego', desc: 'Manejo de extintores y procedimientos de evacuación de emergencia a bordo.' },
    ],
    stats: [
      { valor: '12', label: 'meses' },
      { valor: '598', label: 'hrs académicas' },
      { valor: '2', label: 'habilitaciones' },
    ],
  },
  {
    slug: 'eov',
    codigo: 'EOV',
    nombre: 'Despachador de Vuelo',
    icono: 'radar',
    duracion: '9 meses',
    horas: '350 horas académicas',
    sedes: 'LPB · CBB · TJA · SRE',
    lead: 'Coordina y planifica operaciones aéreas exitosas. Profesional clave en la aviación comercial boliviana.',
    desc: 'Formación completa en planificación de vuelo, operaciones aeroportuarias, despacho de aeronaves y coordinación de operaciones en tierra y aire, con práctica real en línea aérea.',
    fases: [
      { n: '06', nombre: 'Formación Teórica (6 meses)', desc: 'Meteorología, navegación, legislación aeronáutica, planificación de vuelo y operaciones.' },
      { n: '03', nombre: 'Práctica en Línea Aérea (3 meses)', desc: 'Pasantía real en las líneas aéreas convenidas con AVIOR Corporation.' },
      { n: 'SIM', nombre: 'Simulador de Vuelo', desc: 'Uso de simuladores avanzados para ejercicios de planificación y coordinación.' },
    ],
    stats: [
      { valor: '9', label: 'meses' },
      { valor: '350', label: 'hrs académicas' },
      { valor: '3', label: 'meses práctica' },
    ],
  },
];

export const ESPECIALIZACIONES = [
  {
    codigo: 'TDE',
    nombre: 'Técnicas de Enseñanza (TDE)',
    desc: 'Dirigido a profesionales que desean adquirir o perfeccionar habilidades pedagógicas para la instrucción en el ámbito aeronáutico. Aprende métodos efectivos de enseñanza, comunicación y evaluación aplicados a entornos técnicos y operativos.',
  },
  {
    codigo: 'SMS',
    nombre: 'Sistema de Gestión de la Seguridad Operacional (SMS)',
    desc: 'Conocimientos y herramientas para implementar, mantener y mejorar un sistema de seguridad en organizaciones aeronáuticas: gestión proactiva de riesgos, identificación de peligros y toma de decisiones basada en datos, conforme a la OACI.',
  },
];

export const AVIOR_DATA = {
  usuarios: [
    { id: 1, nombre: 'Admin Principal', email: 'admin@avior.edu.bo', password: 'admin123', rol: 'admin', estado: 'activo', carnet: 'ADM-001' },
    { id: 2, nombre: 'Carlos Mamani', email: 'cmamani@avior.edu.bo', password: 'inst123', rol: 'instructor', estado: 'activo', carnet: 'INS-001', especialidad: 'Piloto Civil' },
    { id: 3, nombre: 'Lucía Quispe', email: 'lquispe@avior.edu.bo', password: 'inst123', rol: 'instructor', estado: 'activo', carnet: 'INS-002', especialidad: 'TCP' },
    { id: 4, nombre: 'Roberto Flores', email: 'rflores@avior.edu.bo', password: 'inst123', rol: 'instructor', estado: 'activo', carnet: 'INS-003', especialidad: 'Despachador de Vuelo' },
    { id: 5, nombre: 'Ana Condori', email: 'acondori@avior.edu.bo', password: 'est123', rol: 'estudiante', estado: 'activo', carnet: 'EST-001', carrera: 'TCP', sede: 'La Paz' },
    { id: 6, nombre: 'Juan Morales', email: 'jmorales@avior.edu.bo', password: 'est123', rol: 'estudiante', estado: 'activo', carnet: 'EST-002', carrera: 'Piloto Civil', sede: 'Tarija' },
    { id: 7, nombre: 'María Torrez', email: 'mtorrez@avior.edu.bo', password: 'est123', rol: 'estudiante', estado: 'activo', carnet: 'EST-003', carrera: 'TCP', sede: 'La Paz' },
    { id: 8, nombre: 'Diego Alvarez', email: 'dalvarez@avior.edu.bo', password: 'est123', rol: 'estudiante', estado: 'activo', carnet: 'EST-004', carrera: 'EOV', sede: 'Sucre' },
    { id: 9, nombre: 'Sofia Gutiérrez', email: 'sgutierrez@avior.edu.bo', password: 'est123', rol: 'estudiante', estado: 'inactivo', carnet: 'EST-005', carrera: 'Piloto Civil', sede: 'La Paz' },
  ],

  cursos: [
    { id: 1, codigo: 'TCP-101', nombre: 'Servicio a Bordo', carrera: 'TCP', instructor_id: 3, creditos: 4, duracion: '3 meses', estado: 'activo', descripcion: 'Fundamentos del servicio al pasajero en cabina' },
    { id: 2, codigo: 'TCP-102', nombre: 'Seguridad Aeronáutica', carrera: 'TCP', instructor_id: 3, creditos: 5, duracion: '2 meses', estado: 'activo', descripcion: 'Procedimientos de seguridad y emergencia' },
    { id: 3, codigo: 'PC-101', nombre: 'Meteorología Aeronáutica', carrera: 'PC', instructor_id: 2, creditos: 6, duracion: '4 meses', estado: 'activo', descripcion: 'Fenómenos meteorológicos aplicados a la aviación' },
    { id: 4, codigo: 'PC-102', nombre: 'Navegación Aérea', carrera: 'PC', instructor_id: 2, creditos: 6, duracion: '4 meses', estado: 'activo', descripcion: 'Técnicas de navegación y planificación de vuelo' },
    { id: 5, codigo: 'EOV-101', nombre: 'Operaciones Aeroportuarias', carrera: 'EOV', instructor_id: 4, creditos: 5, duracion: '3 meses', estado: 'activo', descripcion: 'Gestión y coordinación de operaciones en tierra' },
    { id: 6, codigo: 'EOV-102', nombre: 'Planificación de Vuelo', carrera: 'EOV', instructor_id: 4, creditos: 5, duracion: '3 meses', estado: 'inactivo', descripcion: 'Elaboración de planes de vuelo y documentación' },
  ],

  inscripciones: [
    { id: 1, estudiante_id: 5, curso_id: 1, fecha: '2025-03-01', periodo: '2025-I', estado: 'activo' },
    { id: 2, estudiante_id: 5, curso_id: 2, fecha: '2025-03-01', periodo: '2025-I', estado: 'activo' },
    { id: 3, estudiante_id: 6, curso_id: 3, fecha: '2025-03-01', periodo: '2025-I', estado: 'activo' },
    { id: 4, estudiante_id: 6, curso_id: 4, fecha: '2025-03-01', periodo: '2025-I', estado: 'activo' },
    { id: 5, estudiante_id: 7, curso_id: 1, fecha: '2025-03-01', periodo: '2025-I', estado: 'activo' },
    { id: 6, estudiante_id: 7, curso_id: 2, fecha: '2025-03-01', periodo: '2025-I', estado: 'activo' },
    { id: 7, estudiante_id: 8, curso_id: 5, fecha: '2025-03-01', periodo: '2025-I', estado: 'activo' },
  ],

  notas: [
    { id: 1, estudiante_id: 5, curso_id: 1, parcial1: 75, parcial2: 82, final: 78, promedio: 78.3, estado: 'aprobado' },
    { id: 2, estudiante_id: 5, curso_id: 2, parcial1: 90, parcial2: 88, final: 92, promedio: 90.0, estado: 'aprobado' },
    { id: 3, estudiante_id: 6, curso_id: 3, parcial1: 60, parcial2: 55, final: 58, promedio: 57.7, estado: 'aprobado' },
    { id: 4, estudiante_id: 6, curso_id: 4, parcial1: 85, parcial2: 80, final: 88, promedio: 84.3, estado: 'aprobado' },
    { id: 5, estudiante_id: 7, curso_id: 1, parcial1: 70, parcial2: 75, final: 72, promedio: 72.3, estado: 'aprobado' },
    { id: 6, estudiante_id: 7, curso_id: 2, parcial1: 55, parcial2: 60, final: 50, promedio: 55.0, estado: 'aprobado' },
    { id: 7, estudiante_id: 8, curso_id: 5, parcial1: 88, parcial2: 91, final: 90, promedio: 89.7, estado: 'aprobado' },
  ],

  tareas: [
    { id: 1, curso_id: 1, titulo: 'Tarea 1 — Protocolos de Servicio', tipo: 'tarea', descripcion: 'Elabora un resumen de los protocolos de servicio a bordo vistos en clase. Mínimo 2 páginas.', fecha_limite: '2026-07-15', puntos: 100, creado_por: 3, fecha_creacion: '2026-06-01' },
    { id: 2, curso_id: 1, titulo: 'Examen Parcial 1 — Servicio a Bordo', tipo: 'examen', descripcion: 'Examen sobre los temas de la primera unidad. Incluye preguntas de selección múltiple y desarrollo.', fecha_limite: '2026-07-20', puntos: 100, creado_por: 3, fecha_creacion: '2026-06-05' },
    { id: 3, curso_id: 3, titulo: 'Práctica — Carta de Navegación', tipo: 'practica', descripcion: 'Completa la carta de navegación con los datos proporcionados en clase.', fecha_limite: '2026-07-10', puntos: 50, creado_por: 2, fecha_creacion: '2026-06-03' },
    { id: 4, curso_id: 5, titulo: 'Proyecto — Plan de Vuelo Completo', tipo: 'proyecto', descripcion: 'Elabora un plan de vuelo completo para la ruta LPB-VVI incluyendo toda la documentación requerida.', fecha_limite: '2026-08-01', puntos: 150, creado_por: 4, fecha_creacion: '2026-06-10' },
  ],

  entregas: [
    { id: 1, tarea_id: 1, estudiante_id: 5, comentario: 'Adjunto mi resumen sobre los protocolos de servicio.', archivo: 'tarea1_acondori.pdf', fecha_entrega: '2026-07-12', estado: 'revisado', nota: 88, feedback: 'Excelente trabajo, buena síntesis.' },
    { id: 2, tarea_id: 3, estudiante_id: 6, comentario: 'Completé la carta de navegación según las indicaciones.', archivo: 'practica_carta_jmorales.pdf', fecha_entrega: '2026-07-09', estado: 'pendiente', nota: null, feedback: null },
  ],

  anuncios: [
    { id: 1, titulo: 'Inicio del nuevo período académico 2026-II', tipo: 'academico', contenido: 'Se informa a todos los estudiantes que el período 2026-II comenzará el 4 de agosto. Las inscripciones estarán abiertas hasta el 28 de julio.', autor: 'Administración AVIOR', fecha: '15/06/2026' },
    { id: 2, titulo: 'Mantenimiento de simuladores de vuelo', tipo: 'info', contenido: 'Los simuladores de vuelo estarán en mantenimiento los días 20 y 21 de junio. Las clases prácticas de esos días serán reprogramadas.', autor: 'Gerencia Académica', fecha: '16/06/2026' },
  ],

  registros_asistencia: [
    { id: 1, curso_id: 1, fecha: '2026-06-02', sesion: 'Clase 1 — Introducción', creado_por: 3, detalle: [
      { estudiante_id: 5, estado: 'presente', hora_llegada: '08:30', nota: '' },
      { estudiante_id: 7, estado: 'tardanza', hora_llegada: '09:10', nota: 'Llegó 40 min tarde' },
    ] },
    { id: 2, curso_id: 1, fecha: '2026-06-04', sesion: 'Clase 2 — Protocolos', creado_por: 3, detalle: [
      { estudiante_id: 5, estado: 'presente', hora_llegada: '08:30', nota: '' },
      { estudiante_id: 7, estado: 'ausente', hora_llegada: '', nota: 'Sin justificación' },
    ] },
    { id: 3, curso_id: 3, fecha: '2026-06-03', sesion: 'Clase 1 — Meteorología Básica', creado_por: 2, detalle: [
      { estudiante_id: 6, estado: 'presente', hora_llegada: '08:30', nota: '' },
    ] },
  ],

  solicitudes_licencia: [
    { id: 1, estudiante_id: 5, curso_id: 1, fecha_inicio: '2026-06-10', fecha_fin: '2026-06-10', motivo: 'Cita médica', documento: 'certificado_medico.pdf', estado: 'aprobado', revisado_por: 3, fecha_solicitud: '2026-06-08' },
    { id: 2, estudiante_id: 6, curso_id: 3, fecha_inicio: '2026-06-15', fecha_fin: '2026-06-16', motivo: 'Viaje familiar urgente', documento: '', estado: 'pendiente', revisado_por: null, fecha_solicitud: '2026-06-12' },
  ],

  asistencia: [
    { id: 1, estudiante_id: 5, curso_id: 1, total_clases: 20, asistidas: 18, porcentaje: 90 },
    { id: 2, estudiante_id: 5, curso_id: 2, total_clases: 15, asistidas: 15, porcentaje: 100 },
    { id: 3, estudiante_id: 6, curso_id: 3, total_clases: 22, asistidas: 14, porcentaje: 64 },
    { id: 4, estudiante_id: 6, curso_id: 4, total_clases: 22, asistidas: 20, porcentaje: 91 },
    { id: 5, estudiante_id: 7, curso_id: 1, total_clases: 20, asistidas: 16, porcentaje: 80 },
    { id: 6, estudiante_id: 7, curso_id: 2, total_clases: 15, asistidas: 10, porcentaje: 67 },
    { id: 7, estudiante_id: 8, curso_id: 5, total_clases: 18, asistidas: 18, porcentaje: 100 },
  ],
};
