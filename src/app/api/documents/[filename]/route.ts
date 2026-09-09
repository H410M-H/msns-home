import { type NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, BUCKET } from "~/lib/s3";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;

    if (!filename) {
      return new NextResponse("Document filename is required", { status: 400 });
    }

    // Sanitize filename to prevent directory traversal
    const safeFilename = path.basename(filename);
    const key = `documents/${safeFilename}`;

    const rangeHeader = request.headers.get("range");

    try {
      const command = new GetObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Range: rangeHeader ?? undefined,
      });

      const s3Response = await s3Client.send(command);

      if (s3Response.Body) {
        const stream = s3Response.Body.transformToWebStream();
        const headers = new Headers();
        headers.set("Accept-Ranges", "bytes");
        headers.set(
          "Content-Type",
          s3Response.ContentType ?? "application/pdf"
        );
        if (s3Response.ContentLength !== undefined) {
          headers.set("Content-Length", s3Response.ContentLength.toString());
        }
        if (s3Response.ContentRange) {
          headers.set("Content-Range", s3Response.ContentRange);
        }
        headers.set(
          "Content-Disposition",
          `inline; filename="${safeFilename}"`
        );
        headers.set(
          "Cache-Control",
          "public, max-age=86400, stale-while-revalidate=604800"
        );

        const status = s3Response.ContentRange ? 206 : 200;
        return new NextResponse(stream, { status, headers });
      }
    } catch (s3Error: unknown) {
      console.warn(`[S3 Document Stream] Could not fetch ${key} from R2, falling back to local:`, s3Error);
    }

    // Local fallback in public/documents/
    const localPath = path.join(process.cwd(), "public", "documents", safeFilename);
    if (fs.existsSync(localPath)) {
      const stat = fs.statSync(localPath);
      const fileBuffer = fs.readFileSync(localPath);

      const headers = new Headers();
      headers.set("Content-Type", "application/pdf");
      headers.set("Content-Length", stat.size.toString());
      headers.set(
        "Content-Disposition",
        `inline; filename="${safeFilename}"`
      );
      headers.set("Cache-Control", "public, max-age=3600");

      return new NextResponse(fileBuffer, { status: 200, headers });
    }

    return new NextResponse("Document not found", { status: 404 });
  } catch (error: unknown) {
    console.error("Error serving document:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
