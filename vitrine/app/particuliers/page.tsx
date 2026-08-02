import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DeontoBanner from "@/components/ui/DeontoBanner";

export const metadata: Metadata = {
  title: "Particuliers — CEE · Éco-PTZ · Rénovation énergétique | PSGLOBAL-ENERGY",
  description:
    "PAC, isolation, PV, chauffe-eau thermodynamique — PSGLOBAL Energy optimise vos guichets CEE et Éco-PTZ en Île-de-France. Diagnostic d'éligibilité sans engagement.",
  robots: { index: false, follow: false },
};

const GUICHETS_PART = [
  { nom: "Prime rénovation globale", statut: "variable selon revenus", desc: "Subvention selon revenus et type de travaux — conditions vérifiées lors du diagnostic." },
  { nom: "CEE Particuliers", statut: "variable selon travaux", desc: "Certificats d'Économie d'Énergie versés par les énergéticiens." },
  { nom: "Éco-PTZ", statut: "prêt à taux 0 %", desc: "Prêt à taux 0 % sans condition de revenus pour rénovation globale — montant selon dossier." },
  { nom: "Prime MAR", statut: "selon éligibilité", desc: "Prime Mon Accompagnateur Rénov' pour rénovation globale avec AMO — montant défini par l'organisme instructeur." },
  { nom: "TVA travaux RGE", statut: "taux réduit applicable", desc: "Sur tous travaux de rénovation énergétique réalisés par un artisan RGE." },
  { nom: "Chèque énergie", statut: "selon ressources", desc: "Pour ménages aux revenus modestes — montant attribué par l'ADEME, cumulable avec les autres guichets." },
];

const TRAVAUX = [
  {
    nom: "Pompe à chaleur air/eau",
    aide: "éligible CEE + aides",
    svg: <svg className="w-6 h-6 text-brand-emeraldDeep" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>,
  },
  {
    nom: "PAC air/air réversible",
    aide: "éligible CEE selon dossier",
    svg: <svg className="w-6 h-6 text-brand-emeraldDeep" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1M4.22 4.22l.71.71m13.14 13.14.71.71M3 12H2m20 0h-1M4.22 19.78l.71-.71M18.36 5.64l.71-.71M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>,
  },
  {
    nom: "Isolation combles perdus",
    aide: "éligible CEE selon dossier",
    svg: <svg className="w-6 h-6 text-brand-emeraldDeep" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/></svg>,
  },
  {
    nom: "ITE / isolation murs",
    aide: "éligible CEE selon dossier",
    svg: <svg className="w-6 h-6 text-brand-emeraldDeep" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>,
  },
  {
    nom: "Fenêtres double vitrage",
    aide: "éligible selon dossier",
    svg: <svg className="w-6 h-6 text-brand-emeraldDeep" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h18v18H3V3zm9 0v18M3 12h18"/></svg>,
  },
  {
    nom: "Panneaux photovoltaïques",
    aide: "autoconsommation + prime",
    svg: <svg className="w-6 h-6 text-brand-emeraldDeep" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1M4.22 4.22l.71.71m13.14 13.14.71.71M3 12H2m20 0h-1M4.22 19.78l.71-.71M18.36 5.64l.71-.71M12 7a5 5 0 100 10 5 5 0 000-10z"/></svg>,
  },
  {
    nom: "Chauffe-eau thermodynamique",
    aide: "éligible CEE selon dossier",
    svg: <svg className="w-6 h-6 text-brand-emeraldDeep" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>,
  },
  {
    nom: "Borne de recharge VE",
    aide: "crédit d'impôt applicable",
    svg: <svg className="w-6 h-6 text-brand-emeraldDeep" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  },
];

export default function ParticuliersPage() {
  return (
    <>
      <Navbar />
      <DeontoBanner />

      {/* HERO */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mono text-[11px] font-semibold text-brand-emeraldDeep uppercase tracking-widest mb-4">
              Particuliers — Île-de-France
            </p>
            <h1 className="display text-4xl sm:text-5xl font-bold text-midnight-900 leading-[1.12] mb-6">
              Rénovez votre logement avec une{" "}
              <span className="text-brand-emeraldDeep">ingénierie financière sécurisée.</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium">
              CEE, Éco-PTZ, prime rénovation — nos conseillers identifient l&apos;ensemble des guichets mobilisables et constituent votre dossier de A à Z, sans avance de fonds de votre part.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/eligibilite" className="inline-flex items-center justify-center bg-brand-emeraldDeep hover:bg-emerald-800 text-white font-bold text-base px-7 py-4 transition-colors">
                Simuler mon éligibilité →
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center border-2 border-midnight-900 text-midnight-900 hover:bg-midnight-900 hover:text-white font-bold text-base px-7 py-4 transition-colors">
                Parler à un conseiller
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GUICHETS */}
      <section className="py-16 bg-midnight-900" aria-labelledby="aides-part-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="mono text-[11px] font-semibold text-emerald-400 uppercase tracking-widest mb-4">Guichets 2026</p>
            <h2 id="aides-part-title" className="display text-3xl font-bold text-white mb-4">
              Guichets mobilisables selon votre profil
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GUICHETS_PART.map((a) => (
              <div key={a.nom} className="bg-midnight-950 border border-midnight-800 p-6 flex flex-col">
                <div className="mono text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">{a.statut}</div>
                <div className="font-bold text-white text-sm mb-2">{a.nom}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 text-center mt-6">
            Montants indicatifs — seul l&apos;organisme instructeur fait foi à la date de dépôt du dossier.
          </p>
        </div>
      </section>

      {/* TRAVAUX */}
      <section className="py-16 bg-white" aria-labelledby="travaux-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="mono text-[11px] font-semibold text-brand-emeraldDeep uppercase tracking-widest mb-4">Équipements éligibles</p>
            <h2 id="travaux-title" className="display text-3xl font-bold text-midnight-900 mb-4">
              Équipements pris en charge
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRAVAUX.map((t) => (
              <div key={t.nom} className="border border-slate-200 p-6 flex flex-col items-center text-center gap-3">
                {t.svg}
                <div className="font-bold text-midnight-900 text-sm">{t.nom}</div>
                <div className="mono text-[11px] text-brand-emeraldDeep uppercase tracking-wide">{t.aide}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <h2 className="display text-3xl font-bold text-midnight-900 mb-4">
            Estimez vos guichets<br />
            <span className="text-brand-emeraldDeep">en 2 minutes</span>
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Sans engagement — nos experts vous envoient votre plan de financement sous 48&nbsp;h ouvrées.
          </p>
          <Link href="/eligibilite" className="inline-flex items-center justify-center bg-midnight-900 hover:bg-midnight-800 text-white font-bold text-base px-8 py-4 transition-colors">
            Démarrer le diagnostic →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
