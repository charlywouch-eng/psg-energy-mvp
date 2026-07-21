import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EligibilityForm from "@/components/ui/EligibilityForm";

export const metadata: Metadata = {
  title: "Simulateur d'éligibilité — Aides ANAH 2026 & Plan Fraîcheur",
  description:
    "Estimez en 2 minutes vos droits aux aides ANAH 2026, CEE et Plan Fraîcheur. Gratuit, sans engagement — réponse de nos experts sous 48 h.",
};

export default function EligibilitePage() {
  return (
    <>
      <Navbar />

      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label mx-auto w-fit mb-4">Simulateur gratuit</div>
            <h1 className="section-title mb-4">
              Êtes-vous éligible aux<br />
              <span className="gradient-text">aides 2026 ?</span>
            </h1>
            <p className="section-sub mx-auto text-center">
              Répondez à quelques questions — nos experts calculent votre plan de financement personnalisé sous 48 h.
            </p>
          </div>
          <EligibilityForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
