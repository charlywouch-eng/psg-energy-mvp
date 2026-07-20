import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Conformité & agréments — RGE, ANAH, CEE | PSGLOBAL-ENERGY",
  description:
    "PSGLOBAL Energy travaille exclusivement avec des partenaires certifiés RGE. Découvrez nos agréments et notre conformité réglementaire.",
};

const CERTIFS = [
  { nom: "Partenaires RGE", desc: "Tous nos installateurs sont certifiés Reconnu Garant de l'Environnement — condition obligatoire pour débloquer MaPrimeRénov' et les CEE.", icon: "🏅" },
  { nom: "QualiPAC", desc: "Certification pour l'installation de pompes à chaleur air/eau et air/air.", icon: "✅" },
  { nom: "QualiSOL", desc: "Certification pour les systèmes solaires thermiques et photovoltaïques.", icon: "☀️" },
  { nom: "Qualibat", desc: "Qualification pour les travaux d'isolation thermique par l'extérieur et par l'intérieur.", icon: "🏗️" },
  { nom: "Fabrication française", desc: "Notre partenaire Kwanthic fabrique ses équipements en France, garantie 5 ans.", icon: "🇫🇷" },
  { nom: "Conformité ANAH 2026", desc: "Dossiers montés selon les barèmes et conditions de l'ANAH en vigueur au 1er janvier 2026.", icon: "📋" },
];

const REGLEMENTS = [
  { titre: "Décret tertiaire (2019)", desc: "Réduction obligatoire de 40 % des consommations d'énergie des bâtiments tertiaires de plus de 1 000 m² d'ici 2030." },
  { titre: "RE2020", desc: "Réglementation environnementale 2020 pour les constructions neuves — nos équipements sont compatibles." },
  { titre: "ANAH 2026", desc: "Mise à jour des barèmes MaPrimeRénov' et des conditions d'éligibilité applicables depuis le 1er janvier 2026." },
  { titre: "RGPD", desc: "Vos données sont traitées conformément au RGPD. Politique de confidentialité disponible sur ce site." },
];

export default function ConformitePage() {
  return (
    <>
      <Navbar />

      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="section-label mx-auto w-fit mb-4">Conformité &amp; agréments</div>
          <h1 className="section-title mb-6">
            Des garanties à chaque<br />
            <span className="gradient-text">étape du projet</span>
          </h1>
          <p className="section-sub mx-auto text-center">
            PSGLOBAL Energy sélectionne exclusivement des partenaires certifiés et garantit la conformité de chaque dossier aux réglementations en vigueur.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#070A14]" aria-labelledby="certifs-title">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Certifications &amp; labels</div>
            <h2 id="certifs-title" className="section-title mb-4">
              Nos <span className="gradient-text">garanties qualité</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERTIFS.map((c) => (
              <div key={c.nom} className="card flex gap-4">
                <div className="text-3xl shrink-0">{c.icon}</div>
                <div>
                  <h3 className="font-display font-extrabold text-base text-white mb-1">{c.nom}</h3>
                  <p className="text-xs text-white/55 font-body leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" aria-labelledby="regle-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Cadre réglementaire</div>
            <h2 id="regle-title" className="section-title mb-4">
              Conformité <span className="gradient-text">réglementaire</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {REGLEMENTS.map((r) => (
              <div key={r.titre} className="card flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-green shrink-0 mt-2.5" />
                <div>
                  <h3 className="font-display font-extrabold text-base text-white mb-1">{r.titre}</h3>
                  <p className="text-sm text-white/55 font-body leading-relaxed">{r.desc}</p>
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
