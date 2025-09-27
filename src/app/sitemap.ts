import { type MetadataRoute } from "next";



export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.msns.edu.pk";
  const lmsUrl = "https://www.lms.msns.edu.pk";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: lmsUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2025-06-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission`,
      lastModified: new Date("2025-06-27"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2025-06-27"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
        {
      url: `${lmsUrl}/sign-in`,
      lastModified: new Date("2025-06-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${lmsUrl}/`,
      lastModified: new Date("2025-06-27"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${lmsUrl}/dashboard`,
      lastModified: new Date("2025-06-27"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];



  return staticPages;
}
