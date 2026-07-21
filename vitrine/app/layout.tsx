import type { Metadata } from "next";
import { Big_Shoulders_Display, Inter } from "next/font/google";
import "./globals.css";

const bigShouldersDisplay = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://psglobal.energy"),
  title: {
    default: "PSGLOBAL-ENERGY — Plan Fraîcheur EHPAD & Collectivités | MaPrimeRénov 2026",
    template: "%s | PSGLOBAL-ENERGY",
  },
  description:
    "PSGLOBAL Energy accompagne les EHPAD et collectivités de Seine-et-Marne dans le déploiement du Plan Fraîcheur — climatisation, pompes à chaleur, PV, isolation — avec 0 € avancé grâce aux aides ANAH 2026.",
  keywords: [
    "Plan Fraîcheur EHPAD",
    "climatisation EHPAD Seine-et-Marne",
    "MaPrimeRénov collectivités",
    "pompe à chaleur IDF",
    "PSGLOBAL Energy",
    "rénovation énergétique 77",
  ],
  authors: [{ name: "PSGLOBAL Energy" }],
  creator: "PSGLOBAL Energy",
  publisher: "PSGLOBAL Energy",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://psglobal.energy",
    siteName: "PSGLOBAL-ENERGY",
    title: "PSGLOBAL-ENERGY — Plan Fraîcheur EHPAD & Collectivités",
    description:
      "Financement 100 % public pour la rénovation thermique de vos établissements. Zéro avance de fonds.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PSGLOBAL-ENERGY Plan Fraîcheur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PSGLOBAL-ENERGY — Plan Fraîcheur EHPAD & Collectivités",
    description: "Financement 100 % public. Zéro avance de fonds.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://psglobal.energy",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${bigShouldersDisplay.variable} ${inter.variable}`}
    >
      <body className="bg-ink text-white font-body antialiased">{children}</body>
    </html>
  );
}
