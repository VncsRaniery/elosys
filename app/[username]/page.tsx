import type { Metadata } from "next";
import { LinktreeCard } from "./linktree-card";
import PageError from "./page-.error";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/public/${
        (
          await params
        ).username
      }`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return {
        title: "Linktree não encontrado",
        description: "Este Linktree não existe ou foi removido",
      };
    }

    const linktree = await response.json();

    return {
      title: `@${linktree.username} - Linktree`,
      description: linktree.bio || `Links de @${linktree.username}`,
      openGraph: {
        title: `@${linktree.username}`,
        description:
          linktree.bio || `Confira os links de @${linktree.username}`,
        images: linktree.avatarUrl ? [linktree.avatarUrl] : [],
        type: "profile",
      },
      twitter: {
        card: "summary",
        title: `@${linktree.username}`,
        description: linktree.bio || `Links de @${linktree.username}`,
        images: linktree.avatarUrl ? [linktree.avatarUrl] : [],
      },
    };
  } catch {
    return {
      title: "Linktree não encontrado",
      description: "Este Linktree não existe ou foi removido",
    };
  }
}

export default async function PublicLinktreePage({ params }: Props) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/public/${
        (
          await params
        ).username
      }`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return <PageError />;
    }

    const linktree = await response.json();

    return (
      <main className="min-h-screen">
        <LinktreeCard linktree={linktree} />
      </main>
    );
  } catch (error) {
    console.error("Error fetching linktree:", error);
  }
}
