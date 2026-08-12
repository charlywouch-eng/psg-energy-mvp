import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DeontoBanner from "@/components/ui/DeontoBanner";

export const metadata: Metadata = {
  title: "PSGLOBAL-ENERGY — Cabinet AMO | Confort d'été EHPAD & Collectivités Île-de-France",
  description:
    "Cabinet d'assistance à maîtrise d'ouvrage (AMO) indépendant. Montage des dossiers Fonds vert, CEE tertiaire et fonds qualité pour le confort d'été des EHPAD et collectivités d'Île-de-France.",
};

const SOLUTIONS = [
  {
    titre: "Plan Fraîcheur EHPAD",
    desc: "Rafraîchissement passif, ventilation et protection solaire. Dossiers CEE et fonds qualité montés et coordonnés.",
    href: "/fraicheur-ehpad",
    badge: "EHPAD · ESMS",
  },
  {
    titre: "Collectivités & mairies",
    desc: "Écoles, mairies, gymnases en Île-de-France — Fonds vert, ACTEE, EduRénov — montage de A à Z.",
    href: "/collectivites",
    badge: "77 · 91 · 93 · 94",
  },
  {
    titre: "Particuliers",
    desc: "CEE, Éco-PTZ — diagnostic des guichets mobilisables pour propriétaires particuliers d'Île-de-France.",
    href: "/particuliers",
    badge: "Île-de-France",
  },
];

const ETAPES = [
  { n: "01", titre: "Diagnostic d'éligibilité", desc: "Analyse du bâti et des guichets mobilisables pour votre profil." },
  { n: "02", titre: "Montage multi-guichets", desc: "Constitution des dossiers Fonds vert, CEE et fonds qualité." },
  { n: "03", titre: "Coordination RGE", desc: "Sélection et suivi des entreprises qualifiées, sans lien capitalistique." },
  { n: "04", titre: "Réception & justificatifs", desc: "Transmission des pièces aux organismes instructeurs, mise en service garantie avant l'été." },
];

export default function HomePage() {
  return (
    <>
      <DeontoBanner />
      <Navbar />

      <main id="contenu">

        {/* HERO */}
        <section className="bg-slate-50 border-b border-slate-200 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-start">

              {/* Colonne gauche */}
              <div className="max-w-xl">
                <p className="mono text-[11px] font-semibold text-brand-emeraldDeep uppercase tracking-widest mb-4">
                  Confort d&apos;été · EHPAD &amp; collectivités · Île-de-France
                </p>
                <h1 className="display text-4xl sm:text-5xl font-bold text-midnight-900 leading-[1.12] mb-6">
                  Planifiez le confort d&apos;été de vos bâtiments avec une{" "}
                  <span className="text-brand-emeraldDeep">ingénierie financière sécurisée.</span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium">
                  Nous accompagnons les directions d&apos;EHPAD et les collectivités locales d&apos;Île-de-France.
                  Du diagnostic jusqu&apos;à la mise en service, nous montons vos dossiers de financement
                  et coordonnons les entreprises RGE — sans jamais nous substituer à vous.
                </p>

                {/* Stats sourcées */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-200 mb-6">
                  <div>
                    <div className="display text-3xl font-bold text-midnight-900">60,7&nbsp;%</div>
                    <div className="text-[11px] text-slate-500 leading-snug mt-1">
                      des EHPAD franciliens en inconfort thermique, été 2022{" "}
                      <sup className="text-brand-emeraldDeep">1</sup>
                    </div>
                  </div>
                  <div>
                    <div className="display text-3xl font-bold text-midnight-900">28,8&nbsp;j</div>
                    <div className="text-[11px] text-slate-500 leading-snug mt-1">
                      d&apos;inconfort estival moyen par établissement{" "}
                      <sup className="text-brand-emeraldDeep">1</sup>
                    </div>
                  </div>
                  <div>
                    <div className="display text-3xl font-bold text-brand-emeraldDeep">116</div>
                    <div className="text-[11px] text-slate-500 leading-snug mt-1">
                      EHPAD identifiés en Seine-et-Marne{" "}
                      <sup className="text-brand-emeraldDeep">2</sup>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mb-8">
                  1. Rapport du Sénat, situation des EHPAD (2023). 2. Base FINESS, analyse PSGLOBAL-ENERGY (2026).
                </p>

                {/* Points d'accroche */}
                <div className="grid sm:grid-cols-2 gap-6 border-t border-slate-200 pt-8">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-brand-emeraldDeep shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm">
                      <span className="font-bold text-midnight-900 block">Conseil indépendant</span>
                      <span className="text-slate-600">Non lié à un fabricant. Rémunération transparente, négociée directement avec vous.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-brand-emeraldDeep shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <div className="text-sm">
                      <span className="font-bold text-midnight-900 block">Montage CEE &amp; Fonds vert</span>
                      <span className="text-slate-600">Montage conforme aux fiches BAT-TH-113 et BAT-TH-116.</span>
                    </div>
                  </div>
                </div>

                {/* Éthos BDF */}
                <div className="mt-8 flex items-center gap-3 text-xs text-slate-500 border-t border-slate-200 pt-6">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Notre méthode s&apos;inscrit dans la démarche Bâtiments Durables Franciliens et s&apos;appuie
                  sur le programme RACINE et la Charte de la rénovation du bâti scolaire (Cerema&nbsp;/&nbsp;CSTB).
                </div>

                {/* Plaquette PDF */}
                <a
                  href="/PSGLOBAL-ENERGY_Plaquette.pdf"
                  download
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-midnight-900 border-2 border-midnight-900 px-5 py-2.5 hover:bg-midnight-900 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H8a2 2 0 01-2-2V5a2 2 0 012-2h6l6 6v11a2 2 0 01-2 2z" />
                  </svg>
                  Télécharger notre plaquette institutionnelle (PDF)
                </a>
              </div>

              {/* Colonne droite — Appel à action diagnostic */}
              <div className="bg-white border border-slate-200 shadow-2xl relative" id="simulateur">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-midnight-900" aria-hidden="true"></div>
                <div className="p-8">
                  <p className="mono text-[11px] font-bold text-brand-emeraldDeep uppercase tracking-widest mb-4">
                    Diagnostic d&apos;éligibilité
                  </p>
                  <h2 className="display text-2xl font-bold text-midnight-900 mb-3">
                    Identifiez vos guichets de financement en 2 minutes
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-8">
                    Notre simulateur adapte les questions à votre profil — EHPAD, collectivité ou bâtiment tertiaire — et identifie les fiches CEE et dispositifs publics mobilisables pour votre projet.
                  </p>

                  <ul className="space-y-3 mb-8 text-sm">
                    {[
                      { label: "EHPAD / ESMS", sub: "CEE BAT-TH-113/116 · Fonds qualité EHPAD / PAI CNSA" },
                      { label: "Collectivité / Mairie", sub: "Fonds vert · ACTEE · EduRénov" },
                      { label: "Bâtiment tertiaire", sub: "CEE tertiaire · audit énergétique" },
                    ].map((item) => (
                      <li key={item.label} className="flex items-start gap-3">
                        <svg className="w-4 h-4 text-brand-emeraldDeep shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <span className="font-bold text-midnight-900">{item.label}</span>
                          <span className="text-slate-500 ml-2 text-xs">{item.sub}</span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/eligibilite"
                    className="w-full bg-midnight-900 hover:bg-midnight-800 text-white font-bold text-sm py-4 transition-colors flex justify-center items-center gap-2"
                  >
                    Démarrer le diagnostic
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>

                  <p className="mt-5 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium text-center">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Sans engagement — réponse de nos experts sous 48 h ouvrées.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* NOS SOLUTIONS */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="display text-3xl font-bold text-midnight-900 mb-10">Nos solutions</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {SOLUTIONS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="p-8 bg-slate-50 border border-slate-200 hover:border-brand-emeraldDeep hover:shadow-md transition-all flex flex-col"
                >
                  <div className="text-xs font-bold text-brand-emeraldDeep mb-4 uppercase tracking-wider mono">
                    {s.badge}
                  </div>
                  <h3 className="font-bold text-midnight-900 text-lg mb-2">{s.titre}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CAS TYPE */}
        <section id="cas-type" className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mono text-[11px] font-bold text-brand-emeraldDeep uppercase tracking-widest mb-2">
              Exemple illustratif — non contractuel
            </div>
            <h2 className="display text-3xl font-bold text-midnight-900 mb-8">
              À quoi ressemble un dossier type
            </h2>
            <div className="bg-white border border-slate-200 shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-wrap gap-2">
                <span className="mono text-xs text-slate-400">Réf. EHPAD-77-014</span>
                <span className="text-[11px] bg-slate-200 text-slate-700 font-bold px-2.5 py-1">
                  Cas type — profil représentatif
                </span>
              </div>
              <dl className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                <div className="p-6">
                  <dt className="text-xs text-slate-500 uppercase tracking-wide mb-1">Établissement</dt>
                  <dd className="font-bold text-midnight-900">EHPAD associatif, 82 lits</dd>
                </div>
                <div className="p-6">
                  <dt className="text-xs text-slate-500 uppercase tracking-wide mb-1">Guichets mobilisés</dt>
                  <dd className="font-bold text-midnight-900">CEE BAT-TH-113 + Fonds qualité</dd>
                </div>
                <div className="p-6">
                  <dt className="text-xs text-slate-500 uppercase tracking-wide mb-1">Surface traitée</dt>
                  <dd className="font-bold text-midnight-900">≈ 1 100 m²</dd>
                </div>
                <div className="p-6">
                  <dt className="text-xs text-slate-500 uppercase tracking-wide mb-1">Délai de montage</dt>
                  <dd className="font-bold text-midnight-900">4 à 6 mois</dd>
                </div>
              </dl>
            </div>
            <p className="text-xs text-slate-400 mt-4 max-w-2xl">
              Ce profil est un exemple type construit à partir de notre analyse du parc EHPAD francilien
              — il n&apos;engage pas de résultat individuel et ne représente pas un client existant.
            </p>
          </div>
        </section>

        {/* FRISE RÉGLEMENTAIRE */}
        <section aria-label="Calendrier réglementaire" className="py-14 bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="mono text-[11px] font-bold text-brand-emeraldDeep uppercase tracking-widest mb-10 text-center">
              Calendrier — mise en service garantie avant l&apos;été
            </h2>
            <ol className="relative flex flex-col sm:flex-row justify-between gap-8 sm:gap-4">
              <div className="hidden sm:block absolute top-3 left-0 right-0 h-0.5 bg-slate-200" aria-hidden="true"></div>
              <li className="relative flex-1 text-center">
                <div className="w-6 h-6 rounded-full bg-midnight-900 border-4 border-white shadow mx-auto mb-3 relative z-10"></div>
                <div className="font-bold text-midnight-900 text-sm">Aujourd&apos;hui</div>
                <div className="text-xs text-slate-500">Diagnostic d&apos;éligibilité</div>
              </li>
              <li className="relative flex-1 text-center">
                <div className="w-6 h-6 rounded-full bg-slate-300 border-4 border-white shadow mx-auto mb-3 relative z-10"></div>
                <div className="font-bold text-midnight-900 text-sm">Automne 2026</div>
                <div className="text-xs text-slate-500">Dépôt des dossiers de financement</div>
              </li>
              <li className="relative flex-1 text-center">
                <div className="w-6 h-6 rounded-full bg-slate-300 border-4 border-white shadow mx-auto mb-3 relative z-10"></div>
                <div className="font-bold text-midnight-900 text-sm">Hiver 2026 – 2027</div>
                <div className="text-xs text-slate-500">Instruction &amp; coordination RGE</div>
              </li>
              <li className="relative flex-1 text-center">
                <div className="w-6 h-6 rounded-full bg-brand-emeraldDeep border-4 border-white shadow mx-auto mb-3 relative z-10"></div>
                <div className="font-bold text-brand-emeraldDeep text-sm">Avant le 15 juin 2027</div>
                <div className="text-xs text-slate-500">Mise en service garantie</div>
              </li>
            </ol>
          </div>
        </section>

        {/* NOTRE MÉTHODE */}
        <section id="methode" className="py-20 bg-midnight-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="display text-3xl font-bold mb-12">Notre méthode</h2>
            <ol className="grid md:grid-cols-4 gap-8">
              {ETAPES.map((e) => (
                <li key={e.n} className="border-t-2 border-emerald-500 pt-4">
                  <span className="mono text-emerald-400 text-xs">{e.n}</span>
                  <h3 className="font-bold mt-2 mb-1.5">{e.titre}</h3>
                  <p className="text-sm text-slate-400">{e.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FINANCEMENTS */}
        <section id="financements" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="display text-3xl font-bold text-midnight-900 mb-4">
                L&apos;ingénierie qui démêle le complexe
              </h2>
              <p className="text-slate-600">
                Nous sécurisons juridiquement et financièrement chaque volet de votre projet
                de rafraîchissement, sans que vous ayez à naviguer dans les méandres réglementaires.
              </p>
            </div>

            {/* Diagramme radial SVG zones d'intervention */}
            <div className="bg-slate-50 border border-slate-200 p-6 max-w-xs mx-auto mb-12">
              <svg viewBox="0 0 220 200" className="w-full h-auto" role="img" aria-labelledby="zoneTitle">
                <title id="zoneTitle">Zone d&apos;intervention PSGLOBAL-ENERGY en Île-de-France</title>
                <line x1="110" y1="100" x2="60" y2="50" stroke="#cbd5e1" strokeWidth="2"/>
                <line x1="110" y1="100" x2="160" y2="50" stroke="#cbd5e1" strokeWidth="2"/>
                <line x1="110" y1="100" x2="60" y2="150" stroke="#cbd5e1" strokeWidth="2"/>
                <line x1="110" y1="100" x2="160" y2="150" stroke="#cbd5e1" strokeWidth="2"/>
                <circle cx="110" cy="100" r="22" fill="#0f172a"/>
                <text x="110" y="104" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700" fontFamily="Inter, sans-serif">PSG</text>
                <g fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill="#0f172a">
                  <circle cx="60" cy="50" r="16" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5"/>
                  <text x="60" y="54" textAnchor="middle">77</text>
                  <circle cx="160" cy="50" r="16" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5"/>
                  <text x="160" y="54" textAnchor="middle">91</text>
                  <circle cx="60" cy="150" r="16" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5"/>
                  <text x="60" y="154" textAnchor="middle">93</text>
                  <circle cx="160" cy="150" r="16" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5"/>
                  <text x="160" y="154" textAnchor="middle">94</text>
                </g>
              </svg>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed text-center">
                Zone d&apos;intervention&nbsp;: Seine-et-Marne, Essonne, Seine-Saint-Denis, Val-de-Marne.
              </p>
              <p className="mono text-[11px] text-brand-emeraldDeep font-bold mt-2 text-center">
                116 EHPAD identifiés (77)
              </p>
            </div>

            {/* Cards financements */}
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="p-8 bg-slate-50 border border-slate-200 flex flex-col">
                <div className="text-xs font-bold text-brand-emeraldDeep mb-4 uppercase tracking-wider">
                  Marché privé &amp; public
                </div>
                <h3 className="text-xl font-bold text-midnight-900 mb-3">CEE tertiaire</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Application rigoureuse des fiches d&apos;opérations standardisées (ADEME&nbsp;/&nbsp;ATEE)
                  pour maximiser les primes énergie.
                </p>
                <ul className="text-xs text-slate-500 space-y-2 mono mt-auto pt-4 border-t border-slate-200">
                  <li>&gt; BAT-TH-113 — Pompe à chaleur réversible, déclarée chauffage</li>
                  <li>&gt; BAT-TH-116 — Gestion technique du bâtiment (régulation)</li>
                </ul>
              </div>
              <div className="p-8 bg-slate-50 border border-slate-200 flex flex-col">
                <div className="text-xs font-bold text-brand-emeraldDeep mb-4 uppercase tracking-wider">
                  Secteur public
                </div>
                <h3 className="text-xl font-bold text-midnight-900 mb-3">Fonds vert &amp; ACTEE·EduRénov</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Montage des dossiers pour les bâtiments publics locaux et les établissements scolaires
                  (volet adaptation à la chaleur).
                </p>
                <div className="mt-auto inline-block bg-slate-200 text-slate-700 text-[11px] px-2.5 py-1 font-bold w-fit">
                  Mairies &amp; EPCI
                </div>
              </div>
              <div className="p-8 bg-slate-50 border border-slate-200 flex flex-col">
                <div className="text-xs font-bold text-brand-emeraldDeep mb-4 uppercase tracking-wider">
                  Secteur médico-social
                </div>
                <h3 className="text-xl font-bold text-midnight-900 mb-3">Fonds qualité EHPAD</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Coordination des enveloppes dédiées à la protection sanitaire des résidents vulnérables.
                </p>
                <div className="mt-auto inline-block bg-slate-200 text-slate-700 text-[11px] px-2.5 py-1 font-bold w-fit">
                  EHPAD &amp; santé
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-16 bg-slate-50 border-t border-slate-200 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="display text-3xl font-bold text-midnight-900 mb-4">
              Démarrez votre diagnostic
            </h2>
            <p className="text-slate-600 mb-8">
              Un ingénieur AMO PSGLOBAL-ENERGY revient vers vous sous 48&nbsp;h ouvrées avec les guichets
              mobilisables pour votre profil.
            </p>
            <Link
              href="/eligibilite"
              className="inline-flex items-center gap-2 bg-midnight-900 text-white font-bold px-8 py-4 hover:bg-midnight-800 transition-colors"
            >
              Démarrer le diagnostic
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
