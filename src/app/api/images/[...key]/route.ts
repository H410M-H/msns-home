import { type NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { env } from "~/env.js";

const s3Client = new S3Client({
  region: env.S3_REGION,
  endpoint: env.S3_ENDPOINT_URL,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

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

    const command = new GetObjectCommand({
      Bucket: env.S3_BUCKET_NAME,
      Key: key,
    });

    const response = await s3Client.send(command);

    if (!response.Body) {
      return new NextResponse("Image not found", { status: 404 });
    }

    // Convert the stream into a Response
    const stream = response.Body.transformToWebStream();
    
    const headers = new Headers();
    if (response.ContentType) headers.set("Content-Type", response.ContentType);
    if (response.ContentLength) headers.set("Content-Length", response.ContentLength.toString());
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    return new NextResponse(stream, { headers });
  } catch (error: unknown) {
    console.error("Error fetching image from S3:", error);
    
    if (error instanceof Error && error.name === "NoSuchKey") {
      return new NextResponse("Image not found", { status: 404 });
    }

    return new NextResponse("Internal server error", { status: 500 });
  }
}

