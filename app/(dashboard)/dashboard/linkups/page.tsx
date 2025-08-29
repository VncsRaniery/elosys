import type { Metadata } from "next";
import { LinktreeDashboard } from "./components/linktree-dashboard";

export const metadata: Metadata = {
  title: "Meus LinkUps - Dashboard",
  description: "Gerencie todos os seus LinkUps em um só lugar",
};

export default function DashboardPage() {
  return (
    <main className="flex flex-col items-center justify-start">
      <LinktreeDashboard />
    </main>
  );
}
