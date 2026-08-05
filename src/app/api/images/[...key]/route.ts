import { type NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, BUCKET } from "~/lib/s3";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string[] }> }
) {
  try {
    const p = await params;
    const keyArray = p.key;
    const key = keyArray.join("/");

    if (!key) {
      return new NextResponse("Image key is required", { status: 400 });
    }

    const rangeHeader = request.headers.get("range");

    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Range: rangeHeader ?? undefined,
    });

    const response = await s3Client.send(command);

    if (!response.Body) {
      return new NextResponse("Image not found", { status: 404 });
    }

    // Convert the stream into a Response
    const stream = response.Body.transformToWebStream();
    
    const headers = new Headers();
    headers.set("Accept-Ranges", "bytes");
    if (response.ContentType) headers.set("Content-Type", response.ContentType);
    if (response.ContentLength !== undefined) headers.set("Content-Length", response.ContentLength.toString());
    if (response.ContentRange) headers.set("Content-Range", response.ContentRange);
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    const status = response.ContentRange ? 206 : 200;

    return new NextResponse(stream, { status, headers });
  } catch (error: unknown) {
    console.error("Error fetching image from S3:", error);
    
    if (error instanceof Error && error.name === "NoSuchKey") {
      return new NextResponse("Image not found", { status: 404 });
    }

    return new NextResponse("Internal server error", { status: 500 });
  }
}

