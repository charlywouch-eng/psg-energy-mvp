"use client";

import React, { useState } from "react";
import { computeEligibility, type EligibilityInput, type EligibilityCategory } from "@/lib/eligibility";
import { sendLead } from "@/lib/webhook";

type Step = "categorie" | "details" | "contact" | "result";

const CATEGORY_ICONS: Record<EligibilityCategory, React.ReactNode> = {
  ehpad: (
    <svg className="w-6 h-6 text-brand-emeraldDeep" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2m0 0a2 2 0 110 4 2 2 0 010-4z"/>
    </svg>
  ),
  collectivite: (
    <svg className="w-6 h-6 text-brand-emeraldDeep" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21V12h6v9"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01"/>
    </svg>
  ),
  entreprise: (
    <svg className="w-6 h-6 text-brand-emeraldDeep" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
    </svg>
  ),
};

const CATEGORIES: { val: EligibilityCategory; label: string }[] = [
  { val: "ehpad", label: "EHPAD / ESMS" },
  { val: "collectivite", label: "Collectivité / Mairie" },
  { val: "entreprise", label: "Bâtiment tertiaire / Entreprise" },
];

/** Zone d'intervention PSG : Seine-et-Marne, Essonne, Seine-Saint-Denis, Val-de-Marne */
const DEPTS_CIBLE = ["77", "91", "93", "94"];

const STATUT_CONFIG = {
  "éligible": { color: "#059669", bg: "rgba(5,150,105,0.1)", border: "rgba(5,150,105,0.25)", label: "Éligible" },
  "à vérifier": { color: "#64748b", bg: "rgba(100,116,139,0.1)", border: "rgba(100,116,139,0.25)", label: "À vérifier" },
  "non éligible": { color: "#8B92A5", bg: "rgba(139,146,165,0.1)", border: "rgba(139,146,165,0.25)", label: "Non éligible" },
};

export default function EligibilityForm() {
  const [step, setStep] = useState<Step>("categorie");
  const [category, setCategory] = useState<EligibilityCategory | null>(null);
  const [form, setForm] = useState({
    departement: "",
    anneeConstruction: 1980,
    chauffageActuel: "gaz" as EligibilityInput["chauffageActuel"],
    rafraichissementExistant: false,
    travauxEnvisages: [] as string[],
    nbLits: 0,
    nbEleves: 0,
  });
  const [contact, setContact] = useState({ nom: "", tel: "", email: "" });
  const [result, setResult] = useState<ReturnType<typeof computeEligibility> | null>(null);
  const [sending, setSending] = useState(false);
  const [webhookOk, setWebhookOk] = useState<boolean | null>(null);

  const TRAVAUX_OPTIONS = [
    "Rafraîchissement passif / PAC",
    "Isolation combles",
    "Isolation murs",
    "Fenêtres / vitrage",
    "VMC double-flux",
    "Panneaux photovoltaïques",
    "Chauffe-eau thermodynamique",
  ];

  function toggleTravaux(t: string) {
    setForm((f) => ({
      ...f,
      travauxEnvisages: f.travauxEnvisages.includes(t)
        ? f.travauxEnvisages.filter((x) => x !== t)
        : [...f.travauxEnvisages, t],
    }));
  }

  function handleSelectCategory(cat: EligibilityCategory) {
    setCategory(cat);
    setStep("details");
  }

  function handleDetails() {
    if (!form.departement) return;
    setStep("contact");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!category) return;
    setSending(true);

    const input: EligibilityInput = {
      category,
      departement: form.departement,
      anneeConstruction: form.anneeConstruction,
      chauffageActuel: form.chauffageActuel,
      rafraichissementExistant: form.rafraichissementExistant,
      travauxEnvisages: form.travauxEnvisages,
      nbLits: form.nbLits || undefined,
      nbEleves: form.nbEleves || undefined,
    };

    const res = computeEligibility(input);
    setResult(res);

    const ok = await sendLead({
      nom: contact.nom,
      tel: contact.tel,
      email: contact.email,
      cp: form.departement,
      projet: form.travauxEnvisages.join(", ") || "Rénovation énergétique tertiaire",
      categorie: category,
      date: new Date().toISOString(),
      source: "psglobal.energy/eligibilite",
      lang: "fr",
      score: res.score,
    });

    setWebhookOk(ok);
    setSending(false);
    setStep("result");
  }

  const niveauColor = {
    faible: "#8B92A5",
    moyen: "#64748b",
    fort: "#047857",
    excellent: "#059669",
  };

  return (
    <div className="bg-midnight-950 border border-midnight-800 p-6 sm:p-8 rounded-2xl">
      {/* Indicateur d'étapes */}
      <div className="flex items-center gap-2 mb-8" role="progressbar" aria-valuenow={["categorie","details","contact","result"].indexOf(step)+1} aria-valuemax={4}>
        {["Profil", "Situation", "Contact", "Résultat"].map((label, i) => {
          const steps: Step[] = ["categorie", "details", "contact", "result"];
          const active = steps.indexOf(step) >= i;
          return (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold  shrink-0"
                style={{ background: active ? "linear-gradient(135deg,#047857,#059669)" : "rgba(255,255,255,0.1)", color: active ? "#fff" : "rgba(255,255,255,0.3)" }}
              >
                {i + 1}
              </div>
              <span className={`text-xs  hidden sm:block ${active ? "text-white/70" : "text-white/25"}`}>{label}</span>
              {i < 3 && <div className={`flex-1 h-0.5 ${active && steps.indexOf(step) > i ? "bg-emerald-700/40" : "bg-white/10"}`} />}
            </div>
          );
        })}
      </div>

      {/* STEP 1 — Catégorie */}
      {step === "categorie" && (
        <div>
          <h2 className="display font-extrabold text-2xl text-white mb-2">Qui êtes-vous ?</h2>
          <p className="text-sm text-white/55  mb-6">Sélectionnez votre profil pour adapter le simulateur.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CATEGORIES.map((c) => (
              <button
                key={c.val}
                onClick={() => handleSelectCategory(c.val)}
                className="bg-midnight-900 border border-midnight-800 rounded-2xl flex flex-col items-center gap-2 p-5 hover:border-emerald-700/40 hover:bg-emerald-700/5 transition-all duration-200 text-center cursor-pointer"
              >
                {CATEGORY_ICONS[c.val]}
                <span className="font-semibold text-sm text-white">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2 — Détails */}
      {step === "details" && (
        <div>
          <h2 className="display font-extrabold text-2xl text-white mb-2">Votre situation</h2>
          <p className="text-sm text-white/55  mb-6">Ces informations permettent d&apos;identifier les guichets de financement mobilisables.</p>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs  font-semibold text-white/60 uppercase tracking-wide mb-1.5 block" htmlFor="dept">
                Département
              </label>
              <select
                id="dept"
                className="w-full border-2 border-slate-700 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-brand-emeraldDeep outline-none transition-colors rounded"
                value={form.departement}
                onChange={(e) => setForm({ ...form, departement: e.target.value })}
                required
              >
                <option value="">Sélectionnez...</option>
                <option value="77">77 — Seine-et-Marne</option>
                <option value="91">91 — Essonne</option>
                <option value="93">93 — Seine-Saint-Denis</option>
                <option value="94">94 — Val-de-Marne</option>
              </select>
            </div>

            <div>
              <label className="text-xs  font-semibold text-white/60 uppercase tracking-wide mb-1.5 block" htmlFor="annee">
                Année de construction du bâtiment
              </label>
              <input
                id="annee"
                type="number"
                className="w-full border-2 border-slate-700 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-brand-emeraldDeep outline-none transition-colors rounded"
                min={1900}
                max={2024}
                value={form.anneeConstruction}
                onChange={(e) => setForm({ ...form, anneeConstruction: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="text-xs  font-semibold text-white/60 uppercase tracking-wide mb-1.5 block">
                Chauffage actuel
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["fioul", "gaz", "electrique", "autre"] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setForm({ ...form, chauffageActuel: c })}
                    className={`px-3 py-2 rounded-xl text-sm  border transition-all ${
                      form.chauffageActuel === c
                        ? "border-emerald-700 bg-emerald-700/15 text-white"
                        : "border-white/10 text-white/55 hover:border-white/25"
                    }`}
                  >
                    {{ fioul: "Fioul", gaz: "Gaz", electrique: "Électrique", autre: "Autre" }[c]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs  font-semibold text-white/60 uppercase tracking-wide mb-1.5 block">
                Travaux envisagés (plusieurs possibles)
              </label>
              <div className="flex flex-wrap gap-2">
                {TRAVAUX_OPTIONS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTravaux(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs  border transition-all ${
                      form.travauxEnvisages.includes(t)
                        ? "border-emerald-500 bg-emerald-500/15 text-emerald-500"
                        : "border-white/10 text-white/55 hover:border-white/25"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {category === "ehpad" && (
              <div>
                <label className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-1.5 block" htmlFor="lits">
                  Nombre de lits / résidents
                </label>
                <input
                  id="lits"
                  type="number"
                  className="w-full border-2 border-slate-700 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-brand-emeraldDeep outline-none transition-colors rounded"
                  min={1}
                  value={form.nbLits || ""}
                  onChange={(e) => setForm({ ...form, nbLits: Number(e.target.value) })}
                />
              </div>
            )}

            {category === "collectivite" && (
              <div>
                <label className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-1.5 block" htmlFor="eleves">
                  Nombre d&apos;élèves / usagers (si bâtiment scolaire)
                </label>
                <input
                  id="eleves"
                  type="number"
                  className="w-full border-2 border-slate-700 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-brand-emeraldDeep outline-none transition-colors rounded"
                  min={1}
                  placeholder="Optionnel"
                  value={form.nbEleves || ""}
                  onChange={(e) => setForm({ ...form, nbEleves: Number(e.target.value) })}
                />
              </div>
            )}

            <button
              type="button"
              onClick={handleDetails}
              disabled={!form.departement}
              className="btn-primary mt-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuer →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — Contact */}
      {step === "contact" && (
        <form onSubmit={handleSubmit}>
          <h2 className="display font-extrabold text-2xl text-white mb-2">Vos coordonnées</h2>
          <p className="text-sm text-white/55  mb-6">
            Nos experts vous envoient votre analyse d&apos;éligibilité sous 48 h.
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs  font-semibold text-white/60 uppercase tracking-wide mb-1.5 block" htmlFor="nom">
                Nom et prénom *
              </label>
              <input
                id="nom"
                type="text"
                className="w-full border-2 border-slate-700 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-brand-emeraldDeep outline-none transition-colors rounded"
                required
                placeholder="Jean Dupont"
                value={contact.nom}
                onChange={(e) => setContact({ ...contact, nom: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs  font-semibold text-white/60 uppercase tracking-wide mb-1.5 block" htmlFor="tel">
                Téléphone *
              </label>
              <input
                id="tel"
                type="tel"
                className="w-full border-2 border-slate-700 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-brand-emeraldDeep outline-none transition-colors rounded"
                required
                placeholder="06 12 34 56 78"
                value={contact.tel}
                onChange={(e) => setContact({ ...contact, tel: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs  font-semibold text-white/60 uppercase tracking-wide mb-1.5 block" htmlFor="email">
                Email (optionnel)
              </label>
              <input
                id="email"
                type="email"
                className="w-full border-2 border-slate-700 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-brand-emeraldDeep outline-none transition-colors rounded"
                placeholder="jean@mairie.fr"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
              />
            </div>

            <p className="text-xs text-white/35  leading-relaxed">
              Vos données sont traitées par PSGLOBAL Energy conformément à notre{" "}
              <a href="/politique-confidentialite" className="underline hover:text-white/60" target="_blank">
                politique de confidentialité
              </a>
              . Elles ne sont jamais transmises à des tiers à des fins publicitaires. Droit d&apos;accès : contact@psglobal.energy
            </p>

            <button
              type="submit"
              disabled={!contact.nom || !contact.tel || sending}
              className="btn-green mt-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? "Envoi en cours…" : "Voir mon analyse →"}
            </button>
          </div>
        </form>
      )}

      {/* STEP 4 — Résultat */}
      {step === "result" && result && (
        <div>
          <div className="text-center mb-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl display font-black mx-auto mb-4"
              style={{ background: `linear-gradient(135deg, ${niveauColor[result.niveau]}, ${niveauColor[result.niveau]}80)` }}
            >
              {result.score}
            </div>
            <h2 className="display font-extrabold text-2xl text-white mb-1">Score d&apos;éligibilité</h2>
            <div className=" text-sm" style={{ color: niveauColor[result.niveau] }}>
              {result.niveau === "excellent" ? "Éligibilité excellente" : result.niveau === "fort" ? "Forte éligibilité" : result.niveau === "moyen" ? "Éligibilité moyenne" : "Éligibilité partielle"}
            </div>
          </div>

          <div className="mb-5">
            <h3 className=" font-semibold text-xs uppercase tracking-wide text-white/50 mb-3">Guichets identifiés</h3>
            <div className="flex flex-col gap-2">
              {result.aides.map((a) => {
                const cfg = STATUT_CONFIG[a.statut];
                return (
                  <div key={a.nom} className="flex items-start gap-3 p-3 rounded-xl border" style={{ background: cfg.bg, borderColor: cfg.border }}>
                    <div
                      className="shrink-0 mt-0.5 px-2 py-0.5 rounded-md text-xs  font-semibold"
                      style={{ color: cfg.color, background: `${cfg.color}18` }}
                    >
                      {cfg.label}
                    </div>
                    <div>
                      <div className="text-sm font-semibold  text-white">{a.nom}</div>
                      <div className="text-xs text-white/45 ">{a.condition}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-midnight-950 border border-emerald-900/50 p-4 mb-5 rounded-2xl">
            <p className="text-sm text-white/75  leading-relaxed">{result.message}</p>
          </div>

          {webhookOk === false ? (
            <p className="text-xs text-red-400  text-center mb-2">
              Votre demande n&apos;a pas pu être transmise — contactez-nous directement : contact@psglobal.energy
            </p>
          ) : (
            <p className="text-xs text-white/40  text-center mb-2">
              ✅ Votre demande a été transmise à nos experts. Vous serez contacté(e) sous 48 h.
            </p>
          )}
          <p className="text-xs text-white/30  text-center">
            Estimation indicative — seul l&apos;organisme instructeur fait foi à la date de dépôt du dossier.
          </p>
        </div>
      )}
    </div>
  );
}
