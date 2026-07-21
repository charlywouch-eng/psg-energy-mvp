"use client";

import { useState } from "react";
import { sendLead } from "@/lib/webhook";

export default function ContactForm() {
  const [form, setForm] = useState({ nom: "", tel: "", cp: "", projet: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const ok = await sendLead({
      nom: form.nom,
      tel: form.tel,
      cp: form.cp,
      projet: form.projet || form.message,
      date: new Date().toISOString(),
      source: "psglobal.energy/contact",
      lang: "fr",
    });

    setStatus(ok ? "ok" : "err");
  }

  if (status === "ok") {
    return (
      <div className="card p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="font-display font-extrabold text-xl text-white mb-2">Message envoyé !</h3>
        <p className="text-sm text-white/60 font-body">
          Nos experts reviendront vers vous sous 48 h. Vérifiez votre boîte email et vos SMS.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 flex flex-col gap-4">
      <h2 className="font-display font-extrabold text-xl text-white">Demande d&apos;audit gratuit</h2>

      <div>
        <label className="text-xs font-body font-semibold text-white/55 uppercase tracking-wide mb-1.5 block" htmlFor="c-nom">
          Nom complet *
        </label>
        <input
          id="c-nom"
          type="text"
          className="input-field"
          required
          placeholder="Marie Martin"
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
        />
      </div>

      <div>
        <label className="text-xs font-body font-semibold text-white/55 uppercase tracking-wide mb-1.5 block" htmlFor="c-tel">
          Téléphone *
        </label>
        <input
          id="c-tel"
          type="tel"
          className="input-field"
          required
          placeholder="06 12 34 56 78"
          value={form.tel}
          onChange={(e) => setForm({ ...form, tel: e.target.value })}
        />
      </div>

      <div>
        <label className="text-xs font-body font-semibold text-white/55 uppercase tracking-wide mb-1.5 block" htmlFor="c-cp">
          Code postal
        </label>
        <input
          id="c-cp"
          type="text"
          className="input-field"
          placeholder="77000"
          value={form.cp}
          onChange={(e) => setForm({ ...form, cp: e.target.value })}
        />
      </div>

      <div>
        <label className="text-xs font-body font-semibold text-white/55 uppercase tracking-wide mb-1.5 block" htmlFor="c-projet">
          Type de projet
        </label>
        <select
          id="c-projet"
          className="input-field"
          value={form.projet}
          onChange={(e) => setForm({ ...form, projet: e.target.value })}
        >
          <option value="">Sélectionnez...</option>
          <option>Plan Fraîcheur EHPAD</option>
          <option>Rénovation collectivité / mairie</option>
          <option>MaPrimeRénov&apos; particulier</option>
          <option>Panneaux photovoltaïques</option>
          <option>Pompe à chaleur</option>
          <option>Autre projet</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-body font-semibold text-white/55 uppercase tracking-wide mb-1.5 block" htmlFor="c-msg">
          Message (optionnel)
        </label>
        <textarea
          id="c-msg"
          className="input-field resize-none"
          rows={3}
          placeholder="Décrivez brièvement votre situation..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      <p className="text-xs text-white/35 font-body leading-relaxed">
        Données traitées par PSGLOBAL Energy (RGPD art. 13). Pas de partage tiers. Accès :{" "}
        <a href="/politique-confidentialite" className="underline hover:text-white/55" target="_blank">
          politique de confidentialité
        </a>
        .
      </p>

      {status === "err" && (
        <p className="text-xs text-red-400 font-body">
          Erreur d&apos;envoi. Contactez-nous directement : contact@psglobal.energy
        </p>
      )}

      <button
        type="submit"
        disabled={!form.nom || !form.tel || status === "sending"}
        className="btn-green justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande →"}
      </button>
    </form>
  );
}
