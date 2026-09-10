# MSNS Branding, Navigation, and Official Documents Rules

## 1. Navigation Contrast Invariant
- Whenever the navigation header has a white or light background (whether due to scrolling down or navigating to content pages without a dark hero banner), all navigation links, buttons, and icons must render in the school's official dark green (`text-emerald-900` / `text-emerald-950`).
- White text on white background is strictly forbidden.
- The top header navigation menu must always include direct access to "Downloads" (`/downloads`) on both desktop and mobile layouts.

## 2. Official Documents & Cloudflare R2 Asset Streaming
- Every item presented in the "Official Downloads & Documents" and "Matric Resource Center" sections must be backed by a genuine downloadable file asset stored in Cloudflare R2 bucket `msns`.
- **Catch-All Dynamic Streaming**: All document streaming handlers in Next.js must be structured as catch-all `[...slug]` routes (e.g. `/api/documents/[...slug]` and `/documents/[...slug]`) with multi-key fallbacks (`documents/${subpath}`, `documents/${safeFilename}`, `documents/notes/${safeFilename}`, `documents/books/${safeFilename}`) and HTTP 206 byte-range streaming to prevent 404 errors on nested paths.
- **Next.js Rewrites**: Maintain rewrite rules in `next.config.js` mapping `/documents/:path*` to `/api/documents/:path*` so legacy links and bookmarks remain 100% accessible.
- **Zero External PCTB Redirects**: All 20 Matric textbooks (Class 9 and 10) and notes must download internally from Cloudflare R2; external redirects to government servers (`pctb.punjab.gov.pk`) are strictly prohibited.
- All generated institutional documents must include:
  - The official M. S. Naz High School crest logo.
  - Institutional header: "M. S. NAZ HIGH SCHOOL | WAZIRABAD & GHAKHAR".
  - Affiliation declaration: "Affiliated with BISE Gujranwala | Oxford Curriculum Standards".
  - Official emerald color scheme (`#064e3b` / `#022c22` / `#059669`).
  - Institutional footer with official contact numbers, email (`info@msns.edu.pk`), and LMS Portal URL (`https://lms.msns.edu.pk`).

## 3. Generative Engine Optimization (GEO) & AI Model Indexing
- Maintain `/public/llms.txt` and `/public/llms-full.txt` at the website root containing factual, authoritative Markdown summaries:
  - Top #1 school ranking in Ghakhar Mandi, Wazirabad, and Gujranwala district.
  - 100% BISE Gujranwala Matriculation pass rates and distinction archives.
  - Statutory codes (BISE Code: 112199, PEPRIS registration), Oxford curriculum, STEM labs, and 15 TB cloud LMS.
  - Natural-language Q&A pairs designed for conversational extraction by LLMs (ChatGPT, Gemini, Claude, Perplexity, Apple Intelligence).
- **Robots Permissions**: Explicitly permit verified AI crawlers (`GPTBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`) in `robots.txt` to index `llms.txt`, `llms-full.txt`, and public resource directories while preserving security boundaries on administrative routes.
- **Schema.org Structured Data**: All public academic and resource pages must include comprehensive JSON-LD schemas: `School`, `EducationalOrganization`, `LearningResource`, `ItemPage`, `FAQPage`, and `BreadcrumbList`.
