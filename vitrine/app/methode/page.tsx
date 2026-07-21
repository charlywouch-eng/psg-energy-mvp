import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Notre méthode — De l'audit à la livraison clé en main | PSGLOBAL-ENERGY",
  description:
    "PSGLOBAL Energy gère l'intégralité de votre projet : audit, dossiers de financement, coordination travaux, réception. Découvrez notre méthode.",
};

const ETAPES = [
  {
    n: "01",
    titre: "Audit de faisabilité gratuit",
    desc: "Visite sur site ou dossier à distance. Nous analysons les bâtiments, la consommation énergétique, le DPE et identifions les travaux éligibles.",
    details: ["Analyse thermique du bâtiment", "Identification des aides cumulables", "Simulation financière préliminaire", "Rapport de faisabilité sous 48 h"],
    icon: "🔍",
  },
  {
    n: "02",
    titre: "Montage des dossiers de financement",
    desc: "Notre équipe constitue l'intégralité des dossiers ANAH, CEE, Plan Fraîcheur, Fond Vert — vous ne signez qu'en bout de chaîne.",
    details: ["Dossier ANAH / CEE", "Convention Plan Fraîcheur", "Demandes DSIL / DETR pour collectivités", "Suivi administratif complet"],
    icon: "📋",
  },
  {
    n: "03",
    titre: "Sélection des équipements",
    desc: "Nous sélectionnons les matériels parmi notre réseau de partenaires certifiés RGE — marques françaises, garanties constructeur.",
    details: ["Marques françaises premium", "Garantie 5 ans minimum", "Matériels éligibles CEE/ANAH", "Délai d'approvisionnement 7–18 j"],
    icon: "⚙️",
  },
  {
    n: "04",
    titre: "Coordination des travaux",
    desc: "Planning de chantier, coordination des corps de métier, gestion de la sécurité — hors présence des résidents ou usagers sur demande.",
    details: ["Techniciens RGE certifiés", "Planning adapté à l'exploitation", "Zéro nuisance pour les résidents", "Chantier propre et assurable"],
    icon: "🔧",
  },
  {
    n: "05",
    titre: "Réception et formation",
    desc: "Réception des ouvrages avec vos services techniques. Formation des équipes à l'utilisation des nouveaux équipements.",
    details: ["Réception contradictoire", "Formation utilisateurs", "Documentation technique", "Garantie parfait achèvement 1 an"],
    icon: "✅",
  },
  {
    n: "06",
    titre: "Perception des aides",
    desc: "Les subventions sont versées directement à l'installateur. Vous ne payez que le reste à charge net — souvent nul pour les EHPAD et collectivités.",
    details: ["Versement direct à l'installateur", "Solde = reste à charge net", "Accompagnement comptable", "Clôture administrative du dossier"],
    icon: "💶",
  },
];

const ENGAGEMENTS = [
  { titre: "0 € de frais de dossier", desc: "Notre rémunération est incluse dans la marge commerciale des équipements. Aucun frais caché." },
  { titre: "Délai garanti", desc: "Du premier rendez-vous à la livraison : 6 à 12 semaines selon la complexité du projet." },
  { titre: "Installateurs RGE", desc: "Tous nos partenaires sont certifiés RGE — condition obligatoire pour débloquer les aides." },
  { titre: "Conformité ANAH 2026", desc: "Dossiers montés selon les dernières dispositions réglementaires. Nous assumons les erreurs." },
];

export default function MethodePage() {
  return (
    <>
      <Navbar />

      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="section-label mx-auto w-fit mb-4">Notre méthode</div>
          <h1 className="section-title mb-6">
            Du premier contact à la livraison,<br />
            <span className="gradient-text">nous gérons tout</span>
          </h1>
          <p className="section-sub mx-auto text-center">
            PSGLOBAL Energy est votre interlocuteur unique : audit, financement, travaux, réception. Vous gardez le contrôle, nous gérons la complexité.
          </p>
        </div>
      </section>

      {/* ÉTAPES */}
      <section className="py-20" aria-labelledby="process-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 id="process-title" className="sr-only">Les 6 étapes de notre méthode</h2>
          <div className="flex flex-col gap-6">
            {ETAPES.map((e) => (
              <div key={e.n} className="card flex gap-6">
                <div className="shrink-0">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: "linear-gradient(135deg,#1A4DFF20,#00C48C20)", border: "1px solid rgba(26,77,255,0.2)" }}
                  >
                    {e.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-display font-black text-3xl text-blue/30 leading-none">{e.n}</span>
                    <h3 className="font-display font-extrabold text-lg text-white">{e.titre}</h3>
                  </div>
                  <p className="text-sm text-white/60 font-body leading-relaxed mb-3">{e.desc}</p>
                  <ul className="flex flex-wrap gap-2">
                    {e.details.map((d) => (
                      <li
                        key={d}
                        className="text-xs font-body px-2.5 py-1 rounded-lg"
                        style={{ background: "rgba(0,196,140,0.08)", color: "rgba(0,196,140,0.8)", border: "1px solid rgba(0,196,140,0.15)" }}
                      >
                        ✓ {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="py-16 bg-[#070A14]" aria-labelledby="engage-title">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Nos engagements</div>
            <h2 id="engage-title" className="section-title">
              Ce que vous pouvez<br />
              <span className="gradient-text">compter de nous</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ENGAGEMENTS.map((e) => (
              <div key={e.titre} className="card text-center">
                <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#1A4DFF,#00C48C)" }}>
                  <span className="text-white text-lg">✓</span>
                </div>
                <h3 className="font-display font-extrabold text-base text-white mb-2">{e.titre}</h3>
                <p className="text-xs text-white/55 font-body leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <h2 className="section-title mb-4">Prêt à démarrer ?</h2>
          <p className="section-sub mx-auto text-center mb-6">Votre audit gratuit est la première étape. Aucun engagement, réponse sous 48 h.</p>
          <Link href="/eligibilite" className="btn-green text-base px-8 py-4 inline-flex">
            Tester mon éligibilité →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
