import { type NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, BUCKET } from "~/lib/s3";
import { isInlineMediaType, isPublicMediaKey } from "~/lib/media-keys";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string[] }> },
) {
  try {
    const p = await params;
    const keyArray = p.key;
    const key = keyArray.join("/");

    if (!key) {
      return new NextResponse("Image key is required", { status: 400 });
    }

    // The bucket is shared with the LMS: only serve public media prefixes.
    if (!isPublicMediaKey(key)) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Only pass through a single, well-formed byte range.
    const rawRange = request.headers.get("range");
    const rangeHeader =
      rawRange && /^bytes=\d*-\d*$/.test(rawRange) ? rawRange : undefined;

    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Range: rangeHeader,
    });

    const response = await s3Client.send(command);

    if (!response.Body) {
      return new NextResponse("Image not found", { status: 404 });
    }

    // Convert the stream into a Response
    const stream = response.Body.transformToWebStream();

    const headers = new Headers();
    headers.set("Accept-Ranges", "bytes");
    if (isInlineMediaType(response.ContentType)) {
      headers.set("Content-Type", response.ContentType!);
    } else {
      headers.set("Content-Type", "application/octet-stream");
      headers.set("Content-Disposition", "attachment");
    }
    headers.set("X-Content-Type-Options", "nosniff");
    if (response.ContentLength !== undefined)
      headers.set("Content-Length", response.ContentLength.toString());
    if (response.ContentRange)
      headers.set("Content-Range", response.ContentRange);
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
