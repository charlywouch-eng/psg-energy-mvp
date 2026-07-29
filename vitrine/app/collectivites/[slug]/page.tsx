import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
  "plan-fraicheur": "#F5A000",
  "fond-vert": "#00C48C",
  "cee": "#1A4DFF",
  "dsil-detr": "#8B92A5",
  "prefecture": "#8B92A5",
  "actee": "#9B59B6",
  "sante": "#E74C3C",
};

const EQUIPEMENTS = [
  { icon: "❄️", titre: "Rafraîchissement passif", desc: "Protections solaires extérieures, surventilation nocturne, végétalisation — bouquet de gestes passif d'abord pour réduire les degrés-heures d'inconfort estival." },
  { icon: "🌡️", titre: "Pompe à chaleur air/eau", desc: "Remplacement de chaudière fioul/gaz pour bâtiments tertiaires et logements sociaux." },
  { icon: "🔄", titre: "VMC double-flux", desc: "Renouvellement d'air sans déperdition thermique — obligatoire RE2020 pour travaux lourds." },
  { icon: "☀️", titre: "Panneaux photovoltaïques", desc: "Autoconsommation et revente — réduction durable de la facture énergétique municipale." },
  { icon: "🏠", titre: "Isolation thermique (ITE)", desc: "Isolation par l'extérieur des murs et combles — financement CEE tertiaire." },
  { icon: "💡", titre: "Éclairage LED connecté", desc: "Remplacement de l'éclairage intérieur et extérieur — déclencheur CEE à faible coût." },
];

function GuichetCard({ g }: { g: Guichet }) {
  const color = BADGE_COLOR[g.type] ?? "#8B92A5";
  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div
          className="shrink-0 w-2 h-2 rounded-full mt-2"
          style={{ background: color }}
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          <div className="font-display font-black text-xl mb-0.5" style={{ color }}>
            {g.montant}
          </div>
          <div className="font-body font-semibold text-white text-sm">{g.nom}</div>
        </div>
      </div>
      <p className="text-xs text-white/55 font-body leading-relaxed">{g.description}</p>
      <div className="text-xs text-white/35 font-body">
        Instructeur : <span className="text-white/55">{g.instructeur}</span>
      </div>
      {g.echeance && (
        <div className="text-xs text-white/35 font-body">
          Échéance : <span className="text-white/55">{g.echeance}</span>
        </div>
      )}
      {g.url && (
        <a
          href={g.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-body transition-colors"
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

  // Phase A : données geo (sans clé API — mode dégradé si indisponible)
  const [geo, aidesTerritoires] = await Promise.all([
    getCommuneGeo(commune.codeInsee),
    getAidesTerritoires(commune.codeInsee), // Phase B : [] si clé absente
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #0A0E1A 0%, #0A1030 100%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-8 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #1A4DFF, transparent)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs text-white/40 font-body mb-6">
              <a href="/collectivites" className="hover:text-white/70 transition-colors">Collectivités</a>
              <span aria-hidden="true">›</span>
              <span className="text-white/70">{commune.nom}</span>
            </nav>

            <div
              className="badge mb-4"
              style={{ color: "#1A4DFF", background: "rgba(26,77,255,0.12)", border: "1px solid rgba(26,77,255,0.25)" }}
            >
              🏛️ {commune.nomDep} ({commune.codeDep})
            </div>

            <h1 className="section-title mb-4">
              Rénovation énergétique<br />
              <span className="gradient-text">à {commune.nom}</span>
            </h1>

            {population && (
              <p className="text-xs text-white/40 font-body mb-4">
                {commune.nom} — {population.toLocaleString("fr-FR")} habitants · INSEE {commune.codeInsee}
              </p>
            )}

            <p className="section-sub mb-8">
              PSGLOBAL Energy monte votre dossier Fonds Vert, CEE tertiaire et Plan Fraîcheur pour
              les bâtiments publics de {commune.nom} — écoles, mairie, gymnases, EHPAD.
              0 € avancé sur la trésorerie de la collectivité.
            </p>
            <p className="text-xs text-white/40 font-body mb-8">
              0 € de subvention ne transite par PSGLOBAL Energy. Seul l&apos;organisme instructeur fait foi pour les montants définitifs.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#audit" className="btn-green text-base px-7 py-4">
                Demander un diagnostic d&apos;éligibilité →
              </a>
              <a href="/collectivites" className="btn-secondary text-base px-7 py-4">
                Voir tous les dispositifs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GUICHETS */}
      <section className="py-16 bg-[#070A14]" aria-labelledby="guichets-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Financements disponibles</div>
            <h2 id="guichets-title" className="section-title mb-4">
              Dispositifs accessibles<br />
              <span className="gradient-text">depuis {commune.nom}</span>
            </h2>
            <p className="section-sub mx-auto text-center max-w-2xl">
              Ces guichets sont ouverts aux communes et EPCI du {commune.nomDep}. Les montants sont indicatifs — le détail est confirmé lors de l&apos;audit.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {guichets.map((g) => (
              <GuichetCard key={g.nom} g={g} />
            ))}
          </div>

          {/* Preuve RACINE (ACTEE) — résultats mesurés en rafraîchissement passif */}
          <div
            className="mt-8 rounded-2xl p-4 flex gap-3 items-start"
            style={{ background: "rgba(155,89,182,0.08)", border: "1px solid rgba(155,89,182,0.2)" }}
          >
            <div className="text-xl shrink-0">🌡️</div>
            <p className="text-xs text-white/65 font-body leading-relaxed">
              <span className="font-semibold text-white/85">Programme RACINE (ACTEE) :</span>{" "}
              gains mesurés de 5 à 10 °C de confort en classe par rafraîchissement passif — ex. +7 °C de confort
              pour 23 000 € de travaux (Grabels). Seul l&apos;organisme instructeur fait foi pour les montants définitifs.
            </p>
          </div>
        </div>
      </section>

      {/* ÉQUIPEMENTS */}
      <section className="py-16" aria-labelledby="equipements-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Équipements éligibles</div>
            <h2 id="equipements-title" className="section-title mb-4">
              Tous vos bâtiments<br />
              <span className="gradient-text">sont concernés</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EQUIPEMENTS.map((e) => (
              <div key={e.titre} className="card flex gap-4">
                <div className="text-2xl shrink-0">{e.icon}</div>
                <div>
                  <h3 className="font-display font-extrabold text-base text-white mb-1">{e.titre}</h3>
                  <p className="text-xs text-white/55 font-body leading-relaxed">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phase B : Aides-territoires (visible uniquement si API key présente) */}
      {aidesTerritoires.length > 0 && (
        <section className="py-16 bg-[#070A14]" aria-labelledby="aides-nat-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <div className="section-label mx-auto w-fit mb-4">Aides nationales complémentaires</div>
              <h2 id="aides-nat-title" className="section-title mb-4">
                Dispositifs <span className="gradient-text">Aides-territoires</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {aidesTerritoires.map((a: AideTerritoire) => (
                <div key={a.url} className="card flex flex-col gap-2">
                  <div className="font-display font-extrabold text-sm text-white">{a.nom}</div>
                  <div className="text-xs text-white/40 font-body">{a.financeur}</div>
                  <p className="text-xs text-white/55 font-body leading-relaxed">{a.description}</p>
                  {a.url && (
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue hover:text-white transition-colors font-body"
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
      <section className="py-16 bg-[#070A14]" aria-labelledby="process-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Notre accompagnement</div>
            <h2 id="process-title" className="section-title mb-4">
              De l&apos;audit à la livraison,<br />
              <span className="gradient-text">nous gérons tout</span>
            </h2>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute left-0 top-8 right-0 h-0.5 bg-white/8" aria-hidden="true" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { titre: "Audit technique", desc: "Visite ou dossier à distance — bilan thermique, DPE, plans, effectifs." },
                { titre: "Ingénierie financière", desc: "Constitution des dossiers Fonds Vert, DSIL, CEE — aucune ressource RH à mobiliser." },
                { titre: "Coordination travaux", desc: "Sélection entreprises RGE, planning, suivi chantier et réception des ouvrages." },
                { titre: "Clôture dossier", desc: "Transmission des pièces justificatives aux organismes instructeurs. 0 € ne transite par PSG." },
              ].map((p, i) => (
                <div key={p.titre} className="card text-center lg:text-left">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-body mb-3 mx-auto lg:mx-0"
                    style={{ background: "linear-gradient(135deg, #1A4DFF, #00C48C)" }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="font-display font-extrabold text-sm text-white mb-1">{p.titre}</h3>
                  <p className="text-xs text-white/55 font-body leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA + FORMULAIRE */}
      <section id="audit" className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="section-label mb-4">Diagnostic collectivité</div>
              <h2 className="section-title mb-4">
                {commune.nom} est-elle<br />
                <span className="gradient-text">éligible au Fonds Vert ?</span>
              </h2>
              <p className="section-sub mb-6">
                Transmettez vos coordonnées — nos experts reviennent sous 48 h avec une estimation de financements disponibles pour vos bâtiments.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Audit sans engagement ni frais",
                  "Réponse sous 48 h ouvrées",
                  "0 € de subvention transitant par PSG",
                  "Seul l'organisme instructeur fait foi",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-body text-white/70">
                    <span className="text-green" aria-hidden="true">✓</span>
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
