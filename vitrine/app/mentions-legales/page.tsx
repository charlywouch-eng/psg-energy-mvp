import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Mentions légales | PSGLOBAL-ENERGY",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-display font-extrabold text-3xl text-white mb-8">Mentions légales</h1>
        <div className="flex flex-col gap-8 text-sm font-body text-white/70 leading-relaxed">
          <section>
            <h2 className="font-display font-extrabold text-lg text-white mb-3">Éditeur du site</h2>
            <p>PSGLOBAL Energy — Provider Services Groupe</p>
            <p>SASU au capital de 1 000 €</p>
            <p>Immatriculation Jurisociété N°1727182 (SIREN en cours d&apos;attribution)</p>
            <p>Siège social : Île-de-France</p>
            <p>Email : <a href="mailto:contact@psglobal.energy" className="text-blue hover:text-white transition-colors">contact@psglobal.energy</a></p>
            <p>DPO : <a href="mailto:dpo@psglobal.energy" className="text-blue hover:text-white transition-colors">dpo@psglobal.energy</a></p>
          </section>
          <section>
            <h2 className="font-display font-extrabold text-lg text-white mb-3">Hébergeur</h2>
            <p>Vercel Inc. — 340 Pine Street Suite 701, San Francisco, CA 94104, USA</p>
            <p>Site : <span className="text-white/50">vercel.com</span></p>
          </section>
          <section>
            <h2 className="font-display font-extrabold text-lg text-white mb-3">Propriété intellectuelle</h2>
            <p>L&apos;ensemble des contenus du site psglobal.energy (textes, visuels, architecture) est la propriété exclusive de PSGLOBAL Energy. Toute reproduction est interdite sans autorisation écrite préalable.</p>
          </section>
          <section>
            <h2 className="font-display font-extrabold text-lg text-white mb-3">Responsabilité</h2>
            <p>PSGLOBAL Energy s&apos;efforce de maintenir les informations à jour mais ne garantit pas l&apos;exactitude des montants d&apos;aides présentés, susceptibles d&apos;évoluer selon la réglementation ANAH.</p>
          </section>
          <section>
            <h2 className="font-display font-extrabold text-lg text-white mb-3">Médiation</h2>
            <p>En cas de litige, vous pouvez saisir le médiateur MEDICYS : <span className="text-white/50">medicys.fr</span></p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
