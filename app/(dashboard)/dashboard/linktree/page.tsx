import type { Metadata } from "next";
import { LinktreeDashboard } from "../components/linktree-dashboard";

export const metadata: Metadata = {
  title: "Meus Linktrees - Dashboard",
  description: "Gerencie todos os seus Linktrees em um só lugar",
};

export default function DashboardPage() {
  return (
    <main className="flex flex-col items-center justify-start">
      <LinktreeDashboard />
    </main>
  );
}
