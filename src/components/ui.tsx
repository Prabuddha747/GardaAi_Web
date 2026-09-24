import React from 'react';
import { TornPaperEdge, TearVariant } from './TornPaperEdge';

export const C = {
  paper: '#F3EEE2',
  navy: '#071C24',
  teal: '#087F8C',
  tealDark: '#06323C',
  orange: '#FF6500',
  ink: '#101820',
};

/** Hand-drawn orange marker underline. */
export const Squiggle: React.FC<{ className?: string; color?: string; w?: number }> = ({
  className = '',
  color = C.orange,
  w = 160,
}) => (
  <svg
    className={`pointer-events-none ${className}`}
    width={w}
    height="10"
    viewBox="0 0 160 10"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      d="M2 6 C25 2 45 8 70 5 S115 3 158 5"
      fill="none"
      stroke={color}
      strokeWidth="3.2"
      strokeLinecap="round"
    />
  </svg>
);

/** Hand-drawn arrow, points right. */
export const Arrow: React.FC<{ className?: string; color?: string }> = ({ className = '', color = C.orange }) => (
  <svg className={className} width="46" height="22" viewBox="0 0 46 22" fill="none" aria-hidden="true">
    <path d="M2 13 C14 7 26 15 42 10 M34 4 L43 10 L33 17" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Handwritten marginalia with optional marker underline. */
export const Note: React.FC<{
  children: React.ReactNode;
  rot?: number;
  line?: boolean;
  color?: string;
  className?: string;
}> = ({ children, rot = -6, line = true, color = '#3b3a37', className = '' }) => (
  <div
    className={`font-handwritten leading-[1.15] inline-block ${className}`}
    style={{ transform: `rotate(${rot}deg)`, color }}
  >
    {children}
    {line && <Squiggle className="block mt-0.5" w={90} />}
  </div>
);

export const ChapterLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`mono-label text-[11px] text-[#3b3a37] ${className}`}>{children}</div>
);

/** Documentary photo scrap. `scale` zooms into a crop of a shared source image. */
export const Photo: React.FC<{
  src: string;
  pos?: string;
  scale?: number;
  gray?: boolean;
  rot?: number;
  className?: string;
  alt?: string;
  children?: React.ReactNode;
}> = ({ src, pos = 'center', scale = 1, gray, rot = 0, className = '', alt = '', children }) => (
  <div
    className={`relative overflow-hidden bg-[#d9d2c1] shadow-[0_3px_10px_rgba(35,25,15,0.25)] ${className}`}
    style={{ transform: rot ? `rotate(${rot}deg)` : undefined }}
  >
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`w-full h-full object-cover ${gray ? 'ink-photo' : ''}`}
      style={{ objectPosition: pos, transform: `scale(${scale})`, transformOrigin: pos }}
    />
    {children}
  </div>
);

/**
 * A physical sheet: own background, paper grain (unless dark) and a torn bottom
 * edge in its own colour that overlaps the sheet below.
 */
export const Sheet: React.FC<{
  bg: string;
  z: number;
  tear?: TearVariant;
  grain?: boolean;
  className?: string;
  children: React.ReactNode;
}> = ({ bg, z, tear, grain = true, className = '', children }) => (
  <section
    className={`relative ${grain ? 'paper-section' : ''} ${className}`}
    style={{ background: bg, zIndex: z }}
  >
    <div className="paper-content">{children}</div>
    {tear && <TornPaperEdge fill={grain ? '#ECE6D7' : bg} variant={tear} height={48} />}
  </section>
);

export const Wrap: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 ${className}`}>{children}</div>
);

/** Counts 0 → n when scrolled into view. `to` like "5,000+" keeps its suffix/commas. */
export const Count: React.FC<{ to: string }> = ({ to }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const target = parseInt(to.replace(/\D/g, ''), 10);
  const suffix = to.replace(/[\d,]/g, '');
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 2800);
        setN(Math.round(target * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref}>{n.toLocaleString('en-US')}{suffix}</span>;
};

/** One observer: fades/slides up headings, paragraphs, quotes etc. as they scroll in. */
export const useScrollReveal = (dep: unknown) => {
  React.useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('main :is(h2, p, blockquote, dt, dd, .reveal):not(.home-page *)');
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('sr-in'); io.unobserve(e.target); }
    }), { threshold: 0.15 });
    els.forEach((el) => { el.classList.add('sr'); io.observe(el); });
    return () => io.disconnect();
  }, [dep]);
};

/** Types lines out one character at a time (hero headings). Full text is laid out invisibly so nothing shifts. */
export const Typed: React.FC<{ lines: { t: string; c?: string }[]; speed?: number }> = ({ lines, speed = 95 }) => {
  const total = lines.reduce((a, l) => a + l.t.length, 0);
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setN(total);
    setN(0);
    const id = setInterval(() => setN((k) => (k >= total ? (clearInterval(id), k) : k + 1)), speed);
    return () => clearInterval(id);
  }, [total, speed]);
  let left = n;
  return (
    <>
      {lines.map((l, i) => {
        const shown = Math.max(0, Math.min(l.t.length, left));
        left -= l.t.length;
        const active = n < total && shown < l.t.length && (i === 0 || left + l.t.length > 0);
        return (
          <React.Fragment key={i}>
            <span className={l.c}>
              {l.t.slice(0, shown)}
              {active && shown > 0 && <span className="typing-caret" />}
              <span className="opacity-0">{l.t.slice(shown)}</span>
            </span>
            {i < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </>
  );
};
