// Phase B : enrichissement Aides-territoires (dormant sans clé API serveur)
// Activé automatiquement si process.env.AIDES_TERRITOIRES_API_KEY est défini.
// Aucun refactoring à l'arrivée de la clé.

export interface AideTerritoire {
  nom: string;
  description: string;
  financeur: string;
  url: string;
}

interface AidesTerritoiresResponse {
  results: Array<{
    name: string;
    description: string;
    financers: Array<{ name: string }>;
    url: string;
  }>;
}

export async function getAidesTerritoires(codeInsee: string): Promise<AideTerritoire[]> {
  const apiKey = process.env.AIDES_TERRITOIRES_API_KEY;
  if (!apiKey) return [];

  try {
    const res = await fetch(
      `https://aides-territoires.beta.gouv.fr/api/aids/?perimeter=${codeInsee}&categories=efficacite-energetique&format=json&limit=6`,
      {
        headers: { Authorization: `Token ${apiKey}` },
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) return [];

    const data = await res.json() as AidesTerritoiresResponse;

    return (data.results ?? []).map((a) => ({
      nom: a.name,
      description: a.description?.slice(0, 180) ?? "",
      financeur: a.financers?.[0]?.name ?? "Organisme public",
      url: a.url,
    }));
  } catch {
    return [];
  }
}
