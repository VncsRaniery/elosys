import type { Metadata } from "next"
import LinkTree from "@/components/linktree/link-tree"

export const metadata: Metadata = {
  title: "LinkTree App - Dashboard",
  description: "Plataforma de estilização e criação de links",
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-4 pt-8 bg-secondary">
      <LinkTree />
    </main>
  )
}
