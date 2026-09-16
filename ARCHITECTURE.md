# MSNS Public Website — Technical Architecture & Media Pipeline

## 1. System Overview
- **Name:** MSNS Public Website (`msns-home`)
- **Domain:** `msns.edu.pk`
- **Purpose:** Public-facing web presence, admissions portal, school prospectus, gallery, and student resources for M.S. Naz High School.
- **Stack:** Next.js 15.5.9 (App Router), React 19, TypeScript 5.9.3, Tailwind CSS v4, Node.js.
- **Media Storage:** Cloudflare R2 (S3-compatible, Zero-Egress Storage).

---

## 2. Dual-Tier Image Optimization Pipeline

To guarantee optimal Core Web Vitals (Largest Contentful Paint < 1.2s), minimal bandwidth consumption on mobile networks, and efficient Cloudflare R2 storage usage, `msns-home` implements a **Dual-Tier Image Optimization Architecture**:

```
+-----------------------------------------------------------------------------------------------+
| MSNS-HOME DUAL IMAGE OPTIMIZATION PIPELINE                                                    |
+-----------------------------------------------------------------------------------------------+
|                                                                                               |
|  [ TIER 1: INGRESS UPLOAD COMPRESSION ]                                                       |
|  Admin / CMS Uploads -> /api/gallery/upload                                                   |
|             |                                                                                 |
|             v                                                                                 |
|  Sharp Optimization Engine (src/lib/image-optimizer.ts)                                       |
|    * EXIF Orientation Normalization (.rotate())                                               |
|    * Max Bounds Clamping: <= 2048px (maintaining aspect ratio)                                 |
|    * Codec Optimization: mozjpeg (q:82), png (lvl:8, q:85), webp (q:82), avif (q:80)          |
|    * Result: 60%–80% payload reduction before storage                                         |
|             |                                                                                 |
|             v                                                                                 |
|  Cloudflare R2 Bucket (Zero-Egress Object Storage)                                            |
|                                                                                               |
|                                                                                               |
|  [ TIER 2: EGRESS EDGE TRANSCODING & CACHING ]                                                |
|  Public Visitors (<Image src="/api/images/..." />)                                            |
|             |                                                                                 |
|             v                                                                                 |
|  Next.js Edge Image Optimizer (/_next/image)                                                  |
|    * Formats: Edge AVIF & WebP dynamic transcoding                                            |
|    * Device-Specific Downscaling: deviceSizes [640..2048], imageSizes [16..384]               |
|    * Edge Cache TTL: 1 Year (minimumCacheTTL: 31536000)                                       |
|             |                                                                                 |
|             v (Cached at Vercel / Edge CDN on first hit)                                      |
|  S3 Proxy Route (/api/images/[...key])                                                        |
|    * Cache-Control: public, max-age=31536000, immutable                                      |
|                                                                                               |
+-----------------------------------------------------------------------------------------------+
```

### Key Invariants
1. **Never Bypass Optimization in Production**: `images.unoptimized` must remain disabled. Next.js edge transcoding must serve modern AVIF and WebP variants.
2. **Pre-Persistence Normalization**: All uploads are compressed and capped at 2048px on the server prior to Cloudflare R2 persistence.
3. **Immutable Proxy Delivery**: Origin proxy routes emit `Cache-Control: public, max-age=31536000, immutable` so edge CDNs and browsers cache assets indefinitely.
