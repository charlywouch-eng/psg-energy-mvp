import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DeontoBanner from "@/components/ui/DeontoBanner";
import SymbolesBande from "@/components/ui/SymbolesBande";

export const metadata: Metadata = {
  title: "Plan Fraîcheur EHPAD — Confort des résidents financé | Seine-et-Marne",
  description:
    "Rafraîchissement passif, PAC, ventilation et isolation pour vos résidents EHPAD — financement via CEE, Fonds Vert et fonds qualité. PSGLOBAL Energy, Seine-et-Marne & IDF.",
};

const FINANCEMENTS = [
  { nom: "Fonds qualité EHPAD", statut: "Éligibilité selon profil établissement", desc: "Guichet dédié aux établissements accueillant des personnes vulnérables — montant calculé après diagnostic." },
  { nom: "CEE tertiaire", statut: "Variable selon surface et économies", desc: "Certificats d'Économie d'Énergie pour bâtiments construits avant 2010 — estimé lors du diagnostic." },
  { nom: "Fonds Vert", statut: "Selon enveloppe annuelle préfectorale", desc: "Rénovation thermique des établissements médico-sociaux — instruction par la préfecture de département." },
  { nom: "Fonds qualité complémentaire", statut: "Selon profil et département", desc: "Guichet complémentaire mobilisable selon le profil de l'établissement et le département." },
];

const EQUIPEMENTS = [
  { titre: "Rafraîchissement passif", desc: "Protections solaires extérieures motorisées, stores, surventilation nocturne — efficaces sans aucun équipement actif." },
  { titre: "VMC double-flux", desc: "Ventilation mécanique contrôlée pour renouveler l'air sans déperdition thermique." },
  { titre: "Pompe à chaleur air/eau", desc: "Remplacement de chaudière fossile par une PAC réversible pour le chauffage et le confort d'été." },
  { titre: "Panneaux photovoltaïques", desc: "Autoconsommation pour réduire la facture d'énergie de l'établissement." },
  { titre: "Isolation thermique (ITE)", desc: "Isolation par l'extérieur des murs et combles — réduit les degrés-heures d'inconfort estival." },
  { titre: "Régulation intelligente", desc: "Thermostat connecté par zone, pilotage depuis la direction, suivi de la performance énergétique." },
];

const PROCESS = [
  { titre: "Diagnostic d'éligibilité", desc: "Visite sur site ou dossier à distance — bilan thermique, plans, DPE, effectifs." },
  { titre: "Ingénierie financière", desc: "Dossier CEE, Fonds vert et fonds qualité — guichets mobilisables confirmés sous 48 h." },
  { titre: "Choix de l'équipement", desc: "Sélection des matériels avec nos partenaires installateurs RGE certifiés — marque française, garantie 5 ans." },
  { titre: "Installation & réception", desc: "Travaux réalisés par techniciens RGE, hors présence des résidents sur demande." },
  { titre: "Versement des subventions", desc: "Subventions versées à l'installateur. Vous signez la convention de mandat, c'est tout." },
];

export default function FraicheurEhpadPage() {
  return (
    <>
      <DeontoBanner />
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-midnight-900">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Colonne texte */}
            <div>
              <div className="mono text-[11px] font-bold text-brand-emeraldDeep uppercase tracking-widest mb-4">
                Plan Fraîcheur 2026 — EHPAD & ESMS
              </div>
              <h1 className="display text-4xl sm:text-5xl font-bold text-white leading-[1.12] mb-6">
                Vos résidents au frais,{" "}
                <span className="text-brand-emeraldDeep">financements sécurisés.</span>
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-3 font-medium">
                Fonds vert, CEE tertiaire, fonds qualité — PSGLOBAL Energy monte et pilote votre dossier de financement pour le rafraîchissement (confort d&apos;été) de vos chambres, salons et espaces de vie.
              </p>
              <p className="text-xs text-slate-500 mb-8">
                Estimations indicatives — seul l&apos;organisme instructeur fait foi à la date de dépôt du dossier.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/eligibilite" className="inline-flex items-center gap-2 bg-brand-emeraldDeep text-white font-bold text-base px-7 py-4 hover:bg-emerald-800 transition-colors">
                  Tester l&apos;éligibilité de mon EHPAD
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 border-2 border-slate-600 text-white font-semibold text-base px-7 py-4 hover:border-slate-400 transition-colors">
                  Demander un diagnostic
                </Link>
              </div>
            </div>

            {/* Colonne illustration */}
            <div className="hidden lg:flex items-center justify-center">
              <Image
                src="/images/hero-fraicheur-ehpad.svg"
                alt="Fenêtre lumineuse, fauteuil confortable, plante verte — confort et sérénité des résidents EHPAD"
                width={480}
                height={400}
                className="w-full max-w-md"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* SYMBOLES — bénéfices visuels */}
      <SymbolesBande variante="ehpad" />

      {/* FINANCEMENTS */}
      <section className="py-16 bg-midnight-950" aria-labelledby="financements-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="mono text-[11px] font-bold text-brand-emeraldDeep uppercase tracking-widest mb-4">
              Guichets disponibles
            </div>
            <h2 id="financements-title" className="display text-3xl font-bold text-white mb-2">
              Guichets mobilisables selon votre profil
            </h2>
            <p className="text-xs text-slate-500">
              Estimations indicatives — seul l&apos;organisme instructeur fait foi à la date de dépôt du dossier.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FINANCEMENTS.map((f) => (
              <div key={f.nom} className="bg-midnight-900 border border-midnight-800 p-6">
                <div className="mono text-[11px] font-bold text-brand-emeraldDeep uppercase tracking-wide mb-2">{f.statut}</div>
                <div className="font-semibold text-white text-sm mb-2">{f.nom}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION BÉNÉFICE RÉSIDENT */}
      <section className="py-16 bg-midnight-900" aria-label="Confort et sérénité des résidents">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=900&q=80&fm=jpg"
                alt="Soignante attentive auprès d'une résidente âgée sereine"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={false}
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-xs text-white/70">
                  © Unsplash — illustration, pas un établissement client
                </p>
              </div>
            </div>
            <div>
              <div className="mono text-[11px] font-bold text-brand-emeraldDeep uppercase tracking-widest mb-4">
                Confort & sérénité
              </div>
              <h2 className="display text-3xl font-bold text-white mb-4">
                Des résidents sereins toute l&apos;année
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                La chaleur estivale est un enjeu de sécurité pour les personnes âgées. PSGLOBAL Energy mobilise les guichets Fonds vert, fonds qualité et CEE pour le rafraîchissement de vos chambres, salons et espaces de vie.
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "Chambres, unités Alzheimer, espaces communs",
                  "Travaux hors présence des résidents sur demande",
                  "Installateurs RGE certifiés, garantie 5 ans",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                    <svg className="w-4 h-4 text-brand-emeraldDeep mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ÉQUIPEMENTS */}
      <section className="py-16 bg-midnight-950" aria-labelledby="equipements-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="mono text-[11px] font-bold text-brand-emeraldDeep uppercase tracking-widest mb-4">
              Équipements éligibles
            </div>
            <h2 id="equipements-title" className="display text-3xl font-bold text-white mb-4">
              Tout ce qui protège vos résidents de la chaleur
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EQUIPEMENTS.map((e) => (
              <div key={e.titre} className="bg-midnight-900 border border-midnight-800 p-6">
                <div className="w-8 h-8 bg-brand-emeraldDeep/10 border border-brand-emeraldDeep/30 flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-brand-emeraldDeep" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-base text-white mb-1">{e.titre}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION ACCOMPAGNEMENT ÉQUIPES */}
      <section className="py-16 bg-midnight-900" aria-label="Accompagnement des équipes soignantes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <div className="mono text-[11px] font-bold text-brand-emeraldDeep uppercase tracking-widest mb-4">
                Notre accompagnement
              </div>
              <h2 className="display text-3xl font-bold text-white mb-4">
                Vos équipes se concentrent sur les soins
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                PSGLOBAL Energy prend en charge l&apos;intégralité du montage administratif et financier. Vos soignants n&apos;ont aucun dossier à constituer — nous coordonnons tout jusqu&apos;à la réception des travaux.
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "Dossier CEE, Fonds vert et fonds qualité intégralement montés",
                  "Coordination avec les installateurs RGE",
                  "Transmission des justificatifs aux organismes instructeurs",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                    <svg className="w-4 h-4 text-brand-emeraldDeep mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden order-1 md:order-2">
              <Image
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=900&q=80&fm=jpg"
                alt="Mains d'un soignant accompagnant une personne âgée"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={false}
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-xs text-white/70">
                  © Unsplash — illustration, pas un établissement client
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 bg-midnight-950" aria-labelledby="process-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="mono text-[11px] font-bold text-brand-emeraldDeep uppercase tracking-widest mb-4">
              Notre méthode
            </div>
            <h2 id="process-title" className="display text-3xl font-bold text-white mb-4">
              De l&apos;audit à la livraison, nous gérons tout
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {PROCESS.map((p, i) => (
              <div key={p.titre} className="bg-midnight-900 border border-midnight-800 p-6 border-t-2 border-t-emerald-500">
                <span className="mono text-emerald-400 text-xs">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-bold text-sm text-white mt-2 mb-1">{p.titre}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-midnight-900 border border-midnight-800 p-4 flex gap-3 items-start">
            <svg className="w-5 h-5 text-brand-emeraldDeep shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-slate-400 leading-relaxed">
              Notre méthode s&apos;inscrit dans la démarche{" "}
              <span className="text-white font-semibold">Bâtiments Durables Franciliens</span>{" "}
              et s&apos;appuie sur les enseignements du programme RACINE et la Charte de la rénovation du bâti scolaire (Cerema&nbsp;/&nbsp;CSTB).
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-midnight-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-midnight-950 border border-midnight-800 p-8">
            <div className="mono text-[11px] font-bold text-brand-emeraldDeep uppercase tracking-widest mb-4">
              Diagnostic EHPAD
            </div>
            <h2 className="display text-3xl font-bold text-white mb-4">
              Votre EHPAD est-il éligible aux guichets de rafraîchissement&nbsp;?
            </h2>
            <p className="text-slate-300 mx-auto mb-6">
              Répondez à 5 questions — nos experts vous envoient une simulation de financement sous 48 h, sans engagement.
            </p>
            <Link href="/eligibilite" className="inline-flex items-center gap-2 bg-brand-emeraldDeep text-white font-bold text-base px-8 py-4 hover:bg-emerald-800 transition-colors">
              Vérifier l&apos;éligibilité de mon EHPAD
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
