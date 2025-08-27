import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const linktrees = await db.linktree.findMany({
      where: { userId: user.id },
      include: {
        links: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(linktrees);
  } catch (error) {
    console.error("Error fetching linktrees:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const {
      username,
      displayName,
      avatarUrl,
      bio,
      theme = "dark",
      customColor = "#8A2BE2",
      backgroundImageUrl,
      isPublic = true,
      links = [],
    } = body;

    const existingLinktree = await db.linktree.findUnique({
      where: { username },
    });

    if (existingLinktree) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }

    const linktree = await db.linktree.create({
      data: {
        username,
        displayName,
        avatarUrl,
        bio,
        theme,
        customColor,
        backgroundImageUrl,
        isPublic,
        userId: user.id,
        links: {
          create: links.map((link: any, index: number) => ({
            title: link.title,
            url: link.url,
            order: index,
            isActive: true,
          })),
        },
      },
      include: {
        links: {
          orderBy: { order: "asc" },
        },
      },
    });

    return NextResponse.json(linktree, { status: 201 });
  } catch (error) {
    console.error("Error creating linktree:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
