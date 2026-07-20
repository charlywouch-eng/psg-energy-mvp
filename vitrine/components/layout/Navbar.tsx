"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/fraicheur-ehpad", label: "EHPAD" },
  { href: "/collectivites", label: "Collectivités" },
  { href: "/methode", label: "Notre méthode" },
  { href: "/particuliers", label: "Particuliers" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-ink/95 backdrop-blur-xl border-b border-white/8 shadow-2xl"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="PSGLOBAL-ENERGY — Accueil">
          <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: "linear-gradient(135deg,#1A4DFF,#00C48C)" }}>
            ⚡
          </span>
          <span className="font-display font-extrabold text-lg tracking-tight text-white group-hover:text-green transition-colors">
            PSGLOBAL-ENERGY
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Navigation principale">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-colors ${
                pathname === l.href
                  ? "text-green bg-green/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/eligibilite" className="btn-green text-sm px-5 py-2.5">
            Tester mon éligibilité →
          </Link>
        </div>

        {/* Burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-ink/98 backdrop-blur-xl border-b border-white/8 px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-3 rounded-xl text-sm font-body font-medium transition-colors ${
                pathname === l.href ? "text-green bg-green/10" : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/eligibilite" className="btn-green mt-2 justify-center">
            Tester mon éligibilité →
          </Link>
        </div>
      )}
    </header>
  );
}
