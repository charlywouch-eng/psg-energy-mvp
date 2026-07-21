import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "CGV — Conditions générales de vente | PSGLOBAL-ENERGY",
  robots: { index: false, follow: false },
};

export default function CgvPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-display font-extrabold text-3xl text-white mb-8">Conditions générales de vente</h1>
        <div className="flex flex-col gap-8 text-sm font-body text-white/70 leading-relaxed">
          <section>
            <h2 className="font-display font-extrabold text-lg text-white mb-3">1. Objet</h2>
            <p>Les présentes CGV régissent les relations commerciales entre PSGLOBAL Energy (ci-après « PSG ») et ses clients pour la commercialisation d&apos;équipements d&apos;énergies renouvelables et la prestation d&apos;ingénierie financière (montage de dossiers d&apos;aides).</p>
          </section>
          <section>
            <h2 className="font-display font-extrabold text-lg text-white mb-3">2. Droit de rétractation (loi Hamon)</h2>
            <p>Conformément aux articles L. 221-18 et suivants du Code de la consommation, tout consommateur dispose d&apos;un délai de <strong className="text-white">14 jours calendaires</strong> à compter de la signature du bon de commande pour exercer son droit de rétractation, sans pénalité et sans avoir à justifier de motif.</p>
            <p className="mt-2">Ce droit s&apos;exerce par lettre recommandée avec AR adressée à : PSGLOBAL Energy, contact@psglobal.energy.</p>
          </section>
          <section>
            <h2 className="font-display font-extrabold text-lg text-white mb-3">3. Prix et aides</h2>
            <p>Les montants d&apos;aides présentés sont indicatifs et basés sur les barèmes ANAH 2026 en vigueur. Le montant définitif est confirmé par l&apos;organisme compétent. PSGLOBAL Energy ne garantit pas l&apos;obtention des aides, mais s&apos;engage sur la qualité du dossier constitué.</p>
          </section>
          <section>
            <h2 className="font-display font-extrabold text-lg text-white mb-3">4. Garanties</h2>
            <p>Les équipements fournis bénéficient de la garantie légale de conformité (2 ans) et, selon les références, d&apos;une garantie constructeur de 5 ans.</p>
          </section>
          <section>
            <h2 className="font-display font-extrabold text-lg text-white mb-3">5. Médiation</h2>
            <p>En cas de litige non résolu amiablement, le client peut saisir le médiateur de la consommation MEDICYS — <span className="text-white/50">medicys.fr</span>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
