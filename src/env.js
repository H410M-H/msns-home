import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    AWS_ENDPOINT_URL: z.string().optional().default("https://c678cf5c0fc5ef3806edacc18e6a762d.r2.cloudflarestorage.com"),
    AWS_DEFAULT_REGION: z.string().optional().default("auto"),
    AWS_S3_BUCKET_NAME: z.string().optional().default("msns"),
    AWS_ACCESS_KEY_ID: z.string().optional().default(""),
    AWS_SECRET_ACCESS_KEY: z.string().optional().default(""),
  },

  /**
   * Specify your client-side environment variables schema here.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * Destruct process.env manually for compatibility across Next.js runtimes.
   * Maps S3 and AWS environment variable names (Cloudflare R2 / AWS S3).
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    AWS_ENDPOINT_URL:
      process.env.S3_ENDPOINT ||
      process.env.AWS_ENDPOINT_URL ||
      process.env.AWS_ENDPOINT ||
      "https://c678cf5c0fc5ef3806edacc18e6a762d.r2.cloudflarestorage.com",
    AWS_DEFAULT_REGION:
      process.env.S3_REGION ||
      process.env.AWS_DEFAULT_REGION ||
      process.env.AWS_REGION ||
      "auto",
    AWS_S3_BUCKET_NAME:
      process.env.S3_BUCKET_NAME ||
      process.env.AWS_S3_BUCKET_NAME ||
      process.env.AWS_BUCKET_NAME ||
      process.env.BUCKET_NAME ||
      "msns",
    AWS_ACCESS_KEY_ID:
      process.env.S3_ACCESS_KEY_ID ||
      process.env.AWS_ACCESS_KEY_ID ||
      process.env.AWS_ACCESS_KEY ||
      "",
    AWS_SECRET_ACCESS_KEY:
      process.env.S3_SECRET_ACCESS_KEY ||
      process.env.AWS_SECRET_ACCESS_KEY ||
      process.env.AWS_SECRET_KEY ||
      "",
  },
  skipValidation:
    !!process.env.SKIP_ENV_VALIDATION ||
    !!process.env.VERCEL ||
    !!process.env.VERCEL_ENV ||
    process.env.npm_lifecycle_event === "build" ||
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.NODE_ENV === "production",
  emptyStringAsUndefined: true,
});
