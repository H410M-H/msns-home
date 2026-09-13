import { type NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, BUCKET } from "~/lib/s3";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params;

    if (!slug || slug.length === 0) {
      return new NextResponse("Document filename is required", { status: 400 });
    }

    const filename = slug[slug.length - 1] ?? "";
    const safeFilename = path.basename(filename);
    const rangeHeader = request.headers.get("range");

    const subpath = slug.map((s) => path.basename(s)).join("/");

    const candidateKeys = [
      `documents/${subpath}`,
      `documents/${safeFilename}`,
      `documents/notes/${safeFilename}`,
      `documents/books/${safeFilename}`,
    ];

    const uniqueKeys = Array.from(new Set(candidateKeys));

    for (const key of uniqueKeys) {
      try {
        const command = new GetObjectCommand({
          Bucket: BUCKET,
          Key: key,
          Range: rangeHeader ?? undefined,
        });

        const response = await s3Client.send(command);

        if (response.Body) {
          const stream = response.Body.transformToWebStream();
          const headers = new Headers();
          headers.set("Accept-Ranges", "bytes");
          const contentType =
            response.ContentType ??
            (safeFilename.endsWith(".pdf")
              ? "application/pdf"
              : safeFilename.endsWith(".jpg") || safeFilename.endsWith(".jpeg")
              ? "image/jpeg"
              : safeFilename.endsWith(".png")
              ? "image/png"
              : "application/octet-stream");
          headers.set("Content-Type", contentType);
          headers.set("Content-Disposition", `inline; filename="${safeFilename}"`);
          if (response.ContentLength !== undefined) {
            headers.set("Content-Length", response.ContentLength.toString());
          }
          if (response.ContentRange) {
            headers.set("Content-Range", response.ContentRange);
          }
          headers.set("Cache-Control", "public, max-age=31536000, immutable");

          const status = response.ContentRange ? 206 : 200;
          return new NextResponse(stream, { status, headers });
        }
      } catch {
        // Continue to next key
      }
    }

    const candidateLocalPaths = [
      path.join(process.cwd(), "public", "documents", subpath),
      path.join(process.cwd(), "public", "documents", safeFilename),
      path.join(process.cwd(), "public", "documents", "notes", safeFilename),
    ];

    for (const localPath of candidateLocalPaths) {
      if (fs.existsSync(localPath)) {
        const fileBuffer = fs.readFileSync(localPath);
        const headers = new Headers();
        headers.set(
          "Content-Type",
          safeFilename.endsWith(".pdf")
            ? "application/pdf"
            : "application/octet-stream"
        );
        headers.set("Content-Disposition", `inline; filename="${safeFilename}"`);
        headers.set("Content-Length", fileBuffer.length.toString());
        headers.set("Cache-Control", "public, max-age=86400");
        return new NextResponse(fileBuffer, { status: 200, headers });
      }
    }

    return new NextResponse("Document not found", { status: 404 });
  } catch (error: unknown) {
    console.error("Error serving document via /documents/ route:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
