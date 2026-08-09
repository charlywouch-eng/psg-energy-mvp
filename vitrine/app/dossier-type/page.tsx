import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DeontoBanner from "@/components/ui/DeontoBanner";

export const metadata: Metadata = {
  title: "Dossier type EHPAD-77-014 — Projet confort thermique | PSGLOBAL-ENERGY",
  description:
    "Exemple de dossier AMO PSGLOBAL Energy : EHPAD 80 lits, Seine-et-Marne — guichets CEE tertiaire, Fonds qualité, coordination RGE. Découvrez notre méthode en conditions réelles.",
};

const GUICHETS = [
  {
    nom: "CEE tertiaire — BAT-TH-113",
    statut: "mobilisé",
    desc: "Pompe à chaleur réversible déclarée en usage chauffage — bâtiment tertiaire construit avant 2010.",
  },
  {
    nom: "CEE tertiaire — BAT-TH-116",
    statut: "mobilisé",
    desc: "GTB centralisant la régulation des équipements thermiques — catégorie B ou supérieure.",
  },
  {
    nom: "Fonds qualité EHPAD / PAI CNSA",
    statut: "instruit",
    desc: "Enveloppe qualité de vie des résidents — instruction par l'ARS Île-de-France selon dossier déposé.",
  },
];

const TRAVAUX = [
  {
    nom: "PAC réversible multi-split",
    detail: "Zones vie sociale + hébergement — fiche BAT-TH-113 établie par l'installateur RGE.",
  },
  {
    nom: "GTB de régulation centralisée",
    detail: "Pilotage des équipements depuis un poste unique — fiche BAT-TH-116 applicable.",
  },
  {
    nom: "Protections solaires extérieures",
    detail: "Brise-soleil orientables sur façades exposées Ouest et Sud.",
  },
];

const ETAPES = [
  {
    n: "01",
    titre: "Audit de faisabilité",
    desc: "Visite site et analyse du bâtiment 1978 — thermique, consommations, DPE, guichets mobilisables identifiés.",
  },
  {
    n: "02",
    titre: "Montage dossier CEE + Fonds qualité",
    desc: "Constitution des dossiers BAT-TH-113, BAT-TH-116 et fonds qualité EHPAD — PSGLOBAL Energy assure le suivi administratif.",
  },
  {
    n: "03",
    titre: "Sélection installateurs RGE",
    desc: "Consultation de partenaires certifiés RGE QualiPAC — devis et planning selon contraintes exploitation.",
  },
  {
    n: "04",
    titre: "Coordination chantier",
    desc: "Planning hors présence des résidents — techniciens RGE, zéro nuisance garanti.",
  },
  {
    n: "05",
    titre: "Réception & remise documentaire",
    desc: "Réception contradictoire, formation du personnel, dossier technique complet remis à l'établissement.",
  },
];

export default function DossierTypePage() {
  return (
    <>
      <Navbar />
      <DeontoBanner />

      {/* HERO */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mono text-[11px] font-semibold text-brand-emeraldDeep uppercase tracking-widest mb-4">
              Réf. EHPAD-77-014 · Dossier type AMO
            </p>
            <h1 className="display text-4xl sm:text-5xl font-bold text-midnight-900 leading-[1.12] mb-6">
              EHPAD 80 lits —{" "}
              <span className="text-brand-emeraldDeep">projet de confort thermique</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Bâtiment tertiaire construit en 1978, Seine-et-Marne (77). Absence de rafraîchissement, chauffage gaz collectif.
              Objectif&nbsp;: amélioration du confort thermique estival des résidents et maîtrise des charges de fonctionnement.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/eligibilite"
                className="inline-flex items-center justify-center bg-brand-emeraldDeep hover:bg-emerald-800 text-white font-bold text-base px-7 py-4 transition-colors"
              >
                Démarrer mon diagnostic →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border-2 border-midnight-900 text-midnight-900 hover:bg-midnight-900 hover:text-white font-bold text-base px-7 py-4 transition-colors"
              >
                Parler à un expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GUICHETS MOBILISÉS */}
      <section className="py-16 bg-white border-b border-slate-200" aria-labelledby="guichets-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="mono text-[11px] font-semibold text-brand-emeraldDeep uppercase tracking-widest mb-4">
              Financement
            </p>
            <h2 id="guichets-title" className="display text-3xl font-bold text-midnight-900 mb-4">
              Guichets mobilisés sur ce dossier
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              Montants indicatifs — seul l&apos;organisme instructeur fait foi à la date de dépôt du dossier. Aucun montant ferme garanti.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {GUICHETS.map((g) => (
              <div key={g.nom} className="bg-slate-50 border border-slate-200 p-6 flex flex-col gap-2 border-t-2 border-t-brand-emeraldDeep">
                <div className="mono text-xs font-bold text-brand-emeraldDeep uppercase tracking-wider">
                  {g.statut}
                </div>
                <div className="font-bold text-midnight-900 text-sm">{g.nom}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAVAUX */}
      <section className="py-16 bg-slate-50 border-b border-slate-200" aria-labelledby="travaux-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="mono text-[11px] font-semibold text-brand-emeraldDeep uppercase tracking-widest mb-4">
              Équipements
            </p>
            <h2 id="travaux-title" className="display text-3xl font-bold text-midnight-900 mb-4">
              Travaux coordonnés par PSGLOBAL Energy
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {TRAVAUX.map((t) => (
              <div key={t.nom} className="bg-white border border-slate-200 p-6 flex flex-col gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-brand-emeraldDeep/10 mb-1">
                  <svg className="w-4 h-4 text-brand-emeraldDeep" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="font-bold text-midnight-900 text-sm">{t.nom}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHRONOLOGIE AMO */}
      <section className="py-16 bg-white border-b border-slate-200" aria-labelledby="process-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="mono text-[11px] font-semibold text-brand-emeraldDeep uppercase tracking-widest mb-4">
              Chronologie
            </p>
            <h2 id="process-title" className="display text-3xl font-bold text-midnight-900 mb-4">
              Les étapes de l&apos;AMO sur ce dossier
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {ETAPES.map((e) => (
              <div key={e.n} className="bg-slate-50 border border-slate-200 p-5 flex gap-5 items-start">
                <span className="display font-black text-3xl text-slate-200 leading-none shrink-0 w-10 text-center">
                  {e.n}
                </span>
                <div>
                  <div className="font-extrabold display text-sm text-midnight-900 mb-1">{e.titre}</div>
                  <p className="text-xs text-slate-500 leading-relaxed">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENTIONS LÉGALES DISCLAIMER */}
      <div className="bg-slate-50 border-b border-slate-200 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-xs text-slate-400 text-center leading-relaxed">
            Ce dossier type est présenté à titre illustratif. Les guichets, conditions d&apos;éligibilité et montants varient selon chaque projet.
            PSGLOBAL Energy intervient exclusivement en qualité d&apos;AMO conseil — la maîtrise d&apos;œuvre et les travaux sont réalisés par des installateurs RGE indépendants certifiés.
            Estimation indicative — seul l&apos;organisme instructeur fait foi à la date de dépôt du dossier.
          </p>
        </div>
      </div>

      {/* CTA */}
      <section className="py-16 bg-midnight-900 text-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <h2 className="display text-3xl font-bold text-white mb-4">
            Votre établissement a un profil similaire ?
          </h2>
          <p className="text-slate-300 leading-relaxed mb-6">
            Simulez votre éligibilité en 2 minutes — diagnostic sans engagement, réponse sous 48 h ouvrées.
          </p>
          <Link
            href="/eligibilite"
            className="btn-green text-base px-8 py-4 inline-flex"
          >
            Démarrer le diagnostic →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
