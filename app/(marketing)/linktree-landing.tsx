"use client"

import { Button } from "@/components/ui/button"
// import { XIcon } from "./icons/x-icon"
// import { InstagramIcon } from "./icons/instagram-icon"
// import { DiscordIcon } from "./icons/discord-icon"
// import { FacebookIcon } from "./icons/facebook-icon"
// import { LinkedInIcon } from "./icons/linkedin-icon"
// import { SocialIcon } from "./social-icon"

export function LinktreeLanding() {
  return (
    <div className="w-full max-w-xl mx-auto p-8 flex flex-col justify-between min-h-screen">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-gray-200 to-gray-600">
            LinkTree Pro
          </h1>
        </div>
        <div>
          <p className="text-lg sm:text-xl mb-8 text-gray-300">
            Crie e personalize sua página de links em minutos. Conecte todas suas redes sociais e conteúdos em um só
            lugar com nosso editor intuitivo.
          </p>
        </div>
        <div className="w-full space-y-4">
          <Button
            size="lg"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Criar Conta
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full border-gray-600 text-gray-200 hover:bg-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors bg-transparent"
          >
            Fazer Login
          </Button>
        </div>
        <div className="mt-8">
          <p className="text-sm text-gray-400">
            ✨ Editor visual intuitivo • 🎨 Templates personalizáveis • 📊 Analytics detalhados
          </p>
        </div>
      </div>
      {/* <div className="pt-8 flex justify-center space-x-6">
        <SocialIcon
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (formerly Twitter)"
          icon={<XIcon className="w-6 h-6" />}
        />
        <SocialIcon
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          icon={<InstagramIcon className="w-6 h-6" />}
        />
        <SocialIcon
          href="https://discord.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
          icon={<DiscordIcon className="w-6 h-6" />}
        />
        <SocialIcon
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          icon={<FacebookIcon className="w-6 h-6" />}
        />
        <SocialIcon
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          icon={<LinkedInIcon className="w-6 h-6" />}
        />
      </div> */}
    </div>
  )
}
