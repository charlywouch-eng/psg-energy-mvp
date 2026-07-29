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
      <div className="card p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="font-display font-extrabold text-xl text-white mb-2">Demande enregistrée</h3>
        <p className="text-sm text-white/60 font-body leading-relaxed">
          Nos experts reviennent vers vous sous 48 h avec une estimation des financements disponibles pour {communeNom}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 flex flex-col gap-4">
      <h3 className="font-display font-extrabold text-xl text-white">
        Diagnostic d&apos;éligibilité — {communeNom}
      </h3>
      <p className="text-xs text-white/55 font-body leading-relaxed -mt-2">
        0 € de subvention transitant par PSG. Seul l&apos;organisme instructeur fait foi pour les montants définitifs.
      </p>

      <div>
        <label className="text-xs font-body font-semibold text-white/55 uppercase tracking-wide mb-1.5 block" htmlFor="cc-nom">
          Nom complet *
        </label>
        <input
          id="cc-nom"
          type="text"
          className="input-field"
          required
          placeholder="Marie Martin"
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
        />
      </div>

      <div>
        <label className="text-xs font-body font-semibold text-white/55 uppercase tracking-wide mb-1.5 block" htmlFor="cc-tel">
          Téléphone *
        </label>
        <input
          id="cc-tel"
          type="tel"
          className="input-field"
          required
          placeholder="06 12 34 56 78"
          value={form.tel}
          onChange={(e) => setForm({ ...form, tel: e.target.value })}
        />
      </div>

      <div>
        <label className="text-xs font-body font-semibold text-white/55 uppercase tracking-wide mb-1.5 block" htmlFor="cc-cp">
          Code postal de votre établissement
        </label>
        <input
          id="cc-cp"
          type="text"
          className="input-field"
          placeholder="77340"
          value={form.cp}
          onChange={(e) => setForm({ ...form, cp: e.target.value })}
        />
      </div>

      <div>
        <label className="text-xs font-body font-semibold text-white/55 uppercase tracking-wide mb-1.5 block" htmlFor="cc-projet">
          Type d&apos;établissement
        </label>
        <select
          id="cc-projet"
          className="input-field"
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

      <p className="text-xs text-white/35 font-body leading-relaxed">
        Données traitées par PSGLOBAL Energy (RGPD art. 13). Pas de partage tiers.{" "}
        <a href="/politique-confidentialite" className="underline hover:text-white/55" target="_blank">
          Politique de confidentialité
        </a>
        .
      </p>

      {status === "err" && (
        <p className="text-xs text-red-400 font-body">
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
