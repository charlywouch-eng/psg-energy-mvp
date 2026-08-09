import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EligibilityForm from "@/components/ui/EligibilityForm";
import DeontoBanner from "@/components/ui/DeontoBanner";

export const metadata: Metadata = {
  title: "Simulateur d'éligibilité — Confort d'été & CEE tertiaire 2026 | PSGLOBAL-ENERGY",
  description:
    "Estimez en 2 minutes vos guichets de financement : Fonds Vert, CEE tertiaire BAT-TH-113/116, Fonds qualité EHPAD. Sans engagement — réponse de nos experts sous 48 h.",
};

export default function EligibilitePage() {
  return (
    <>
      <div className="print:hidden"><Navbar /></div>
      <div className="print:hidden"><DeontoBanner /></div>

      <section className="relative pt-32 pb-20 bg-slate-50 border-b border-slate-200 print:pt-4 print:pb-4 print:bg-white print:border-0">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 print:hidden">
            <div className="section-label mx-auto w-fit mb-4">Simulateur d&apos;éligibilité</div>
            <h1 className="display text-3xl sm:text-4xl font-bold text-midnight-900 leading-[1.12] mb-4">
              Êtes-vous éligible aux<br />
              <span className="text-brand-emeraldDeep">financements 2026 ?</span>
            </h1>
            <p className="text-slate-600 leading-relaxed mx-auto text-center max-w-2xl">
              Répondez à quelques questions — nos experts identifient les guichets mobilisables et vous orientent sous 48 h.
            </p>
          </div>
          <EligibilityForm />
        </div>
      </section>

      <div className="print:hidden"><Footer /></div>
    </>
  );
}
