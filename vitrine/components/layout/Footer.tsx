import Link from "next/link";

const LINKS_SOLUTIONS = [
  { href: "/fraicheur-ehpad", label: "Plan Fraîcheur EHPAD" },
  { href: "/collectivites", label: "Collectivités & mairies" },
  { href: "/particuliers", label: "Particuliers" },
  { href: "/eligibilite", label: "Tester son éligibilité" },
];

const LINKS_METHODE = [
  { href: "/methode", label: "Notre méthode" },
  { href: "/conformite", label: "Conformité & agréments" },
  { href: "/a-propos", label: "Qui sommes-nous" },
  { href: "/contact", label: "Contact" },
];

const LINKS_LEGAL = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "CGV / Rétractation" },
  { href: "/politique-confidentialite", label: "Politique de confidentialité" },
];

export default function Footer() {
  return (
    <footer className="bg-[#070A14] border-t border-white/8 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: "linear-gradient(135deg,#1A4DFF,#00C48C)" }}>
                ⚡
              </span>
              <span className="font-display font-extrabold text-base text-white">PSGLOBAL-ENERGY</span>
            </div>
            <p className="text-sm text-white/50 font-body leading-relaxed mb-4">
              Régie commerciale spécialisée en énergies renouvelables. Île-de-France et zone CEMAC.
            </p>
            <div className="flex flex-col gap-1.5 text-xs text-white/40 font-body">
              <span>SASU — Immatriculation N°1727182</span>
              <a href="mailto:contact@psglobal.energy" className="hover:text-white/70 transition-colors">
                contact@psglobal.energy
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-body font-semibold text-white/80 text-xs uppercase tracking-widest mb-4">Solutions</h3>
            <ul className="flex flex-col gap-2.5">
              {LINKS_SOLUTIONS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors font-body">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Méthode */}
          <div>
            <h3 className="font-body font-semibold text-white/80 text-xs uppercase tracking-widest mb-4">Méthode</h3>
            <ul className="flex flex-col gap-2.5">
              {LINKS_METHODE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors font-body">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / contact rapide */}
          <div>
            <h3 className="font-body font-semibold text-white/80 text-xs uppercase tracking-widest mb-4">Audit gratuit</h3>
            <p className="text-sm text-white/50 font-body mb-4">
              Recevez une analyse de vos droits aux aides en 48 h.
            </p>
            <Link href="/eligibilite" className="btn-green text-sm px-4 py-2.5 w-full justify-center">
              Démarrer →
            </Link>
          </div>
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-white/30 font-body">
            © {new Date().getFullYear()} PSGLOBAL Energy — psglobal.energy
          </p>
          <div className="flex flex-wrap gap-4">
            {LINKS_LEGAL.map((l) => (
              <Link key={l.href} href={l.href} className="text-xs text-white/30 hover:text-white/60 transition-colors font-body">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
