# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Contexte métier

**PSGLOBAL Energy** (Provider Services Groupe) est un cabinet d'**AMO** (assistance à maîtrise d'ouvrage) — SAS au capital de 5 000 €. PSG ne vend ni n'installe aucun équipement : elle orchestre des prestataires RGE certifiés, sécurise les subventions et gère le planning pour le compte de ses clients. Rémunération à double flux : honoraires d'AMO facturés aux établissements (liés aux jalons d'octroi des aides) + commission d'apport d'affaires (8–12 %) facturée aux installateurs RGE et fabricants partenaires.

Cible : établissements publics et parapublics (EHPAD, écoles, collectivités) en Île-de-France (77, 91, 93, 94), démarche B2G/B2B. Guichets de financement mobilisés : Fonds vert (rafraîchissement), Fonds qualité ARS, CEE tertiaires (fiches BAT-TH), ACTEE/EduRénov, Plan Fraîcheur État — **jamais MaPrimeRénov'** (réservé aux particuliers, hors doctrine PSG).

**Domaine unique** : `psglobal.energy` — hébergé sur Vercel (projet `psg-energy-mvp`, team `charly-wouches-projects`, alias production `psglobal.energy` + `www.psglobal.energy`). Ne jamais réintroduire `psg-energy.fr` dans le code (domaine abandonné).

## Architecture — IMPORTANT

Le repo contient **deux générations de code qui coexistent** :

1. **`vitrine/`** — l'application réellement déployée en production sur `psglobal.energy`. Next.js 14 (App Router) + TypeScript + Tailwind CSS. Le Root Directory Vercel du projet pointe sur ce dossier (réglage dans le dashboard Vercel, pas dans un fichier du repo) — c'est cette app, et uniquement elle, qui sert le trafic. **Toute modification du site en production se fait dans `vitrine/`.**
2. **Fichiers HTML statiques à la racine** (`index.html`, `en/`, `ar/`, `pt/`, `psg-chatbot-elia.html`, `psg-commercial-signature.html`, `psg-africa-intelligence.html`, `psg-energy-site.html`, `vitrine-fr.html`, `mentions-legales.html`, `cgv.html`, `politique-confidentialite.html`, `shared/`, `fonts/`, `simulateur/`, `admin/`, `vercel.json`, `.htaccess`) — **génération précédente du site, non déployée** (aucune référence croisée depuis `vitrine/`, confirmé par audit du 23/09/2026). À conserver comme archive tant qu'aucune décision explicite de suppression n'est prise, mais ne pas les modifier en pensant affecter le site en ligne : elles ne sont pas servies.

### Structure de `vitrine/`

| Dossier/fichier | Rôle |
|---|---|
| `app/` | Pages App Router : `/`, `/eligibilite`, `/fraicheur-ehpad`, `/collectivites/[slug]`, `/dossier-type`, `/methode`, `/conformite`, `/particuliers`, `/a-propos`, `/contact`, `/mentions-legales`, `/cgv`, `/politique-confidentialite` |
| `app/api/lead/route.ts` | Proxy serveur pour l'envoi des leads (voir section Formulaire / Leads) |
| `components/layout/` | `Navbar.tsx`, `Footer.tsx` |
| `components/ui/` | `DeontoBanner.tsx`, `EligibilityForm.tsx`, `CommuneContactForm.tsx` |
| `data/communes.ts` | Référentiel communes ciblées (77/91/93/94) |
| `data/guichets.ts` | Catalogue des guichets de financement B2G réels (Fonds vert, ACTEE/EduRénov, Plan Fraîcheur État, PENSÉE+/ARS) avec dates de vérification — **source de vérité pour les montants/dispositifs**, à jour au 28/07/2026 |
| `lib/eligibility.ts` | Logique de scoring/éligibilité |
| `lib/geo.ts` | Utilitaires géographiques (communes, départements) |
| `lib/webhook.ts` | Types et envoi du payload lead vers `/api/lead` |

## Règles absolues

- Toute intervention sur le **site en production** se fait dans `vitrine/` — pas à la racine du repo
- `psg-dashboard-admin.html` est dans `.gitignore` — **ne jamais l'ajouter au repo** (contient marges, leads, données commerciales)
- Le dossier `memory/` est dans `.gitignore` — **ne jamais le committer** (profil Charly, décisions internes)
- Ne jamais exposer de clé API (Anthropic, webhook Make.com, etc.) côté client — toujours via route API serveur (`vitrine/app/api/*`) avec variable d'env **non préfixée `NEXT_PUBLIC_`**
- Toujours répondre et commenter en **français**
- **Ne jamais réintroduire `psg-energy.fr`** — le domaine est abandonné, tout doit pointer sur `psglobal.energy`
- **Ne jamais introduire `fonts.googleapis.com`** — interdit RGPD, décision CNIL 10/02/2022
- **Doctrine AMO** : ne jamais rédiger de contenu laissant penser que PSG installe ou vend des équipements — PSG orchestre, sécurise les subventions, ne construit pas
- **Jamais de MaPrimeRénov'** dans l'argumentaire ou le code — dispositif particuliers hors cible PSG (B2G/B2B uniquement)

## Formulaire / Leads

`vitrine/components/ui/EligibilityForm.tsx` et `CommuneContactForm.tsx` envoient un payload JSON (`LeadPayload` — voir `lib/webhook.ts`) vers `POST /api/lead`, qui relaie côté serveur vers Make.com :

```
process.env.MAKE_WEBHOOK_URL  // variable d'env Vercel, jamais NEXT_PUBLIC_, jamais exposée côté client
```

Make.com → Zoho CRM EU. L'URL du webhook n'apparaît nulle part dans le code client (amélioration par rapport à la génération précédente du site, qui la hardcodait en JS).

## Simulateur / guichets d'aides

`vitrine/data/guichets.ts` recense les guichets B2G réellement mobilisables (Fonds vert, ACTEE/EduRénov écoles, Plan Fraîcheur État, PENSÉE+ santé/ARS), avec sources et date de dernière vérification. **À mettre à jour à chaque évolution réglementaire** — ne pas réintroduire les barèmes ANAH/MaPrimeRénov' de l'ancienne génération (`shared/engine.js`, non utilisé par `vitrine/`).

## Déploiement

- **Production** : Vercel → `psglobal.energy` (auto-deploy sur push `main`, team `charly-wouches-projects`, projet `psg-energy-mvp`, Root Directory = `vitrine/`)
- `psg-africa-intelligence.html` et `psg-dashboard-admin.html` ne doivent jamais être servis publiquement

## Conformité CNIL / RGPD

### En place (ne pas régresser)
- Aucun cookie tiers (pas de GA, Meta Pixel, Hotjar) → pas de bandeau requis
- Pas de clé API ni de webhook exposés côté client
- Pages légales dans `vitrine/app/` : `mentions-legales`, `cgv`, `politique-confidentialite`
- En-têtes de sécurité définis dans `vitrine/next.config.mjs` (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)

### Règles à respecter
1. Jamais de ressource externe sans vérification RGPD
2. Tout nouveau formulaire → mention RGPD art. 13 au point de collecte
3. Cookies → bandeau consentement CNIL 2022 obligatoire avant dépôt
4. Nouveaux sous-traitants → ajouter section dédiée dans `vitrine/app/politique-confidentialite`
5. Durées de conservation définies avant toute collecte

### Points en attente (au 23/09/2026)
- SIREN non disponible (immatriculation Jurisociété N°1727182) — mentionné dans `vitrine/app/mentions-legales/page.tsx`
- Décision explicite à prendre sur le sort des fichiers HTML hérités à la racine (suppression, archivage, ou redirection 301 vers l'app `vitrine/`)
- 3 branches non fusionnées à trancher : `feat/reste-a-charge-ehpad`, `claude/webhook-hardening`, `claude/update-guichets-juillet2026`
