/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Unsplash images served through Next.js optimizer (browser never hits unsplash.com directly).
    // To host locally: download each URL to public/images/ and update src props.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
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
