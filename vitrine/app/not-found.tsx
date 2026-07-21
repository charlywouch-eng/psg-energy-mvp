import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <div className="font-display font-black text-[120px] leading-none gradient-text mb-4">
            404
          </div>
          <h1 className="font-display font-extrabold text-2xl text-white mb-4">
            Page introuvable
          </h1>
          <p className="text-white/60 font-body mb-8 leading-relaxed">
            Cette page n&apos;existe pas ou a été déplacée. Retournez à l&apos;accueil pour continuer.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn-green">
              Retour à l&apos;accueil →
            </Link>
            <Link href="/contact" className="btn-secondary">
              Nous contacter
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
