import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DeontoBanner from "@/components/ui/DeontoBanner";
import CommuneContactForm from "@/components/ui/CommuneContactForm";
import { COMMUNES, getCommuneBySlug } from "@/data/communes";
import { getGuichetsByDep, type Guichet } from "@/data/guichets";
import { getCommuneGeo } from "@/lib/geo";
import { getAidesTerritoires, type AideTerritoire } from "@/lib/aides-territoires";

export const revalidate = 86400;

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return COMMUNES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const commune = getCommuneBySlug(params.slug);
  if (!commune) return {};

  return {
    title: `Rénovation énergétique ${commune.nom} — Financements tertiaires | PSGLOBAL-ENERGY`,
    description: `PSGLOBAL Energy accompagne les collectivités de ${commune.nom} (${commune.nomDep}) dans le montage de dossiers Fonds Vert, CEE tertiaire, Plan Fraîcheur et DSIL. 0 € avancé.`,
    alternates: {
      canonical: `https://psglobal.energy/collectivites/${commune.slug}`,
    },
  };
}

const BADGE_COLOR: Record<string, string> = {
  "plan-fraicheur": "#64748b",
  "fond-vert": "#059669",
  "cee": "#047857",
  "dsil-detr": "#8B92A5",
  "prefecture": "#8B92A5",
  "actee": "#9B59B6",
  "sante": "#E74C3C",
};

const EQUIPEMENTS = [
  {
    titre: "Rafraîchissement passif",
    desc: "Protections solaires extérieures, surventilation nocturne, végétalisation — bouquet de gestes passif d'abord pour réduire les degrés-heures d'inconfort estival.",
    icon: (
      <svg className="w-6 h-6 shrink-0" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
      </svg>
    ),
  },
  {
    titre: "Pompe à chaleur air/eau",
    desc: "Remplacement de chaudière fioul/gaz pour bâtiments tertiaires et logements sociaux.",
    icon: (
      <svg className="w-6 h-6 shrink-0" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.343 3.94c.09.542-.56 1.102-.99.68L7.64 3.72a.678.678 0 00-.96 0l-1.06 1.06a.678.678 0 000 .96l.92.92c.42.43-.14 1.08-.68.99l-1.26-.28A1 1 0 003 7.5v1.5a1 1 0 00.667.943l1.26.28c.54.09 1.1.56.68.99l-.92.92a.678.678 0 000 .96l1.06 1.06c.267.267.683.267.95 0l.87-.87 1.122 4.482a1 1 0 00.97.755h1.06a1 1 0 00.97-.755l1.122-4.482.87.87c.267.267.683.267.95 0l1.06-1.06a.678.678 0 000-.96l-.92-.92c-.42-.43.14-1.08.68-.99l1.26.28A1 1 0 0021 9v-1.5a1 1 0 00-.667-.943l-1.26-.28c-.54-.09-1.1-.56-.68-.99l.92-.92a.678.678 0 000-.96L18.25 3.25a.678.678 0 00-.96 0l-.92.92c-.43.42-1.08-.14-.99-.68l.28-1.26A1 1 0 0014.715 1h-1.5a1 1 0 00-.943.667l-.28 1.26z"/>
      </svg>
    ),
  },
  {
    titre: "VMC double-flux",
    desc: "Renouvellement d'air sans déperdition thermique — obligatoire RE2020 pour travaux lourds.",
    icon: (
      <svg className="w-6 h-6 shrink-0" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
      </svg>
    ),
  },
  {
    titre: "Panneaux photovoltaïques",
    desc: "Autoconsommation et revente — réduction durable de la facture énergétique municipale.",
    icon: (
      <svg className="w-6 h-6 shrink-0" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
      </svg>
    ),
  },
  {
    titre: "Isolation thermique (ITE)",
    desc: "Isolation par l'extérieur des murs et combles — financement CEE tertiaire.",
    icon: (
      <svg className="w-6 h-6 shrink-0" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
  },
  {
    titre: "Éclairage LED connecté",
    desc: "Remplacement de l'éclairage intérieur et extérieur — déclencheur CEE à faible coût.",
    icon: (
      <svg className="w-6 h-6 shrink-0" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/>
      </svg>
    ),
  },
];

function GuichetCard({ g }: { g: Guichet }) {
  const color = BADGE_COLOR[g.type] ?? "#8B92A5";
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div
          className="shrink-0 w-2 h-2 rounded-full mt-2"
          style={{ background: color }}
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          <div className="display font-black text-xl mb-0.5" style={{ color }}>
            {g.montant}
          </div>
          <div className="font-semibold text-midnight-900 text-sm">{g.nom}</div>
        </div>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">{g.description}</p>
      <div className="text-xs text-slate-400">
        Instructeur : <span className="text-slate-600">{g.instructeur}</span>
      </div>
      {g.echeance && (
        <div className="text-xs text-slate-400">
          Échéance : <span className="text-slate-600">{g.echeance}</span>
        </div>
      )}
      {g.url && (
        <a
          href={g.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs transition-colors"
          style={{ color }}
        >
          Accéder au guichet →
        </a>
      )}
    </div>
  );
}

export default async function CommunePage({ params }: Props) {
  const commune = getCommuneBySlug(params.slug);
  if (!commune) notFound();

  const [geo, aidesTerritoires] = await Promise.all([
    getCommuneGeo(commune.codeInsee),
    getAidesTerritoires(commune.codeInsee),
  ]);

  const guichets = getGuichetsByDep(commune.codeDep);
  const population = geo?.population;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "PSGLOBAL Energy",
    description: `Rénovation énergétique des bâtiments publics à ${commune.nom}`,
    url: `https://psglobal.energy/collectivites/${commune.slug}`,
    areaServed: {
      "@type": "City",
      name: commune.nom,
      containedInPlace: { "@type": "AdministrativeArea", name: commune.nomDep },
    },
  };

  return (
    <>
      <Navbar />
      <DeontoBanner />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50 border-b border-slate-200">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs text-slate-400 mb-6">
              <a href="/collectivites" className="hover:text-slate-600 transition-colors">Collectivités</a>
              <span aria-hidden="true">›</span>
              <span className="text-slate-600">{commune.nom}</span>
            </nav>

            <div
              className="badge mb-4"
              style={{ color: "#047857", background: "rgba(4,120,87,0.08)", border: "1px solid rgba(4,120,87,0.2)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              {commune.nomDep} ({commune.codeDep})
            </div>

            <h1 className="display text-3xl sm:text-4xl font-bold text-midnight-900 leading-[1.12] mb-4">
              Rénovation énergétique<br />
              <span className="text-brand-emeraldDeep">à {commune.nom}</span>
            </h1>

            {population && (
              <p className="text-xs text-slate-400 mb-4">
                {commune.nom} — {population.toLocaleString("fr-FR")} habitants · INSEE {commune.codeInsee}
              </p>
            )}

            <p className="text-slate-600 leading-relaxed mb-4 max-w-2xl">
              PSGLOBAL Energy monte votre dossier Fonds Vert, CEE tertiaire et financements disponibles pour
              les bâtiments publics de {commune.nom} — écoles, mairie, gymnases, EHPAD.
              0 € avancé sur la trésorerie de la collectivité.
            </p>
            <p className="text-xs text-slate-400 mb-8">
              0 € de subvention ne transite par PSGLOBAL Energy. Seul l&apos;organisme instructeur fait foi pour les montants définitifs.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#audit" className="btn-green text-base px-7 py-4">
                Demander un diagnostic d&apos;éligibilité →
              </a>
              <a href="/collectivites" className="inline-flex items-center justify-center gap-2 px-7 py-4 font-bold text-sm border-2 border-midnight-900/30 text-midnight-900 hover:border-midnight-900 hover:bg-midnight-900/5 transition-colors duration-200">
                Voir tous les dispositifs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GUICHETS */}
      <section className="py-16 bg-white border-b border-slate-200" aria-labelledby="guichets-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Financements disponibles</div>
            <h2 id="guichets-title" className="display text-3xl sm:text-4xl font-bold text-midnight-900 leading-[1.12] mb-4">
              Dispositifs accessibles<br />
              <span className="text-brand-emeraldDeep">depuis {commune.nom}</span>
            </h2>
            <p className="text-slate-600 leading-relaxed mx-auto text-center max-w-2xl">
              Ces guichets sont ouverts aux communes et EPCI du {commune.nomDep}. Les montants sont indicatifs — le détail est confirmé lors de l&apos;audit.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {guichets.map((g) => (
              <GuichetCard key={g.nom} g={g} />
            ))}
          </div>

          {/* Preuve RACINE (ACTEE) */}
          <div
            className="mt-8 rounded-2xl p-4 flex gap-3 items-start"
            style={{ background: "rgba(155,89,182,0.06)", border: "1px solid rgba(155,89,182,0.15)" }}
          >
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="#9B59B6" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
            </svg>
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="font-semibold text-slate-700">Programme RACINE (ACTEE) :</span>{" "}
              gains mesurés de 5 à 10 °C de confort en classe par rafraîchissement passif — ex. +7 °C de confort
              pour 23 000 € de travaux (Grabels). Seul l&apos;organisme instructeur fait foi pour les montants définitifs.
            </p>
          </div>
        </div>
      </section>

      {/* ÉQUIPEMENTS */}
      <section className="py-16 bg-slate-50 border-b border-slate-200" aria-labelledby="equipements-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Équipements éligibles</div>
            <h2 id="equipements-title" className="display text-3xl sm:text-4xl font-bold text-midnight-900 leading-[1.12] mb-4">
              Tous vos bâtiments<br />
              <span className="text-brand-emeraldDeep">sont concernés</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EQUIPEMENTS.map((e) => (
              <div key={e.titre} className="bg-white border border-slate-200 p-6 rounded-2xl flex gap-4">
                {e.icon}
                <div>
                  <h3 className="display font-extrabold text-base text-midnight-900 mb-1">{e.titre}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phase B : Aides-territoires */}
      {aidesTerritoires.length > 0 && (
        <section className="py-16 bg-white border-b border-slate-200" aria-labelledby="aides-nat-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <div className="section-label mx-auto w-fit mb-4">Aides nationales complémentaires</div>
              <h2 id="aides-nat-title" className="display text-3xl sm:text-4xl font-bold text-midnight-900 leading-[1.12] mb-4">
                Dispositifs <span className="text-brand-emeraldDeep">Aides-territoires</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {aidesTerritoires.map((a: AideTerritoire) => (
                <div key={a.url} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col gap-2">
                  <div className="display font-extrabold text-sm text-midnight-900">{a.nom}</div>
                  <div className="text-xs text-slate-400">{a.financeur}</div>
                  <p className="text-xs text-slate-500 leading-relaxed">{a.description}</p>
                  {a.url && (
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-brand-emeraldDeep hover:text-midnight-900 transition-colors"
                    >
                      Voir le dispositif →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROCESSUS */}
      <section className="py-16 bg-slate-50 border-b border-slate-200" aria-labelledby="process-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Notre accompagnement</div>
            <h2 id="process-title" className="display text-3xl sm:text-4xl font-bold text-midnight-900 leading-[1.12] mb-4">
              De l&apos;audit à la livraison,<br />
              <span className="text-brand-emeraldDeep">nous coordonnons tout</span>
            </h2>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute left-0 top-8 right-0 h-0.5 bg-slate-200" aria-hidden="true" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { titre: "Audit technique", desc: "Visite ou dossier à distance — bilan thermique, DPE, plans, effectifs." },
                { titre: "Ingénierie financière", desc: "Constitution des dossiers Fonds Vert, DSIL, CEE — aucune ressource RH à mobiliser." },
                { titre: "Coordination travaux", desc: "Sélection entreprises RGE, planning, suivi de chantier — vous conduisez la réception en qualité de maître d'ouvrage, nous vous y accompagnons." },
                { titre: "Clôture dossier", desc: "Transmission des pièces justificatives aux organismes instructeurs. 0 € ne transite par PSG." },
              ].map((p, i) => (
                <div key={p.titre} className="bg-white border border-slate-200 p-6 rounded-2xl text-center lg:text-left">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-3 mx-auto lg:mx-0 bg-brand-emeraldDeep text-white"
                  >
                    {i + 1}
                  </div>
                  <h3 className="display font-extrabold text-sm text-midnight-900 mb-1">{p.titre}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA + FORMULAIRE — bloc d'ancrage sombre unique */}
      <section id="audit" className="py-16 bg-midnight-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="section-label mb-4">Diagnostic collectivité</div>
              <h2 className="display text-3xl sm:text-4xl font-bold text-white leading-[1.12] mb-4">
                {commune.nom} est-elle<br />
                <span className="text-brand-emeraldDeep">éligible au Fonds Vert ?</span>
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Transmettez vos coordonnées — nos experts reviennent sous 48 h avec une estimation de financements disponibles pour vos bâtiments.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Audit sans engagement ni frais",
                  "Réponse sous 48 h ouvrées",
                  "0 € de subvention transitant par PSG",
                  "Seul l'organisme instructeur fait foi",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                    <span className="text-brand-emeraldDeep" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <CommuneContactForm communeNom={commune.nom} communeSlug={commune.slug} />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
