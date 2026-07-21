import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Audit gratuit en 48 h | PSGLOBAL-ENERGY",
  description:
    "Contactez PSGLOBAL Energy pour un audit de faisabilité gratuit. Réponse sous 48 h — Seine-et-Marne et Île-de-France.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Infos */}
            <div>
              <div className="section-label mb-4">Parlons de votre projet</div>
              <h1 className="section-title mb-6">
                Un expert vous répond<br />
                <span className="gradient-text">sous 48 heures</span>
              </h1>
              <p className="section-sub mb-8">
                Audit gratuit, sans engagement — nos conseillers analysent votre situation et vous proposent un plan de financement optimisé.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  { icon: "📧", label: "Email", val: "contact@psglobal.energy", href: "mailto:contact@psglobal.energy" },
                  { icon: "🌐", label: "Site", val: "psglobal.energy", href: "https://psglobal.energy" },
                  { icon: "📍", label: "Zone", val: "Seine-et-Marne (77) · Val-de-Marne (94) · Essonne (91) · Seine-St-Denis (93)", href: null },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-3">
                    <span className="text-xl shrink-0">{c.icon}</span>
                    <div>
                      <div className="text-xs font-body font-semibold text-white/40 uppercase tracking-wide mb-0.5">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="text-sm font-body text-white/80 hover:text-white transition-colors">
                          {c.val}
                        </a>
                      ) : (
                        <div className="text-sm font-body text-white/80">{c.val}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulaire */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
