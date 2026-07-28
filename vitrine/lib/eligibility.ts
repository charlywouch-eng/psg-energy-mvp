export type EligibilityCategory = "ehpad" | "collectivite" | "entreprise";

export interface EligibilityInput {
  category: EligibilityCategory;
  departement: string;
  nbLits?: number;
  anneeConstruction: number;
  chauffageActuel: "fioul" | "gaz" | "electrique" | "autre";
  climatisation: boolean;
  travauxEnvisages: string[];
}

export interface EligibilityResult {
  score: number;
  niveau: "faible" | "moyen" | "fort" | "excellent";
  aides: AideDetail[];
  message: string;
}

export interface AideDetail {
  nom: string;
  statut: "éligible" | "à vérifier" | "non éligible";
  condition: string;
}

const SCORE_WEIGHTS = {
  departementIdf: 20,
  ancienBatiment: 15,
  chauffageFossile: 20,
  sansCli: 15,
  multitravaux: 10,
  grandEhpad: 10,
};

export function computeEligibility(input: EligibilityInput): EligibilityResult {
  let score = 0;
  const aides: AideDetail[] = [];

  const DEPTS_IDF = ["77", "94", "91", "93", "75", "78", "92", "95"];
  const isIdf = DEPTS_IDF.includes(input.departement);

  if (isIdf) score += SCORE_WEIGHTS.departementIdf;
  if (input.anneeConstruction < 1980) score += SCORE_WEIGHTS.ancienBatiment;
  if (input.chauffageActuel === "fioul" || input.chauffageActuel === "gaz") {
    score += SCORE_WEIGHTS.chauffageFossile;
  }
  if (!input.climatisation) score += SCORE_WEIGHTS.sansCli;
  if (input.travauxEnvisages.length >= 2) score += SCORE_WEIGHTS.multitravaux;
  if (input.category === "ehpad" && (input.nbLits ?? 0) >= 50) {
    score += SCORE_WEIGHTS.grandEhpad;
  }

  score = Math.min(100, score);

  let niveau: EligibilityResult["niveau"];
  if (score >= 80) niveau = "excellent";
  else if (score >= 60) niveau = "fort";
  else if (score >= 40) niveau = "moyen";
  else niveau = "faible";

  aides.push({
    nom: "CEE Rénovation énergétique tertiaire",
    statut: input.anneeConstruction < 2010 ? "éligible" : "à vérifier",
    condition: "Bâtiment tertiaire construit avant 2010",
  });

  if (input.category === "ehpad") {
    aides.push({
      nom: "Plan Fraîcheur — subvention ARS / État",
      statut: "éligible",
      condition: "EHPAD ou établissement accueillant des publics vulnérables",
    });
  }

  aides.push({
    nom: "Fonds Vert",
    statut: input.category === "collectivite" ? "éligible" : "à vérifier",
    condition: "Collectivités territoriales et EPCI — appel à projets annuel DREAL",
  });

  if (input.chauffageActuel !== "electrique") {
    aides.push({
      nom: "Prime conversion chaudière fossile → PAC",
      statut: "à vérifier",
      condition: "Remplacement d'une chaudière fioul ou gaz — dossier CEE associé",
    });
  }

  const messages: Record<EligibilityResult["niveau"], string> = {
    excellent: "Votre établissement présente un profil d'éligibilité très fort. Nos experts identifient les guichets mobilisables et vous orientent sous 48 h.",
    fort: "Votre profil est éligible à plusieurs guichets publics. Un audit gratuit précise les dispositifs accessibles.",
    moyen: "Des guichets de financement sont probablement accessibles. Parlons-en pour affiner votre dossier.",
    faible: "Votre éligibilité est partielle. Un audit gratuit identifie les dispositifs accessibles.",
  };

  return { score, niveau, aides, message: messages[niveau] };
}
