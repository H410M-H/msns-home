import { type NextRequest, NextResponse } from "next/server";
import { deleteFromS3 } from "~/lib/s3";

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ key: string[] }> }
) {
  try {
    // Authentication check
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const p = await params;
    const key = p.key.join("/");

    if (!key) {
      return NextResponse.json(
        { error: "Image key is required" },
        { status: 400 }
      );
    }

    // Validate key is within allowed prefixes (prevent arbitrary S3 deletion)
    const ALLOWED_PREFIXES = ["gallery/", "logos/", "social/", "placeholders/"];
    if (!ALLOWED_PREFIXES.some((prefix) => key.startsWith(prefix))) {
      return NextResponse.json(
        { error: "Cannot delete items outside of allowed directories" },
        { status: 403 }
      );
    }

    await deleteFromS3(key);

    return NextResponse.json({ success: true, deletedKey: key });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
