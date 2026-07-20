"use client";

import { useState } from "react";
import { computeEligibility, type EligibilityInput, type EligibilityCategory } from "@/lib/eligibility";
import { sendLead } from "@/lib/webhook";

type Step = "categorie" | "details" | "contact" | "result";

const CATEGORIES: { val: EligibilityCategory; label: string; icon: string }[] = [
  { val: "ehpad", label: "EHPAD / ESMS", icon: "🏥" },
  { val: "collectivite", label: "Collectivité / Mairie", icon: "🏛️" },
  { val: "particulier", label: "Particulier", icon: "🏠" },
  { val: "entreprise", label: "Entreprise / Tertiaire", icon: "🏢" },
];

const DEPTS_IDF = ["75", "77", "78", "91", "92", "93", "94", "95"];

export default function EligibilityForm() {
  const [step, setStep] = useState<Step>("categorie");
  const [category, setCategory] = useState<EligibilityCategory | null>(null);
  const [form, setForm] = useState({
    departement: "",
    anneeConstruction: 1980,
    chauffageActuel: "gaz" as EligibilityInput["chauffageActuel"],
    climatisation: false,
    travauxEnvisages: [] as string[],
    nbLits: 0,
    revenuFiscal: 30000,
  });
  const [contact, setContact] = useState({ nom: "", tel: "", email: "" });
  const [result, setResult] = useState<ReturnType<typeof computeEligibility> | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const TRAVAUX_OPTIONS = [
    "Climatisation / PAC",
    "Isolation combles",
    "Isolation murs",
    "Fenêtres / vitrage",
    "VMC double-flux",
    "Panneaux photovoltaïques",
    "Chauffe-eau thermodynamique",
    "Borne VE",
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
      climatisation: form.climatisation,
      travauxEnvisages: form.travauxEnvisages,
      nbLits: form.nbLits || undefined,
      revenuFiscal: category === "particulier" ? form.revenuFiscal : undefined,
    };

    const res = computeEligibility(input);
    setResult(res);

    await sendLead({
      nom: contact.nom,
      tel: contact.tel,
      email: contact.email,
      cp: form.departement,
      projet: form.travauxEnvisages.join(", ") || "Rénovation énergétique",
      categorie: category,
      date: new Date().toISOString(),
      source: "psglobal.energy/eligibilite",
      lang: "fr",
      score: res.score,
      montantEstime: res.montantEstime,
    });

    setSending(false);
    setSent(true);
    setStep("result");
  }

  const niveauColor = {
    faible: "#8B92A5",
    moyen: "#F5A000",
    fort: "#1A4DFF",
    excellent: "#00C48C",
  };

  return (
    <div className="card p-6 sm:p-8">
      {/* Indicateur d'étapes */}
      <div className="flex items-center gap-2 mb-8" role="progressbar" aria-valuenow={["categorie","details","contact","result"].indexOf(step)+1} aria-valuemax={4}>
        {["Profil", "Situation", "Contact", "Résultat"].map((label, i) => {
          const steps: Step[] = ["categorie", "details", "contact", "result"];
          const active = steps.indexOf(step) >= i;
          return (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-body shrink-0"
                style={{ background: active ? "linear-gradient(135deg,#1A4DFF,#00C48C)" : "rgba(255,255,255,0.1)", color: active ? "#fff" : "rgba(255,255,255,0.3)" }}
              >
                {i + 1}
              </div>
              <span className={`text-xs font-body hidden sm:block ${active ? "text-white/70" : "text-white/25"}`}>{label}</span>
              {i < 3 && <div className={`flex-1 h-0.5 ${active && steps.indexOf(step) > i ? "bg-blue/40" : "bg-white/10"}`} />}
            </div>
          );
        })}
      </div>

      {/* STEP 1 — Catégorie */}
      {step === "categorie" && (
        <div>
          <h2 className="font-display font-extrabold text-2xl text-white mb-2">Qui êtes-vous ?</h2>
          <p className="text-sm text-white/55 font-body mb-6">Sélectionnez votre profil pour adapter le simulateur.</p>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map((c) => (
              <button
                key={c.val}
                onClick={() => handleSelectCategory(c.val)}
                className="card flex flex-col items-center gap-2 p-5 hover:border-blue/40 hover:bg-blue/5 transition-all duration-200 text-center cursor-pointer"
              >
                <span className="text-3xl">{c.icon}</span>
                <span className="font-body font-semibold text-sm text-white">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2 — Détails */}
      {step === "details" && (
        <div>
          <h2 className="font-display font-extrabold text-2xl text-white mb-2">Votre situation</h2>
          <p className="text-sm text-white/55 font-body mb-6">Ces informations permettent de calculer vos aides exactes.</p>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-body font-semibold text-white/60 uppercase tracking-wide mb-1.5 block" htmlFor="dept">
                Département
              </label>
              <select
                id="dept"
                className="input-field"
                value={form.departement}
                onChange={(e) => setForm({ ...form, departement: e.target.value })}
                required
              >
                <option value="">Sélectionnez...</option>
                {DEPTS_IDF.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
                <option value="autre">Autre département</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-body font-semibold text-white/60 uppercase tracking-wide mb-1.5 block" htmlFor="annee">
                Année de construction du bâtiment
              </label>
              <input
                id="annee"
                type="number"
                className="input-field"
                min={1900}
                max={2024}
                value={form.anneeConstruction}
                onChange={(e) => setForm({ ...form, anneeConstruction: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="text-xs font-body font-semibold text-white/60 uppercase tracking-wide mb-1.5 block">
                Chauffage actuel
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["fioul", "gaz", "electrique", "autre"] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setForm({ ...form, chauffageActuel: c })}
                    className={`px-3 py-2 rounded-xl text-sm font-body border transition-all ${
                      form.chauffageActuel === c
                        ? "border-blue bg-blue/15 text-white"
                        : "border-white/10 text-white/55 hover:border-white/25"
                    }`}
                  >
                    {{ fioul: "🛢️ Fioul", gaz: "🔥 Gaz", electrique: "⚡ Électrique", autre: "♻️ Autre" }[c]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-body font-semibold text-white/60 uppercase tracking-wide mb-1.5 block">
                Travaux envisagés (plusieurs possibles)
              </label>
              <div className="flex flex-wrap gap-2">
                {TRAVAUX_OPTIONS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTravaux(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-body border transition-all ${
                      form.travauxEnvisages.includes(t)
                        ? "border-green bg-green/15 text-green"
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
                <label className="text-xs font-body font-semibold text-white/60 uppercase tracking-wide mb-1.5 block" htmlFor="lits">
                  Nombre de lits / résidents
                </label>
                <input
                  id="lits"
                  type="number"
                  className="input-field"
                  min={1}
                  value={form.nbLits || ""}
                  onChange={(e) => setForm({ ...form, nbLits: Number(e.target.value) })}
                />
              </div>
            )}

            {category === "particulier" && (
              <div>
                <label className="text-xs font-body font-semibold text-white/60 uppercase tracking-wide mb-1.5 block" htmlFor="revenu">
                  Revenu fiscal de référence (foyer)
                </label>
                <input
                  id="revenu"
                  type="number"
                  className="input-field"
                  min={0}
                  value={form.revenuFiscal}
                  onChange={(e) => setForm({ ...form, revenuFiscal: Number(e.target.value) })}
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
          <h2 className="font-display font-extrabold text-2xl text-white mb-2">Vos coordonnées</h2>
          <p className="text-sm text-white/55 font-body mb-6">
            Nos experts vous envoient votre simulation personnalisée sous 48 h.
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-body font-semibold text-white/60 uppercase tracking-wide mb-1.5 block" htmlFor="nom">
                Nom et prénom *
              </label>
              <input
                id="nom"
                type="text"
                className="input-field"
                required
                placeholder="Jean Dupont"
                value={contact.nom}
                onChange={(e) => setContact({ ...contact, nom: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-body font-semibold text-white/60 uppercase tracking-wide mb-1.5 block" htmlFor="tel">
                Téléphone *
              </label>
              <input
                id="tel"
                type="tel"
                className="input-field"
                required
                placeholder="06 12 34 56 78"
                value={contact.tel}
                onChange={(e) => setContact({ ...contact, tel: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-body font-semibold text-white/60 uppercase tracking-wide mb-1.5 block" htmlFor="email">
                Email (optionnel)
              </label>
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder="jean@mairie.fr"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
              />
            </div>

            <p className="text-xs text-white/35 font-body leading-relaxed">
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
              {sending ? "Envoi en cours…" : "Voir ma simulation →"}
            </button>
          </div>
        </form>
      )}

      {/* STEP 4 — Résultat */}
      {step === "result" && result && (
        <div>
          <div className="text-center mb-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-display font-black mx-auto mb-4"
              style={{ background: `linear-gradient(135deg, ${niveauColor[result.niveau]}, ${niveauColor[result.niveau]}80)` }}
            >
              {result.score}
            </div>
            <h2 className="font-display font-extrabold text-2xl text-white mb-1">Score d&apos;éligibilité</h2>
            <div className="font-body text-sm" style={{ color: niveauColor[result.niveau] }}>
              {result.niveau === "excellent" ? "Éligibilité excellente" : result.niveau === "fort" ? "Forte éligibilité" : result.niveau === "moyen" ? "Éligibilité moyenne" : "Éligibilité partielle"}
            </div>
          </div>

          <div className="card p-5 mb-5" style={{ borderColor: "rgba(0,196,140,0.3)" }}>
            <div className="font-display font-black text-3xl text-green mb-1">
              {result.montantEstime.toLocaleString("fr-FR")} €
            </div>
            <div className="text-sm text-white/60 font-body">Estimation du montant total des aides disponibles</div>
          </div>

          <div className="mb-5">
            <h3 className="font-body font-semibold text-xs uppercase tracking-wide text-white/50 mb-3">Aides identifiées</h3>
            <div className="flex flex-col gap-2">
              {result.aides.map((a) => (
                <div key={a.nom} className="flex items-start gap-3 p-3 rounded-xl bg-white/4 border border-white/8">
                  <div className="w-2 h-2 rounded-full bg-green shrink-0 mt-1.5" />
                  <div>
                    <div className="text-sm font-semibold font-body text-white">{a.nom} — {a.montant.toLocaleString("fr-FR")} €</div>
                    <div className="text-xs text-white/45 font-body">{a.condition}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-4 mb-5" style={{ background: "rgba(26,77,255,0.08)", borderColor: "rgba(26,77,255,0.2)" }}>
            <p className="text-sm text-white/75 font-body leading-relaxed">{result.message}</p>
          </div>

          <p className="text-xs text-white/40 font-body text-center">
            ✅ Votre simulation a été transmise à nos experts. Vous serez contacté(e) sous 48 h.
          </p>
        </div>
      )}
    </div>
  );
}
