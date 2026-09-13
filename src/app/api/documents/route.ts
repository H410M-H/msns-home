import { NextResponse } from "next/server";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3Client, BUCKET } from "~/lib/s3";

export const dynamic = "force-dynamic";

const DOCUMENT_CATALOG: Record<string, { title: string; category: string }> = {
  "msns-prospectus-2026-2027.pdf": {
    title: "M. S. Naz High School Institutional Prospectus (2026-2027)",
    category: "Official",
  },
  "msns-offline-admission-form-2026-2027.pdf": {
    title: "Official Offline Admission Form & Application Package (2026-2027)",
    category: "Admissions",
  },
  "msns-academic-calendar-2026-2027.pdf": {
    title: "Comprehensive Academic Year Calendar & Planner (2026-2027)",
    category: "Academic",
  },
  "msns-matriculation-scheme-of-studies.pdf": {
    title: "BISE Gujranwala Matriculation Scheme of Studies (Grades 9 & 10)",
    category: "Examination",
  },
  "msns-tuition-fee-policy-and-challan-guide.pdf": {
    title: "Tuition Fee Structure, Concessions & Digital Challan Payment Guide",
    category: "Policy",
  },
  "msns-code-of-conduct-and-uniform-rules.pdf": {
    title: "Student Code of Conduct & Visual Uniform Leadership Guidelines",
    category: "Policy",
  },
  "msns-bise-matric-resource-guide.pdf": {
    title: "BISE Matric Exam Preparation & Model Papers Resource Directory",
    category: "Academic",
  },
  "uniform-leadership-guidelines.jpg": {
    title: "Student Uniform & Visual Leadership Guidelines (Photo Guide)",
    category: "Policy",
  },
  // Textbooks
  "pctb-class-9-physics.pdf": { title: "Class 9 Physics (PCTB E-Book)", category: "Academic" },
  "pctb-class-9-chemistry.pdf": { title: "Class 9 Chemistry (PCTB E-Book)", category: "Academic" },
  "pctb-class-9-biology.pdf": { title: "Class 9 Biology (PCTB E-Book)", category: "Academic" },
  "pctb-class-9-computer-science.pdf": { title: "Class 9 Computer Science (PCTB E-Book)", category: "Academic" },
  "pctb-class-9-mathematics.pdf": { title: "Class 9 Mathematics Science (PCTB E-Book)", category: "Academic" },
  "pctb-class-9-english.pdf": { title: "Class 9 English Compulsory (PCTB E-Book)", category: "Academic" },
  "pctb-class-9-urdu.pdf": { title: "Class 9 Urdu Compulsory (PCTB E-Book)", category: "Academic" },
  "pctb-class-9-tarjuma-tul-quran.pdf": { title: "Class 9 Tarjuma-tul-Quran (PCTB E-Book)", category: "Academic" },
  "pctb-class-9-islamiat.pdf": { title: "Class 9 Islamiat Compulsory (PCTB E-Book)", category: "Academic" },
  "pctb-class-9-pakistan-studies.pdf": { title: "Class 9 Pakistan Studies (PCTB E-Book)", category: "Academic" },
  "pctb-class-10-physics.pdf": { title: "Class 10 Physics (PCTB E-Book)", category: "Academic" },
  "pctb-class-10-chemistry.pdf": { title: "Class 10 Chemistry (PCTB E-Book)", category: "Academic" },
  "pctb-class-10-biology.pdf": { title: "Class 10 Biology (PCTB E-Book)", category: "Academic" },
  "pctb-class-10-computer-science.pdf": { title: "Class 10 Computer Science (PCTB E-Book)", category: "Academic" },
  "pctb-class-10-mathematics.pdf": { title: "Class 10 Mathematics Science (PCTB E-Book)", category: "Academic" },
  "pctb-class-10-english.pdf": { title: "Class 10 English Compulsory (PCTB E-Book)", category: "Academic" },
  "pctb-class-10-urdu.pdf": { title: "Class 10 Urdu Compulsory (PCTB E-Book)", category: "Academic" },
  "pctb-class-10-tarjuma-tul-quran.pdf": { title: "Class 10 Tarjuma-tul-Quran (PCTB E-Book)", category: "Academic" },
  "pctb-class-10-islamiat.pdf": { title: "Class 10 Islamiat Compulsory (PCTB E-Book)", category: "Academic" },
  "pctb-class-10-pakistan-studies.pdf": { title: "Class 10 Pakistan Studies (PCTB E-Book)", category: "Academic" },
};

export async function GET() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: "documents/",
    });

    const response = await s3Client.send(command);
    const contents = response.Contents ?? [];

    const seenFiles = new Set<string>();
    const filteredContents = contents
      .filter((obj) => obj.Key && !obj.Key.endsWith("/") && obj.Size && obj.Size > 0)
      .sort((a, b) => (a.Key?.split("/").length ?? 0) - (b.Key?.split("/").length ?? 0))
      .filter((obj) => {
        const rawFilename = obj.Key!.replace(/^documents\//, "");
        const baseName = rawFilename.split("/").pop()!;
        if (seenFiles.has(baseName)) {
          return false;
        }
        seenFiles.add(baseName);
        return true;
      });

    const documents = filteredContents.map((obj) => {
      const key = obj.Key!;
      const rawFilename = key.replace(/^documents\//, "");
      const baseName = rawFilename.split("/").pop()!;

      let title = "";
      let category = "General";

      const catalogItem = DOCUMENT_CATALOG[rawFilename] ?? DOCUMENT_CATALOG[baseName];
      if (catalogItem) {
        title = catalogItem.title;
        category = catalogItem.category;
      } else if (baseName.startsWith("msns-class-") && baseName.endsWith("-notes.pdf")) {
        const match = /^msns-class-(\d+)-(.+)-notes\.pdf$/.exec(baseName);
        if (match) {
          const grade = match[1];
          const sub = match[2]?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ?? "";
          title = `Class ${grade} ${sub} (Syllabus & High-Yield Notes)`;
          category = "Academic";
        }
      } else {
        title = baseName
          .replace(/\.[^/.]+$/, "")
          .replace(/^[0-9]+[-_]/, "")
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
      }

      const lastModified = obj.LastModified?.toISOString() ?? new Date().toISOString();

      return {
        key,
        filename: baseName,
        title,
        category,
        size: obj.Size ?? 0,
        lastModified,
        url: `/api/documents/${encodeURIComponent(baseName)}`,
      };
    });

    return NextResponse.json({ documents });
  } catch (error: unknown) {
    console.error("Error listing documents in msns-home:", error);
    return NextResponse.json(
      { error: "Failed to list documents" },
      { status: 500 }
    );
  }
}
