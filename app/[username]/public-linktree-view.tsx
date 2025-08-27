"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Linktree } from "@/types";
import { GetSocialIcon } from "../(dashboard)/dashboard/components/icons";

const themeClasses = {
  light: "bg-gray-100 text-gray-900",
  dark: "bg-gray-900 text-gray-100",
  synthwave:
    "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white",
};

interface PublicLinktreeViewProps {
  linktree: Linktree;
}

export function PublicLinktreeView({ linktree }: PublicLinktreeViewProps) {
  const themeClass =
    themeClasses[linktree.theme as keyof typeof themeClasses] ||
    themeClasses.dark;

  const handleLinkClick = async (url: string, title: string) => {
    try {
      await fetch("/api/analytics/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          linktreeId: linktree.id,
          linkTitle: title,
          linkUrl: url,
        }),
      });
    } catch {
      // Falhar silenciosamente se analytics não estiver disponível
    }
    window.open(url, "_blank");
  };

  const backgroundStyle = linktree.backgroundImageUrl
    ? {
        backgroundImage: `url(${linktree.backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {};

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 ${themeClass}`}
      style={backgroundStyle}
    >
      {linktree.backgroundImageUrl && (
        <div className="absolute inset-0 bg-black/50" />
      )}

      <Card
        className={`w-full max-w-md mx-auto overflow-hidden transition-all duration-300 relative z-10 ${
          linktree.backgroundImageUrl
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm"
            : themeClass
        }`}
        style={
          {
            "--custom-color": linktree.customColor,
            "--custom-color-hover": `${linktree.customColor}E6`,
          } as React.CSSProperties
        }
      >
        <CardContent className="p-6 text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-[var(--custom-color)]">
            <AvatarImage src={linktree.avatarUrl} alt={linktree.username} />
            <AvatarFallback>
              {linktree.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <h1 className="text-2xl font-bold mb-1">
            {linktree.displayName || `@${linktree.username}`}
          </h1>

          {linktree.displayName && (
            <p className="text-lg text-gray-600 dark:text-gray-400">
              @{linktree.username}
            </p>
          )}

          {linktree.bio && (
            <p className="text-sm mt-3 opacity-80 leading-relaxed">
              {linktree.bio}
            </p>
          )}

          <div className="flex flex-col gap-4 mt-6">
            {linktree.links.map((link, index) => (
              <Button
                key={`${link.id}-${index}`}
                onClick={() => handleLinkClick(link.url, link.title)}
                className="w-full h-14 text-md transition-all duration-200 transform hover:scale-105 relative group"
                style={{
                  backgroundColor: "var(--custom-color)",
                  color: linktree.theme === "light" ? "#fff" : "inherit",
                }}
              >
                <div className="flex items-center justify-center w-full">
                  <span className="absolute left-4">
                    <GetSocialIcon url={link.url} className="h-6 w-6" />
                  </span>
                  <span className="font-medium">{link.title}</span>
                </div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md" />
              </Button>
            ))}
          </div>

          {linktree.links.length === 0 && (
            <div className="mt-8 p-6 text-center text-gray-500">
              <p>Nenhum link disponível no momento</p>
            </div>
          )}

          {/* Footer opcional */}
          <div className="mt-8 pt-4 border-t border-gray-200/20">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Powered by Linktree Manager
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
