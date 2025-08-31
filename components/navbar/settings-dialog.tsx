"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import HomeView from "./settings/home-view";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { SETTINGS } from "@/utils/constants";
import AppearanceView from "./settings/appearance-view";
import { useState } from "react";

type PageKey = "Início" | "Aparência";

export function SettingsDialog() {
  const [open, setOpen] = useState(false);
  const [activePage, setActivePage] = useState<PageKey>("Início");

  const handlePageChange = (pageName: PageKey) => {
    setActivePage(pageName);
  };

  const renderPageContent = () => {
    switch (activePage) {
      case "Início":
        return <HomeView />;
      case "Aparência":
        return <AppearanceView />;
      default:
        return null;
    }
  };

  const activePageTitle = SETTINGS.pageContent[activePage]?.title || "Início";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground hover:text-foreground relative size-10 rounded-full shadow-none transition-all duration-200 hover:bg-muted"
          aria-label="Abrir configurações"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-screen w-screen max-w-full flex-col overflow-hidden rounded-none border-0 p-0 sm:max-w-4xl md:h-[85vh] md:max-h-[800px] md:rounded-xl md:border">
        <DialogTitle className="sr-only">Configurações</DialogTitle>
        <DialogDescription className="sr-only">
          Customize suas configurações aqui.
        </DialogDescription>

        <SidebarProvider className="flex h-full flex-col md:flex-row">
          <Sidebar
            collapsible="none"
            className="sticky top-0 z-10 flex h-auto shrink-0 flex-col border-b bg-background md:h-full md:w-72 md:border-b-0 md:border-r"
          >
            <SidebarContent className="flex-1 overflow-y-auto">
              <div className="hidden p-6 pb-4 md:block">
                <h3 className="text-lg font-semibold">Configurações</h3>
                <p className="text-sm text-muted-foreground">
                  Personalize sua experiência
                </p>
              </div>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu className="flex flex-row flex-nowrap justify-start gap-1 overflow-x-auto p-2 md:flex-col md:space-y-1 md:overflow-x-hidden md:p-4">
                    {SETTINGS.data.nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          isActive={item.name === activePage}
                          onClick={() => handlePageChange(item.name as PageKey)}
                          className="group flex h-auto w-20 flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-center transition-all duration-200 hover:bg-accent data-[active=true]:bg-accent data-[active=true]:text-accent-foreground md:h-auto md:w-full md:flex-row md:justify-start md:gap-3 md:p-3 md:text-left"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted transition-colors duration-200">
                            <item.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 text-center md:text-left">
                            <div className="truncate text-xs font-medium md:text-sm">
                              {item.name}
                            </div>
                            <div className="hidden text-xs text-muted-foreground md:block">
                              {item.description}
                            </div>
                          </div>
                          <ChevronRight className="hidden h-4 w-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block" />
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex flex-1 flex-col overflow-hidden">
            <motion.header
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden h-16 shrink-0 items-center border-b px-6 md:flex"
            >
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      asChild
                      className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span onClick={() => handlePageChange("Início")}>
                        Configurações
                      </span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-medium">
                      {activePageTitle}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </motion.header>

            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {renderPageContent()}
              </AnimatePresence>
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
