import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SymbolesBande from "@/components/ui/SymbolesBande";

export const metadata: Metadata = {
  title: "PSGLOBAL-ENERGY — Plan Fraîcheur EHPAD & Collectivités | 0 € avancé",
  description:
    "Confort d'été, PAC, isolation pour EHPAD et collectivités de Seine-et-Marne — Fonds Vert, CEE tertiaire, Fonds qualité. 0 € avancé, diagnostic d'éligibilité en 48 h — PSGLOBAL Energy.",
};

const CHIFFRES = [
  { val: "Fonds Vert", label: "CEE tertiaire · ACTEE · Plan Fraîcheur", color: "text-green" },
  { val: "0 €", label: "avancé par l'établissement", color: "text-blue" },
  { val: "48 h", label: "pour votre diagnostic de faisabilité", color: "text-gold" },
  { val: "RGE", label: "installateurs certifiés", color: "text-white" },
];

const SOLUTIONS = [
  {
    icon: "❄️",
    titre: "Plan Fraîcheur EHPAD",
    desc: "Rafraîchissement passif, ventilation double-flux et protection solaire pour vos résidents. Zéro avance sur subventions État et CEE.",
    href: "/fraicheur-ehpad",
    badge: "Priorité canicule",
    badgeColor: "#F5A000",
    badgeBg: "rgba(245,160,0,0.12)",
    badgeBorder: "rgba(245,160,0,0.25)",
  },
  {
    icon: "🏛️",
    titre: "Collectivités & mairies",
    desc: "Écoles, mairies, gymnases, bâtiments municipaux — nous montons votre dossier de financement de A à Z.",
    href: "/collectivites",
    badge: "77 · 94 · 91 · 93",
    badgeColor: "#1A4DFF",
    badgeBg: "rgba(26,77,255,0.12)",
    badgeBorder: "rgba(26,77,255,0.25)",
  },
  {
    icon: "🏠",
    titre: "Particuliers",
    desc: "CEE, Éco-PTZ — nos conseillers identifient les guichets mobilisables pour les propriétaires particuliers.",
    href: "/particuliers",
    badge: "Île-de-France",
    badgeColor: "#00C48C",
    badgeBg: "rgba(0,196,140,0.12)",
    badgeBorder: "rgba(0,196,140,0.25)",
  },
];

const ETAPES = [
  { n: "01", titre: "Diagnostic d'éligibilité 48 h", desc: "Nous analysons vos droits aux financements publics et vous envoyons une synthèse financière sans engagement." },
  { n: "02", titre: "Montage du dossier", desc: "Notre équipe constitue l'intégralité des dossiers Fonds Vert, CEE, Fonds qualité à votre place." },
  { n: "03", titre: "Installation RGE", desc: "Nos partenaires installateurs certifiés RGE réalisent les travaux dans les délais convenus." },
  { n: "04", titre: "Versement des subventions", desc: "Les subventions sont versées directement à l'installateur. Vous ne payez que le reste à charge maîtrisé." },
];

const TEMOIGNAGES = [
  {
    nom: "Directrice EHPAD Val-de-Marne",
    extrait: "En 3 semaines, PSGLOBAL a monté notre dossier Plan Fraîcheur pour 48 chambres. Zéro avance de fonds, tout a été financé via les CEE.",
    dept: "94",
  },
  {
    nom: "DGS commune Seine-et-Marne",
    extrait: "La mairie a bénéficié d'une PAC air/eau pour la salle polyvalente sans débourser un centime. Dossier bouclé en un mois.",
    dept: "77",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #1A4DFF, transparent)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #00C48C, transparent)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "40px 40px" }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label animate-fade-up">
                ❄️ Plan Fraîcheur 2026 — Seine-et-Marne &amp; IDF
              </div>

              <h1 className="section-title mt-4 mb-6 animate-fade-up animate-delay-100">
                Confort d&apos;été pour vos{" "}
                <span className="gradient-text">EHPAD &amp; bâtiments</span>{" "}
                publics à{" "}
                <span style={{ color: "#F5A000" }}>0 € avancé</span>
              </h1>

              <p className="section-sub mb-8 animate-fade-up animate-delay-200">
                Fonds vert, CEE tertiaire, fonds qualité — PSGLOBAL Energy monte et pilote votre dossier de financement pour le rafraîchissement (confort d&apos;été) de vos chambres et espaces communs.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-12 animate-fade-up animate-delay-300">
                <Link href="/eligibilite" className="btn-green text-base px-7 py-4">
                  Tester mon éligibilité →
                </Link>
                <Link href="/fraicheur-ehpad" className="btn-secondary text-base px-7 py-4">
                  Découvrir le Plan Fraîcheur
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 animate-fade-up animate-delay-400">
                {CHIFFRES.map((c) => (
                  <div key={c.val} className="card p-4 text-center">
                    <div className={`font-display font-black text-3xl ${c.color} leading-none mb-1`}>{c.val}</div>
                    <div className="text-xs text-white/50 font-body leading-snug">{c.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/30 font-body mt-4 animate-fade-up animate-delay-400">
                Estimations indicatives — seul l&apos;organisme instructeur fait foi à la date d&apos;un dépôt.
              </p>
            </div>

            <div className="hidden lg:flex items-center justify-center animate-fade-up animate-delay-200">
              <Image
                src="/images/hero-fraicheur-ehpad.svg"
                alt="Illustration : fenêtre en arc avec lumière filtrée, fauteuil confortable, plante — confort d'été en EHPAD"
                width={480}
                height={400}
                className="w-full max-w-md"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* SYMBOLES — bande de bénéfices visuels */}
      <SymbolesBande variante="accueil" />

      {/* SOLUTIONS */}
      <section className="py-20 bg-[#070A14]" aria-labelledby="solutions-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-label mx-auto w-fit mb-4">Nos solutions</div>
            <h2 id="solutions-title" className="section-title mb-4">
              Pour chaque établissement,<br />
              <span className="gradient-text">une solution sur mesure</span>
            </h2>
            <p className="section-sub mx-auto text-center">
              EHPAD, mairies, gymnases, logements individuels — nous couvrons l&apos;ensemble des dispositifs de financement disponibles en 2026.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SOLUTIONS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="card group hover:border-white/20 transition-all duration-300 flex flex-col"
              >
                <div
                  className="badge mb-4 w-fit"
                  style={{ color: s.badgeColor, background: s.badgeBg, border: `1px solid ${s.badgeBorder}` }}
                >
                  {s.badge}
                </div>
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-display font-extrabold text-xl text-white mb-2 group-hover:text-green transition-colors">
                  {s.titre}
                </h3>
                <p className="text-sm text-white/60 font-body leading-relaxed flex-1">{s.desc}</p>
                <div className="mt-4 text-sm font-semibold text-blue group-hover:text-green transition-colors">
                  En savoir plus →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-20" aria-labelledby="methode-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-label mx-auto w-fit mb-4">Notre méthode</div>
            <h2 id="methode-title" className="section-title mb-4">
              4 étapes, <span className="gradient-text">zéro complexité</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ETAPES.map((e) => (
              <div key={e.n} className="card relative">
                <div
                  className="font-display font-black text-5xl mb-4 opacity-20 leading-none select-none"
                  style={{ color: "#1A4DFF" }}
                  aria-hidden="true"
                >
                  {e.n}
                </div>
                <h3 className="font-display font-extrabold text-lg text-white mb-2">{e.titre}</h3>
                <p className="text-sm text-white/55 font-body leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/methode" className="btn-secondary inline-flex">
              Détail de notre méthode →
            </Link>
          </div>

          <div className="mt-10 max-w-3xl mx-auto card p-5" style={{ background: "rgba(26,77,255,0.06)", borderColor: "rgba(26,77,255,0.18)" }}>
            <p className="text-xs text-white/55 font-body leading-relaxed text-center">
              Notre méthode s&apos;inscrit dans la démarche Bâtiments Durables Franciliens et s&apos;appuie sur les enseignements du programme RACINE et la Charte de la rénovation du bâti scolaire (Cerema / CSTB).
            </p>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="py-20 bg-[#070A14]" aria-labelledby="temoignages-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-label mx-auto w-fit mb-4">Témoignages</div>
            <h2 id="temoignages-title" className="section-title">
              Ils nous ont <span className="gradient-text">fait confiance</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TEMOIGNAGES.map((t, i) => (
              <div key={i} className="card">
                <div className="text-green text-2xl mb-3 font-display">&ldquo;</div>
                <p className="text-white/80 font-body text-sm leading-relaxed mb-4">{t.extrait}</p>
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-body"
                    style={{ background: "linear-gradient(135deg,#1A4DFF,#00C48C)" }}
                  >
                    {t.dept}
                  </div>
                  <span className="text-xs text-white/40 font-body">{t.nom}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20" aria-labelledby="cta-title">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div
            className="card p-10"
            style={{ background: "linear-gradient(145deg, #0D1533 0%, #0A0E2A 100%)", borderColor: "rgba(26,77,255,0.3)" }}
          >
            <div className="section-label mx-auto w-fit mb-4">Diagnostic d&apos;éligibilité</div>
            <h2 id="cta-title" className="section-title mb-4">
              Découvrez vos droits<br />
              <span className="gradient-text">en 2 minutes</span>
            </h2>
            <p className="section-sub mx-auto text-center mb-8">
              Notre simulateur analyse votre situation et identifie les guichets mobilisables. Sans engagement, réponse en 48 h.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/eligibilite" className="btn-green text-base px-8 py-4">
                Tester mon éligibilité →
              </Link>
              <Link href="/contact" className="btn-secondary text-base px-8 py-4">
                Parler à un expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
