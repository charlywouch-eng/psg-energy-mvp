import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/mentions-legales", "/cgv", "/politique-confidentialite"],
    },
    sitemap: "https://psglobal.energy/sitemap.xml",
  };
}
