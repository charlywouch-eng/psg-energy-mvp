export type EligibilityCategory = "ehpad" | "collectivite" | "entreprise";

export interface EligibilityInput {
  category: EligibilityCategory;
  departement: string;
  nbLits?: number;
  nbEleves?: number;
  anneeConstruction: number;
  chauffageActuel: "fioul" | "gaz" | "electrique" | "autre";
  /** true si le bâtiment dispose déjà d'un système de rafraîchissement actif */
  rafraichissementExistant: boolean;
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
  /** Échéance réelle sourcée — uniquement si connue et vérifiable */
  echeance?: string;
}

const SCORE_WEIGHTS = {
  departementCible: 20,
  ancienBatiment: 15,
  chauffageFossile: 20,
  sansRafraichissement: 15,
  multitravaux: 10,
  grandEhpad: 10,
  grandEcole: 10,
};

/** Zone d'intervention PSG : 77, 91, 93, 94 uniquement */
const DEPTS_CIBLE = ["77", "91", "93", "94"];

export function computeEligibility(input: EligibilityInput): EligibilityResult {
  let score = 0;
  const aides: AideDetail[] = [];

  const isZoneCible = DEPTS_CIBLE.includes(input.departement);

  if (isZoneCible) score += SCORE_WEIGHTS.departementCible;
  if (input.anneeConstruction < 1980) score += SCORE_WEIGHTS.ancienBatiment;
  if (input.chauffageActuel === "fioul" || input.chauffageActuel === "gaz") {
    score += SCORE_WEIGHTS.chauffageFossile;
  }
  if (!input.rafraichissementExistant) score += SCORE_WEIGHTS.sansRafraichissement;
  if (input.travauxEnvisages.length >= 2) score += SCORE_WEIGHTS.multitravaux;
  if (input.category === "ehpad" && (input.nbLits ?? 0) >= 50) {
    score += SCORE_WEIGHTS.grandEhpad;
  }
  if (input.category === "collectivite" && (input.nbEleves ?? 0) >= 100) {
    score += SCORE_WEIGHTS.grandEcole;
  }

  score = Math.min(100, score);

  let niveau: EligibilityResult["niveau"];
  if (score >= 80) niveau = "excellent";
  else if (score >= 60) niveau = "fort";
  else if (score >= 40) niveau = "moyen";
  else niveau = "faible";

  // CEE : fiches BAT-TH-113 et BAT-TH-116 uniquement — jamais 162/163/164
  aides.push({
    nom: "CEE tertiaire — BAT-TH-113 / BAT-TH-116",
    statut: input.anneeConstruction < 2010 ? "éligible" : "à vérifier",
    condition: "Pompe à chaleur réversible déclarée chauffage (BAT-TH-113) et/ou GTB régulation (BAT-TH-116) — bâtiment tertiaire construit avant 2010",
  });

  if (input.category === "ehpad") {
    aides.push({
      nom: "Fonds qualité EHPAD / PAI CNSA",
      statut: "à vérifier",
      condition: "EHPAD ou ESMS — enveloppe qualité de vie des résidents, instruction par l'ARS selon dossier",
    });
  }

  aides.push({
    nom: "Fonds vert",
    statut: input.category === "collectivite" ? "éligible" : "à vérifier",
    condition: "Collectivités territoriales et EPCI — appel à projets annuel DREAL Île-de-France",
  });

  if (input.category === "collectivite") {
    aides.push({
      nom: "ACTEE · EduRénov",
      statut: "à vérifier",
      condition: "Bâtiments scolaires — programme dédié aux collectivités locales",
      echeance: "Printemps 2027",
    });
  }

  const messages: Record<EligibilityResult["niveau"], string> = {
    excellent: "Votre établissement présente un profil d'éligibilité très fort. Nos experts identifient les guichets mobilisables et vous orientent sous 48 h.",
    fort: "Votre profil est éligible à plusieurs guichets publics. Un diagnostic d'éligibilité précise les dispositifs accessibles.",
    moyen: "Des guichets de financement sont probablement accessibles. Parlons-en pour affiner votre dossier.",
    faible: "Votre éligibilité est partielle. Un diagnostic d'éligibilité identifie les dispositifs accessibles.",
  };

  return { score, niveau, aides, message: messages[niveau] };
}
