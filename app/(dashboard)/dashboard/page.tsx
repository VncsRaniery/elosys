"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Link2,
  Eye,
  MousePointer,
  Calendar,
  TrendingUp,
  BarChart3,
  Plus,
  Star,
  ServerCrash,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnalyticsData } from "@/types";

export default function WelcomePage() {
  const [currentDate, setCurrentDate] = useState("");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);

    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/analytics");
        if (!response.ok) {
          throw new Error("Falha ao carregar os dados. Tente novamente.");
        }
        const data: AnalyticsData = await response.json();
        setAnalyticsData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Ocorreu um erro desconhecido."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-destructive/50 bg-destructive/10 p-8 text-center">
          <ServerCrash className="h-10 w-10 text-destructive" />
          <h3 className="mt-4 text-lg font-semibold text-destructive">
            Oops! Algo deu errado
          </h3>
          <p className="text-muted-foreground mt-2 max-w-xs text-sm">{error}</p>
        </div>
      );
    }

    if (!analyticsData || analyticsData.totalLinkUps === 0) {
      return (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full border border-dashed">
            <Link2 className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold">Nenhum LinkUp criado ainda</h3>
          <p className="text-muted-foreground mt-2 max-w-xs text-sm">
            Você ainda não criou nenhum LinkUp. Comece agora a compartilhar seus
            links de forma centralizada!
          </p>
        </div>
      );
    }

    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Total LinkUps Criados */}
        <Card className="group rounded-xl border backdrop-blur-lg transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">
              LinkUps Criados
            </CardTitle>
            <Link2 className="h-5 w-5 text-foreground/50 transition-colors group-hover:text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {analyticsData.totalLinkUps}
            </div>
            <p className="text-sm text-foreground/60">
              Total de páginas de links criadas
            </p>
          </CardContent>
        </Card>

        {/* Total Clicks */}
        <Card className="group rounded-xl border backdrop-blur-lg transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">
              Total de Cliques
            </CardTitle>
            <MousePointer className="h-5 w-5 text-foreground/50 transition-colors group-hover:text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {analyticsData.totalClicks.toLocaleString("pt-BR")}
            </div>
            <p className="text-sm text-foreground/60">
              Cliques em todos os seus links
            </p>
          </CardContent>
        </Card>

        {/* Card de Cliques Hoje */}
        <Card className="group rounded-xl border backdrop-blur-lg transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">
              Cliques Hoje
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-foreground/50 transition-colors group-hover:text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {analyticsData.todayClicks.toLocaleString("pt-BR")}
            </div>
            <p className="text-sm text-foreground/60">
              Recebidos nas últimas 24 horas
            </p>
          </CardContent>
        </Card>

        {/* Card de Links Ativos */}
        <Card className="group rounded-xl border backdrop-blur-lg transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">
              Links Ativos
            </CardTitle>
            <Eye className="h-5 w-5 text-foreground/50 transition-colors group-hover:text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {analyticsData.activeLinks} / {analyticsData.totalLinks}
            </div>
            <p className="text-sm text-foreground/60">
              {analyticsData.totalLinks > 0
                ? `${Math.round(
                    (analyticsData.activeLinks / analyticsData.totalLinks) * 100
                  )}% dos links estão visíveis`
                : "Nenhum link criado"}
            </p>
          </CardContent>
        </Card>

        {/* Card de Link de Destaque */}
        <Card className="group rounded-xl border backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/80">
              Link de Destaque
            </CardTitle>
            <Star className="h-5 w-5 text-foreground/50 transition-colors group-hover:text-yellow-400" />
          </CardHeader>
          <CardContent>
            {analyticsData.mostClickedLink ? (
              <>
                <div
                  className="text-xl font-semibold truncate text-primary"
                  title={analyticsData.mostClickedLink.title}
                >
                  {analyticsData.mostClickedLink.title}
                </div>
                <p
                  className="text-sm text-foreground/60 truncate"
                  title={analyticsData.mostClickedLink.url}
                >
                  {analyticsData.mostClickedLink.url}
                </p>
                <Badge
                  variant="secondary"
                  className="mt-2 bg-primary/10 text-primary border border-primary/20"
                >
                  {analyticsData.mostClickedLink.clicks.toLocaleString("pt-BR")}{" "}
                  cliques
                </Badge>
              </>
            ) : (
              <p className="text-sm text-foreground/70 pt-2">
                Ainda não há cliques suficientes para determinar um link de
                destaque.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="capitalize">{currentDate}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Bem-vindo ao{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Elosys!
            </span>
            👋
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Gerencie todos os seus links em um só lugar e acompanhe o desempenho
            em tempo real.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/dashboard/linkups">
            <Button size="lg" className="gap-2">
              <Plus className="h-4 w-4" />
              Ver meus LinkUps
            </Button>
          </Link>
          <Link href="/dashboard/analises">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-transparent"
            >
              <BarChart3 className="h-4 w-4" />
              Ver Análises Detalhadas
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        {renderContent()}
      </div>
    </div>
  );
}
