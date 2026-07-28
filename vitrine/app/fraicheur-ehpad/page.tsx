import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SymbolesBande from "@/components/ui/SymbolesBande";

export const metadata: Metadata = {
  title: "Plan Fraîcheur EHPAD — Confort des résidents financé | Seine-et-Marne",
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

      {/* HERO — fond dégradé navy, URL hero à fournir par le client */}
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
              Vos résidents au frais,<br />
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

      {/* SYMBOLES — bande de bénéfices visuels */}
      <SymbolesBande variante="ehpad" />

      {/* AIDES */}
      <section className="py-16 bg-[#070A14]" aria-labelledby="aides-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Financements disponibles</div>
            <h2 id="aides-title" className="section-title mb-4">
              Jusqu&apos;à <span style={{ color: "#00C48C" }}>28 000 €</span> d&apos;aides cumulables
            </h2>
            <p className="text-xs text-white/35 font-body">
              Estimations indicatives — seul l&apos;organisme instructeur fait foi à la date de dépôt du dossier.
            </p>
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

      {/* SECTION BÉNÉFICE RÉSIDENT — image 1 */}
      <section className="py-16" aria-label="Confort et sérénité des résidents">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=900&q=80&fm=jpg"
                alt="Soignante attentive auprès d'une résidente âgée sereine"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={false}
              />
              {/* Légende discrète */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-xs text-white/70 font-body">
                  © Unsplash — illustration, pas un établissement client
                </p>
              </div>
            </div>
            <div>
              <div className="section-label mb-4" style={{ color: "#F5A000", background: "rgba(245,160,0,0.1)", border: "1px solid rgba(245,160,0,0.2)" }}>
                Confort & sérénité
              </div>
              <h2 className="section-title mb-4">
                Des résidents sereins<br />
                <span className="gradient-text">toute l&apos;année</span>
              </h2>
              <p className="section-sub mb-6">
                La chaleur estivale représente un risque réel pour les personnes âgées. Le Plan Fraîcheur État finance la climatisation de vos chambres, salons et espaces de vie — avec zéro avance sur les subventions.
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "Chambres, unités Alzheimer, espaces communs",
                  "Travaux hors présence des résidents sur demande",
                  "Installateurs RGE certifiés, garantie 5 ans",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-body text-white/65">
                    <span className="text-green mt-0.5" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ÉQUIPEMENTS */}
      <section className="py-16 bg-[#070A14]" aria-labelledby="equipements-title">
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

      {/* SECTION ACCOMPAGNEMENT ÉQUIPES — image 2 */}
      <section className="py-16" aria-label="Accompagnement des équipes soignantes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <div className="section-label mb-4">Notre accompagnement</div>
              <h2 className="section-title mb-4">
                Vos équipes se concentrent<br />
                <span className="gradient-text">sur les soins</span>
              </h2>
              <p className="section-sub mb-6">
                PSGLOBAL Energy prend en charge l&apos;intégralité du montage administratif et financier. Vos soignants n&apos;ont aucun dossier à constituer — nous coordonnons tout jusqu&apos;à la réception des travaux.
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "Dossier CEE, Plan Fraîcheur et TVA intégralement gérés",
                  "Coordination avec les installateurs RGE",
                  "Transmission des justificatifs aux organismes instructeurs",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-body text-white/65">
                    <span className="text-green mt-0.5" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-1 md:order-2">
              <Image
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=900&q=80&fm=jpg"
                alt="Mains d'un soignant accompagnant une personne âgée"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={false}
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-xs text-white/70 font-body">
                  © Unsplash — illustration, pas un établissement client
                </p>
              </div>
            </div>
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
