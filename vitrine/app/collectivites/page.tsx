import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Collectivités & Mairies — Rénovation énergétique 0 € avancé | PSGLOBAL-ENERGY",
  description:
    "Écoles, mairies, gymnases en Seine-et-Marne : climatisation et rénovation énergétique financées 100 % fonds publics. PSGLOBAL Energy monte votre dossier.",
};

const ETABLISSEMENTS = [
  { icon: "🏫", titre: "Écoles & collèges", desc: "Climatisation des salles de classe, isolation, VMC — priorité sur les bâtiments les plus anciens." },
  { icon: "🏛️", titre: "Mairie & hôtel de ville", desc: "Mise aux normes thermiques, PAC, panneaux solaires — réduisez la facture énergétique municipale." },
  { icon: "🏃", titre: "Gymnases & piscines", desc: "Pompes à chaleur, chauffage solaire, VMC haute performance pour équipements sportifs." },
  { icon: "🌳", titre: "Espaces publics", desc: "Éclairage LED solaire, bornes de recharge VE, îlots de fraîcheur pour les zones piétonnes." },
  { icon: "🏗️", titre: "Logements sociaux", desc: "Partenariat bailleur social — MaPrimeRénov' Copropriété, CEE, Éco-PTZ collectif." },
  { icon: "🚑", titre: "CCAS & structures d'accueil", desc: "Plan Fraîcheur pour centres d'accueil de jour, SAAD, résidences autonomie." },
];

const AIDES = [
  { nom: "CEE Tertiaire", montant: "variable", desc: "Selon surface et économies d'énergie réalisées — estimé lors de l'audit." },
  { nom: "DSIL / DETR", montant: "jusqu'à 30 %", desc: "Dotation de soutien à l'investissement local — selon préfecture de département." },
  { nom: "Plan Fraîcheur", montant: "8 000 €+", desc: "Pour établissements accueillant des publics vulnérables (petite enfance, seniors)." },
  { nom: "Fond Vert", montant: "40 à 80 %", desc: "Rénovation thermique des bâtiments publics — enveloppe annuelle à saisir avant octobre." },
];

export default function CollectivitesPage() {
  return (
    <>
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0A0E1A 0%, #0A1030 100%)" }} />
        <div
          className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-8 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #1A4DFF, transparent)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div
              className="badge mb-4"
              style={{ color: "#1A4DFF", background: "rgba(26,77,255,0.12)", border: "1px solid rgba(26,77,255,0.25)" }}
            >
              🏛️ Collectivités — 77 · 94 · 91 · 93
            </div>
            <h1 className="section-title mb-6">
              Rénovez vos bâtiments publics<br />
              <span className="gradient-text">financés à 100 %</span>
            </h1>
            <p className="section-sub mb-8">
              Fond Vert, DSIL, DETR, CEE, Plan Fraîcheur — PSGLOBAL Energy identifie et monte l&apos;ensemble des financements disponibles pour votre commune ou EPCI, sans mobiliser vos services techniques.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/eligibilite" className="btn-green text-base px-7 py-4">
                Simuler les aides disponibles →
              </Link>
              <Link href="/contact" className="btn-secondary text-base px-7 py-4">
                Contacter un conseiller
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ÉTABLISSEMENTS */}
      <section className="py-16 bg-[#070A14]" aria-labelledby="etab-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Bâtiments éligibles</div>
            <h2 id="etab-title" className="section-title mb-4">
              Tous vos équipements<br />
              <span className="gradient-text">sont concernés</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ETABLISSEMENTS.map((e) => (
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

      {/* AIDES */}
      <section className="py-16" aria-labelledby="aides-coll-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Dispositifs de financement</div>
            <h2 id="aides-coll-title" className="section-title mb-4">
              Des financements <span className="gradient-text">cumulables</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AIDES.map((a) => (
              <div key={a.nom} className="card">
                <div className="font-display font-black text-xl text-blue mb-1">{a.montant}</div>
                <div className="font-body font-semibold text-white text-sm mb-2">{a.nom}</div>
                <p className="text-xs text-white/55 font-body leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI PSG */}
      <section className="py-16 bg-[#070A14]" aria-labelledby="why-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="section-label mx-auto w-fit mb-4">Pourquoi PSGLOBAL Energy</div>
          <h2 id="why-title" className="section-title mb-8">
            Vous n&apos;avancez rien,<br />
            <span className="gradient-text">nous gérons tout</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-5 text-left">
            {[
              { icon: "📋", titre: "Ingénierie financière", desc: "Constitution complète des dossiers DSIL, DETR, CEE, Fond Vert — aucune ressource RH à mobiliser." },
              { icon: "🔧", titre: "Coordination travaux", desc: "Sélection des entreprises RGE, planning, suivi de chantier, réception des ouvrages." },
              { icon: "✅", titre: "Conformité garantie", desc: "Montage de dossiers aux normes ANAH 2026, décret tertiaire, accessibilité." },
            ].map((i) => (
              <div key={i.titre} className="card">
                <div className="text-2xl mb-3">{i.icon}</div>
                <h3 className="font-display font-extrabold text-base text-white mb-2">{i.titre}</h3>
                <p className="text-xs text-white/55 font-body leading-relaxed">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="card p-8" style={{ borderColor: "rgba(26,77,255,0.3)" }}>
            <h2 className="section-title mb-4">
              Audit collectivité <span className="gradient-text">gratuit</span>
            </h2>
            <p className="section-sub mx-auto text-center mb-6">
              Transmettez-nous vos coordonnées — nos experts répondent en 48 h avec une estimation de financements disponibles pour votre commune.
            </p>
            <Link href="/contact" className="btn-primary text-base px-8 py-4 inline-flex">
              Demander un audit collectivité →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
