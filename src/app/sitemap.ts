import { type MetadataRoute } from "next";
import { LOCATIONS_DATA } from "~/data/locations";
import { MATRIC_TEXTBOOKS } from "~/data/matric-textbooks";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.msns.edu.pk";
  // lastModified is omitted on purpose: stamping every URL with the build time
  // tells crawlers nothing, and Google ignores lastmod values it finds inaccurate.

  // Static core pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/resources`,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/downloads`,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/academics`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/admission`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/admission/apply`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/campus`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/achievements`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/faculty`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/wazirabad`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ghakhar`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  // Dynamic location pages for 34+ surrounding villages and towns
  const locationPages: MetadataRoute.Sitemap = LOCATIONS_DATA.map((loc) => ({
    url: `${baseUrl}/locations/${loc.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Official Institutional Documents (7 core publications)
  const officialDocs = [
    "msns-prospectus-2026-2027.pdf",
    "msns-offline-admission-form-2026-2027.pdf",
    "msns-academic-calendar-2026-2027.pdf",
    "msns-matriculation-scheme-of-studies.pdf",
    "msns-tuition-fee-policy-and-challan-guide.pdf",
    "msns-code-of-conduct-and-uniform-rules.pdf",
    "msns-bise-matric-resource-guide.pdf",
  ];

  const officialDocPages: MetadataRoute.Sitemap = officialDocs.map((filename) => ({
    url: `${baseUrl}/api/documents/${filename}`,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // All 20 PCTB Official Matriculation Textbooks (Cloudflare R2 Direct Downloads)
  const textbookPages: MetadataRoute.Sitemap = MATRIC_TEXTBOOKS.map((book) => ({
    url: `${baseUrl}${book.downloadUrl}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // All 20 High-Yield MSNS Revision Notes & Syllabuses
  const notesPages: MetadataRoute.Sitemap = MATRIC_TEXTBOOKS.map((book) => ({
    url: `${baseUrl}${book.notesDownloadUrl}`,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));


  return [
    ...staticPages,
    ...locationPages,
    ...officialDocPages,
    ...textbookPages,
    ...notesPages,
  ];
}
