"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "#simulateur",   label: "Diagnostic d'éligibilité" },
  { href: "#financements", label: "Guichets mobilisables" },
  { href: "#methode",      label: "Notre méthode" },
  { href: "/dossier-type", label: "Dossier type" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="border-b border-slate-200 sticky top-0 bg-white/95 backdrop-blur-sm z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0"
          aria-label="PSGLOBAL-ENERGY — Accueil"
        >
          <span className="w-10 h-10 bg-midnight-900 text-white flex items-center justify-center font-bold text-sm tracking-tight">
            PSG
          </span>
          <span className="leading-none">
            <span className="display block font-bold text-midnight-900 text-lg tracking-tight">
              PSGLOBAL-ENERGY
            </span>
            <span className="block text-[11px] text-slate-500 font-semibold tracking-widest uppercase mt-1 mono">
              Assistance à maîtrise d&apos;ouvrage (AMO)
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex gap-8 text-sm font-semibold text-slate-600"
          aria-label="Navigation principale"
        >
          {NAV_LINKS.map((l) =>
            l.href.startsWith("/") ? (
              <Link key={l.href} href={l.href} className="hover:text-midnight-900 transition-colors">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className="hover:text-midnight-900 transition-colors">
                {l.label}
              </a>
            )
          )}
        </nav>

        {/* CTA */}
        <a
          href="#simulateur"
          className="hidden md:inline-flex bg-midnight-900 text-white text-sm font-bold px-6 py-2.5 hover:bg-midnight-800 transition-colors shrink-0"
        >
          Démarrer le diagnostic
        </a>

        {/* Burger mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-slate-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <span
            className={`block w-5 h-0.5 bg-midnight-900 transition-all ${open ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-midnight-900 transition-all ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-midnight-900 transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((l) =>
            l.href.startsWith("/") ? (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-semibold text-slate-600 hover:text-midnight-900 hover:bg-slate-50 transition-colors"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-semibold text-slate-600 hover:text-midnight-900 hover:bg-slate-50 transition-colors"
              >
                {l.label}
              </a>
            )
          )}
          <a
            href="#simulateur"
            onClick={() => setOpen(false)}
            className="mt-2 bg-midnight-900 text-white text-sm font-bold px-6 py-3 text-center hover:bg-midnight-800 transition-colors"
          >
            Démarrer le diagnostic
          </a>
        </div>
      )}
    </header>
  );
}
