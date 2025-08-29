"use client";

import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotImplementedPage() {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (window.history.length > 1) {
      setCanGoBack(true);
    }
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(120,113,108,0.1),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_70%)]" />
      <div className="z-10 flex flex-col items-center">
        <div className="mb-8 scale-[2.5]">
          <Logo />
        </div>
        <h1 className="text-8xl font-black tracking-tighter sm:text-9xl bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          501
        </h1>
        <h2 className="mt-4 text-2xl font-bold text-slate-800 dark:text-slate-200 sm:text-3xl">
          Not Implemented
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-slate-600 dark:text-slate-400">
          Oops! Parece que a página que você procura ainda não foi implementada.
          Que tal voltar para um lugar seguro?
        </p>

        {canGoBack ? (
          <Button
            className="mt-8 gap-2 font-semibold"
            size="lg"
            onClick={() => router.back()}
          >
            Voltar para a página anterior
          </Button>
        ) : (
          <Button className="mt-8 gap-2 font-semibold" size="lg" asChild>
            <Link href="/dashboard">Ir para o dashboard</Link>
          </Button>
        )}
      </div>
    </main>
  );
}
