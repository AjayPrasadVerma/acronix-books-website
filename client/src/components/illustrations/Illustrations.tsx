import { cn } from '@/lib/utils';

/**
 * Brand-consistent, theme-aware finance/accounting/GST illustrations.
 * Pure inline SVG (no external assets — safe for static export + CSP).
 * They use the brand blue + teal accent and adapt to light/dark via
 * currentColor and CSS variables. All are decorative (aria-hidden).
 *
 * Palette handles: `text-brand-600 dark:text-brand-400` sets the primary
 * stroke/fill; the teal accent and paper surfaces are fixed for contrast.
 */

const BRAND = 'currentColor';
const ACCENT = '#14b8a6';
const INK = 'var(--fg-subtle)';

type Props = { className?: string };

function frame(className?: string) {
  return cn('text-brand-600 dark:text-brand-400', className);
}

/** GST tax invoice with ₹ line items + tax row. */
export function InvoiceIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 240 200" fill="none" className={frame(className)} aria-hidden="true">
      <rect x="34" y="18" width="150" height="176" rx="10" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="2" />
      <rect x="34" y="18" width="150" height="34" rx="10" fill={BRAND} opacity="0.12" />
      <text x="48" y="40" fontSize="12" fontWeight="700" fill={BRAND}>TAX INVOICE</text>
      <rect x="150" y="28" width="22" height="14" rx="3" fill={ACCENT} opacity="0.25" />
      <text x="153" y="38" fontSize="8" fontWeight="700" fill={ACCENT}>GST</text>
      {[70, 88, 106, 124].map((y, i) => (
        <g key={y}>
          <rect x="48" y={y} width={70 - i * 8} height="6" rx="3" fill={INK} opacity="0.5" />
          <rect x="140" y={y} width="30" height="6" rx="3" fill={BRAND} opacity="0.55" />
        </g>
      ))}
      <line x1="48" y1="146" x2="170" y2="146" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="48" y="164" fontSize="9" fill={INK}>CGST + SGST</text>
      <rect x="132" y="157" width="38" height="7" rx="3" fill={ACCENT} opacity="0.7" />
      <text x="48" y="182" fontSize="11" fontWeight="700" fill={BRAND}>₹ Total</text>
      <rect x="124" y="174" width="46" height="9" rx="3" fill={BRAND} />
      <circle cx="196" cy="150" r="20" fill={BRAND} opacity="0.1" />
      <text x="188" y="156" fontSize="18" fontWeight="800" fill={BRAND}>₹</text>
    </svg>
  );
}

/** Bar + trend chart on a report card. */
export function ReportsIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 240 200" fill="none" className={frame(className)} aria-hidden="true">
      <rect x="24" y="26" width="192" height="150" rx="12" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="2" />
      <line x1="48" y1="150" x2="196" y2="150" stroke="var(--border)" strokeWidth="1.5" />
      <line x1="48" y1="46" x2="48" y2="150" stroke="var(--border)" strokeWidth="1.5" />
      {[
        { x: 62, h: 40 },
        { x: 88, h: 66 },
        { x: 114, h: 52 },
        { x: 140, h: 84 },
        { x: 166, h: 72 },
      ].map((b) => (
        <rect key={b.x} x={b.x} y={150 - b.h} width="16" height={b.h} rx="3" fill={BRAND} opacity="0.75" />
      ))}
      <polyline
        points="70,110 96,86 122,96 148,64 174,74"
        fill="none"
        stroke={ACCENT}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        [70, 110],
        [96, 86],
        [122, 96],
        [148, 64],
        [174, 74],
      ].map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="3.5" fill={ACCENT} />
      ))}
    </svg>
  );
}

/** Ledger / balanced books (Dr / Cr). */
export function LedgerIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 240 200" fill="none" className={frame(className)} aria-hidden="true">
      <rect x="26" y="30" width="188" height="140" rx="12" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="2" />
      <line x1="120" y1="46" x2="120" y2="156" stroke="var(--border)" strokeWidth="1.5" />
      <text x="44" y="62" fontSize="11" fontWeight="700" fill="#ef4444">Dr</text>
      <text x="160" y="62" fontSize="11" fontWeight="700" fill="#10b981">Cr</text>
      {[78, 96, 114, 132].map((y) => (
        <g key={y}>
          <rect x="40" y={y} width="52" height="6" rx="3" fill={INK} opacity="0.45" />
          <rect x="140" y={y} width="52" height="6" rx="3" fill={INK} opacity="0.45" />
        </g>
      ))}
      <circle cx="120" cy="176" r="16" fill={ACCENT} opacity="0.15" />
      <path d="M112 176l6 6 10-12" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** GST return filing (document → cloud/portal). */
export function GstIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 240 200" fill="none" className={frame(className)} aria-hidden="true">
      <rect x="30" y="40" width="110" height="130" rx="10" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="2" />
      <rect x="30" y="40" width="110" height="28" rx="10" fill={BRAND} opacity="0.12" />
      <text x="44" y="59" fontSize="11" fontWeight="700" fill={BRAND}>GSTR-1</text>
      <text x="104" y="59" fontSize="11" fontWeight="700" fill={ACCENT}>3B</text>
      {[86, 104, 122, 140].map((y) => (
        <rect key={y} x="44" y={y} width={82 - (y % 3) * 6} height="6" rx="3" fill={INK} opacity="0.45" />
      ))}
      <path d="M150 96h40" stroke={BRAND} strokeWidth="3" strokeLinecap="round" strokeDasharray="2 6" />
      <path d="M182 88l10 8-10 8" stroke={BRAND} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M176 60c-14 0-24 10-24 22 0 3 .5 5 1.4 7A16 16 0 00156 120h44a18 18 0 003-35.7C201 70 190 60 176 60z"
        fill={BRAND}
        opacity="0.14"
        stroke={BRAND}
        strokeWidth="2"
      />
      <path d="M170 96l6 6 12-14" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Encryption shield with lock (security). */
export function SecurityIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 240 200" fill="none" className={frame(className)} aria-hidden="true">
      <path
        d="M120 26l64 24v40c0 44-28 74-64 86-36-12-64-42-64-86V50l64-24z"
        fill={BRAND}
        opacity="0.12"
        stroke={BRAND}
        strokeWidth="2.5"
      />
      <rect x="98" y="96" width="44" height="38" rx="6" fill={BRAND} opacity="0.85" />
      <path d="M106 96v-8a14 14 0 0128 0v8" stroke={BRAND} strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="120" cy="112" r="5" fill="var(--bg-elevated)" />
      <rect x="118" y="114" width="4" height="10" rx="2" fill="var(--bg-elevated)" />
      <text x="150" y="70" fontSize="9" fontWeight="700" fill={ACCENT}>AES-256</text>
    </svg>
  );
}

/** Offline-first / local device with sync. */
export function OfflineSyncIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 240 200" fill="none" className={frame(className)} aria-hidden="true">
      <rect x="40" y="52" width="120" height="86" rx="8" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="2" />
      <rect x="52" y="64" width="96" height="56" rx="4" fill={BRAND} opacity="0.1" />
      <rect x="76" y="138" width="48" height="8" rx="2" fill="var(--border)" />
      <rect x="64" y="146" width="72" height="6" rx="3" fill="var(--border)" />
      <circle cx="100" cy="92" r="18" fill={BRAND} opacity="0.16" />
      <text x="92" y="98" fontSize="16" fontWeight="800" fill={BRAND}>₹</text>
      <path d="M172 78a26 26 0 0126 26 22 22 0 01-4 44h-14" stroke={ACCENT} strokeWidth="2.5" fill="none" opacity="0.5" />
      <path d="M182 96a16 16 0 0116-16" stroke={ACCENT} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M196 120l8 8-8 8" stroke={BRAND} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
