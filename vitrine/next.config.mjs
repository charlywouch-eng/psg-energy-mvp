/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimisation images désactivée (pas d'images externes)
  images: {
    unoptimized: false,
  },
  // En-têtes de sécurité
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  // Redirections SEO
  async redirects() {
    return [
      // Redirige /a-propos vers /a-propos (pas de redirect, mais garde le slug encodé)
    ];
  },
};

export default nextConfig;
