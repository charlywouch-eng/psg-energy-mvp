# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Contexte métier

**PSGLOBAL Energy** (Provider Services Groupe) est une régie commerciale française (SASU) spécialisée en énergies renouvelables. Elle **vend** des équipements au nom d'installateurs RGE certifiés sans réaliser d'installations. Marges : Kwanthic 28,5% / Le Solariste 37,5%. Deux axes : France IDF (77, 94, 91, 93) + Congo Brazzaville / zone CEMAC.

**Domaine unique** : `psglobal.energy` — hébergé sur Vercel (projet `psg-energy-mvp`, team `charly-wouches-projects`). Ne jamais réintroduire `psg-energy.fr` dans le code (domaine abandonné).

**Webhook leads** : `https://hook.eu1.make.com/tab3g6y46xzwi86rp0tycecdgagtf18c` → Make.com → Zoho CRM EU

## Architecture

Projet 100% front-end statique — zéro framework, zéro build step. Chaque page HTML est autonome (CSS + JS inline). Ressources partagées dans `shared/` et `fonts/`.

### Pages actives (servies sur psglobal.energy)

| Fichier | URL | Rôle | Accès |
|---------|-----|------|-------|
| `index.html` | `/` | Vitrine FR multilingue (6 langues via i18n JS) | Public |
| `en/index.html` | `/en/` | Page statique EN — ciblage SEO Île-de-France | Public |
| `ar/index.html` | `/ar/` | Page statique AR RTL — ciblage SEO zone 93+75 | Public |
| `pt/index.html` | `/pt/` | Page statique PT européen — ciblage SEO zone 77+91 | Public |
| `psg-chatbot-elia.html` | — | Chatbot IA Élia (nécessite proxy API Claude) | Public |
| `psg-commercial-signature.html` | — | Tunnel devis + signature YouSign | Public |
| `psg-africa-intelligence.html` | — | Dashboard Intelligence Afrique (noindex) | Semi-privé |
| `mentions-legales.html` | — | Mentions légales LCEN | Public |
| `cgv.html` | — | CGV loi Hamon, rétractation 14j, médiateur MEDICYS | Public |
| `politique-confidentialite.html` | — | Politique RGPD (10 sections) | Public |

### Fichiers hérités (à ne pas supprimer sans décision explicite)

| Fichier | Statut |
|---------|--------|
| `psg-energy-site.html` | Ancienne vitrine — contenu dupliqué, à noindexer ou rediriger vers `/` |
| `psg-energy-v5-mvp.html` | Ancienne app mobile — remplacée par `index.html` + `/en/` `/ar/` `/pt/` |
| `psg-dashboard-admin.html` | Dashboard CRM interne — **GITIGNORED, NE JAMAIS COMMITTER** |

### Ressources partagées

| Fichier | Rôle |
|---------|------|
| `shared/design-system.css` | Tokens CSS, composants nav/footer/btn communs à toutes les pages |
| `shared/engine.js` | Moteur de calcul ANAH 2026 (`window.PSGEngine`) — barèmes MPR, CEE, TVA 5,5%, Éco-PTZ, MAR |
| `fonts/fonts.css` + `fonts/*.woff2` | Outfit + Inter auto-hébergées (RGPD — jamais de Google Fonts) |
| `sitemap.xml` | 5 URLs : `/`, `/en/`, `/ar/`, `/pt/`, `/simulateur/` |
| `robots.txt` | `Allow: /` + `Sitemap: https://psglobal.energy/sitemap.xml` |
| `.htaccess` | Rewrites Apache pour déploiement OVH (si besoin fallback) |
| `vercel.json` | Rewrites Vercel pour `/en`, `/ar`, `/pt`, `/simulateur`, `/admin` |

## Règles absolues

- `psg-dashboard-admin.html` est dans `.gitignore` — **ne jamais l'ajouter au repo** (contient marges, leads, données commerciales)
- Le dossier `memory/` est dans `.gitignore` — **ne jamais le committer** (profil Charly, décisions internes)
- Ne jamais exposer de clé API Anthropic côté client — utiliser un proxy Vercel serverless function
- Toujours répondre et commenter en **français**
- **Ne jamais réintroduire `psg-energy.fr`** — le domaine est abandonné, tout doit pointer sur `psglobal.energy`
- **Ne jamais introduire `fonts.googleapis.com`** — interdit RGPD, décision CNIL 10/02/2022

## SEO multilingue

Architecture hreflang complète sur 4 langues :
```html
<link rel="canonical" href="https://psglobal.energy/[lang]/">
<link rel="alternate" hreflang="fr" href="https://psglobal.energy/">
<link rel="alternate" hreflang="en" href="https://psglobal.energy/en/">
<link rel="alternate" hreflang="ar" href="https://psglobal.energy/ar/">
<link rel="alternate" hreflang="pt" href="https://psglobal.energy/pt/">
<link rel="alternate" hreflang="x-default" href="https://psglobal.energy/">
```

- `/ar/index.html` : `<html lang="ar" dir="rtl">` + CSS RTL complet
- TR et ZH : i18n JS uniquement dans `index.html` (pas de pages dédiées)
- Sitemap soumis à Google Search Console (action manuelle à refaire si domaine changé)

## Formulaire / Leads

Toutes les pages envoient un payload JSON `{nom, tel, cp, projet, date, source, lang}` vers `LEAD_WEBHOOK` :
```js
const LEAD_WEBHOOK = 'https://hook.eu1.make.com/tab3g6y46xzwi86rp0tycecdgagtf18c';
```
Fallback si vide : `mailto:contact@psglobal.energy`. Make.com → Zoho CRM EU (connexion OAuth à finaliser).

## Chatbot Élia

`psg-chatbot-elia.html` : appel `https://api.anthropic.com/v1/messages` sans clé exposée → nécessite une **Vercel Edge Function** proxy avec la clé côté serveur. Non fonctionnel sans ce proxy.

## Simulateur d'aides ANAH 2026

`shared/engine.js` expose `window.PSGEngine` : barèmes MPR par tranche fiscale, CEE, TVA 5,5%, Éco-PTZ, prime MAR 2 000€, plafond 32 000€. Montants codés en dur — à mettre à jour à chaque révision ANAH.

## Variables CSS communes (`shared/design-system.css`)

```css
--blue:#1A4DFF  --green:#00C48C  --gold:#F5A000
--ink:#08091A   --surf:#F2F5FB   --ff:'Outfit'   --fb:'Inter'
```
Toute modification de charte doit être appliquée dans `shared/design-system.css` (propagation automatique).

## Déploiement

- **Production** : Vercel → `psglobal.energy` (auto-deploy sur push `main`, team `charly-wouches-projects`, projet `psg-energy-mvp`)
- **Fallback OVH** : `.htaccess` présent pour déploiement Apache si besoin
- `psg-africa-intelligence.html` et `psg-dashboard-admin.html` ne doivent jamais être servis publiquement

## Conformité CNIL / RGPD

### En place (ne pas régresser)
- Fonts auto-hébergées (`shared/design-system.css` + `fonts/`)
- Aucun cookie tiers (pas de GA, Meta Pixel, Hotjar) → pas de bandeau requis
- Pas de clé API client
- `politique-confidentialite.html` (10 obligations RGPD art. 13/14)
- `mentions-legales.html` (LCEN art. 6)
- `cgv.html` (loi Hamon)

### Règles à respecter
1. Jamais de ressource externe sans vérification RGPD
2. Tout nouveau formulaire → mention RGPD art. 13 au point de collecte
3. Cookies → bandeau consentement CNIL 2022 obligatoire avant dépôt
4. Nouveaux sous-traitants → ajouter section 4 de `politique-confidentialite.html`
5. Durées de conservation définies avant toute collecte

### Points légaux en attente
- SIREN non disponible (immatriculation Jurisociété N°1727182) — mentionné dans `mentions-legales.html` et footer
- Email `dpo@psglobal.energy` à créer dans Zoho Mail **avant mise en production**
- Connexion Zoho CRM dans Make.com (OAuth, UI Make.com) à finaliser
- `psg-energy-site.html` → ajouter `<meta name="robots" content="noindex">` ou redirection 301 vers `/`
