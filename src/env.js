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
    AWS_ENDPOINT_URL: z.string().optional().default("https://s3.railway.app"),
    AWS_DEFAULT_REGION: z.string().optional().default("us-east-1"),
    AWS_S3_BUCKET_NAME: z.string().optional().default("msns-home-bucket"),
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
   * Also map common Railway / S3 alternative environment variable names.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    AWS_ENDPOINT_URL:
      process.env.AWS_ENDPOINT_URL ||
      process.env.S3_ENDPOINT ||
      process.env.AWS_ENDPOINT ||
      "https://s3.railway.app",
    AWS_DEFAULT_REGION:
      process.env.AWS_DEFAULT_REGION ||
      process.env.AWS_REGION ||
      "us-east-1",
    AWS_S3_BUCKET_NAME:
      process.env.AWS_S3_BUCKET_NAME ||
      process.env.AWS_BUCKET_NAME ||
      process.env.BUCKET_NAME ||
      process.env.RAILWAY_BUCKET_NAME ||
      "msns-home-bucket",
    AWS_ACCESS_KEY_ID:
      process.env.AWS_ACCESS_KEY_ID ||
      process.env.AWS_ACCESS_KEY ||
      "",
    AWS_SECRET_ACCESS_KEY:
      process.env.AWS_SECRET_ACCESS_KEY ||
      process.env.AWS_SECRET_KEY ||
      "",
  },
  skipValidation:
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "build" ||
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.NODE_ENV === "production",
  emptyStringAsUndefined: true,
});
