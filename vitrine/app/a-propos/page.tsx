import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "À propos — PSGLOBAL Energy, régie commerciale en énergies renouvelables",
  description:
    "PSGLOBAL Energy (SASU) est une régie commerciale spécialisée en énergies renouvelables, intervenant en Île-de-France et en zone CEMAC.",
};

export default function AProposPage() {
  return (
    <>
      <Navbar />

      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="section-label mx-auto w-fit mb-4">À propos</div>
          <h1 className="section-title mb-6">
            PSGLOBAL Energy,<br />
            <span className="gradient-text">la régie de confiance</span>
          </h1>
          <p className="section-sub mx-auto text-center">
            Provider Services Groupe — SASU spécialisée en commercialisation d&apos;équipements d&apos;énergies renouvelables pour l&apos;Île-de-France et la zone CEMAC.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card">
              <h2 className="font-display font-extrabold text-xl text-white mb-4">Notre rôle</h2>
              <p className="text-sm text-white/65 font-body leading-relaxed mb-3">
                PSGLOBAL Energy est une <strong className="text-white">régie commerciale</strong> : nous commercialisons les équipements au nom d&apos;installateurs RGE certifiés, sans réaliser les installations nous-mêmes.
              </p>
              <p className="text-sm text-white/65 font-body leading-relaxed">
                Ce modèle garantit à nos clients la meilleure sélection d&apos;équipements disponibles sur le marché, tout en s&apos;appuyant sur des installateurs de confiance, locaux et certifiés.
              </p>
            </div>
            <div className="card">
              <h2 className="font-display font-extrabold text-xl text-white mb-4">Nos zones d&apos;intervention</h2>
              <ul className="flex flex-col gap-2.5 text-sm font-body">
                <li className="flex items-center gap-2 text-white/70">
                  <span className="text-blue">▸</span> Seine-et-Marne (77) — priorité Plan Fraîcheur
                </li>
                <li className="flex items-center gap-2 text-white/70">
                  <span className="text-blue">▸</span> Val-de-Marne (94)
                </li>
                <li className="flex items-center gap-2 text-white/70">
                  <span className="text-blue">▸</span> Essonne (91)
                </li>
                <li className="flex items-center gap-2 text-white/70">
                  <span className="text-blue">▸</span> Seine-Saint-Denis (93)
                </li>
                <li className="flex items-center gap-2 text-white/70">
                  <span className="text-gold">▸</span> Congo Brazzaville &amp; zone CEMAC (à venir)
                </li>
              </ul>
            </div>
          </div>

          <div className="card p-8 text-center">
            <h2 className="font-display font-extrabold text-2xl text-white mb-4">
              Prêt à <span className="gradient-text">démarrer votre projet</span> ?
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/eligibilite" className="btn-green">Tester mon éligibilité →</Link>
              <Link href="/contact" className="btn-secondary">Nous contacter</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
