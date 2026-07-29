import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EligibilityForm from "@/components/ui/EligibilityForm";

export const metadata: Metadata = {
  title: "Simulateur d'éligibilité — Plan Fraîcheur 2026 & CEE tertiaire",
  description:
    "Estimez en 2 minutes vos financements disponibles : Plan Fraîcheur, Fonds Vert, CEE tertiaire. Sans engagement — réponse de nos experts sous 48 h.",
};

export default function EligibilitePage() {
  return (
    <>
      <Navbar />

      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Simulateur d&apos;éligibilité</div>
            <h1 className="section-title mb-4">
              Êtes-vous éligible aux<br />
              <span className="gradient-text">financements 2026 ?</span>
            </h1>
            <p className="section-sub mx-auto text-center">
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
