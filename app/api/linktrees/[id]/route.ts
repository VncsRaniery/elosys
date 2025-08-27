import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url)
    const LinktreeId = url.pathname.split('/').pop()

    if (!LinktreeId) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 })
    }

    await db.linktree.delete({
      where: { id: LinktreeId },
    })
    return NextResponse.json({ message: "Linktree excluído com sucesso" })
  } catch (error) {
    console.error("Erro ao excluir Linktree:", error)
    return NextResponse.json({ error: "Falha ao excluir Linktree" }, { status: 500 })
  }
}