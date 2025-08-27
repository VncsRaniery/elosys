import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const extractIdFromRequest = (request: NextRequest): string | null => {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  return id || null;
};

export async function GET(request: NextRequest) {
  try {
    const id = extractIdFromRequest(request);

    if (!id) {
      return NextResponse.json(
        { error: "ID is missing in URL" },
        { status: 400 }
      );
    }

    const linktree = await db.linktree.findUnique({
      where: { id },
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
    console.error("Error fetching linktree:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const id = extractIdFromRequest(request);

    if (!id) {
      return NextResponse.json(
        { error: "ID is missing in URL" },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // Verificar se o Linktree pertence ao usuário
    const existingLinktree = await db.linktree.findFirst({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    if (!existingLinktree) {
      return NextResponse.json(
        { error: "Linktree not found or unauthorized" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const {
    //   displayName,
    //   avatarUrl,
    //   bio,
    //   theme,
    //   customColor,
    //   backgroundImageUrl,
    //   isPublic,
      links = [],
    } = body;

    const updatedLinktree = await db.$transaction(async (tx) => {
      await tx.link.deleteMany({
        where: { linktreeId: id },
      });

      //   const linktree = await tx.linktree.update({
      //     where: { id },
      //     data: {
      //       displayName,
      //       avatarUrl,
      //       bio,
      //       theme,
      //       customColor,
      //       backgroundImageUrl,
      //       isPublic,
      //     },
      //   });

      if (links.length > 0) {
        await tx.link.createMany({
          data: links.map((link: any, index: number) => ({
            title: link.title,
            url: link.url,
            order: index,
            isActive: true,
            linktreeId: id,
          })),
        });
      }

      return await tx.linktree.findUnique({
        where: { id },
        include: {
          links: {
            orderBy: { order: "asc" },
          },
        },
      });
    });

    return NextResponse.json(updatedLinktree);
  } catch (error) {
    console.error("Error updating linktree:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = extractIdFromRequest(request);

    if (!id) {
      return NextResponse.json(
        { error: "ID is missing in URL" },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const existingLinktree = await db.linktree.findFirst({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    if (!existingLinktree) {
      return NextResponse.json(
        { error: "Linktree not found or unauthorized" },
        { status: 404 }
      );
    }

    await db.linktree.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Linktree deleted successfully" });
  } catch (error) {
    console.error("Error deleting linktree:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
