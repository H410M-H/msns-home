/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
await import("./src/env.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dvvbxrs55/image/upload/**",
      },
      // {
      //   protocol: "https",
      //   hostname: "storage.googleapis.com",
      //   pathname: "/**",
      // },
    ],
  },
};

export const cloudinaryConfig = {
  cloudName: "dvvbxrs55",
  uploadPreset: {
    profilePic: "msnsPDP",
    cv: "msnsCV",
  },
};

export default nextConfig;
