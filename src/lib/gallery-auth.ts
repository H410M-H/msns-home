import { createHash, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

/**
 * Validates the request using the GALLERY_API_SECRET environment variable.
 * If the secret is not set, every request is rejected outside development.
 * The comparison is constant-time so the secret can't be guessed by timing.
 */
export function isGalleryRequestAuthorized(request: NextRequest): boolean {
  const secret = process.env.GALLERY_API_SECRET;
  if (!secret) {
    return process.env.NODE_ENV === "development";
  }
  const header = request.headers.get("Authorization") ?? "";
  // Hash both sides so the buffers always have equal length.
  const expected = createHash("sha256").update(`Bearer ${secret}`).digest();
  const actual = createHash("sha256").update(header).digest();
  return timingSafeEqual(expected, actual);
}
