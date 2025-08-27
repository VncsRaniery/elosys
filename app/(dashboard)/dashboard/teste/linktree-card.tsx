"use client";

import type React from "react";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Linktree } from "@/types";
import { GetSocialIcon } from "@/utils/icons";

interface PublicLinktreeViewProps {
  linktree: Linktree;
}

// interface LinkItem {
//   title: string;
//   url: string;
//   icon?: React.ReactNode;
//   description?: string;
// }

// interface LinktreeCardProps {
//   profile: {
//     name: string
//     bio: string
//     avatar: string
//     username?: string
//   }
//   links: LinkItem[]
//   className?: string
// }

export function LinktreeCard({ linktree }: PublicLinktreeViewProps) {
  const handleLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={cn("w-full max-w-md mx-auto" /*className*/)}>
      <Card className="p-8 bg-card border-border shadow-lg backdrop-blur-sm">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <Avatar className="w-24 h-24 mb-4 ring-2 ring-primary/20 ring-offset-2 ring-offset-background transition-all duration-300 hover:ring-primary/40 hover:scale-105">
            <AvatarImage
              src={linktree.avatarUrl || "/placeholder.svg"}
              alt={linktree.username}
            />
            <AvatarFallback className="text-xl font-semibold bg-primary text-primary-foreground">
              {/* {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()} */}
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

        {/* Links Section */}
        <div className="space-y-3">
          {linktree.links.map((link, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full h-auto p-4 justify-start text-left bg-card hover:bg-accent hover:text-accent-foreground border-border hover:border-accent/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-md group"
              onClick={() => handleLinkClick(link.url)}
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
                  {/* {link.description && (
                    <div className="text-xs text-muted-foreground group-hover:text-accent-foreground/80 transition-colors mt-1">
                      {link.description}
                    </div>
                  )} */}
                </div>

                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent-foreground transition-colors ml-2" />
              </div>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
