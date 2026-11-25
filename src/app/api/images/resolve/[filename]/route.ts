import { NextResponse } from "next/server";
import { findImageByFilename, getFromS3 } from "~/lib/s3";
import { isInlineMediaType } from "~/lib/media-keys";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  if (!filename) {
    return new NextResponse("Filename is required", { status: 400 });
  }
  if (!/^[A-Za-z0-9._-]{1,200}$/.test(filename)) {
    return new NextResponse("Invalid filename", { status: 400 });
  }

  try {
    const key = await findImageByFilename(filename);
    if (!key) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const response = await getFromS3(key);

    if (!response.Body) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const stream = response.Body.transformToWebStream();
    
    const headers = new Headers();
    if (isInlineMediaType(response.ContentType)) {
      headers.set("Content-Type", response.ContentType!);
    } else {
      headers.set("Content-Type", "application/octet-stream");
      headers.set("Content-Disposition", "attachment");
    }
    headers.set("X-Content-Type-Options", "nosniff");
    if (response.ContentLength) headers.set("Content-Length", response.ContentLength.toString());
    // The filename -> key mapping can change when the gallery is reorganised,
    // so cache for a day rather than pinning the result for a year.
    headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");

    return new NextResponse(stream, { headers });
  } catch (error) {
    console.error(`Error resolving image ${filename}:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
