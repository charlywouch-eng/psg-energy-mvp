import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EligibilityForm from "@/components/ui/EligibilityForm";
import DeontoBanner from "@/components/ui/DeontoBanner";

export const metadata: Metadata = {
  title: "Simulateur d'éligibilité — Plan Fraîcheur 2026 & CEE tertiaire",
  description:
    "Estimez en 2 minutes vos financements disponibles : Plan Fraîcheur, Fonds Vert, CEE tertiaire. Sans engagement — réponse de nos experts sous 48 h.",
};

export default function EligibilitePage() {
  return (
    <>
      <Navbar />
      <DeontoBanner />

      <section className="relative pt-32 pb-20 bg-midnight-900">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Simulateur d&apos;éligibilité</div>
            <h1 className="display text-3xl sm:text-4xl font-bold text-white leading-[1.12] mb-4">
              Êtes-vous éligible aux<br />
              <span className="text-emerald-500">financements 2026 ?</span>
            </h1>
            <p className="text-slate-300 leading-relaxed mx-auto text-center max-w-2xl">
              Répondez à quelques questions — nos experts identifient les guichets mobilisables et vous orientent sous 48 h.
            </p>
          </div>
          <EligibilityForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
