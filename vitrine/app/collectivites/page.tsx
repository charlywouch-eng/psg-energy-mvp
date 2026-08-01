import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DeontoBanner from "@/components/ui/DeontoBanner";
import SymbolesBande from "@/components/ui/SymbolesBande";

export const metadata: Metadata = {
  title: "Collectivités & Mairies — Rénovation énergétique | PSGLOBAL-ENERGY",
  description:
    "Écoles, mairies, gymnases en Seine-et-Marne : Fonds Vert, CEE tertiaire, Plan Fraîcheur. PSGLOBAL Energy monte votre dossier sans mobiliser vos services techniques.",
};

const ETABLISSEMENTS = [
  { titre: "Écoles & collèges", desc: "Confort d'été passif (protections solaires extérieures, surventilation nocturne), isolation, VMC — priorité sur les bâtiments les plus anciens, en réduction des degrés-heures d'inconfort estival." },
  { titre: "Mairie & hôtel de ville", desc: "Mise aux normes thermiques — bouquet de gestes passif d'abord, PAC, panneaux solaires — réduisez la facture d'énergie municipale." },
  { titre: "Gymnases & piscines", desc: "Pompes à chaleur, chauffage solaire, VMC haute performance pour équipements sportifs." },
  { titre: "Espaces publics", desc: "Éclairage LED solaire, bornes de recharge VE, îlots de fraîcheur pour les zones piétonnes." },
  { titre: "Logements sociaux", desc: "Partenariat bailleur social — Fonds Vert, CEE, Éco-PTZ collectif." },
  { titre: "CCAS & structures d'accueil", desc: "Plan Fraîcheur pour centres d'accueil de jour, SAAD, résidences autonomie." },
];

const FINANCEMENTS = [
  { nom: "CEE Tertiaire", montant: "variable", desc: "Selon surface et économies d'énergie réalisées — estimé lors du diagnostic." },
  { nom: "DSIL / DETR", montant: "jusqu'à 30 %", desc: "Dotation de soutien à l'investissement local — selon préfecture de département." },
  { nom: "Plan Fraîcheur", montant: "8 000 €+", desc: "Pour établissements accueillant des publics vulnérables (petite enfance, seniors)." },
  { nom: "Fonds Vert", montant: "40 à 80 %", desc: "Rénovation thermique des bâtiments publics — enveloppe annuelle à saisir avant octobre." },
];

export default function CollectivitesPage() {
  return (
    <>
      <DeontoBanner />
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-midnight-900">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mono text-[11px] font-bold text-brand-emeraldDeep uppercase tracking-widest mb-4">
                Collectivités — 77 · 94 · 91 · 93
              </div>
              <h1 className="display text-4xl sm:text-5xl font-bold text-white leading-[1.12] mb-6">
                Rénovez vos bâtiments publics avec{" "}
                <span className="text-brand-emeraldDeep">une ingénierie financière dédiée.</span>
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8 font-medium">
                Fonds Vert, DSIL, DETR, CEE tertiaire, Plan Fraîcheur — PSGLOBAL Energy identifie et monte
                l&apos;ensemble des financements disponibles pour votre commune ou EPCI, sans mobiliser vos
                services techniques.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/eligibilite" className="inline-flex items-center gap-2 bg-brand-emeraldDeep text-white font-bold text-base px-7 py-4 hover:bg-emerald-800 transition-colors">
                  Simuler les financements disponibles
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 border-2 border-slate-600 text-white font-semibold text-base px-7 py-4 hover:border-slate-400 transition-colors">
                  Contacter un conseiller
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center">
              <Image
                src="/images/hero-collectivites.svg"
                alt="Illustration : bâtiment public ombragé par de grands arbres, enfants au frais, soleil filtré — confort d'été avant printemps 2027"
                width={480}
                height={400}
                className="w-full max-w-md"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* SYMBOLES */}
      <SymbolesBande variante="collectivites" />

      {/* ÉTABLISSEMENTS */}
      <section className="py-16 bg-midnight-950" aria-labelledby="etab-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="mono text-[11px] font-bold text-brand-emeraldDeep uppercase tracking-widest mb-4">
              Bâtiments éligibles
            </div>
            <h2 id="etab-title" className="display text-3xl font-bold text-white mb-4">
              Tous vos équipements sont concernés
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ETABLISSEMENTS.map((e) => (
              <div key={e.titre} className="bg-midnight-900 border border-midnight-800 p-6 border-t-2 border-t-emerald-500">
                <h3 className="font-bold text-base text-white mb-2">{e.titre}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINANCEMENTS */}
      <section className="py-16 bg-midnight-900" aria-labelledby="aides-coll-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="mono text-[11px] font-bold text-brand-emeraldDeep uppercase tracking-widest mb-4">
              Dispositifs de financement
            </div>
            <h2 id="aides-coll-title" className="display text-3xl font-bold text-white mb-4">
              Des financements cumulables
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FINANCEMENTS.map((a) => (
              <div key={a.nom} className="bg-midnight-950 border border-midnight-800 p-6">
                <div className="display font-bold text-xl text-brand-emeraldDeep mb-1">{a.montant}</div>
                <div className="font-semibold text-white text-sm mb-2">{a.nom}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI PSG */}
      <section className="py-16 bg-midnight-950" aria-labelledby="why-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="mono text-[11px] font-bold text-brand-emeraldDeep uppercase tracking-widest mb-4">
            Pourquoi PSGLOBAL Energy
          </div>
          <h2 id="why-title" className="display text-3xl font-bold text-white mb-8">
            Vous n&apos;avancez rien, nous gérons tout
          </h2>
          <div className="grid sm:grid-cols-3 gap-5 text-left">
            {[
              { titre: "Ingénierie financière", desc: "Constitution complète des dossiers DSIL, DETR, CEE, Fonds Vert — aucune ressource RH à mobiliser." },
              { titre: "Coordination travaux", desc: "Sélection des entreprises RGE, planning, suivi de chantier, réception des ouvrages." },
              { titre: "Conformité garantie", desc: "Montage de dossiers aux normes décret tertiaire, Fonds Vert 2026, accessibilité." },
            ].map((item) => (
              <div key={item.titre} className="bg-midnight-900 border border-midnight-800 p-6 border-t-2 border-t-emerald-500">
                <h3 className="font-bold text-base text-white mb-2">{item.titre}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-midnight-900 border border-midnight-800 p-5">
            <p className="text-xs text-slate-400 leading-relaxed text-center">
              Notre méthode s&apos;inscrit dans la démarche Bâtiments Durables Franciliens et s&apos;appuie sur les
              enseignements du programme RACINE et la Charte de la rénovation du bâti scolaire (Cerema&nbsp;/&nbsp;CSTB).
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-midnight-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-midnight-950 border border-midnight-800 p-8">
            <h2 className="display text-3xl font-bold text-white mb-4">
              Diagnostic collectivité sans engagement
            </h2>
            <p className="text-slate-300 mx-auto mb-6">
              Transmettez-nous vos coordonnées — nos experts répondent en 48 h avec une estimation de
              financements disponibles pour votre commune.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-midnight-800 hover:bg-midnight-950 text-white font-bold text-base px-8 py-4 transition-colors border border-midnight-800">
              Demander un diagnostic collectivité
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
