"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { CheckIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SETTINGS } from "@/utils/constants";
import { useEffect, useId, useState } from "react";

export default function AppearanceView() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const id = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <header>
        <h2 className="text-2xl font-bold tracking-tight">Aparência</h2>
        <p className="text-muted-foreground mt-1">
          Personalize a aparência do aplicativo. Altere o tema, a fonte e muito
          mais.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Tema</CardTitle>
          <CardDescription>Escolha um tema para a interface.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            value={theme || "system"}
            onValueChange={setTheme}
          >
            {SETTINGS.themeItems.map((item) => (
              <label key={item.value} className="group cursor-pointer">
                <RadioGroupItem
                  value={item.value}
                  id={`${id}-${item.value}`}
                  className="peer sr-only"
                />
                <div className="relative overflow-hidden rounded-lg border-2 border-muted bg-background transition-all group-hover:border-primary/40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary/50">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.label}
                    width={200}
                    height={120}
                    className="aspect-video w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}
