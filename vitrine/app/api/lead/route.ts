import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;

export async function POST(req: NextRequest) {
  if (!WEBHOOK_URL) {
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
      return NextResponse.json({ error: "Erreur webhook" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur réseau" }, { status: 502 });
  }
}
