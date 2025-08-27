"use client";

import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { ZapIcon } from "lucide-react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at center, #1E40AF, #000000)",
      }}
    >
      <div className="bg-pattern"></div>
      <div className="content w-full">
        <div className="w-full max-w-xl mx-auto p-8 flex flex-col justify-between min-h-screen">
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-gray-200 to-gray-600">
                Bem vindo ao LinkUp
              </h1>
            </div>
            <div>
              <p className="text-lg sm:text-xl mb-8 text-gray-300">
                Crie e personalize sua página de links em minutos. Conecte todas
                suas redes sociais e conteúdos em um só lugar com nosso editor
                intuitivo.
              </p>
            </div>
            <div className="w-full space-y-4">
              {session ? (
                <div className="flex justify-center">
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      Dashboard
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex justify-center items-center gap-x-4">
                  <Link href="/registrar">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      Criar Conta
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-gray-600 text-gray-200 hover:bg-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors bg-transparent"
                    >
                      Fazer Login
                      <ZapIcon className="size-3.5 ml-1.5 text-blue-500 fill-blue-500" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <div className="mt-8">
              <p className="text-sm text-gray-400">
                ✨ Editor visual intuitivo • 🎨 Templates personalizáveis • 📊
                Analytics detalhados
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        toastOptions={{
          style: {
            background: "rgb(23 23 23)",
            color: "white",
            border: "1px solid rgb(63 63 70)",
          },
          className: "rounded-xl",
          duration: 5000,
        }}
      />
    </main>
  );
}
