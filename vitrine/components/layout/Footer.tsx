import Link from "next/link";

const LINKS_LEGAL = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "CGV / Rétractation" },
  { href: "/politique-confidentialite", label: "Politique de confidentialité" },
];

export default function Footer() {
  return (
    <footer className="bg-midnight-950 text-slate-400 py-12 border-t border-midnight-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Colonne brand — lg:col-span-2 */}
        <div className="lg:col-span-2">
          <span className="font-extrabold text-white text-base block mb-3">PSGLOBAL-ENERGY</span>
          <p className="leading-relaxed max-w-sm">
            Cabinet indépendant d&apos;assistance à maîtrise d&apos;ouvrage (AMO). Nous structurons la
            résilience climatique de l&apos;immobilier institutionnel et de santé, sans jamais manier les
            fonds publics destinés aux travaux.
          </p>
          <div className="mt-4 flex flex-col gap-1 text-xs text-slate-500">
            <span>SAS — Immatriculation N°1727182</span>
            <a href="mailto:contact@psglobal.energy" className="hover:text-white transition-colors">
              contact@psglobal.energy
            </a>
          </div>
        </div>

        {/* Colonne bureaux */}
        <div>
          <span className="font-bold text-white mb-3 block">Bureaux</span>
          <address className="not-italic leading-relaxed">
            Pontault-Combault<br />
            Seine-et-Marne (77)<br />
            Île-de-France, France
          </address>
        </div>

        {/* Colonne légal & contact */}
        <div>
          <span className="font-bold text-white mb-3 block">Légal &amp; contact</span>
          <ul className="space-y-2">
            {LINKS_LEGAL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-midnight-800 flex flex-col md:flex-row justify-between items-center text-xs gap-2">
        <p>&copy; 2026 PSG — Provider Services Groupe, SAS. Tous droits réservés.</p>
        <p className="text-center md:text-right">
          Déclaration d&apos;accessibilité RGAA — conformité en cours d&apos;audit (dernière
          revue&nbsp;: juillet 2026). Contrastes AA et navigation clavier vérifiés sur cette page.
        </p>
      </div>
    </footer>
  );
}
