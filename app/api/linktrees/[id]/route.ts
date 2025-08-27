import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function PUT(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "ID não encontrado na URL" },
        { status: 400 }
      );
    }

    const data = await request.json();

    const updatedLinktree = await db.$transaction(async (prisma) => {
      await prisma.link.deleteMany({
        where: {
          linktreeId: id,
        },
      });

      const linktree = await prisma.linktree.update({
        where: {
          id: id,
        },
        data: {
          displayName: data.displayName,
          avatarUrl: data.avatarUrl,
          bio: data.bio,
          theme: data.theme,
          customColor: data.customColor,
          backgroundImageUrl: data.backgroundImageUrl,
          isPublic: data.isPublic,
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
        include: {
          links: {
            orderBy: { order: "asc" },
          },
        },
      });
      return linktree;
    });

    return NextResponse.json(updatedLinktree, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar Linktree:", error);
    return NextResponse.json(
      { error: "Falha ao atualizar Linktree" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const LinktreeId = url.pathname.split("/").pop();

    if (!LinktreeId) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    await db.linktree.delete({
      where: { id: LinktreeId },
    });
    return NextResponse.json({ message: "Linktree excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir Linktree:", error);
    return NextResponse.json(
      { error: "Falha ao excluir Linktree" },
      { status: 500 }
    );
  }
}
