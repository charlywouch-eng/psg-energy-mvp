/**
 * PSG ENERGY — MOTEUR DE CALCUL ANAH 2026
 * Module partagé : window.PSGEngine
 * Inclure via <script src="/shared/engine.js"></script>
 */
(function(global) {
  'use strict';

  // ── BARÈMES ANAH 2026 ───────────────────────────────────────────
  const BAREMES = {
    tranches: {
      T1: { label: 'Très modeste', max: 21805 },
      T2: { label: 'Modeste',      max: 26939 },
      T3: { label: 'Intermédiaire',max: 40018 },
      T4: { label: 'Supérieur',    max: Infinity }
    },

    MPR: {
      pac_air_eau:  { label:'Pompe à chaleur Air/Eau',     icon:'♨️', T1:12000,T2:7000,T3:4000,T4:1500, prix_moyen:14000, rge:'QualiPAC',    bonus_passoire:1500, delai_pose:18 },
      pac_air_air:  { label:'PAC Air/Air',                 icon:'❄️', T1:5000, T2:3000,T3:1000,T4:0,    prix_moyen:8000,  rge:'QualiPAC',    delai_pose:14 },
      cet:          { label:'Chauffe-eau Thermodynamique', icon:'💧', T1:1200, T2:800, T3:400, T4:0,    prix_moyen:3200,  rge:'QualiPAC',    delai_pose:7 },
      iso_combles:  { label:'Isolation combles perdus',    icon:'🧱', T1:7000, T2:5000,T3:3000,T4:1500, prix_moyen:4500,  rge:'Qualibat',    delai_pose:3 },
      iso_murs_ext: { label:'Isolation murs extérieur (ITE)',icon:'🏠',T1:10000,T2:7500,T3:4500,T4:2000,prix_moyen:15000, rge:'Qualibat',    delai_pose:10 },
      iso_plancher: { label:'Isolation plancher bas',      icon:'🏗️', T1:3000, T2:2000,T3:1500,T4:500,  prix_moyen:3500,  rge:'Qualibat',    delai_pose:3 },
      menuiseries:  { label:'Fenêtres / Portes-fenêtres', icon:'🪟', T1:1500, T2:1200,T3:900, T4:0,    prix_moyen:2400,  rge:'Qualibat',    delai_pose:2 },
      vmc:          { label:'VMC Double Flux',             icon:'💨', T1:2500, T2:2000,T3:1000,T4:0,    prix_moyen:5000,  rge:'QualiPAC',    delai_pose:2 },
      pv:           { label:'Panneaux Photovoltaïques',    icon:'☀️', T1:0,    T2:0,   T3:0,   T4:0,    prix_moyen_3kwc:8000, prime_autoconso_3kwc:1530, rge:'QualiSOL', delai_pose:21 },
      borne_ve:     { label:'Borne Recharge VE',           icon:'🔌', T1:0,    T2:0,   T3:0,   T4:0,    credit_advenir:960, prix_moyen:2000,  rge:'IRVE',       delai_pose:1 }
    },

    CEE: {
      pac_air_eau:  { T1:3500, T2:2200, T3:1600, T4:800 },
      cet:          { T1:400,  T2:300,  T3:200,  T4:100 },
      iso_combles:  { T1:2500, T2:1800, T3:1200, T4:600 },
      iso_murs_ext: { T1:4000, T2:3000, T3:2000, T4:800 },
      iso_plancher: { T1:1200, T2:900,  T3:600,  T4:300 },
      menuiseries:  { T1:400,  T2:300,  T3:200,  T4:0 },
      vmc:          { T1:1200, T2:900,  T3:600,  T4:200 }
    },

    // Parcours Accompagné (Rénovation d'Ampleur)
    MPRA: {
      taux:   { T1:0.80, T2:0.60, T3:0.40, T4:0.15 },
      plafond_ht: 40000,
      MAR: {
        T1: { taux:1.00, max:2000 },
        T2: { taux:1.00, max:2000 },
        T3: { taux:0.50, max:1000 },
        T4: { taux:0.20, max:400 }
      }
    }
  };

  // ── EXPERTS RGE ─────────────────────────────────────────────────
  const EXPERTS = [
    {
      id: 'sophie',
      nom: 'Sophie Marchand',
      titre: 'Experte PAC & Rénovation Globale',
      specialite: ['pac_air_eau','pac_air_air','vmc'],
      zone: ['77','94','91','93'],
      note: 4.9,
      nb_dossiers: 156,
      photo_initiale: 'S',
      arguments: [
        'Une PAC Air/Eau remplace chaudière gaz ET climatisation en un seul équipement',
        'Le bonus passoire (+1 500 €) s\'applique automatiquement si DPE F ou G',
        'Pose en 18j ouvrés, garantie 5 ans pièces et main d\'œuvre incluse'
      ],
      objections: {
        'trop cher': 'Avec le RAC finançable à 0% via Éco-PTZ, votre mensualité peut descendre sous 80 €/mois.',
        'pas pressé': 'Les barèmes ANAH sont révisés chaque trimestre. Attendre = risquer de perdre jusqu\'à 30% des aides.',
        'déjà chaudière': 'La PAC consomme 3× moins d\'énergie que votre chaudière actuelle. Retour sur investissement en 4 ans en moyenne.'
      }
    },
    {
      id: 'karim',
      nom: 'Karim Benali',
      titre: 'Expert Isolation & Enveloppe',
      specialite: ['iso_combles','iso_murs_ext','iso_plancher','menuiseries'],
      zone: ['77','94','91','93'],
      note: 4.8,
      nb_dossiers: 203,
      photo_initiale: 'K',
      arguments: [
        'L\'isolation est la base : sans elle, toute autre aide est moins efficace',
        'Combles perdus : ROI en 2 ans, gain 30% sur facture chauffage immédiat',
        'ITE (murs ext.) = isolation + ravalement + prime MPR 10 000 € pour T1'
      ],
      objections: {
        'déjà isolé': 'Nos artisans réalisent un audit thermique gratuit. Souvent l\'ancienne isolation est insuffisante selon les normes 2026.',
        'copropriété': 'Nous gérons les dossiers syndic. La MPR copropriété peut couvrir jusqu\'à 75% du coût des parties communes.'
      }
    },
    {
      id: 'nadia',
      nom: 'Nadia Ousmane',
      titre: 'Experte Solaire & Mobilité Verte',
      specialite: ['pv','borne_ve','cet'],
      zone: ['77','94','91','93'],
      note: 4.9,
      nb_dossiers: 89,
      photo_initiale: 'N',
      arguments: [
        'En IDF, 3 kWc solaire = 900 à 1 100 kWh/an produits, prime autoconso 1 530 €/an',
        'Borne IRVE : crédit ADVENIR 960 € + déduction fiscale si résidence principale',
        'CET : -70% sur facture eau chaude, amorti en 4 ans'
      ],
      objections: {
        'pas assez ensoleillé': 'L\'IDF bénéficie de 1 800h/an d\'ensoleillement — largement rentable. Simulation personnalisée offerte.',
        'toit partagé': 'Les panneaux en autoconsommation collective sont désormais possibles en copropriété (loi EOM 2023).'
      }
    }
  ];

  // ── CALCUL AIDES DE BASE ─────────────────────────────────────────
  function calculerAides(profil, gestes) {
    const t = profil.tranche || 'T2';
    const res = {
      gestes: [],
      total_mpr: 0,
      total_cee: 0,
      total_tva: 0,
      cout_total: 0,
      total_aides: 0,
      rac: 0,
      eco_ptz: 0
    };

    gestes.forEach(function(g) {
      const cfg = BAREMES.MPR[g];
      if (!cfg) return;
      const mpr  = cfg[t] || 0;
      const cee  = (BAREMES.CEE[g] || {})[t] || 0;
      const prix = g === 'pv' ? (cfg.prix_moyen_3kwc || 0) : (cfg.prix_moyen || 0);
      const tva  = Math.round(prix * 0.055 / 1.055);
      res.gestes.push({ id:g, label:cfg.label, icon:cfg.icon, mpr, cee, tva, prix });
      res.total_mpr  += mpr;
      res.total_cee  += cee;
      res.total_tva  += tva;
      res.cout_total += prix;
    });

    // Bonus passoire thermique (DPE F ou G)
    if (['F','G'].includes(profil.dpe || 'E') && res.total_mpr > 0) {
      res.total_mpr += 1500;
    }

    res.total_aides = res.total_mpr + res.total_cee + res.total_tva;
    res.rac = Math.max(0, res.cout_total - res.total_aides);

    const n = gestes.length;
    res.eco_ptz = n === 1 ? 15000 : n === 2 ? 25000 : 30000;

    return res;
  }

  // ── CALCUL PARCOURS ACCOMPAGNÉ ───────────────────────────────────
  function calculerAmpleur(profil, gestes) {
    const t = profil.tranche || 'T2';
    const gestesIso = ['iso_combles','iso_murs_ext','iso_plancher','menuiseries'];
    const nbIso = gestes.filter(function(g){ return gestesIso.includes(g); }).length;
    const eligible = gestes.length >= 2 && nbIso >= 1;

    const cout_ht = gestes.reduce(function(s, g) {
      const cfg = BAREMES.MPR[g];
      if (!cfg) return s;
      const prix = g === 'pv' ? (cfg.prix_moyen_3kwc || 0) : (cfg.prix_moyen || 0);
      return s + prix / 1.055;
    }, 0);

    const plaf  = Math.min(cout_ht, BAREMES.MPRA.plafond_ht);
    const taux  = BAREMES.MPRA.taux[t] || 0;
    const mpr   = Math.round(plaf * taux);
    const mar_cfg = BAREMES.MPRA.MAR[t];
    const mar   = Math.round(Math.min(2000 * mar_cfg.taux, mar_cfg.max));
    const bonus = ['F','G'].includes(profil.dpe || 'E') ? 1500 : 0;

    return {
      eligible,
      mpr_ampleur: mpr,
      mar_aide: mar,
      bonus_sortie: bonus,
      total: mpr + mar + bonus,
      eco_ptz: 50000,
      conditions: eligible
        ? '✅ Conditions remplies'
        : '⚠️ Min. 2 gestes dont 1 isolation requis'
    };
  }

  // ── CALCUL RAPIDE (1 geste, 1 tranche) ──────────────────────────
  function calculerRapide(tranche, geste) {
    const cfg = BAREMES.MPR[geste];
    if (!cfg) return null;
    const mpr = cfg[tranche] || 0;
    const cee = (BAREMES.CEE[geste] || {})[tranche] || 0;
    const prix = geste === 'pv' ? (cfg.prix_moyen_3kwc || 0) : (cfg.prix_moyen || 0);
    const tva  = Math.round(prix * 0.055 / 1.055);
    const total = mpr + cee + tva;
    const rac   = Math.max(0, prix - total);
    const pct   = prix > 0 ? Math.round((total / prix) * 100) : 0;
    return { mpr, cee, tva, total, rac, pct, prix, label:cfg.label, icon:cfg.icon };
  }

  // ── SCORING CRM ──────────────────────────────────────────────────
  function scorerLead(profil, gestes) {
    let score = 0;
    const t = profil.tranche;
    if (t === 'T1') score += 30;
    else if (t === 'T2') score += 25;
    else if (t === 'T3') score += 10;

    if (['F','G'].includes(profil.dpe || '')) score += 20;

    if (profil.statut === 'proprio') score += 15;

    const cp = String(profil.cp || '');
    if (['77','94','91','93'].some(function(d){ return cp.startsWith(d); })) score += 10;

    if (gestes.length >= 2) score += 10;

    // RAC estimé bas
    const calc = calculerAides(profil, gestes);
    if (calc.rac < 3000) score += 10;

    return Math.min(100, score);
  }

  // ── API PUBLIQUE ─────────────────────────────────────────────────
  global.PSGEngine = {
    analyser: function(profil, gestes) {
      const base    = calculerAides(profil, gestes);
      const ampleur = calculerAmpleur(profil, gestes);
      const score   = scorerLead(profil, gestes);
      // Expert recommandé selon premier geste
      const premierGeste = gestes[0] || '';
      const expert = EXPERTS.find(function(e){ return e.specialite.includes(premierGeste); }) || EXPERTS[0];
      return { base, ampleur, score, expert };
    },
    calculerRapide,
    baremes: BAREMES,
    experts: EXPERTS,
    scorerLead
  };

}(typeof window !== 'undefined' ? window : this));
