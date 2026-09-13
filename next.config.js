/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
await import("./src/env.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  serverExternalPackages: ["nodemailer"],
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/documents/:path*",
        destination: "/api/documents/:path*",
      },
    ];
  },
};

export default nextConfig;
