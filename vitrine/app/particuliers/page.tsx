import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Particuliers — CEE · Éco-PTZ · Rénovation énergétique | PSGLOBAL-ENERGY",
  description:
    "PAC, isolation, PV, chauffe-eau thermodynamique — PSGLOBAL Energy optimise vos guichets CEE et Éco-PTZ en Île-de-France. Diagnostic d'éligibilité sans engagement.",
  robots: { index: false, follow: false },
};

const GUICHETS_PART = [
  { nom: "Prime rénovation globale", montant: "variable selon revenus", desc: "Subvention selon revenus et type de travaux — conditions vérifiées lors du diagnostic.", color: "#059669" },
  { nom: "CEE Particuliers", montant: "variable selon travaux", desc: "Certificats d'Économie d'Énergie versés par les énergéticiens.", color: "#047857" },
  { nom: "Éco-PTZ", montant: "prêt à taux 0 %", desc: "Prêt à taux 0 % sans condition de revenus pour rénovation globale — montant selon dossier.", color: "#0f172a" },
  { nom: "Prime MAR", montant: "selon éligibilité", desc: "Prime Mon Accompagnateur Rénov' pour rénovation globale avec AMO — montant défini par l'organisme instructeur.", color: "#059669" },
  { nom: "TVA travaux RGE", montant: "taux réduit", desc: "Sur tous travaux de rénovation énergétique réalisés par un artisan RGE.", color: "#8B92A5" },
  { nom: "Chèque énergie", montant: "selon ressources", desc: "Pour ménages aux revenus modestes — montant attribué par l'ADEME, cumulable avec les autres guichets.", color: "#8B92A5" },
];

const TRAVAUX = [
  { icon: "🌡️", nom: "Pompe à chaleur air/eau", aide: "éligible CEE + aides" },
  { icon: "❄️", nom: "PAC air/air réversible", aide: "éligible CEE selon dossier" },
  { icon: "🏠", nom: "Isolation combles perdus", aide: "éligible CEE selon dossier" },
  { icon: "🧱", nom: "ITE / isolation murs", aide: "éligible CEE selon dossier" },
  { icon: "🪟", nom: "Fenêtres double vitrage", aide: "éligible selon dossier" },
  { icon: "☀️", nom: "Panneaux photovoltaïques", aide: "autoconsommation + prime" },
  { icon: "💧", nom: "Chauffe-eau thermodynamique", aide: "éligible CEE selon dossier" },
  { icon: "🔌", nom: "Borne de recharge VE", aide: "crédit d'impôt applicable" },
];

export default function ParticuliersPage() {
  return (
    <>
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="section-label mb-4">🏠 Particuliers — Île-de-France</div>
            <h1 className="section-title mb-6">
              Rénovez votre logement<br />
              <span className="gradient-text">avec 0 € avancé</span>
            </h1>
            <p className="section-sub mb-8">
              CEE, Éco-PTZ, prime rénovation — nos conseillers identifient l&apos;ensemble des guichets mobilisables et constituent votre dossier de A à Z.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/eligibilite" className="btn-green text-base px-7 py-4">
                Simuler mon éligibilité →
              </Link>
              <Link href="/contact" className="btn-secondary text-base px-7 py-4">
                Parler à un conseiller
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GUICHETS */}
      <section className="py-16 bg-[#070A14]" aria-labelledby="aides-part-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Guichets 2026</div>
            <h2 id="aides-part-title" className="section-title mb-4">
              Guichets mobilisables selon votre profil
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GUICHETS_PART.map((a) => (
              <div key={a.nom} className="card">
                <div className="font-display font-black text-2xl mb-1" style={{ color: a.color }}>{a.montant}</div>
                <div className="font-body font-semibold text-white text-sm mb-2">{a.nom}</div>
                <p className="text-xs text-white/55 font-body leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/30 font-body text-center mt-6">
            Montants indicatifs — seul l&apos;organisme instructeur fait foi à la date de dépôt du dossier.
          </p>
        </div>
      </section>

      {/* TRAVAUX */}
      <section className="py-16" aria-labelledby="travaux-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Équipements éligibles</div>
            <h2 id="travaux-title" className="section-title mb-4">
              Tous les équipements<br />
              <span className="gradient-text">pris en charge</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRAVAUX.map((t) => (
              <div key={t.nom} className="card flex flex-col items-center text-center gap-2 py-5">
                <div className="text-3xl">{t.icon}</div>
                <div className="font-display font-extrabold text-sm text-white">{t.nom}</div>
                <div className="font-body text-xs text-emerald-500">{t.aide}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <h2 className="section-title mb-4">Estimez vos guichets<br /><span className="gradient-text">en 2 minutes</span></h2>
          <p className="section-sub mx-auto text-center mb-6">Sans engagement — nos experts vous envoient votre plan de financement sous 48 h.</p>
          <Link href="/eligibilite" className="btn-green text-base px-8 py-4 inline-flex">Simuler mon éligibilité →</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
