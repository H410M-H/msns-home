/**
 * Bucket prefixes the public website may serve. The bucket is shared with the
 * LMS, which keeps private uploads and documents under other prefixes, so the
 * public image proxy must never stream anything outside this list.
 */
export const PUBLIC_MEDIA_PREFIXES = [
  "gallery/",
  "videos/",
  "logos/",
  "social/",
  "placeholders/",
] as const;

/** True when `key` is a normalised path under one of the public prefixes. */
export function isPublicMediaKey(key: string): boolean {
  if (!key || key.length > 512) return false;
  if (key.includes("\\") || key.includes("\0")) return false;
  const segments = key.split("/");
  if (segments.some((s) => s === "" || s === "." || s === "..")) return false;
  return PUBLIC_MEDIA_PREFIXES.some((p) => key.startsWith(p));
}

/** Content types that may be rendered inline; everything else is a download. */
export function isInlineMediaType(contentType: string | undefined): boolean {
  if (!contentType) return false;
  const t = contentType.toLowerCase();
  // SVG can carry script, so never render it inline from the shared bucket.
  if (t.startsWith("image/svg")) return false;
  return t.startsWith("image/") || t.startsWith("video/");
}
