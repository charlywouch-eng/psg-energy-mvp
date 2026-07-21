import { MetadataRoute } from "next";

const BASE_URL = "https://psglobal.energy";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "monthly" as const },
    { url: "/fraicheur-ehpad", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/collectivites", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/particuliers", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/eligibilite", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/methode", priority: 0.7, changeFrequency: "yearly" as const },
    { url: "/conformite", priority: 0.7, changeFrequency: "yearly" as const },
    { url: "/a-propos", priority: 0.6, changeFrequency: "yearly" as const },
    { url: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  ];

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
