export interface Commune {
  slug: string;
  nom: string;
  codeInsee: string;
  codeDep: "77" | "91" | "93" | "94";
  nomDep: string;
  nomRegion: string;
}

export const COMMUNES: Commune[] = [
  // Seine-et-Marne (77) — priorité Plan Fraîcheur
  { slug: "melun", nom: "Melun", codeInsee: "77288", codeDep: "77", nomDep: "Seine-et-Marne", nomRegion: "Île-de-France" },
  { slug: "meaux", nom: "Meaux", codeInsee: "77284", codeDep: "77", nomDep: "Seine-et-Marne", nomRegion: "Île-de-France" },
  { slug: "chelles", nom: "Chelles", codeInsee: "77108", codeDep: "77", nomDep: "Seine-et-Marne", nomRegion: "Île-de-France" },
  { slug: "pontault-combault", nom: "Pontault-Combault", codeInsee: "77371", codeDep: "77", nomDep: "Seine-et-Marne", nomRegion: "Île-de-France" },
  { slug: "moissy-cramayel", nom: "Moissy-Cramayel", codeInsee: "77305", codeDep: "77", nomDep: "Seine-et-Marne", nomRegion: "Île-de-France" },
  { slug: "provins", nom: "Provins", codeInsee: "77379", codeDep: "77", nomDep: "Seine-et-Marne", nomRegion: "Île-de-France" },
  { slug: "fontainebleau", nom: "Fontainebleau", codeInsee: "77186", codeDep: "77", nomDep: "Seine-et-Marne", nomRegion: "Île-de-France" },
  { slug: "montereau-fault-yonne", nom: "Montereau-Fault-Yonne", codeInsee: "77316", codeDep: "77", nomDep: "Seine-et-Marne", nomRegion: "Île-de-France" },
  { slug: "lagny-sur-marne", nom: "Lagny-sur-Marne", codeInsee: "77243", codeDep: "77", nomDep: "Seine-et-Marne", nomRegion: "Île-de-France" },
  { slug: "roissy-en-brie", nom: "Roissy-en-Brie", codeInsee: "77390", codeDep: "77", nomDep: "Seine-et-Marne", nomRegion: "Île-de-France" },
  { slug: "torcy", nom: "Torcy", codeInsee: "77468", codeDep: "77", nomDep: "Seine-et-Marne", nomRegion: "Île-de-France" },
  { slug: "nemours", nom: "Nemours", codeInsee: "77333", codeDep: "77", nomDep: "Seine-et-Marne", nomRegion: "Île-de-France" },

  // Val-de-Marne (94)
  { slug: "creteil", nom: "Créteil", codeInsee: "94028", codeDep: "94", nomDep: "Val-de-Marne", nomRegion: "Île-de-France" },
  { slug: "vincennes", nom: "Vincennes", codeInsee: "94080", codeDep: "94", nomDep: "Val-de-Marne", nomRegion: "Île-de-France" },
  { slug: "vitry-sur-seine", nom: "Vitry-sur-Seine", codeInsee: "94081", codeDep: "94", nomDep: "Val-de-Marne", nomRegion: "Île-de-France" },
  { slug: "ivry-sur-seine", nom: "Ivry-sur-Seine", codeInsee: "94041", codeDep: "94", nomDep: "Val-de-Marne", nomRegion: "Île-de-France" },
  { slug: "champigny-sur-marne", nom: "Champigny-sur-Marne", codeInsee: "94017", codeDep: "94", nomDep: "Val-de-Marne", nomRegion: "Île-de-France" },
  { slug: "saint-maur-des-fosses", nom: "Saint-Maur-des-Fossés", codeInsee: "94068", codeDep: "94", nomDep: "Val-de-Marne", nomRegion: "Île-de-France" },
  { slug: "alfortville", nom: "Alfortville", codeInsee: "94002", codeDep: "94", nomDep: "Val-de-Marne", nomRegion: "Île-de-France" },
  { slug: "nogent-sur-marne", nom: "Nogent-sur-Marne", codeInsee: "94052", codeDep: "94", nomDep: "Val-de-Marne", nomRegion: "Île-de-France" },
  { slug: "sucy-en-brie", nom: "Sucy-en-Brie", codeInsee: "94071", codeDep: "94", nomDep: "Val-de-Marne", nomRegion: "Île-de-France" },

  // Essonne (91)
  { slug: "evry-courcouronnes", nom: "Évry-Courcouronnes", codeInsee: "91228", codeDep: "91", nomDep: "Essonne", nomRegion: "Île-de-France" },
  { slug: "corbeil-essonnes", nom: "Corbeil-Essonnes", codeInsee: "91174", codeDep: "91", nomDep: "Essonne", nomRegion: "Île-de-France" },
  { slug: "palaiseau", nom: "Palaiseau", codeInsee: "91477", codeDep: "91", nomDep: "Essonne", nomRegion: "Île-de-France" },
  { slug: "massy", nom: "Massy", codeInsee: "91377", codeDep: "91", nomDep: "Essonne", nomRegion: "Île-de-France" },
  { slug: "longjumeau", nom: "Longjumeau", codeInsee: "91345", codeDep: "91", nomDep: "Essonne", nomRegion: "Île-de-France" },
  { slug: "ris-orangis", nom: "Ris-Orangis", codeInsee: "91521", codeDep: "91", nomDep: "Essonne", nomRegion: "Île-de-France" },
  { slug: "savigny-sur-orge", nom: "Savigny-sur-Orge", codeInsee: "91549", codeDep: "91", nomDep: "Essonne", nomRegion: "Île-de-France" },
  { slug: "viry-chatillon", nom: "Viry-Châtillon", codeInsee: "91687", codeDep: "91", nomDep: "Essonne", nomRegion: "Île-de-France" },

  // Seine-Saint-Denis (93)
  { slug: "saint-denis", nom: "Saint-Denis", codeInsee: "93066", codeDep: "93", nomDep: "Seine-Saint-Denis", nomRegion: "Île-de-France" },
  { slug: "montreuil", nom: "Montreuil", codeInsee: "93048", codeDep: "93", nomDep: "Seine-Saint-Denis", nomRegion: "Île-de-France" },
  { slug: "aubervilliers", nom: "Aubervilliers", codeInsee: "93001", codeDep: "93", nomDep: "Seine-Saint-Denis", nomRegion: "Île-de-France" },
  { slug: "noisy-le-grand", nom: "Noisy-le-Grand", codeInsee: "93051", codeDep: "93", nomDep: "Seine-Saint-Denis", nomRegion: "Île-de-France" },
  { slug: "aulnay-sous-bois", nom: "Aulnay-sous-Bois", codeInsee: "93005", codeDep: "93", nomDep: "Seine-Saint-Denis", nomRegion: "Île-de-France" },
  { slug: "bobigny", nom: "Bobigny", codeInsee: "93008", codeDep: "93", nomDep: "Seine-Saint-Denis", nomRegion: "Île-de-France" },
  { slug: "epinay-sur-seine", nom: "Épinay-sur-Seine", codeInsee: "93029", codeDep: "93", nomDep: "Seine-Saint-Denis", nomRegion: "Île-de-France" },
  { slug: "pantin", nom: "Pantin", codeInsee: "93055", codeDep: "93", nomDep: "Seine-Saint-Denis", nomRegion: "Île-de-France" },
  { slug: "saint-ouen-sur-seine", nom: "Saint-Ouen-sur-Seine", codeInsee: "93070", codeDep: "93", nomDep: "Seine-Saint-Denis", nomRegion: "Île-de-France" },
];

export function getCommuneBySlug(slug: string): Commune | undefined {
  return COMMUNES.find((c) => c.slug === slug);
}
