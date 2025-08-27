import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const linktrees = await db.linktree.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        links: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(linktrees);
  } catch (error) {
    console.error("Falha ao buscar links:", error);
    return NextResponse.json(
      { error: "Falha ao buscar links" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const data = await request.json();
    const linktree = await db.linktree.create({
      data: {
        username: data.username,
        displayName: data.displayName,
        avatarUrl: data.avatarUrl,
        bio: data.bio,
        theme: data.theme,
        customColor: data.customColor,
        backgroundImageUrl: data.backgroundImageUrl,
        isPublic: data.isPublic,
        userId: session.user.id,
        links: {
          create: data.links.map(
            (link: { title: string; url: string }, index: number) => ({
              title: link.title,
              url: link.url,
              order: index,
              isActive: true,
            })
          ),
        },
      },
    });

    return NextResponse.json(linktree);
  } catch (error) {
    console.error("Falha ao criar linktree:", error);
    return NextResponse.json(
      { error: "Falha ao criar linktree" },
      { status: 500 }
    );
  }
}
