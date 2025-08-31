"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { Check, Copy, Mail } from "lucide-react";

export default function HomeView() {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);

  if (!session?.user) return null;

  const user = session.user;

  const handleCopy = () => {
    if (user.email) {
      navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Card className="relative overflow-hidden border-border/50 bg-card/60 p-6 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl sm:p-8">
        <div className="absolute -top-10 -right-10 -z-10 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <Avatar className="h-24 w-24 ring-2 ring-primary/20">
            <AvatarImage
              src={user.image ?? undefined}
              alt={user.name ?? "User"}
            />
            <AvatarFallback className="text-2xl font-semibold bg-primary/90 text-primary-foreground">
              {user.name?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
          <div className="w-full flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {user?.name || "Usuário"}
              </h3>
            </div>
          </div>
        </div>
        <div className="mt-8 grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="email" className="text-muted-foreground">
            Email
          </Label>
          <div className="relative flex items-center">
            <Mail
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="email"
              type="email"
              value={user.email ?? ""}
              readOnly
              className="pl-9 pr-12 text-sm text-foreground disabled:cursor-default disabled:opacity-100"
              disabled
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1.5 top-1/2 h-7 w-7 -translate-y-1/2"
              onClick={handleCopy}
              aria-label="Copiar email"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
