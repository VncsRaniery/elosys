"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
// import { ThemeSettingsProvider } from "@/hooks/use-theme-settings";
import { SessionProvider } from "next-auth/react";

export function Provider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* <ThemeSettingsProvider> */}
      <SessionProvider>{children}</SessionProvider>
      {/* </ThemeSettingsProvider> */}
      {/* <SessionProvider> */}
      <Toaster />
      {/* </SessionProvider> */}
    </ThemeProvider>
  );
}
