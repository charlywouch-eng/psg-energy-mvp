export interface Guichet {
  nom: string;
  type: "plan-fraicheur" | "fond-vert" | "cee" | "dsil-detr" | "prefecture";
  montant: string;
  description: string;
  instructeur: string;
  contact?: string;
}

// Guichets disponibles pour tout le territoire IDF (par département)
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
