import React from 'react';
import { Globe, Link as LinkIcon } from 'lucide-react';

export function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" {...props}>
      <path d="M20 3H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 110-3.096 1.548 1.548 0 010 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z" />
    </svg>
  )
}

export function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" {...props}>
      <path d="M20.947 8.305a6.53 6.53 0 00-.419-2.216 4.61 4.61 0 00-2.633-2.633 6.606 6.606 0 00-2.186-.42c-.962-.043-1.267-.055-3.709-.055s-2.755 0-3.71.055a6.606 6.606 0 00-2.185.42 4.607 4.607 0 00-2.633 2.633 6.554 6.554 0 00-.419 2.185c-.043.963-.056 1.268-.056 3.71s0 2.754.056 3.71c.015.748.156 1.486.419 2.187a4.61 4.61 0 002.634 2.632 6.584 6.584 0 002.185.45c.963.043 1.268.056 3.71.056s2.755 0 3.71-.056a6.59 6.59 0 002.186-.419 4.615 4.615 0 002.633-2.633c.263-.7.404-1.438.419-2.187.043-.962.056-1.267.056-3.71-.002-2.442-.002-2.752-.058-3.709zm-8.953 8.297c-2.554 0-4.623-2.069-4.623-4.623s2.069-4.623 4.623-4.623a4.623 4.623 0 010 9.246zm4.807-8.339a1.077 1.077 0 01-1.078-1.078 1.077 1.077 0 112.155 0c0 .596-.482 1.078-1.077 1.078z" />
      <circle cx="11.994" cy="11.979" r="3.003" />
    </svg>
  )
}

export function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" {...props}>
      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0014.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
    </svg>
  )
}

export function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" {...props}>
      <path d="M14.82 4.26a10.14 10.14 0 00-.53 1.1 14.66 14.66 0 00-4.58 0 10.14 10.14 0 00-.53-1.1 16 16 0 00-4.13 1.3 17.33 17.33 0 00-3 11.59 16.6 16.6 0 005.07 2.59A12.89 12.89 0 008.23 18a9.65 9.65 0 01-1.71-.83 3.39 3.39 0 00.42-.33 11.66 11.66 0 0010.12 0q.21.18.42.33a10.84 10.84 0 01-1.71.84 12.41 12.41 0 001.08 1.78 16.44 16.44 0 005.06-2.59 17.22 17.22 0 00-3-11.59 16.09 16.09 0 00-4.09-1.35zM8.68 14.81a1.94 1.94 0 01-1.8-2 1.93 1.93 0 011.8-2 1.93 1.93 0 011.8 2 1.93 1.93 0 01-1.8 2zm6.64 0a1.94 1.94 0 01-1.8-2 1.93 1.93 0 011.8-2 1.92 1.92 0 011.8 2 1.92 1.92 0 01-1.8 2z" />
    </svg>
  )
}

// --- ÍCONES ADICIONADOS ---

export function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export function YouTubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" {...props}>
      <path d="M21.582 7.643A2.46 2.46 0 0019.92 6.027C18.445 5.573 12 5.573 12 5.573s-6.445 0-7.92.454a2.46 2.46 0 00-1.662 1.616C2 9.131 2 12 2 12s0 2.869.418 4.357a2.46 2.46 0 001.662 1.616c1.475.454 7.92.454 7.92.454s6.445 0 7.92-.454a2.46 2.46 0 001.662-1.616C22 14.869 22 12 22 12s0-2.869-.418-4.357zM9.75 14.85V9.15l4.92 2.85-4.92 2.85z" />
    </svg>
  );
}

export function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" {...props}>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.42 1.29 4.89L2 22l5.35-1.42c1.42.78 3.02 1.22 4.69 1.22h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM17.23 14.25c-.22.21-.46.33-.78.43-.32.1-.68.15-1.07.09-.39-.06-.82-.23-1.15-.43-.33-.2-.61-.43-.84-.71s-.42-.59-.6-1-.28-.8-.31-1.15c-.03-.35.01-.7.11-1.02.1-.32.26-.61.46-.86.2-.25.43-.44.71-.56.28-.12.58-.19.9-.19.32 0 .61.06.87.19.26.13.48.3.67.53.18.23.31.5.38.79.07.29.09.58.05.86-.04.28-.13.55-.28.8s-.32.46-.53.63z" />
    </svg>
  );
}

export function TelegramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" {...props}>
      <path d="M11.95 0C5.35 0 0 5.35 0 11.95s5.35 11.95 11.95 11.95 11.95-5.35 11.95-11.95S18.55 0 11.95 0zm5.12 6.37l-2.19 10.3c-.19.89-.71 1.11-1.46.69l-3.34-2.46-1.62 1.56c-.18.18-.33.33-.67.33l.24-3.42 6.27-5.69c.28-.25-.08-.39-.46-.14l-7.73 4.84-3.26-1.02c-.88-.28-.9-1.42.18-2.09l13.13-5.02c.74-.28 1.39.18 1.15.99z" />
    </svg>
  );
}

export function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" {...props}>
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-1.1-6.47-3.15-1.63-2.05-2.07-4.71-1.52-7.14.52-2.32 2.2-4.28 4.3-5.62 2.12-1.34 4.63-1.78 7.01-1.31v3.91c-1.21.15-2.4.6-3.48 1.34-.85.59-1.51 1.38-2.01 2.32-.48.92-.76 1.95-.76 2.99 0 1.01.17 2.02.51 2.96.34.94.85 1.79 1.54 2.5.69.71 1.56 1.26 2.52 1.59.96.33 2 .45 3.03.31.32-.04.64-.1.95-.19-.04-1.95-.02-3.91-.01-5.86v-3.9c-2.18.23-4.13.88-5.71 2.05v-4.14c1.55-1.15 3.39-1.85 5.37-1.85z" />
    </svg>
  );
}

/**
 * Componente que renderiza o ícone apropriado com base na URL.
 * @param url A URL do link.
 * @param props Propriedades SVG adicionais.
 */
export const GetSocialIcon = ({ url, ...props }: { url: string } & React.SVGProps<SVGSVGElement>) => {
  const sanitizedUrl = url.toLowerCase();

  if (sanitizedUrl.includes('linkedin.com')) {
    return <LinkedInIcon {...props} />;
  }
  if (sanitizedUrl.includes('instagram.com')) {
    return <InstagramIcon {...props} />;
  }
  if (sanitizedUrl.includes('twitter.com') || sanitizedUrl.includes('x.com')) {
    return <XIcon {...props} />;
  }
  if (sanitizedUrl.includes('facebook.com')) {
    return <FacebookIcon {...props} />;
  }
  if (sanitizedUrl.includes('discord.com') || sanitizedUrl.includes('discord.gg')) {
    return <DiscordIcon {...props} />;
  }
  if (sanitizedUrl.includes('github.com')) {
    return <GithubIcon {...props} />;
  }
  if (sanitizedUrl.includes('youtube.com') || sanitizedUrl.includes('youtu.be')) {
    return <YouTubeIcon {...props} />;
  }
  if (sanitizedUrl.includes('whatsapp.com') || sanitizedUrl.includes('wa.me')) {
    return <WhatsAppIcon {...props} />;
  }
  if (sanitizedUrl.includes('telegram.org') || sanitizedUrl.includes('t.me')) {
    return <TelegramIcon {...props} />;
  }
  if (sanitizedUrl.includes('tiktok.com')) {
    return <TikTokIcon {...props} />;
  }

  // Regra de fallback: se não for uma rede social conhecida, mas for uma URL válida
  if (sanitizedUrl.startsWith('http')) {
    return <Globe {...props} />;
  }

  // Fallback final para qualquer outra coisa
  return <LinkIcon {...props} />;
};