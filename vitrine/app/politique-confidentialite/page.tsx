import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité RGPD | PSGLOBAL-ENERGY",
  robots: { index: false, follow: false },
};

const SECTIONS = [
  {
    titre: "1. Responsable du traitement",
    contenu: "PSGLOBAL Energy — SASU, immatriculation N°1727182. DPO : dpo@psglobal.energy.",
  },
  {
    titre: "2. Données collectées",
    contenu: "Nom, prénom, numéro de téléphone, adresse email (optionnelle), code postal, type de projet. Ces données sont strictement nécessaires au traitement de votre demande d'audit ou de devis.",
  },
  {
    titre: "3. Finalités du traitement (art. 13 RGPD)",
    contenu: "Traitement de votre demande d'audit, transmission à l'installateur RGE sélectionné (sous-traitant), suivi commercial et relances (base : intérêt légitime). Aucun traitement à des fins publicitaires tiers.",
  },
  {
    titre: "4. Destinataires",
    contenu: "PSGLOBAL Energy (interne) — Kwanthic (installateur RGE partenaire, sous-traitant contractuel) — Make.com (routage CRM, sous-traitant, données hébergées en UE) — Zoho CRM EU (stockage, sous-traitant, UE).",
  },
  {
    titre: "5. Durée de conservation",
    contenu: "Durée du projet + 3 ans après clôture du dossier (prospection inactive : 3 ans à compter du dernier contact, conformément aux recommandations CNIL).",
  },
  {
    titre: "6. Transferts hors UE",
    contenu: "Vercel Inc. (hébergeur, USA) — données protégées par les clauses contractuelles types de la Commission européenne. Aucun autre transfert hors UE.",
  },
  {
    titre: "7. Cookies",
    contenu: "Ce site n'utilise aucun cookie tiers (ni Google Analytics, ni Meta Pixel, ni Hotjar). Aucun bandeau de consentement n'est nécessaire à ce stade. Les fonts sont auto-hébergées.",
  },
  {
    titre: "8. Vos droits",
    contenu: "Accès, rectification, effacement, opposition, portabilité, limitation : contactez dpo@psglobal.energy. Réponse sous 30 jours. Réclamation possible auprès de la CNIL (cnil.fr).",
  },
  {
    titre: "9. Sécurité",
    contenu: "Connexion HTTPS obligatoire, données transmises via webhook sécurisé, accès CRM limité par rôle et authentification forte.",
  },
  {
    titre: "10. Mise à jour",
    contenu: `Dernière mise à jour : ${new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}. Toute modification substantielle sera notifiée par email aux personnes concernées.`,
  },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-display font-extrabold text-3xl text-white mb-2">Politique de confidentialité</h1>
        <p className="text-sm text-white/40 font-body mb-8">Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés</p>
        <div className="flex flex-col gap-6">
          {SECTIONS.map((s) => (
            <section key={s.titre}>
              <h2 className="font-display font-extrabold text-base text-white mb-2">{s.titre}</h2>
              <p className="text-sm font-body text-white/65 leading-relaxed">{s.contenu}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
