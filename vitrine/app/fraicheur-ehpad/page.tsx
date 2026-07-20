import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Plan Fraîcheur EHPAD — Climatisation financée 100 % | Seine-et-Marne",
  description:
    "Climatisation, PAC, ventilation et isolation pour vos résidents EHPAD — 0 € avancé via CEE et Plan Fraîcheur État. PSGLOBAL Energy, Seine-et-Marne & IDF.",
};

const AIDES = [
  { nom: "Plan Fraîcheur État", montant: "jusqu'à 8 000 €", desc: "Subvention directe pour tout établissement accueillant des personnes vulnérables." },
  { nom: "CEE tertiaire", montant: "jusqu'à 15 000 €", desc: "Certificats d'Économie d'Énergie pour bâtiments construits avant 2010." },
  { nom: "Prime PAC", montant: "jusqu'à 5 000 €", desc: "Remplacement d'une chaudière fioul ou gaz par une pompe à chaleur air/eau." },
  { nom: "TVA réduite 5,5 %", montant: "−14,5 pts TVA", desc: "Sur travaux de rénovation énergétique dans les établissements sociaux et médico-sociaux." },
];

const EQUIPEMENTS = [
  { icon: "❄️", titre: "Climatisation réversible", desc: "PAC air/air multi-split pour toutes les chambres, espaces communs et unités Alzheimer." },
  { icon: "🔄", titre: "VMC double-flux", desc: "Ventilation mécanique contrôlée pour renouveler l'air sans déperdition thermique." },
  { icon: "☀️", titre: "Protection solaire", desc: "Stores extérieurs motorisés et films solaires pour réduire les apports thermiques." },
  { icon: "🌡️", titre: "Régulation intelligente", desc: "Thermostat connecté par zone, pilotage depuis la direction, alertes canicule." },
  { icon: "⚡", titre: "Panneaux photovoltaïques", desc: "Autoconsommation pour réduire la facture électrique de la climatisation." },
  { icon: "🏠", titre: "Isolation des combles", desc: "ITE et isolation des combles pour limiter l'inconfort thermique estival." },
];

const PROCESS = [
  { titre: "Audit technique gratuit", desc: "Visite sur site ou dossier à distance — bilan thermique, plans, DPE, effectifs." },
  { titre: "Simulation financière", desc: "Dossier CEE + Plan Fraîcheur + TVA — montant exact des aides disponibles sous 48 h." },
  { titre: "Choix de l'équipement", desc: "Sélection des matériels avec nos partenaires Kwanthic — marque française, garantie 5 ans." },
  { titre: "Installation & réception", desc: "Travaux réalisés par techniciens RGE, hors présence des résidents sur demande." },
  { titre: "Perception des aides", desc: "Aides versées à l'installateur. Vous signez la convention de mandat, c'est tout." },
];

export default function FraicheurEhpadPage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0A0E1A 0%, #0A1A2E 100%)" }} />
        <div
          className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-8 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #F5A000, transparent)" }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div
              className="badge mb-4"
              style={{ color: "#F5A000", background: "rgba(245,160,0,0.12)", border: "1px solid rgba(245,160,0,0.25)" }}
            >
              ❄️ Plan Fraîcheur 2026 — EHPAD & ESMS
            </div>
            <h1 className="section-title mb-6">
              Climatisez votre EHPAD<br />
              <span className="gradient-text">sans avancer un euro</span>
            </h1>
            <p className="section-sub mb-8">
              Plan Fraîcheur État, CEE tertiaire, TVA 5,5 % — PSGLOBAL Energy constitue votre dossier complet et gère l&apos;intégralité du financement de la climatisation de vos chambres et espaces communs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/eligibilite" className="btn-green text-base px-7 py-4">
                Tester l&apos;éligibilité de mon EHPAD →
              </Link>
              <Link href="/contact" className="btn-secondary text-base px-7 py-4">
                Demander un audit gratuit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AIDES */}
      <section className="py-16 bg-[#070A14]" aria-labelledby="aides-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Financements disponibles</div>
            <h2 id="aides-title" className="section-title mb-4">
              Jusqu&apos;à <span style={{ color: "#00C48C" }}>28 000 €</span> d&apos;aides cumulables
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AIDES.map((a) => (
              <div key={a.nom} className="card">
                <div className="font-display font-black text-2xl text-green mb-1">{a.montant}</div>
                <div className="font-body font-semibold text-white text-sm mb-2">{a.nom}</div>
                <p className="text-xs text-white/55 font-body leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÉQUIPEMENTS */}
      <section className="py-16" aria-labelledby="equipements-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Équipements éligibles</div>
            <h2 id="equipements-title" className="section-title mb-4">
              Tout ce qui protège<br />
              <span className="gradient-text">vos résidents de la chaleur</span>
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

      {/* PROCESS */}
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {PROCESS.map((p, i) => (
                <div key={p.titre} className="card text-center lg:text-left">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-body mb-3 mx-auto lg:mx-0"
                    style={{ background: "linear-gradient(135deg,#1A4DFF,#00C48C)" }}
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

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="card p-8" style={{ borderColor: "rgba(245,160,0,0.3)" }}>
            <div className="section-label mx-auto w-fit mb-4" style={{ color: "#F5A000", background: "rgba(245,160,0,0.12)", border: "1px solid rgba(245,160,0,0.25)" }}>
              Audit EHPAD gratuit
            </div>
            <h2 className="section-title mb-4">
              Votre EHPAD est-il éligible<br />au <span style={{ color: "#F5A000" }}>Plan Fraîcheur</span> ?
            </h2>
            <p className="section-sub mx-auto text-center mb-6">
              Répondez à 5 questions — nos experts vous envoient une simulation de financement sous 48 h, sans engagement.
            </p>
            <Link href="/eligibilite" className="btn-green text-base px-8 py-4 inline-flex">
              Vérifier l&apos;éligibilité de mon EHPAD →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
