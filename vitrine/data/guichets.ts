// Dernière vérification des données : 2026-07-28
// Sources : programme-cee-actee.fr, ekopolis.fr, plan Urgence Canicule 26 juin 2026

export interface Guichet {
  nom: string;
  type: "plan-fraicheur" | "fond-vert" | "cee" | "dsil-detr" | "prefecture" | "actee" | "sante";
  montant: string;
  description: string;
  instructeur: string;
  contact?: string;
  echeance?: string;
  url?: string;
  verifieLe?: string;
}

// ── Guichets nationaux / régionaux communs ──────────────────────────────────

const GUICHET_ACTEE_ECOLES: Guichet = {
  nom: "Guichet unique adaptation écoles — ACTEE × EduRénov",
  type: "actee",
  montant: "3 500 € ou 10 000 € forfaitaires + diagnostic gratuit",
  description:
    "Ouvert le 8 juillet 2026, doté de 60 M€ dans un plan global de ~200 M€ " +
    "(avec EDF 80 M€ et l'appui du Fonds vert). Diagnostic gratuit pour 12 500 " +
    "établissements ; aide forfaitaire de 3 500 € (petits travaux) ou 10 000 € " +
    "pour chacun des 2 500 établissements référencés vulnérables. " +
    "Ambition EduRénov : 15 000 bâtiments d'ici 2028, réduction minimale de 40 % " +
    "de consommation et/ou dimension adaptation climatique — Charte de la rénovation " +
    "du bâti scolaire (Cerema/CSTB) comme référentiel. " +
    "Dépôt via demarche.numerique.gouv.fr (plan Urgence Canicule lancé le 26 juin 2026). " +
    "Seul l'organisme instructeur fait foi pour les montants définitifs.",
  instructeur: "ACTEE / programme CEE écoles — FNCCR",
  echeance: "printemps 2027 (chantiers avant les chaleurs)",
  url: "https://programme-cee-actee.fr",
  verifieLe: "2026-07-28",
};

const GUICHET_PENSEE_PLUS: Guichet = {
  nom: "PENSÉE+ — Économies d'énergie établissements de santé",
  type: "sante",
  montant: "accompagnement ingénierie",
  description:
    "Programme d'accompagnement des établissements de santé d'Île-de-France ; " +
    "coordinateur régional des économes de flux hébergé chez Ekopolis. " +
    "Seul l'organisme instructeur fait foi pour les conditions d'éligibilité.",
  instructeur: "ANAP / ARS / FNCCR (ACTEE) — via Ekopolis",
  verifieLe: "2026-07-28",
};

// ── Guichets par département ────────────────────────────────────────────────

const GUICHETS_77: Guichet[] = [
  {
    nom: "Plan Fraîcheur État",
    type: "plan-fraicheur",
    montant: "jusqu'à 8 000 €",
    description: "Subvention pour les établissements accueillant des publics vulnérables — EHPAD, écoles, structures de la petite enfance.",
    instructeur: "DDETSPP Seine-et-Marne",
    contact: "ddetspp@seine-et-marne.gouv.fr",
  },
  {
    nom: "Fonds Vert",
    type: "fond-vert",
    montant: "40 à 80 %",
    description: "Rénovation thermique des bâtiments publics de la commune — enveloppe départementale à saisir avant octobre.",
    instructeur: "Préfecture de Seine-et-Marne",
    contact: "prefecture@seine-et-marne.gouv.fr",
  },
  {
    nom: "CEE Tertiaire",
    type: "cee",
    montant: "variable selon surface",
    description: "Certificats d'Économie d'Énergie pour tout bâtiment tertiaire construit avant 2010 — estimé lors de l'audit.",
    instructeur: "Obligés CEE (via PSGLOBAL Energy)",
  },
  {
    nom: "DSIL / DETR",
    type: "dsil-detr",
    montant: "jusqu'à 30 %",
    description: "Dotation de soutien à l'investissement local — dossier déposé avant le 31 mars auprès de la Préfecture.",
    instructeur: "Préfecture de Seine-et-Marne",
    contact: "prefecture@seine-et-marne.gouv.fr",
  },
  GUICHET_ACTEE_ECOLES,
  GUICHET_PENSEE_PLUS,
];

const GUICHETS_94: Guichet[] = [
  {
    nom: "Plan Fraîcheur État",
    type: "plan-fraicheur",
    montant: "jusqu'à 8 000 €",
    description: "Subvention pour les établissements accueillant des publics vulnérables — EHPAD, écoles, structures de la petite enfance.",
    instructeur: "DDETSPP Val-de-Marne",
    contact: "ddets@val-de-marne.gouv.fr",
  },
  {
    nom: "Fonds Vert",
    type: "fond-vert",
    montant: "40 à 80 %",
    description: "Rénovation thermique des bâtiments publics — enveloppe annuelle, dossiers reçus jusqu'en octobre.",
    instructeur: "Préfecture du Val-de-Marne",
    contact: "prefecture@val-de-marne.gouv.fr",
  },
  {
    nom: "CEE Tertiaire",
    type: "cee",
    montant: "variable selon surface",
    description: "Certificats d'Économie d'Énergie pour tout bâtiment tertiaire construit avant 2010 — estimé lors de l'audit.",
    instructeur: "Obligés CEE (via PSGLOBAL Energy)",
  },
  {
    nom: "DSIL / DETR",
    type: "dsil-detr",
    montant: "jusqu'à 30 %",
    description: "Dotation de soutien à l'investissement local — dossier déposé avant le 31 mars auprès de la Préfecture.",
    instructeur: "Préfecture du Val-de-Marne",
    contact: "prefecture@val-de-marne.gouv.fr",
  },
  GUICHET_ACTEE_ECOLES,
  GUICHET_PENSEE_PLUS,
];

const GUICHETS_91: Guichet[] = [
  {
    nom: "Plan Fraîcheur État",
    type: "plan-fraicheur",
    montant: "jusqu'à 8 000 €",
    description: "Subvention pour les établissements accueillant des publics vulnérables — EHPAD, écoles, structures de la petite enfance.",
    instructeur: "DDETSPP Essonne",
    contact: "ddetspp@essonne.gouv.fr",
  },
  {
    nom: "Fonds Vert",
    type: "fond-vert",
    montant: "40 à 80 %",
    description: "Rénovation thermique des bâtiments publics — enveloppe annuelle, dossiers reçus jusqu'en octobre.",
    instructeur: "Préfecture de l'Essonne",
    contact: "prefecture@essonne.gouv.fr",
  },
  {
    nom: "CEE Tertiaire",
    type: "cee",
    montant: "variable selon surface",
    description: "Certificats d'Économie d'Énergie pour tout bâtiment tertiaire construit avant 2010 — estimé lors de l'audit.",
    instructeur: "Obligés CEE (via PSGLOBAL Energy)",
  },
  {
    nom: "DSIL / DETR",
    type: "dsil-detr",
    montant: "jusqu'à 30 %",
    description: "Dotation de soutien à l'investissement local — dossier déposé avant le 31 mars auprès de la Préfecture.",
    instructeur: "Préfecture de l'Essonne",
    contact: "prefecture@essonne.gouv.fr",
  },
  GUICHET_ACTEE_ECOLES,
  GUICHET_PENSEE_PLUS,
];

const GUICHETS_93: Guichet[] = [
  {
    nom: "Plan Fraîcheur État",
    type: "plan-fraicheur",
    montant: "jusqu'à 8 000 €",
    description: "Subvention pour les établissements accueillant des publics vulnérables — EHPAD, écoles, structures de la petite enfance.",
    instructeur: "DDETSPP Seine-Saint-Denis",
    contact: "ddets@seine-saint-denis.gouv.fr",
  },
  {
    nom: "Fonds Vert",
    type: "fond-vert",
    montant: "40 à 80 %",
    description: "Rénovation thermique des bâtiments publics — enveloppe annuelle, dossiers reçus jusqu'en octobre.",
    instructeur: "Préfecture de la Seine-Saint-Denis",
    contact: "prefecture@seine-saint-denis.gouv.fr",
  },
  {
    nom: "CEE Tertiaire",
    type: "cee",
    montant: "variable selon surface",
    description: "Certificats d'Économie d'Énergie pour tout bâtiment tertiaire construit avant 2010 — estimé lors de l'audit.",
    instructeur: "Obligés CEE (via PSGLOBAL Energy)",
  },
  {
    nom: "DSIL / DETR",
    type: "dsil-detr",
    montant: "jusqu'à 30 %",
    description: "Dotation de soutien à l'investissement local — dossier déposé avant le 31 mars auprès de la Préfecture.",
    instructeur: "Préfecture de la Seine-Saint-Denis",
    contact: "prefecture@seine-saint-denis.gouv.fr",
  },
  GUICHET_ACTEE_ECOLES,
  GUICHET_PENSEE_PLUS,
];

const GUICHETS_PAR_DEP: Record<string, Guichet[]> = {
  "77": GUICHETS_77,
  "91": GUICHETS_91,
  "93": GUICHETS_93,
  "94": GUICHETS_94,
};

export function getGuichetsByDep(codeDep: string): Guichet[] {
  return GUICHETS_PAR_DEP[codeDep] ?? GUICHETS_77;
}
