"use client";

import { useState } from "react";
import { sendLead } from "@/lib/webhook";

interface Props {
  communeNom: string;
  communeSlug: string;
}

export default function CommuneContactForm({ communeNom, communeSlug }: Props) {
  const [form, setForm] = useState({ nom: "", tel: "", cp: "", projet: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const ok = await sendLead({
      nom: form.nom,
      tel: form.tel,
      cp: form.cp,
      projet: form.projet || `Diagnostic d'éligibilité — ${communeNom}`,
      categorie: "collectivite",
      date: new Date().toISOString(),
      source: `psglobal.energy/collectivites/${communeSlug}`,
      lang: "fr",
    });

    setStatus(ok ? "ok" : "err");
  }

  if (status === "ok") {
    return (
      <div className="bg-midnight-950 border border-midnight-800 p-8 rounded-2xl text-center">
        <svg className="w-10 h-10 mx-auto mb-4" fill="none" stroke="#059669" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h3 className="display font-extrabold text-xl text-white mb-2">Demande enregistrée</h3>
        <p className="text-sm text-white/60  leading-relaxed">
          Nos experts reviennent vers vous sous 48 h avec une estimation des financements disponibles pour {communeNom}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-midnight-950 border border-midnight-800 p-6 rounded-2xl flex flex-col gap-4">
      <h3 className="display font-extrabold text-xl text-white">
        Diagnostic d&apos;éligibilité — {communeNom}
      </h3>
      <p className="text-xs text-white/55  leading-relaxed -mt-2">
        0 € de subvention transitant par PSG. Seul l&apos;organisme instructeur fait foi pour les montants définitifs.
      </p>

      <div>
        <label className="text-xs  font-semibold text-white/55 uppercase tracking-wide mb-1.5 block" htmlFor="cc-nom">
          Nom complet *
        </label>
        <input
          id="cc-nom"
          type="text"
          className="w-full border-2 border-slate-700 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-brand-emeraldDeep outline-none transition-colors rounded"
          required
          placeholder="Marie Martin"
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
        />
      </div>

      <div>
        <label className="text-xs  font-semibold text-white/55 uppercase tracking-wide mb-1.5 block" htmlFor="cc-tel">
          Téléphone *
        </label>
        <input
          id="cc-tel"
          type="tel"
          className="w-full border-2 border-slate-700 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-brand-emeraldDeep outline-none transition-colors rounded"
          required
          placeholder="06 12 34 56 78"
          value={form.tel}
          onChange={(e) => setForm({ ...form, tel: e.target.value })}
        />
      </div>

      <div>
        <label className="text-xs  font-semibold text-white/55 uppercase tracking-wide mb-1.5 block" htmlFor="cc-cp">
          Code postal de votre établissement
        </label>
        <input
          id="cc-cp"
          type="text"
          className="w-full border-2 border-slate-700 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-brand-emeraldDeep outline-none transition-colors rounded"
          placeholder="77340"
          value={form.cp}
          onChange={(e) => setForm({ ...form, cp: e.target.value })}
        />
      </div>

      <div>
        <label className="text-xs  font-semibold text-white/55 uppercase tracking-wide mb-1.5 block" htmlFor="cc-projet">
          Type d&apos;établissement
        </label>
        <select
          id="cc-projet"
          className="w-full border-2 border-slate-700 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-brand-emeraldDeep outline-none transition-colors rounded"
          value={form.projet}
          onChange={(e) => setForm({ ...form, projet: e.target.value })}
        >
          <option value="">Sélectionnez...</option>
          <option>École / Collège / Lycée</option>
          <option>Mairie / EPCI</option>
          <option>EHPAD / ESMS</option>
          <option>Gymnase / Piscine</option>
          <option>Logements sociaux</option>
          <option>Autre bâtiment public</option>
        </select>
      </div>

      <p className="text-xs text-white/35  leading-relaxed">
        Données traitées par PSGLOBAL Energy (RGPD art. 13). Pas de partage tiers.{" "}
        <a href="/politique-confidentialite" className="underline hover:text-white/55" target="_blank">
          Politique de confidentialité
        </a>
        .
      </p>

      {status === "err" && (
        <p className="text-xs text-red-400 ">
          Erreur d&apos;envoi. Contactez-nous : contact@psglobal.energy
        </p>
      )}

      <button
        type="submit"
        disabled={!form.nom || !form.tel || status === "sending"}
        className="btn-green justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Envoi en cours…" : "Demander un diagnostic d'éligibilité →"}
      </button>
    </form>
  );
}
