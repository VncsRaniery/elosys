"use client";

import type React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ExternalLink, ZapIcon } from "lucide-react";
import { Linktree } from "@/types";
import { GetSocialIcon } from "@/utils/icons";
import { getThemeById } from "@/utils/themes";
import Link from "next/link";
import Logo from "@/components/ui/logo";
import { useEffect } from "react";

interface PublicLinktreeViewProps {
  linktree: Linktree & {
    links: {
      id: string;
      title: string;
      description: string | null;
      url: string;
    }[];
  };
}

export function LinktreeCard({ linktree }: PublicLinktreeViewProps) {
  const theme = getThemeById(linktree.theme) || getThemeById("escuro");
  const backgroundClass = theme?.background ?? "dark";

  const backgroundStyle = linktree.backgroundImageUrl
    ? {
        backgroundImage: `url(${linktree.backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {};

  useEffect(() => {
    fetch("/api/track-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linktreeId: linktree.id }),
      keepalive: true,
    });
  }, [linktree.id]);

  const handleLinkClick = (linkId: string, url: string) => {
    fetch("/api/track-click", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ linkId }),
      keepalive: true,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`relative min-h-screen w-full transition-colors duration-500 ${backgroundClass}`}
      style={backgroundStyle}
    >
      <div className="flex justify-start p-4">
        <Link href="/" className="flex items-center gap-2 font-medium">
          <div className="bg-card rounded-full w-12 h-12 flex items-center justify-center text-foreground/80 hover:text-foreground transition-colors">
            <Logo />
          </div>
          <span className="text-xl font-semibold">Elosys</span>
        </Link>
      </div>
      <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 pt-8 pb-8">
        {/* Card Principal do Linktree */}
        <Card className="w-full max-w-md p-8 bg-card/80 border-border shadow-lg backdrop-blur-sm">
          <div className="flex flex-col items-center text-center mb-8">
            <Avatar className="w-24 h-24 mb-4 ring-2 ring-primary/20 ring-offset-2 ring-offset-background transition-all duration-300 hover:ring-primary/40 hover:scale-105">
              <AvatarImage src={linktree.avatarUrl} alt={linktree.username} />
              <AvatarFallback className="text-xl font-semibold bg-primary text-primary-foreground">
                {linktree.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold text-foreground mb-2 text-balance">
              {linktree.username}
            </h1>
            {linktree.displayName && (
              <p className="text-sm text-muted-foreground mb-2">
                @{linktree.displayName}
              </p>
            )}
            <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
              {linktree.bio}
            </p>
          </div>

          <div className="space-y-3">
            {linktree.links.map((link) => (
              <Button
                key={link.id}
                variant="outline"
                className="w-full h-auto p-4 justify-start text-left bg-card hover:bg-accent hover:text-accent-foreground border-border hover:border-accent/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-md group"
                onClick={() => handleLinkClick(link.id, link.url)}
              >
                <div className="flex items-center w-full">
                  <GetSocialIcon
                    url={link.url}
                    className="mr-3 text-muted-foreground group-hover:text-accent-foreground transition-colors"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground group-hover:text-accent-foreground transition-colors">
                      {link.title}
                    </div>
                    {link.description && (
                      <div className="text-xs text-muted-foreground group-hover:text-accent-foreground/80 transition-colors mt-1">
                        {link.description}
                      </div>
                    )}
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent-foreground transition-colors ml-2" />
                </div>
              </Button>
            ))}
          </div>
        </Card>
        <div className="w-full max-w-md p-4 mt-4">
          <Link href="/dashboard">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-slate-600/50 text-slate-200 hover:bg-slate-800/50 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 bg-slate-900/20 backdrop-blur-sm hover:border-slate-500"
            >
              Venha fazer parte do Elosys!
              <ZapIcon className="w-4 h-4 ml-2 text-blue-400" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
