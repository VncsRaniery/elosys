import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename || !request.body) {
    return NextResponse.json(
      { error: "Nome do arquivo ou corpo da requisição ausente." },
      { status: 400 }
    );
  }

  const cleanedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const uniqueFilename = `${uuidv4()}-${cleanedFilename}`;

  try {
    const blob = await put(uniqueFilename, request.body, {
      access: "public",
      cacheControlMaxAge: 365 * 24 * 60 * 60,
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error("ERRO NO UPLOAD DO BLOB:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    
    return NextResponse.json(
      {
        error: "Falha ao fazer upload da imagem para o Vercel Blob.",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}