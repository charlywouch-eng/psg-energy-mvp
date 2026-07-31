import type { Metadata, Viewport } from "next";
import { Big_Shoulders_Display, Inter } from "next/font/google";
import PwaRegister from "@/components/PwaRegister";
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
    default: "PSGLOBAL-ENERGY — Plan Fraîcheur EHPAD & Collectivités | Fonds Vert 2026",
    template: "%s | PSGLOBAL-ENERGY",
  },
  description:
    "PSGLOBAL Energy accompagne les EHPAD et collectivités de Seine-et-Marne dans le déploiement du Plan Fraîcheur — confort d'été, pompes à chaleur, PV, isolation — avec 0 € avancé grâce au Fonds Vert et aux CEE tertiaires 2026.",
  keywords: [
    "Plan Fraîcheur EHPAD",
    "rénovation énergétique EHPAD Seine-et-Marne",
    "Fonds Vert collectivités",
    "pompe à chaleur IDF",
    "PSGLOBAL Energy",
    "rénovation énergétique 77",
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
    title: "PSGLOBAL-ENERGY — Plan Fraîcheur EHPAD & Collectivités",
    description:
      "Fonds Vert, CEE tertiaire, Plan Fraîcheur pour EHPAD et collectivités. Reste à charge minimisé, 0 € avancé.",
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
    description: "Fonds Vert, CEE tertiaire, Plan Fraîcheur. 0 € avancé par l'établissement.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://psglobal.energy",
  },
};

// themeColor must live in viewport export (deprecated inside metadata in Next 14+)
export const viewport: Viewport = {
  themeColor: "#0f172a",
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
      <body className="bg-ink text-white font-body antialiased">
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
