"use client";

import React, { useState } from "react";
import { computeEligibility, type EligibilityInput, type EligibilityCategory } from "@/lib/eligibility";
import { sendLead } from "@/lib/webhook";

type Step = "categorie" | "details" | "contact" | "result";

const CATEGORY_ICONS: Record<EligibilityCategory, React.ReactNode> = {
  ehpad: (
    <svg className="w-6 h-6 text-brand-emeraldDeep" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
    </svg>
  ),
  collectivite: (
    <svg className="w-6 h-6 text-brand-emeraldDeep" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21V12h6v9"/>
    </svg>
  ),
  entreprise: (
    <svg className="w-6 h-6 text-brand-emeraldDeep" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
    </svg>
  ),
};

const CATEGORIES: { val: EligibilityCategory; label: string; desc: string }[] = [
  { val: "ehpad",       label: "EHPAD / ESMS",            desc: "Établissement médico-social" },
  { val: "collectivite", label: "Collectivité / Mairie",  desc: "Bâtiment public ou scolaire" },
  { val: "entreprise",  label: "Tertiaire / Entreprise",  desc: "Bureau, commerce, entrepôt" },
];

const TRAVAUX_OPTIONS = [
  "Rafraîchissement passif / PAC réversible (BAT-TH-113)",
  "GTB / régulation (BAT-TH-116)",
  "Protections solaires extérieures",
  "Surventilation nocturne",
];

const STATUT_CONFIG = {
  "éligible":     { color: "#047857", bg: "rgba(4,120,87,0.08)",    border: "rgba(4,120,87,0.2)",    label: "Éligible"     },
  "à vérifier":   { color: "#475569", bg: "rgba(71,85,105,0.07)",   border: "rgba(71,85,105,0.18)",  label: "À vérifier"   },
  "non éligible": { color: "#94a3b8", bg: "rgba(148,163,184,0.07)", border: "rgba(148,163,184,0.18)", label: "Non éligible" },
};

const NIVEAU_COLOR: Record<string, string> = {
  faible:    "#94a3b8",
  moyen:     "#64748b",
  fort:      "#047857",
  excellent: "#059669",
};

const NIVEAU_LABEL: Record<string, string> = {
  excellent: "Éligibilité excellente",
  fort:      "Forte éligibilité",
  moyen:     "Éligibilité moyenne",
  faible:    "Éligibilité partielle",
};

const INPUT_CLS = "w-full border-2 border-slate-300 bg-white px-4 py-3 text-sm text-midnight-900 placeholder-slate-400 focus:border-brand-emeraldDeep outline-none transition-colors rounded";
const LABEL_CLS = "text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block";

export default function EligibilityForm() {
  const [step,     setStep]     = useState<Step>("categorie");
  const [category, setCategory] = useState<EligibilityCategory | null>(null);
  const [form,     setForm]     = useState({
    departement:              "",
    anneeConstruction:        1980,
    chauffageActuel:          "gaz" as EligibilityInput["chauffageActuel"],
    rafraichissementExistant: false,
    travauxEnvisages:         [] as string[],
    nbLits:   0,
    nbEleves: 0,
  });
  const [contact,    setContact]    = useState({ nom: "", tel: "", email: "" });
  const [result,     setResult]     = useState<ReturnType<typeof computeEligibility> | null>(null);
  const [sending,    setSending]    = useState(false);
  const [webhookOk,  setWebhookOk]  = useState<boolean | null>(null);

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
      departement:              form.departement,
      anneeConstruction:        form.anneeConstruction,
      chauffageActuel:          form.chauffageActuel,
      rafraichissementExistant: form.rafraichissementExistant,
      travauxEnvisages:         form.travauxEnvisages,
      nbLits:   form.nbLits   || undefined,
      nbEleves: form.nbEleves || undefined,
    };

    const res = computeEligibility(input);
    setResult(res);

    const ok = await sendLead({
      nom:       contact.nom,
      tel:       contact.tel,
      email:     contact.email,
      cp:        form.departement,
      projet:    form.travauxEnvisages.join(", ") || "Rénovation énergétique tertiaire",
      categorie: category,
      date:      new Date().toISOString(),
      source:    "psglobal.energy/eligibilite",
      lang:      "fr",
      score:     res.score,
    });

    setWebhookOk(ok);
    setSending(false);
    setStep("result");
  }

  const categoryLabel = CATEGORIES.find((c) => c.val === category)?.label ?? "";
  const STEPS: Step[] = ["categorie", "details", "contact", "result"];
  const stepIdx = STEPS.indexOf(step);

  return (
    <div className="bg-white border border-slate-200 shadow-sm p-6 sm:p-8 rounded-2xl">

      {/* Indicateur d'étapes */}
      <div className="flex items-center gap-2 mb-8 print:hidden" role="progressbar" aria-valuenow={stepIdx + 1} aria-valuemax={4}>
        {["Profil", "Situation", "Contact", "Résultat"].map((label, i) => {
          const active = stepIdx >= i;
          return (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{
                  background: active ? "linear-gradient(135deg,#047857,#059669)" : "#e2e8f0",
                  color:      active ? "#fff" : "#94a3b8",
                }}
              >
                {i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${active ? "text-slate-700" : "text-slate-300"}`}>
                {label}
              </span>
              {i < 3 && (
                <div className={`flex-1 h-0.5 ${active && stepIdx > i ? "bg-brand-emeraldDeep/30" : "bg-slate-200"}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* ─── STEP 1 — Catégorie ─── */}
      {step === "categorie" && (
        <div>
          <h2 className="display font-extrabold text-2xl text-midnight-900 mb-2">Qui êtes-vous ?</h2>
          <p className="text-sm text-slate-500 mb-6">Sélectionnez votre profil pour adapter le simulateur.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CATEGORIES.map((c) => (
              <button
                key={c.val}
                onClick={() => handleSelectCategory(c.val)}
                className="bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center gap-2 p-5 hover:border-brand-emeraldDeep/40 hover:bg-brand-emeraldDeep/5 transition-all duration-200 text-center cursor-pointer"
              >
                {CATEGORY_ICONS[c.val]}
                <span className="font-bold text-sm text-midnight-900">{c.label}</span>
                <span className="text-xs text-slate-400">{c.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── STEP 2 — Situation ─── */}
      {step === "details" && (
        <div>
          <h2 className="display font-extrabold text-2xl text-midnight-900 mb-2">Votre situation</h2>
          <p className="text-sm text-slate-500 mb-6">
            Ces informations permettent d&apos;identifier les guichets de financement mobilisables.
          </p>

          <div className="flex flex-col gap-4">
            {/* Département */}
            <div>
              <label className={LABEL_CLS} htmlFor="dept">Département</label>
              <select
                id="dept"
                className={INPUT_CLS}
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

            {/* Année de construction */}
            <div>
              <label className={LABEL_CLS} htmlFor="annee">Année de construction du bâtiment</label>
              <input
                id="annee"
                type="number"
                className={INPUT_CLS}
                min={1900}
                max={2024}
                value={form.anneeConstruction}
                onChange={(e) => setForm({ ...form, anneeConstruction: Number(e.target.value) })}
              />
            </div>

            {/* Chauffage */}
            <div>
              <label className={LABEL_CLS}>Chauffage actuel</label>
              <div className="grid grid-cols-2 gap-2">
                {(["fioul", "gaz", "electrique", "autre"] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setForm({ ...form, chauffageActuel: c })}
                    className={`px-3 py-2 rounded-xl text-sm border transition-all ${
                      form.chauffageActuel === c
                        ? "border-brand-emeraldDeep bg-brand-emeraldDeep/10 text-midnight-900 font-semibold"
                        : "border-slate-200 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    {{ fioul: "Fioul", gaz: "Gaz", electrique: "Électrique", autre: "Autre" }[c]}
                  </button>
                ))}
              </div>
            </div>

            {/* Rafraîchissement existant */}
            <div>
              <label className={LABEL_CLS}>Rafraîchissement existant ?</label>
              <div className="flex gap-2">
                {([false, true] as const).map((v) => (
                  <button
                    key={String(v)}
                    type="button"
                    onClick={() => setForm({ ...form, rafraichissementExistant: v })}
                    className={`flex-1 px-3 py-2 rounded-xl text-sm border transition-all ${
                      form.rafraichissementExistant === v
                        ? "border-brand-emeraldDeep bg-brand-emeraldDeep/10 text-midnight-900 font-semibold"
                        : "border-slate-200 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    {v ? "Oui" : "Non"}
                  </button>
                ))}
              </div>
            </div>

            {/* Travaux tertiaires */}
            <div>
              <label className={LABEL_CLS}>Travaux envisagés (plusieurs possibles)</label>
              <div className="flex flex-wrap gap-2">
                {TRAVAUX_OPTIONS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTravaux(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                      form.travauxEnvisages.includes(t)
                        ? "border-brand-emeraldDeep bg-brand-emeraldDeep/10 text-brand-emeraldDeep font-semibold"
                        : "border-slate-200 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* EHPAD : nb lits */}
            {category === "ehpad" && (
              <div>
                <label className={LABEL_CLS} htmlFor="lits">Nombre de lits / résidents</label>
                <input
                  id="lits"
                  type="number"
                  className={INPUT_CLS}
                  min={1}
                  value={form.nbLits || ""}
                  onChange={(e) => setForm({ ...form, nbLits: Number(e.target.value) })}
                />
              </div>
            )}

            {/* Collectivité : nb élèves */}
            {category === "collectivite" && (
              <div>
                <label className={LABEL_CLS} htmlFor="eleves">
                  Nombre d&apos;élèves / usagers (si bâtiment scolaire)
                </label>
                <input
                  id="eleves"
                  type="number"
                  className={INPUT_CLS}
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

      {/* ─── STEP 3 — Contact ─── */}
      {step === "contact" && (
        <form onSubmit={handleSubmit}>
          <h2 className="display font-extrabold text-2xl text-midnight-900 mb-2">Vos coordonnées</h2>
          <p className="text-sm text-slate-500 mb-6">
            Nos experts vous envoient votre analyse d&apos;éligibilité sous 48 h.
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <label className={LABEL_CLS} htmlFor="nom">Nom et prénom *</label>
              <input
                id="nom"
                type="text"
                className={INPUT_CLS}
                required
                placeholder="Jean Dupont"
                value={contact.nom}
                onChange={(e) => setContact({ ...contact, nom: e.target.value })}
              />
            </div>
            <div>
              <label className={LABEL_CLS} htmlFor="tel">Téléphone *</label>
              <input
                id="tel"
                type="tel"
                className={INPUT_CLS}
                required
                placeholder="06 12 34 56 78"
                value={contact.tel}
                onChange={(e) => setContact({ ...contact, tel: e.target.value })}
              />
            </div>
            <div>
              <label className={LABEL_CLS} htmlFor="email">Email (optionnel)</label>
              <input
                id="email"
                type="email"
                className={INPUT_CLS}
                placeholder="jean@mairie.fr"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
              />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Vos données sont traitées par PSGLOBAL Energy conformément à notre{" "}
              <a href="/politique-confidentialite" className="underline hover:text-slate-600" target="_blank" rel="noopener noreferrer">
                politique de confidentialité
              </a>
              . Elles ne sont jamais transmises à des tiers à des fins publicitaires.
              Droit d&apos;accès&nbsp;: contact@psglobal.energy
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

      {/* ─── STEP 4 — Résultat ─── */}
      {step === "result" && result && (
        <div>
          {/* En-tête visible à l'impression uniquement */}
          <div className="hidden print:block border-b border-slate-200 pb-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-base text-midnight-900">PSGLOBAL-ENERGY — AMO indépendant</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  contact@psglobal.energy · psglobal.energy · Île-de-France
                </div>
              </div>
              <div className="text-right text-xs text-slate-500">
                <div className="font-semibold">Diagnostic d&apos;éligibilité</div>
                <div>
                  {new Date().toLocaleDateString("fr-FR", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-xs text-slate-600">
              <span className="font-semibold">Contact&nbsp;: </span>{contact.nom}
              {contact.tel   && <span> · {contact.tel}</span>}
              {contact.email && <span> · {contact.email}</span>}
              {" · "}Profil&nbsp;: {categoryLabel}
              {" · "}Dépt&nbsp;{form.departement}
              {" · "}Construction&nbsp;{form.anneeConstruction}
            </div>
          </div>

          {/* Score */}
          <div className="text-center mb-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl display font-black mx-auto mb-4 text-white"
              style={{ background: `linear-gradient(135deg,${NIVEAU_COLOR[result.niveau]},${NIVEAU_COLOR[result.niveau]}cc)` }}
            >
              {result.score}
            </div>
            <h2 className="display font-extrabold text-2xl text-midnight-900 mb-1">
              Score d&apos;éligibilité
            </h2>
            <div className="text-sm font-semibold" style={{ color: NIVEAU_COLOR[result.niveau] }}>
              {NIVEAU_LABEL[result.niveau]}
            </div>
          </div>

          {/* Guichets */}
          <div className="mb-5">
            <h3 className="font-semibold text-xs uppercase tracking-wide text-slate-400 mb-3">
              Guichets identifiés
            </h3>
            <div className="flex flex-col gap-2">
              {result.aides.map((a) => {
                const cfg = STATUT_CONFIG[a.statut];
                return (
                  <div
                    key={a.nom}
                    className="flex items-start gap-3 p-3 rounded-xl border"
                    style={{ background: cfg.bg, borderColor: cfg.border }}
                  >
                    <div
                      className="shrink-0 mt-0.5 px-2 py-0.5 rounded-md text-xs font-semibold whitespace-nowrap"
                      style={{ color: cfg.color, background: `${cfg.color}18` }}
                    >
                      {cfg.label}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="text-sm font-semibold text-midnight-900">{a.nom}</div>
                        {a.echeance && (
                          <span
                            className="text-xs px-2 py-0.5 rounded font-semibold"
                            style={{
                              background: "rgba(4,120,87,0.1)",
                              color: "#047857",
                              border: "1px solid rgba(4,120,87,0.2)",
                            }}
                          >
                            {a.echeance}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{a.condition}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Message conseil */}
          <div className="bg-slate-50 border border-slate-200 p-4 mb-5 rounded-2xl">
            <p className="text-sm text-slate-600 leading-relaxed">{result.message}</p>
          </div>

          {/* Statut envoi */}
          {webhookOk === false ? (
            <p className="text-xs text-red-600 text-center mb-2">
              Votre demande n&apos;a pas pu être transmise — contactez-nous directement&nbsp;: contact@psglobal.energy
            </p>
          ) : (
            <p className="text-xs text-slate-400 text-center mb-2">
              ✅ Votre demande a été transmise à nos experts. Vous serez contacté(e) sous 48&nbsp;h.
            </p>
          )}

          {/* Disclaimer obligatoire */}
          <p className="text-xs text-slate-400 text-center mb-6">
            Estimation indicative — seul l&apos;organisme instructeur fait foi à la date de dépôt du dossier.
          </p>

          {/* Boutons actions */}
          <div className="flex flex-col sm:flex-row gap-3 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-midnight-900 text-midnight-900 hover:bg-midnight-900 hover:text-white font-bold text-sm px-5 py-3 transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
              </svg>
              Télécharger le récapitulatif
            </button>
            <a
              href="/dossier-type"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-emeraldDeep hover:bg-emerald-800 text-white font-bold text-sm px-5 py-3 transition-colors"
            >
              Voir un dossier type →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
