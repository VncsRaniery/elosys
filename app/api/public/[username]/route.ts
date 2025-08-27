import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");

    const username = pathSegments.pop() || "";

    if (!username) {
      return NextResponse.json(
        { error: "Username not found in URL" },
        { status: 400 }
      );
    }

    const linktree = await db.linktree.findUnique({
      where: {
        username: username,
        isPublic: true,
      },
      include: {
        links: {
          where: { isActive: true },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!linktree) {
      return NextResponse.json(
        { error: "Linktree not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(linktree);
  } catch (error) {
    console.error("Error fetching public linktree:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}