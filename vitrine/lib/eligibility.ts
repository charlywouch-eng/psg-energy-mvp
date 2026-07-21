export type EligibilityCategory = "ehpad" | "collectivite" | "particulier" | "entreprise";

export interface EligibilityInput {
  category: EligibilityCategory;
  departement: string;
  nbLits?: number;          // EHPAD
  nbBatiments?: number;     // collectivité
  anneeConstruction: number;
  chauffageActuel: "fioul" | "gaz" | "electrique" | "autre";
  climatisation: boolean;
  travauxEnvisages: string[];
  revenuFiscal?: number;    // particulier
}

export interface EligibilityResult {
  score: number;             // 0–100
  niveau: "faible" | "moyen" | "fort" | "excellent";
  montantEstime: number;     // €
  aides: AideDetail[];
  message: string;
}

export interface AideDetail {
  nom: string;
  montant: number;
  condition: string;
}

const SCORE_WEIGHTS = {
  departementIdf: 20,
  ancienBatiment: 15,
  chauffageFossile: 20,
  sansCli: 15,
  multitravaux: 10,
  grandEhpad: 10,
  revenuModeste: 10,
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
  if (input.category === "particulier" && (input.revenuFiscal ?? 99999) < 30000) {
    score += SCORE_WEIGHTS.revenuModeste;
  }

  // Capper à 100
  score = Math.min(100, score);

  let niveau: EligibilityResult["niveau"];
  if (score >= 80) niveau = "excellent";
  else if (score >= 60) niveau = "fort";
  else if (score >= 40) niveau = "moyen";
  else niveau = "faible";

  // Aides selon catégorie
  if (input.category === "ehpad" || input.category === "collectivite") {
    aides.push({
      nom: "CEE Rénovation énergétique tertiaire",
      montant: 15000,
      condition: "Bâtiment tertiaire construit avant 2010",
    });
    aides.push({
      nom: "Plan Fraîcheur — subvention État",
      montant: 8000,
      condition: "EHPAD ou établissement accueillant des publics vulnérables",
    });
    if (input.chauffageActuel !== "electrique") {
      aides.push({
        nom: "Prime conversion chaudière → PAC",
        montant: 5000,
        condition: "Remplacement d'une chaudière fossile",
      });
    }
  } else {
    aides.push({
      nom: "MaPrimeRénov' 2026",
      montant: 4000,
      condition: "Propriétaire occupant, revenus modestes à intermédiaires",
    });
    aides.push({
      nom: "CEE Particuliers",
      montant: 1500,
      condition: "Travaux réalisés par un artisan RGE",
    });
    aides.push({
      nom: "Éco-PTZ",
      montant: 30000,
      condition: "Prêt à taux 0 % — jusqu'à 30 000 €",
    });
    if ((input.revenuFiscal ?? 99999) < 30000) {
      aides.push({
        nom: "Prime MAR (Mon Accompagnateur Rénov)",
        montant: 2000,
        condition: "Rénovation globale avec accompagnateur agréé",
      });
    }
  }

  const montantEstime = aides.reduce((sum, a) => sum + a.montant, 0);

  const messages: Record<EligibilityResult["niveau"], string> = {
    excellent: "Votre établissement est très fortement éligible. Nos experts peuvent monter votre dossier en 48 h.",
    fort: "Votre profil est éligible à plusieurs financements publics. Un audit confirme les montants précis.",
    moyen: "Des aides sont disponibles pour votre situation. Parlons-en pour affiner le plan de financement.",
    faible: "Votre éligibilité est partielle. Un audit gratuit identifie les dispositifs accessibles.",
  };

  return {
    score,
    niveau,
    montantEstime,
    aides,
    message: messages[niveau],
  };
}
