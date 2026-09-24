import React, { useMemo } from 'react';

export type TearVariant = 1 | 2 | 3 | 4 | 5 | 6;

interface TornPaperEdgeProps {
  position?: 'top' | 'bottom';
  fill: string;
  variant?: TearVariant;
  className?: string;
  shadow?: boolean;
  height?: number;
}

/** Seeded PRNG so every variant is a stable, non-repeating jagged tear. */
const rng = (seed: number) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

/** Sharp irregular ridge line across 1440 units: jitter + slow drift + occasional deep rips. */
const tearPath = (variant: number) => {
  const r = rng(variant * 7919 + 13);
  const amp = 4 + variant * 0.7;
  let d = 'M0,0 L1440,0 ';
  let x = 1440;
  let drift = 24;
  while (x > 0) {
    drift += (r() - 0.5) * 4;
    drift = Math.min(30, Math.max(16, drift));
    const rip = r() < 0.07 ? 6 + r() * 8 : 0;
    const y = Math.min(42, Math.max(8, drift + (r() - 0.5) * 2 * amp + rip));
    d += `L${x.toFixed(1)},${y.toFixed(1)} `;
    x -= 4 + r() * 16;
  }
  return d + 'L0,24 Z';
};

export const TornPaperEdge: React.FC<TornPaperEdgeProps> = ({
  position = 'bottom',
  fill,
  variant = 1,
  className = '',
  shadow = true,
  height = 72,
}) => {
  const isBottom = position === 'bottom';
  const pathData = useMemo(() => tearPath(variant), [variant]);
  const under = useMemo(() => tearPath(variant + 11), [variant]);
  const id = `${position}-${variant}`;

  return (
    <div
      className={`absolute left-0 right-0 w-full pointer-events-none select-none z-[60] ${className}`}
      style={{
        ...(isBottom ? { top: 'calc(100% - 2px)' } : { bottom: 'calc(100% - 2px)' }),
        height: `${height}px`,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-full block overflow-visible">
        <defs>
          <filter id={`blur-${id}`} x="-5%" y="-50%" width="110%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
          <filter id={`shadow-${id}`} x="-5%" y="-20%" width="110%" height="160%">
            <feDropShadow dx="0" dy={shadow ? 4 : 0} stdDeviation={shadow ? 3 : 0} floodColor="#2a1c0e" floodOpacity={0.3} />
          </filter>
          {/* rough, fibrous edge */}
          <filter id={`fray-${id}`} x="-2%" y="-30%" width="104%" height="170%">
            <feTurbulence type="fractalNoise" baseFrequency="0.05 0.35" numOctaves="3" seed={variant * 5} result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <g transform={isBottom ? undefined : 'translate(0 72) scale(1 -1)'}>
          {/* cast shadow on the sheet below */}
          <path d={pathData} fill="#1a0f05" opacity="0.4" transform="translate(0 10)" filter={`url(#blur-${id})`} />
          {/* darker underside: a second, differently-torn layer peeking out */}
          <path d={under} fill="#c9bc9f" transform="translate(0 6)" filter={`url(#fray-${id})`} />
          {/* pale torn-fibre margin */}
          <path d={pathData} fill="#f8f3e6" transform="translate(0 3)" filter={`url(#fray-${id})`} />
          <path d={pathData} fill={fill} filter={`url(#fray-${id})`} />
        </g>
      </svg>
    </div>
  );
};
