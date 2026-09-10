import { type MetadataRoute } from "next";
import { LOCATIONS_DATA } from "~/data/locations";
import { MATRIC_TEXTBOOKS } from "~/data/matric-textbooks";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.msns.edu.pk";
  const now = new Date();

  // Static core pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/downloads`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/academics`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/admission`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/admission/apply`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/campus`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/achievements`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/faculty`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/wazirabad`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ghakhar`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  // Dynamic location pages for 34+ surrounding villages and towns
  const locationPages: MetadataRoute.Sitemap = LOCATIONS_DATA.map((loc) => ({
    url: `${baseUrl}/locations/${loc.slug}`,
    lastModified: now,
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
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // All 20 PCTB Official Matriculation Textbooks (Cloudflare R2 Direct Downloads)
  const textbookPages: MetadataRoute.Sitemap = MATRIC_TEXTBOOKS.map((book) => ({
    url: `${baseUrl}${book.downloadUrl}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // All 20 High-Yield MSNS Revision Notes & Syllabuses
  const notesPages: MetadataRoute.Sitemap = MATRIC_TEXTBOOKS.map((book) => ({
    url: `${baseUrl}${book.notesDownloadUrl}`,
    lastModified: now,
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
