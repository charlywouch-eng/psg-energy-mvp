import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DeontoBanner from "@/components/ui/DeontoBanner";

export const metadata: Metadata = {
  title: "Notre méthode — De l'audit au suivi des travaux, coordonnés de A à Z | PSGLOBAL-ENERGY",
  description:
    "PSGLOBAL Energy gère l'intégralité de votre projet : audit, dossiers de financement, coordination travaux, réception. Découvrez notre méthode.",
};

const ETAPES = [
  {
    n: "01",
    titre: "Diagnostic de faisabilité",
    desc: "Visite sur site ou dossier à distance. Nous analysons les bâtiments, la consommation énergétique, le DPE et identifions les travaux éligibles.",
    details: ["Analyse thermique du bâtiment", "Identification des guichets mobilisables", "Simulation financière préliminaire", "Rapport de faisabilité sous 48 h"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"/>
      </svg>
    ),
  },
  {
    n: "02",
    titre: "Montage des dossiers de financement",
    desc: "Notre équipe constitue l'intégralité des dossiers Fonds Vert, CEE, Plan Fraîcheur, DSIL/DETR — vous ne signez qu'en bout de chaîne.",
    details: ["Dossier Fonds Vert / CEE", "Convention de financement fonds qualité EHPAD", "Demandes DSIL / DETR pour collectivités", "Suivi administratif complet"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
  },
  {
    n: "03",
    titre: "Sélection des équipements",
    desc: "Nous sélectionnons les matériels parmi notre réseau d'installateurs RGE certifiés et indépendants — garanties constructeur incluses.",
    details: ["Équipements de nos partenaires installateurs RGE certifiés", "Garantie constructeur installateur RGE", "Matériels éligibles CEE/Fonds Vert", "Délai d'approvisionnement 7–18 j"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.343 3.94c.09.542-.56 1.102-.99.68L7.64 3.72a.678.678 0 00-.96 0l-1.06 1.06a.678.678 0 000 .96l.92.92c.42.43-.14 1.08-.68.99l-1.26-.28A1 1 0 003 7.5v1.5a1 1 0 00.667.943l1.26.28c.54.09 1.1.56.68.99l-.92.92a.678.678 0 000 .96l1.06 1.06c.267.267.683.267.95 0l.87-.87 1.122 4.482a1 1 0 00.97.755h1.06a1 1 0 00.97-.755l1.122-4.482.87.87c.267.267.683.267.95 0l1.06-1.06a.678.678 0 000-.96l-.92-.92c-.42-.43.14-1.08.68-.99l1.26.28A1 1 0 0021 9v-1.5a1 1 0 00-.667-.943l-1.26-.28c-.54-.09-1.1-.56-.68-.99l.92-.92a.678.678 0 000-.96L18.25 3.25a.678.678 0 00-.96 0l-.92.92c-.43.42-1.08-.14-.99-.68l.28-1.26A1 1 0 0014.715 1h-1.5a1 1 0 00-.943.667l-.28 1.26z"/>
      </svg>
    ),
  },
  {
    n: "04",
    titre: "Coordination des travaux",
    desc: "Planning de chantier, coordination des corps de métier, gestion de la sécurité — hors présence des résidents ou usagers sur demande.",
    details: ["Techniciens RGE certifiés", "Planning adapté à l'exploitation", "Zéro nuisance pour les résidents", "Chantier propre et assurable"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
  },
  {
    n: "05",
    titre: "Réception et formation",
    desc: "Réception des ouvrages avec vos services techniques. Formation des équipes à l'utilisation des nouveaux équipements.",
    details: ["Réception contradictoire", "Formation utilisateurs", "Documentation technique", "Garantie légale de parfait achèvement (1 an), due par l'installateur RGE exécutant les travaux."],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
  {
    n: "06",
    titre: "Versement des subventions",
    desc: "Les subventions sont versées directement à l'installateur. Vous ne payez que le reste à charge maîtrisé — minimisé via le cumul des guichets mobilisés.",
    details: ["Versement direct à l'installateur", "Solde = reste à charge maîtrisé", "Accompagnement comptable", "Clôture administrative du dossier"],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75"/>
      </svg>
    ),
  },
];

const ENGAGEMENTS = [
  { titre: "Rémunération AMO transparente", desc: "Rémunération AMO contractualisée directement avec le maître d'ouvrage — transparente et indépendante des équipements choisis." },
  { titre: "Délai garanti", desc: "Du premier rendez-vous à la livraison : 6 à 12 semaines selon la complexité du projet." },
  { titre: "Installateurs RGE certifiés", desc: "Tous nos partenaires sont certifiés RGE — condition obligatoire pour mobiliser les subventions." },
  { titre: "Conformité réglementaire 2026", desc: "Dossiers montés selon les dernières dispositions (décret tertiaire, Fonds Vert, CEE). Nous assumons les erreurs." },
];

export default function MethodePage() {
  return (
    <>
      <Navbar />
      <DeontoBanner />

      <section className="pt-32 pb-16 relative overflow-hidden bg-slate-50 border-b border-slate-200">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="section-label mx-auto w-fit mb-4">Notre méthode</div>
          <h1 className="display text-3xl sm:text-4xl font-bold text-midnight-900 leading-[1.12] mb-6">
            Du premier contact à la livraison,<br />
            <span className="text-brand-emeraldDeep">nous coordonnons tout</span>
          </h1>
          <p className="text-slate-600 leading-relaxed mx-auto text-center max-w-2xl">
            PSGLOBAL Energy est votre interlocuteur unique : audit, financement, coordination, réception. Vous gardez le contrôle, nous gérons la complexité.
          </p>
        </div>
      </section>

      {/* ÉTAPES */}
      <section className="py-16 bg-white border-b border-slate-200" aria-labelledby="process-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 id="process-title" className="sr-only">Les 6 étapes de notre méthode</h2>
          <div className="flex flex-col gap-6">
            {ETAPES.map((e) => (
              <div key={e.n} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex gap-6">
                <div className="shrink-0">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(4,120,87,0.08)", border: "1px solid rgba(4,120,87,0.2)" }}
                  >
                    {e.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="display font-black text-3xl text-slate-200 leading-none">{e.n}</span>
                    <h3 className="display font-extrabold text-lg text-midnight-900">{e.titre}</h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-3">{e.desc}</p>
                  <ul className="flex flex-wrap gap-2">
                    {e.details.map((d) => (
                      <li
                        key={d}
                        className="text-xs px-2.5 py-1 rounded-lg"
                        style={{ background: "rgba(4,120,87,0.06)", color: "#047857", border: "1px solid rgba(4,120,87,0.15)" }}
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
      <section className="py-16 bg-slate-50 border-b border-slate-200" aria-labelledby="engage-title">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Nos engagements</div>
            <h2 id="engage-title" className="display text-3xl sm:text-4xl font-bold text-midnight-900 leading-[1.12]">
              Ce que vous pouvez<br />
              <span className="text-brand-emeraldDeep">compter de nous</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ENGAGEMENTS.map((e) => (
              <div key={e.titre} className="bg-white border border-slate-200 p-6 rounded-2xl text-center">
                <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center bg-brand-emeraldDeep">
                  <svg className="w-5 h-5" fill="none" stroke="white" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="display font-extrabold text-base text-midnight-900 mb-2">{e.titre}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — bloc d'ancrage sombre unique */}
      <section className="py-16 text-center bg-midnight-900">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <h2 className="display text-3xl sm:text-4xl font-bold text-white leading-[1.12] mb-4">Prêt à démarrer ?</h2>
          <p className="text-slate-300 leading-relaxed mx-auto text-center mb-6">Votre diagnostic d&apos;éligibilité est la première étape. Aucun engagement, réponse sous 48 h.</p>
          <Link href="/eligibilite" className="btn-green text-base px-8 py-4 inline-flex">
            Tester mon éligibilité →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
