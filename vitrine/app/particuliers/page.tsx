import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Particuliers — MaPrimeRénov 2026, CEE, Éco-PTZ | PSGLOBAL-ENERGY",
  description:
    "PAC, isolation, PV, chauffe-eau thermodynamique — PSGLOBAL Energy optimise vos aides MaPrimeRénov' 2026 en Île-de-France. Audit gratuit.",
};

const AIDES_PART = [
  { nom: "MaPrimeRénov' 2026", montant: "jusqu'à 10 000 €", desc: "Subvention ANAH selon revenus et type de travaux.", color: "#00C48C" },
  { nom: "CEE Particuliers", montant: "jusqu'à 3 000 €", desc: "Certificats d'Économie d'Énergie versés par les énergéticiens.", color: "#1A4DFF" },
  { nom: "Éco-PTZ", montant: "jusqu'à 50 000 €", desc: "Prêt à taux 0 % sans condition de revenus pour rénovation globale.", color: "#F5A000" },
  { nom: "Prime MAR", montant: "2 000 €", desc: "Prime Mon Accompagnateur Rénov' pour rénovation globale avec AMO.", color: "#00C48C" },
  { nom: "TVA réduite 5,5 %", montant: "−14,5 pts", desc: "Sur tous travaux de rénovation énergétique par artisan RGE.", color: "#8B92A5" },
  { nom: "Chèque énergie", montant: "48 à 277 €", desc: "Pour ménages aux revenus modestes — cumulable avec MPR.", color: "#8B92A5" },
];

const TRAVAUX = [
  { icon: "🌡️", nom: "Pompe à chaleur air/eau", aide: "jusqu'à 5 000 €" },
  { icon: "❄️", nom: "PAC air/air réversible", aide: "jusqu'à 1 500 €" },
  { icon: "🏠", nom: "Isolation combles perdus", aide: "jusqu'à 2 000 €" },
  { icon: "🧱", nom: "ITE / isolation murs", aide: "jusqu'à 4 000 €" },
  { icon: "🪟", nom: "Fenêtres double vitrage", aide: "jusqu'à 800 €/fenêtre" },
  { icon: "☀️", nom: "Panneaux photovoltaïques", aide: "autoconsommation + prime" },
  { icon: "💧", nom: "Chauffe-eau thermodynamique", aide: "jusqu'à 1 200 €" },
  { icon: "🔌", nom: "Borne de recharge VE", aide: "crédit d'impôt 75 %" },
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
              MaPrimeRénov&apos; 2026, CEE, Éco-PTZ, TVA 5,5 % — nos conseillers calculent l&apos;ensemble des aides auxquelles vous avez droit et constituent votre dossier de A à Z.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/eligibilite" className="btn-green text-base px-7 py-4">
                Simuler mes aides gratuitement →
              </Link>
              <Link href="/contact" className="btn-secondary text-base px-7 py-4">
                Parler à un conseiller
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AIDES */}
      <section className="py-16 bg-[#070A14]" aria-labelledby="aides-part-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Aides 2026</div>
            <h2 id="aides-part-title" className="section-title mb-4">
              Jusqu&apos;à <span style={{ color: "#00C48C" }}>65 000 €</span> d&apos;aides cumulables
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AIDES_PART.map((a) => (
              <div key={a.nom} className="card">
                <div className="font-display font-black text-2xl mb-1" style={{ color: a.color }}>{a.montant}</div>
                <div className="font-body font-semibold text-white text-sm mb-2">{a.nom}</div>
                <p className="text-xs text-white/55 font-body leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
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
                <div className="font-body text-xs" style={{ color: "#00C48C" }}>{t.aide}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <h2 className="section-title mb-4">Calculez vos aides<br /><span className="gradient-text">en 2 minutes</span></h2>
          <p className="section-sub mx-auto text-center mb-6">Gratuit, sans engagement — nos experts vous envoient votre plan de financement sous 48 h.</p>
          <Link href="/eligibilite" className="btn-green text-base px-8 py-4 inline-flex">Simuler mes aides →</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
