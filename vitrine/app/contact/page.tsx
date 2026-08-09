import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/ui/ContactForm";
import DeontoBanner from "@/components/ui/DeontoBanner";

export const metadata: Metadata = {
  title: "Contact — Diagnostic d'éligibilité en 48 h | PSGLOBAL-ENERGY",
  description:
    "Contactez PSGLOBAL Energy pour un diagnostic de faisabilité. Réponse sous 48 h — Seine-et-Marne et Île-de-France.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <DeontoBanner />

      <section className="pt-32 pb-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Infos */}
            <div>
              <div className="section-label mb-4">Parlons de votre projet</div>
              <h1 className="display text-3xl sm:text-4xl font-bold text-midnight-900 leading-[1.12] mb-6">
                Un expert vous répond<br />
                <span className="text-brand-emeraldDeep">sous 48 heures</span>
              </h1>
              <p className="text-slate-600 leading-relaxed mb-8">
                Diagnostic d&apos;éligibilité, sans engagement — nos conseillers analysent votre situation et identifient les guichets de financement mobilisables.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                      </svg>
                    ),
                    label: "Email",
                    val: "contact@psglobal.energy",
                    href: "mailto:contact@psglobal.energy",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253"/>
                      </svg>
                    ),
                    label: "Site",
                    val: "psglobal.energy",
                    href: "https://psglobal.energy",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="#047857" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                      </svg>
                    ),
                    label: "Zone",
                    val: "Seine-et-Marne (77) · Val-de-Marne (94) · Essonne (91) · Seine-St-Denis (93)",
                    href: null,
                  },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-3">
                    <span className="shrink-0 mt-0.5">{c.icon}</span>
                    <div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="text-sm text-slate-700 hover:text-brand-emeraldDeep transition-colors">
                          {c.val}
                        </a>
                      ) : (
                        <div className="text-sm text-slate-700">{c.val}</div>
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
