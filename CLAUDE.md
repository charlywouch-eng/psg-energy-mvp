# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Contexte métier

PSG Energy (Provider Services Groupe) est une régie commerciale française (SASU) spécialisée en énergies renouvelables. Elle **vend** des équipements au nom d'installateurs RGE certifiés sans réaliser d'installations. Marges : Kwanthic 28,5% / Le Solariste 37,5%. Deux axes : France IDF (77, 94, 91, 93) + Congo Brazzaville / zone CEMAC.

## Architecture

Projet 100% front-end statique — 6 fichiers HTML autonomes, zéro framework, zéro build step. Chaque fichier contient son propre CSS (variables CSS partagées à la main) et son propre JS inline.

| Fichier | Rôle | Accès |
|---------|------|-------|
| `psg-energy-site.html` | Site vitrine institutionnel desktop (psg-energy.fr) | Public |
| `psg-energy-v5-mvp.html` | App mobile B2C/B2B (simulateur, espace B2B SIRET, i18n 6 langues) | Public |
| `psg-chatbot-elia.html` | Chatbot IA Élia (nécessite un proxy API Claude) | Public |
| `psg-commercial-signature.html` | Tunnel devis + signature électronique YouSign | Public |
| `psg-africa-intelligence.html` | Dashboard Intelligence Afrique (noindex) | Semi-privé |
| `psg-dashboard-admin.html` | Dashboard interne CRM/pipeline — **NE PAS COMMITTER** | Privé |

## Règles absolues

- `psg-dashboard-admin.html` est dans `.gitignore` — ne jamais l'ajouter au repo (contient marges, leads, données commerciales)
- Le dossier `memory/` est dans `.gitignore` — ne jamais le committer (profil Charly, décisions internes)
- Ne jamais exposer de clé API Anthropic côté client — utiliser un proxy Vercel serverless function
- Toujours répondre et commenter en **français**
- Deux domaines distincts : `psg-energy.fr` (France) ≠ `psglobal.energy` (International) — ne pas confondre

## Formulaire de contact

`psg-energy-site.html` → fonction `submitForm()` : poste un payload JSON `{nom, tel, cp, projet, date, source}` vers `LEAD_WEBHOOK` (variable en haut du script). Si vide, fallback `mailto:contact@psglobal.energy`. Pour brancher Make.com / Zoho CRM : renseigner l'URL du webhook dans `LEAD_WEBHOOK`.

## Chatbot Élia

`psg-chatbot-elia.html` appelle `https://api.anthropic.com/v1/messages` sans clé (appel client-side impossible en production). La solution prévue est une Vercel Edge Function qui proxifie l'appel avec la clé côté serveur.

## Simulateur d'aides ANAH 2026

Dans `psg-energy-site.html` et `psg-energy-v5-mvp.html` : objet `AC` (Aides Config) → barèmes MPR par tranche fiscale, CEE, TVA 5,5%, Éco-PTZ, prime autoconsommation EDF OA, crédit ADVENIR. Les montants sont codés en dur — à mettre à jour à chaque révision ANAH.

## Déploiement

- Cible France : OVH → `psg-energy.fr` (uploader `psg-energy-site.html` comme `index.html` dans `www/`)
- Cible app mobile : Vercel → `psglobal.energy` (connecter le repo GitHub)
- `psg-africa-intelligence.html` et `psg-dashboard-admin.html` ne doivent jamais être servis publiquement

## Variables CSS communes

Tous les fichiers partagent les mêmes tokens (copiés manuellement) :
- `--blue:#1A4DFF` / `--green:#00C48C` / `--gold:#F5A000`
- `--ink:#08091A` / `--surf:#F2F5FB` / `--ff:'Outfit'` / `--fb:'Inter'`
- Toute modification de charte doit être propagée dans les 6 fichiers

## Points légaux en cours

- SIREN non encore disponible (immatriculation Jurisociété N°1727182)
- Liens CGV / Mentions légales / RGPD dans le footer pointent vers `#` — à remplacer dès rédaction
- Email `dpo@psg-energy.fr` référencé dans la section CNIL — à créer avant mise en ligne
- Fonts Google (`fonts.googleapis.com`) à remplacer par self-hosted pour conformité RGPD
