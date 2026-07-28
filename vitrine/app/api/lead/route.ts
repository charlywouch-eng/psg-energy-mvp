import { NextRequest, NextResponse } from "next/server";

// MAKE_WEBHOOK_URL est une variable d'env serveur uniquement — jamais NEXT_PUBLIC_
const WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;

export async function POST(req: NextRequest) {
  if (!WEBHOOK_URL) {
    console.error("[PSG/api/lead] MAKE_WEBHOOK_URL non définie — configurez la variable d'env côté serveur Vercel");
    return NextResponse.json({ error: "Webhook non configuré" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps invalide" }, { status: 400 });
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error(`[PSG/api/lead] Make.com a répondu ${res.status} ${res.statusText}`);
      return NextResponse.json({ error: "Erreur webhook", upstreamStatus: res.status }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[PSG/api/lead] Erreur réseau vers Make.com:", err);
    return NextResponse.json({ error: "Erreur réseau" }, { status: 502 });
  }
}
