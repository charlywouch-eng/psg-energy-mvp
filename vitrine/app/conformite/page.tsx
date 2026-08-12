import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DeontoBanner from "@/components/ui/DeontoBanner";

export const metadata: Metadata = {
  title: "Conformité & agréments — RGE, Fonds Vert, CEE | PSGLOBAL-ENERGY",
  description:
    "PSGLOBAL Energy travaille exclusivement avec des partenaires certifiés RGE. Découvrez nos agréments et notre conformité réglementaire.",
};

const CERTIFS = [
  {
    nom: "Partenaires RGE",
    desc: "Tous nos installateurs sont certifiés Reconnu Garant de l'Environnement — condition obligatoire pour débloquer les CEE et le Fonds Vert.",
    icon: (
      <svg className="w-6 h-6 shrink-0" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
      </svg>
    ),
  },
  {
    nom: "QualiPAC",
    desc: "Certification pour l'installation de pompes à chaleur air/eau et air/air.",
    icon: (
      <svg className="w-6 h-6 shrink-0" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
  {
    nom: "QualiSOL",
    desc: "Certification pour les systèmes solaires thermiques et photovoltaïques.",
    icon: (
      <svg className="w-6 h-6 shrink-0" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
      </svg>
    ),
  },
  {
    nom: "Qualibat",
    desc: "Qualification pour les travaux d'isolation thermique par l'extérieur et par l'intérieur.",
    icon: (
      <svg className="w-6 h-6 shrink-0" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
  },
  {
    nom: "Équipements partenaires RGE",
    desc: "Nos partenaires installateurs RGE certifiés proposent des équipements de qualité, garantie constructeur installateur RGE.",
    icon: (
      <svg className="w-6 h-6 shrink-0" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
      </svg>
    ),
  },
  {
    nom: "Conformité réglementaire 2026",
    desc: "Dossiers montés selon les barèmes Fonds Vert, CEE et décret tertiaire en vigueur au 1er janvier 2026.",
    icon: (
      <svg className="w-6 h-6 shrink-0" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
  },
];

const REGLEMENTS = [
  { titre: "Décret tertiaire (2019)", desc: "Réduction obligatoire de 40 % des consommations d'énergie des bâtiments tertiaires de plus de 1 000 m² d'ici 2030." },
  { titre: "RE2020", desc: "Réglementation environnementale 2020 pour les constructions neuves — nos équipements sont compatibles." },
  { titre: "Fonds Vert / CEE 2026", desc: "Mise à jour des barèmes Fonds Vert et CEE tertiaire applicables depuis le 1er janvier 2026." },
  { titre: "RGPD", desc: "Vos données sont traitées conformément au RGPD. Politique de confidentialité disponible sur ce site." },
];

export default function ConformitePage() {
  return (
    <>
      <Navbar />
      <DeontoBanner />

      <section className="pt-32 pb-16 relative overflow-hidden bg-slate-50 border-b border-slate-200">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="section-label mx-auto w-fit mb-4">Conformité &amp; agréments</div>
          <h1 className="display text-3xl sm:text-4xl font-bold text-midnight-900 leading-[1.12] mb-6">
            Des garanties à chaque<br />
            <span className="text-brand-emeraldDeep">étape du projet</span>
          </h1>
          <p className="text-slate-600 leading-relaxed mx-auto text-center max-w-2xl">
            PSGLOBAL Energy sélectionne exclusivement des partenaires certifiés et garantit la conformité de chaque dossier aux réglementations en vigueur.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-slate-200" aria-labelledby="certifs-title">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Certifications &amp; labels</div>
            <h2 id="certifs-title" className="display text-3xl sm:text-4xl font-bold text-midnight-900 leading-[1.12] mb-4">
              Nos <span className="text-brand-emeraldDeep">garanties qualité</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERTIFS.map((c) => (
              <div key={c.nom} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex gap-4">
                {c.icon}
                <div>
                  <h3 className="display font-extrabold text-base text-midnight-900 mb-1">{c.nom}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-b border-slate-200" aria-labelledby="regle-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Cadre réglementaire</div>
            <h2 id="regle-title" className="display text-3xl sm:text-4xl font-bold text-midnight-900 leading-[1.12] mb-4">
              Conformité <span className="text-brand-emeraldDeep">réglementaire</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {REGLEMENTS.map((r) => (
              <div key={r.titre} className="bg-white border border-slate-200 p-6 rounded-2xl flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-brand-emeraldDeep shrink-0 mt-2.5" />
                <div>
                  <h3 className="display font-extrabold text-base text-midnight-900 mb-1">{r.titre}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
