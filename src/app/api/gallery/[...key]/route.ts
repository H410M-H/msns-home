import { type NextRequest, NextResponse } from "next/server";
import { deleteFromS3 } from "~/lib/s3";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string[] }> }
) {
  try {
    const p = await params;
    const key = p.key.join("/");

    if (!key) {
      return NextResponse.json(
        { error: "Image key is required" },
        { status: 400 }
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
