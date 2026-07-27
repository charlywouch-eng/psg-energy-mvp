// Phase A : données territoriales via geo.api.gouv.fr (gratuit, sans clé API)

export interface CommuneGeo {
  nom: string;
  code: string;
  codesPostaux: string[];
  codeDepartement: string;
  population?: number;
}

export async function getCommuneGeo(codeInsee: string): Promise<CommuneGeo | null> {
  try {
    const res = await fetch(
      `https://geo.api.gouv.fr/communes/${codeInsee}?fields=nom,code,codesPostaux,codeDepartement,population`,
      { next: { revalidate: 86400 } }
    );

    if (!res.ok) return null;

    const data = await res.json() as CommuneGeo;
    return data;
  } catch {
    return null;
  }
}
