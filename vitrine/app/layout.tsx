import type { Metadata, Viewport } from "next";
import PwaRegister from "@/components/PwaRegister";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://psglobal.energy"),
  title: {
    default: "PSGLOBAL-ENERGY — Assistance à maîtrise d'ouvrage | Confort d'été & financements tertiaires",
    template: "%s | PSGLOBAL-ENERGY",
  },
  description:
    "Cabinet d'assistance à maîtrise d'ouvrage (AMO) indépendant. Montage des dossiers Fonds vert, CEE tertiaire et fonds qualité pour le confort d'été des EHPAD et collectivités d'Île-de-France.",
  keywords: [
    "Plan Fraîcheur EHPAD",
    "rénovation énergétique EHPAD Seine-et-Marne",
    "Fonds Vert collectivités",
    "AMO assistance maîtrise d'ouvrage",
    "PSGLOBAL Energy",
    "rénovation énergétique 77",
    "CEE tertiaire IDF",
  ],
  authors: [{ name: "PSGLOBAL Energy" }],
  creator: "PSGLOBAL Energy",
  publisher: "PSGLOBAL Energy",
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PSGLOBAL-ENERGY",
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32" },
      { url: "/icons/favicon-16.png", sizes: "16x16" },
      { url: "/icons/icon-192.png",   sizes: "192x192" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://psglobal.energy",
    siteName: "PSGLOBAL-ENERGY",
    title: "PSGLOBAL-ENERGY — Cabinet AMO | Confort d'été EHPAD & Collectivités",
    description:
      "Fonds Vert, CEE tertiaire, fonds qualité pour EHPAD et collectivités d'Île-de-France. Cabinet AMO indépendant.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PSGLOBAL-ENERGY — Cabinet AMO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PSGLOBAL-ENERGY — Cabinet AMO | Confort d'été EHPAD & Collectivités",
    description: "Fonds Vert, CEE tertiaire, fonds qualité. Cabinet AMO indépendant.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://psglobal.energy",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        {/* Polices auto-hébergées — jamais de fonts.googleapis.com (CNIL 10/02/2022) */}
        <link rel="stylesheet" href="/fonts/fonts.css" />
      </head>
      <body className="bg-slate-50 text-midnight-900 antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
