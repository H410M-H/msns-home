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

      const response = await s3Client.send(command);

      if (response.Body) {
        const stream = response.Body.transformToWebStream();
        const headers = new Headers();
        headers.set("Accept-Ranges", "bytes");
        const contentType = response.ContentType ?? (safeFilename.endsWith(".pdf") ? "application/pdf" : "application/octet-stream");
        headers.set("Content-Type", contentType);
        headers.set("Content-Disposition", `inline; filename="${safeFilename}"`);
        if (response.ContentLength !== undefined) headers.set("Content-Length", response.ContentLength.toString());
        if (response.ContentRange) headers.set("Content-Range", response.ContentRange);
        headers.set("Cache-Control", "public, max-age=31536000, immutable");

        const status = response.ContentRange ? 206 : 200;
        return new NextResponse(stream, { status, headers });
      }
    } catch (s3Err) {
      console.warn(`Could not fetch ${key} from Cloudflare R2, attempting local fallback:`, s3Err);
    }

    // Local filesystem fallback
    const localPath = path.join(process.cwd(), "public", "documents", safeFilename);
    if (fs.existsSync(localPath)) {
      const fileBuffer = fs.readFileSync(localPath);
      const headers = new Headers();
      headers.set("Content-Type", safeFilename.endsWith(".pdf") ? "application/pdf" : "application/octet-stream");
      headers.set("Content-Disposition", `inline; filename="${safeFilename}"`);
      headers.set("Content-Length", fileBuffer.length.toString());
      headers.set("Cache-Control", "public, max-age=86400");
      return new NextResponse(fileBuffer, { status: 200, headers });
    }

    return new NextResponse("Document not found", { status: 404 });
  } catch (error: unknown) {
    console.error("Error serving document:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
