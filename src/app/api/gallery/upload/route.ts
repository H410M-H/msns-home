import { type NextRequest, NextResponse } from "next/server";
import { uploadToS3 } from "~/lib/s3";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

// Allowed upload categories to prevent path injection
const ALLOWED_CATEGORIES = ["gallery", "logos", "social", "placeholders"];

/**
 * Validates the request using the GALLERY_API_SECRET environment variable.
 * If not set, all requests are blocked in production.
 */
function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.GALLERY_API_SECRET;
  if (!secret) {
    // In development, allow if no secret is set
    return process.env.NODE_ENV === "development";
  }
  const authHeader = request.headers.get("Authorization");
  return authHeader === `Bearer ${secret}`;
}

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const category = (formData.get("category") as string) ?? "gallery";

    // Validate category against allowlist (prevents path injection)
    if (!ALLOWED_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: `Invalid category. Allowed: ${ALLOWED_CATEGORIES.join(", ")}` },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF, AVIF" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const key = `${category}/${timestamp}_${sanitizedName}`;

    await uploadToS3(key, buffer, file.type);

    return NextResponse.json({
      key,
      url: `/api/images/${key}`,
      filename: file.name,
      size: file.size,
      contentType: file.type,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
