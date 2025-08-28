import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename || !request.body) {
    return NextResponse.json(
      { error: "Nome do arquivo não fornecido." },
      { status: 400 }
    );
  }

  try {
    const blob = await put(filename, request.body, {
      access: "public",
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error("ERRO NO UPLOAD DO BLOB:", error);
    return NextResponse.json(
      {
        error: "Falha ao fazer upload da imagem para o Vercel Blob.",
        errorMessage:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}
