import { useEffect, useRef, useState } from 'react';

/** Logo institucional (SVG inline — nunca se rompe) */
export function Logo({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <rect width="100" height="100" rx="22" fill="#0A0A0A" />
      <rect x="3" y="3" width="94" height="94" rx="19" fill="none" stroke="#8B0000" strokeWidth="2" />
      <path d="M50 16 L79 80 L50 63 L21 80 Z" fill="#8B0000" />
      <path d="M50 16 L79 80 L50 63 Z" fill="#C41E1E" />
    </svg>
  );
}

/** Sección revelada al hacer scroll (IntersectionObserver) */
export function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/** Encabezado de sección con título, subtítulo y divisores */
export function SectionTitle({ pre, span, post, subtitle, light = false }) {
  return (
    <Reveal className={`section-head ${light ? 'light' : ''}`}>
      <span className="section-kicker">— AVIOR Corporation —</span>
      <h2 className="section-title">
        {pre} <span>{span}</span>{post}
      </h2>
      <div className="divider" />
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </Reveal>
  );
}

/** Iconos SVG ligeros con temática aeronáutica */
export function Icon({ name, size = 22 }) {
  const paths = {
    plane: 'M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z',
    crew: 'M12 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm-7 17v-1c0-2.7 3.1-4 7-4s7 1.3 7 4v1H5z',
    radar: 'M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2zm0 4a6 6 0 1 1-6 6h2a4 4 0 1 0 4-4V6zm0 4a2 2 0 1 0 2 2h-2v-2z',
    building: 'M4 21V5l8-3 8 3v16h-6v-5h-4v5H4zm4-13h2v2H8V8zm4 0h2v2h-2V8zm-4 4h2v2H8v-2zm4 0h2v2h-2v-2z',
    landmark: 'M12 2 2 7v2h20V7L12 2zM4 10v8H2v2h20v-2h-2v-8h-3v8h-3v-8h-2v8H7v-8H4z',
    phone: 'M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .6 3.6 1 1 0 0 1-.25 1l-2.25 2.2z',
    mail: 'M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z',
    clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 11h-5v-2h3V6h2v7z',
    pin: 'M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z',
    globe: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm7.9 9h-3a15.6 15.6 0 0 0-1.2-5.5A8 8 0 0 1 19.9 11zM12 4c.9 1.2 1.9 3.5 2.1 7h-4.2C10.1 7.5 11.1 5.2 12 4zM4.1 13h3a15.6 15.6 0 0 0 1.2 5.5A8 8 0 0 1 4.1 13zm3-2h-3a8 8 0 0 1 4.2-5.5A15.6 15.6 0 0 0 7.1 11zm4.9 9c-.9-1.2-1.9-3.5-2.1-7h4.2c-.2 3.5-1.2 5.8-2.1 7zm3.3-1.5a15.6 15.6 0 0 0 1.2-5.5h3a8 8 0 0 1-4.2 5.5z',
    shield: 'M12 1 3 5v6c0 5.6 3.8 10.7 9 12 5.2-1.3 9-6.4 9-12V5l-9-4zm-1.2 15-3.5-3.5 1.4-1.4 2.1 2.1 5-5 1.4 1.4-6.4 6.4z',
    award: 'M12 2a6 6 0 0 0-3 11.2V22l3-2 3 2v-8.8A6 6 0 0 0 12 2zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8z',
    book: 'M18 2H7a3 3 0 0 0-3 3v14a3 3 0 0 1 3-3h11V2zm2 4H9a3 3 0 0 0-3 3v10a3 3 0 0 1 3-3h11V6z',
    users: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 9v-1c0-2.7 3.1-4 7-4s7 1.3 7 4v1H2zm14-5.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm3 5.5v-1c0-1.5-.6-2.8-1.6-3.7a8.9 8.9 0 0 1 2.6 3.2v1.5h-1z',
    chart: 'M4 20V10h3v10H4zm6.5 0V4h3v16h-3zM17 20v-7h3v7h-3z',
    bell: 'M12 22a2.2 2.2 0 0 0 2.2-2.2H9.8A2.2 2.2 0 0 0 12 22zm7-6v-5a7 7 0 0 0-5-6.7V3a2 2 0 0 0-4 0v1.3A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2z',
    check: 'M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z',
    close: 'M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z',
    menu: 'M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z',
    graduation: 'M12 3 1 9l11 6 9-4.9V17h2V9L12 3zM5 13.2V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.8-7-3.8z',
    logout: 'M17 7v-1a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1h-2v1H5V7h12zm3-4h-2v2h2v14h-2v2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z',
    refresh: 'M17.65 6.35A8 8 0 1 0 19.73 14h-2.08a6 6 0 1 1-1.41-5.66L13 11h7V4l-2.35 2.35z',
    send: 'M2 21 23 12 2 3v7l15 2-15 2v7z',
    clipboard: 'M19 3h-4.2A2.8 2.8 0 0 0 12 1a2.8 2.8 0 0 0-2.8 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-7-1a.8.8 0 1 1 0 1.6A.8.8 0 0 1 12 2zm5 17H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V9h10v2z',
    file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z',
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d={paths[name] || paths.plane} />
    </svg>
  );
}
