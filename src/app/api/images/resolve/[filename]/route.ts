import { NextResponse } from "next/server";
import { findImageByFilename, getFromS3 } from "~/lib/s3";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  if (!filename) {
    return new NextResponse("Filename is required", { status: 400 });
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
    if (response.ContentType) headers.set("Content-Type", response.ContentType);
    if (response.ContentLength) headers.set("Content-Length", response.ContentLength.toString());
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    return new NextResponse(stream, { headers });
  } catch (error) {
    console.error(`Error resolving image ${filename}:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
