"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ZapIcon, SparklesIcon } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession()

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"></div>

      {/* Animated grid pattern */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      {/* Floating orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-2xl mx-auto text-center space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
                <SparklesIcon className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">
                  Sua presença digital em um só lugar
                </span>
              </div>

              <h1 className="text-5xl sm:text-7xl font-bold bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent leading-tight">
                LinkUp
              </h1>

              <p className="text-xl sm:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
                Conecte todas suas redes sociais e conteúdos em uma página
                elegante e personalizada
              </p>
            </div>

            <div className="space-y-6">
              {session ? (
              <div className="flex sm:flex-row justify-center items-center">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 border-0 w-full sm:w-auto"
                  >
                    Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link href="/registrar">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 border-0 w-full sm:w-auto"
                  >
                    Começar Agora
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-600/50 text-slate-200 hover:bg-slate-800/50 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 bg-slate-900/20 backdrop-blur-sm hover:border-slate-500 w-full sm:w-auto"
                  >
                    Fazer Login
                    <ZapIcon className="w-4 h-4 ml-2 text-blue-400" />
                  </Button>
                </Link>
              </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-slate-900/20 backdrop-blur-sm border border-slate-700/30">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400 text-lg">✨</span>
                </div>
                <span className="text-sm font-medium text-slate-300">
                  Editor Visual
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-slate-900/20 backdrop-blur-sm border border-slate-700/30">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <span className="text-purple-400 text-lg">🎨</span>
                </div>
                <span className="text-sm font-medium text-slate-300">
                  Templates Únicos
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-slate-900/20 backdrop-blur-sm border border-slate-700/30">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <span className="text-cyan-400 text-lg">📊</span>
                </div>
                <span className="text-sm font-medium text-slate-300">
                  Analytics Avançados
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
