"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Edit } from "lucide-react";
import { Linktree } from "@/types";
import { GetSocialIcon } from "@/utils/icons";

interface LinktreePreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  linktree: Linktree;
}

export default function LinktreePreviewDialog({
  isOpen,
  onClose,
  onEdit,
  linktree,
}: LinktreePreviewDialogProps) {
  const handleLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-lg">Pré-visualização</DialogTitle>
              <DialogDescription className="text-sm">
                Veja como seu Linktree está aparecendo
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Preview Content */}
        <div className="px-6 pb-4">
          <Card className="w-full max-w-md p-8 bg-card border-border shadow-lg backdrop-blur-sm">
            {/* Profile Section */}
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
        </div>

        <DialogFooter className="p-6 pt-0">
          <div className="flex gap-2 w-full">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Fechar
            </Button>
            <Button
              onClick={onEdit}
              className="flex-1 gap-2"
              style={{ backgroundColor: linktree.customColor }}
            >
              <Edit className="h-4 w-4" />
              Editar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
