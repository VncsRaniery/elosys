import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { linkId } = body;

    if (!linkId || typeof linkId !== "string") {
      return NextResponse.json(
        { error: "linkId is required and must be a string" },
        { status: 400 }
      );
    }

    await db.click.create({
      data: {
        linkId: linkId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[TRACK_CLICK_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
