// Bande de symboles SVG originaux — charte PSGLOBAL Energy
// Couleurs migrées vers palette midnight/emerald : #059669 · #047857 · #64748b

interface Symbole {
  svg: React.ReactNode;
  label: string;
}

const SYMBOLES_COMMUNS: Symbole[] = [
  {
    label: "Résidents protégés",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M16 3L4 8v8c0 7 5.5 12.5 12 14 6.5-1.5 12-7 12-14V8L16 3z"
          fill="rgba(0,196,140,0.15)"
          stroke="#059669"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M11 16l3 3 7-7"
          stroke="#059669"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Gains mesurés",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="13" y="6" width="6" height="14" rx="3" fill="rgba(245,160,0,0.15)" stroke="#64748b" strokeWidth="1.5" />
        <circle cx="16" cy="23" r="4" fill="rgba(245,160,0,0.15)" stroke="#64748b" strokeWidth="1.5" />
        <line x1="9" y1="12" x2="12" y2="12" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="9" y1="16" x2="12" y2="16" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Rafraîchissement passif",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="14" r="5" fill="rgba(26,77,255,0.12)" stroke="#047857" strokeWidth="1.5" />
        <path d="M16 5V3M16 25v-2M5 14H3M29 14h-2" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8.5 7.5L7 6M25 22l-1.5-1.5M23.5 7.5L25 6M9 22l1.5-1.5" stroke="#047857" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M10 19 Q16 28 22 19" stroke="#047857" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6" />
      </svg>
    ),
  },
  {
    label: "0 € avancé",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="11" fill="rgba(0,196,140,0.12)" stroke="#059669" strokeWidth="1.5" />
        <text
          x="16" y="21"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="#059669"
          fontFamily="system-ui, sans-serif"
        >
          0€
        </text>
      </svg>
    ),
  },
];

const SYMBOLE_ECOLES: Symbole = {
  label: "Avant printemps 2027",
  svg: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {/* Cartable */}
      <rect x="8" y="12" width="16" height="12" rx="2" fill="rgba(245,160,0,0.12)" stroke="#64748b" strokeWidth="1.5" />
      <path d="M12 12V10a4 4 0 0 1 8 0v2" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
      {/* Calendrier curseur */}
      <rect x="20" y="4" width="9" height="9" rx="1.5" fill="rgba(26,77,255,0.12)" stroke="#047857" strokeWidth="1.2" />
      <line x1="22" y1="4" x2="22" y2="6.5" stroke="#047857" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="27" y1="4" x2="27" y2="6.5" stroke="#047857" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="21" y1="8" x2="28" y2="8" stroke="#047857" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  ),
};

interface Props {
  variante?: "ehpad" | "collectivites" | "accueil";
}

export default function SymbolesBande({ variante = "accueil" }: Props) {
  const symboles =
    variante === "collectivites"
      ? [...SYMBOLES_COMMUNS, SYMBOLE_ECOLES]
      : SYMBOLES_COMMUNS;

  return (
    <div className="py-8 bg-midnight-900 border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-5 sm:gap-x-12">
          {symboles.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2 min-w-[72px]">
              <div className="w-12 h-12 flex items-center justify-center">
                {s.svg}
              </div>
              <span className="text-[11px] text-white/50 font-body text-center leading-tight max-w-[80px]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
