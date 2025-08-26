import type { Metadata } from "next"
import { LinktreeCard } from "../components/linktree-card"

export const metadata: Metadata = {
  title: "LinkTree view - Dashboard",
  description: "Plataforma de estilização e criação de links",
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-4 pt-8">
      <LinktreeCard />
    </main>
  )
}