/*
 * Payload envoyé à /api/lead (proxy serveur → Make.com → Zoho CRM EU)
 * Mapping Make.com : chaque champ JSON correspond à une variable dans le scénario.
 *
 * Champ          Type      Obligatoire  Description
 * -------------- --------- ----------- -------------------------------------------
 * nom            string    oui          Nom complet du contact
 * tel            string    oui          Numéro de téléphone
 * cp             string    non          Code postal ou numéro de département
 * email          string    non          Adresse email
 * projet         string    oui          Description du projet / type d'établissement
 * categorie      string    non          "ehpad" | "collectivite" | "entreprise" | etc.
 * date           string    oui          ISO 8601 — horodatage de la soumission
 * source         string    oui          URL de la page source (ex: "psglobal.energy/contact")
 * lang           string    oui          Code langue ("fr")
 * score          number    non          Score d'éligibilité 0–100 (simulateur uniquement)
 *
 * Env var requise côté serveur (JAMAIS NEXT_PUBLIC_) : MAKE_WEBHOOK_URL
 * L'URL Make.com ne doit jamais être exposée côté client.
 */

export interface LeadPayload {
  nom: string;
  tel: string;
  cp: string;
  email?: string;
  projet: string;
  categorie?: string;
  date: string;
  source: string;
  lang: string;
  score?: number;
}

export async function sendLead(payload: LeadPayload): Promise<boolean> {
  const data: LeadPayload = {
    ...payload,
    date: payload.date || new Date().toISOString(),
    source: payload.source || "psglobal.energy",
    lang: payload.lang || "fr",
  };

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      let detail = "";
      try { detail = await res.text(); } catch { /* ignore */ }
      console.error(`[PSG] Webhook échec ${res.status} ${res.statusText}${detail ? ` — ${detail}` : ""}`);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[PSG] Webhook erreur réseau:", err);
    return false;
  }
}
