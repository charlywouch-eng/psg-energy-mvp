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
  montantEstime?: number;
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
    return res.ok;
  } catch (err) {
    console.error("[PSG] Erreur webhook:", err);
    return false;
  }
}
