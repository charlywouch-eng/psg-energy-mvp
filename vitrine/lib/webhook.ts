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
  const webhookUrl = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[PSG] NEXT_PUBLIC_MAKE_WEBHOOK_URL non définie");
    return false;
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        date: payload.date || new Date().toISOString(),
        source: payload.source || "psglobal.energy",
        lang: payload.lang || "fr",
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[PSG] Erreur webhook:", err);
    return false;
  }
}
