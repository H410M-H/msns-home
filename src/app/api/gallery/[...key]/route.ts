import { type NextRequest, NextResponse } from "next/server";
import { deleteFromS3, S3_LISTING_TAG } from "~/lib/s3";

import { revalidateTag } from "next/cache";
import { isGalleryRequestAuthorized } from "~/lib/gallery-auth";

export const dynamic = "force-dynamic";


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ key: string[] }> }
) {
  try {
    // Authentication check
    if (!isGalleryRequestAuthorized(request)) {
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
    revalidateTag(S3_LISTING_TAG);

    return NextResponse.json({ success: true, deletedKey: key });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
