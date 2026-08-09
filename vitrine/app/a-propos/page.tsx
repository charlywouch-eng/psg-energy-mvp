import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DeontoBanner from "@/components/ui/DeontoBanner";

export const metadata: Metadata = {
  title: "À propos — PSGLOBAL Energy, régie commerciale en énergies renouvelables",
  description:
    "PSGLOBAL Energy (SAS) est une régie commerciale spécialisée en énergies renouvelables, intervenant en Île-de-France.",
};

export default function AProposPage() {
  return (
    <>
      <Navbar />
      <DeontoBanner />

      <section className="pt-32 pb-16 relative overflow-hidden bg-slate-50 border-b border-slate-200">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="section-label mx-auto w-fit mb-4">À propos</div>
          <h1 className="display text-3xl sm:text-4xl font-bold text-midnight-900 leading-[1.12] mb-6">
            PSGLOBAL Energy,<br />
            <span className="text-brand-emeraldDeep">la régie de confiance</span>
          </h1>
          <p className="text-slate-600 leading-relaxed mx-auto text-center max-w-2xl">
            Provider Services Groupe — SAS spécialisée en commercialisation d&apos;équipements d&apos;énergies renouvelables pour l&apos;Île-de-France.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
              <h2 className="display font-extrabold text-xl text-midnight-900 mb-4">Notre rôle</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                PSGLOBAL Energy est une <strong className="text-midnight-900">régie commerciale</strong> : nous commercialisons les équipements au nom d&apos;installateurs RGE certifiés, sans réaliser les installations nous-mêmes.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Ce modèle garantit à nos clients la meilleure sélection d&apos;équipements disponibles sur le marché, tout en s&apos;appuyant sur des installateurs de confiance, locaux et certifiés.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
              <h2 className="display font-extrabold text-xl text-midnight-900 mb-4">Nos zones d&apos;intervention</h2>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li className="flex items-center gap-2 text-slate-600">
                  <span className="text-brand-emeraldDeep">▸</span> Seine-et-Marne (77) — priorité confort d&apos;été
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <span className="text-brand-emeraldDeep">▸</span> Val-de-Marne (94)
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <span className="text-brand-emeraldDeep">▸</span> Essonne (91)
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <span className="text-brand-emeraldDeep">▸</span> Seine-Saint-Denis (93)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — bloc d'ancrage sombre unique */}
      <section className="py-16 bg-midnight-900">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-midnight-950 border border-midnight-800 p-8 rounded-2xl">
            <h2 className="display font-extrabold text-2xl text-white mb-4">
              Prêt à <span className="text-brand-emeraldDeep">démarrer votre projet</span> ?
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/eligibilite" className="btn-green">Tester mon éligibilité →</Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 font-bold text-sm border-2 border-white/30 text-white hover:border-white hover:bg-white/10 transition-colors duration-200">Nous contacter</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
