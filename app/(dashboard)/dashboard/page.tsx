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
  Users,
  BarChart3,
  Plus,
  OctagonAlert,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function WelcomePage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  const stats = {
    totalLinks: 24,
    activeLinks: 18,
    totalClicks: 1247,
    todayClicks: 89,
    visitors: 456,
    conversionRate: 12.5,
  };

  const analytics = [];

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
              LinkUp!
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
            <Button size="lg" variant="outline" className="gap-2 bg-transparent">
              <BarChart3 className="h-4 w-4" />
              Ver Análises
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        {analytics.length === 0 ? (
          <div
            className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center"
            role="status"
            aria-live="polite"
          >
            <div className="mb-4 flex size-16 items-center justify-center rounded-full border border-dashed">
              <OctagonAlert className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold">
              Os dados de Análises dos seus LinkUps ainda estão em
              desenvolvimento
            </h3>
            <p className="text-muted-foreground mt-2 max-w-xs text-sm">
              Porém nada impede você de criar seus LinkUps e começar a
              compartilhar ele. No futuro suas análises estarão disponíveis
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Total Links */}
            <Card className="backdrop-blur-sm bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Links Criados
                </CardTitle>
                <Link2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {stats.totalLinks}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total de links no seu perfil
                </p>
              </CardContent>
            </Card>

            {/* Active Links */}
            <Card className="backdrop-blur-sm bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Links Ativos
                </CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">
                  {stats.activeLinks}
                </div>
                <p className="text-xs text-muted-foreground">
                  Links visíveis no seu perfil
                </p>
                <Badge variant="secondary" className="mt-2">
                  {Math.round((stats.activeLinks / stats.totalLinks) * 100)}%
                  ativos
                </Badge>
              </CardContent>
            </Card>

            {/* Total Clicks */}
            <Card className="backdrop-blur-sm bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Cliques
                </CardTitle>
                <MousePointer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalClicks.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Cliques em todos os seus links
                </p>
              </CardContent>
            </Card>

            {/* Today's Clicks */}
            <Card className="backdrop-blur-sm bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Cliques Hoje
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">
                  {stats.todayClicks}
                </div>
                <p className="text-xs text-muted-foreground">
                  Cliques nas últimas 24 horas
                </p>
                <Badge variant="outline" className="mt-2">
                  +15% vs ontem
                </Badge>
              </CardContent>
            </Card>

            {/* Visitors */}
            <Card className="backdrop-blur-sm bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Visitantes Únicos
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.visitors}</div>
                <p className="text-xs text-muted-foreground">
                  Visitantes únicos este mês
                </p>
              </CardContent>
            </Card>

            {/* Conversion Rate */}
            <Card className="backdrop-blur-sm bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Taxa de Conversão
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.conversionRate}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Visitantes que clicaram em links
                </p>
                <Badge variant="secondary" className="mt-2">
                  Excelente
                </Badge>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Activity */}
        {/* <Card className="backdrop-blur-sm bg-card/50">
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>
                Últimas interações com seus links
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Novo clique no link "Portfolio"
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Há 5 minutos
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="h-2 w-2 rounded-full bg-secondary"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Link "Instagram" foi atualizado
                    </p>
                    <p className="text-xs text-muted-foreground">Há 2 horas</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="h-2 w-2 rounded-full bg-accent"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Novo visitante do Brasil
                    </p>
                    <p className="text-xs text-muted-foreground">Há 4 horas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> */}
      </div>
    </div>
  );
}
