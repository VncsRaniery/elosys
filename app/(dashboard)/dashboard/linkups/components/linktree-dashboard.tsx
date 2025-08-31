"use client";

import { useState, useEffect } from "react";
import { Plus, Eye, Edit, Trash2, Copy, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreateLinktreePayload, Linktree } from "@/types";
import { toast } from "sonner";
import LinktreeDialog from "./linktree-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function LinktreeDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLinktree, setEditingLinktree] = useState<Linktree | null>(null);
  const [linktrees, setLinktrees] = useState<Linktree[]>([]);
  const [loading, setLoading] = useState(true);

  /* ===== Buscar Linktrees já criados ===== */
  const fetchLinktrees = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/linktrees");
      if (!response.ok) throw new Error("Failed to fetch LinkUps");
      const data = await response.json();
      setLinktrees(data);
    } catch (error) {
      console.error("Error fetching LinkUps:", error);
      toast.error("Erro ao carregar LinkUps");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinktrees();
  }, []);

  /* ===== Adicionando novos Linktrees ===== */
  const addLinktree = async (data: CreateLinktreePayload) => {
    try {
      const response = await fetch("/api/linktrees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create LinkUp");
      const newLinktree = await response.json();
      setLinktrees((prev) => [...prev, newLinktree]);
      setIsDialogOpen(false);
      toast.success("LinkUp criado com sucesso");
    } catch (error) {
      console.error("Error creating LinkUp:", error);
      toast.error("Erro ao criar LinkUp");
    }
  };

  /* ===== Deletando LinkUps Existentes ===== */
  const deleteLinktree = async (linktreeId: string) => {
    try {
      const response = await fetch(`/api/linktrees/${linktreeId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Falha ao deletar LinkUp");
      }
      setLinktrees((prev) =>
        prev.filter((linktree) => linktree.id !== linktreeId)
      );
      toast.success("LinkUp deletado com sucesso");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Falha ao deletar LinkUp";
      toast.error(message);
    }
  };

  /* ===== Atualizando LinkUps Existentes ===== */
  const updateLinktree = async (id: string, data: CreateLinktreePayload) => {
    try {
      const response = await fetch(`/api/linktrees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Falha ao atualizar o LinkUp");
      }

      const updatedLinktree = await response.json();
      setLinktrees((prev) =>
        prev.map((lt) => (lt.id === id ? updatedLinktree : lt))
      );
      handleCloseDialog();
      toast.success("LinkUp atualizado com sucesso!");
    } catch (error) {
      console.error("Error updating LinkUp:", error);
      toast.error("Erro ao atualizar o LinkUp.");
    }
  };

  const handleOpenEditDialog = (linktree: Linktree) => {
    setEditingLinktree(linktree);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingLinktree(null);
  };

  const handleFormSubmit = async (data: CreateLinktreePayload) => {
    if (editingLinktree) {
      await updateLinktree(editingLinktree.id, data);
    } else {
      await addLinktree(data);
    }
  };

  const copyToClipboard = (username: string) => {
    const url = `${window.location.origin}/${username}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copiado para a área de transferência!");
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Meus LinkUps
          </h1>
          <p className="text-gray-600 mt-2">
            Gerencie todos os seus LinkUps em um só lugar
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="flex-1 sm:flex-none"
        >
          <PlusIcon className="h-4 w-4" /> Adicionar um novo LinkUp
        </Button>
      </div>

      {linktrees.length === 0 ? (
        <div
          className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center"
          role="status"
          aria-live="polite"
        >
          <div className="mb-4 flex size-16 items-center justify-center rounded-full border border-dashed">
            <Plus className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold">Nenhum LinkUp encontrado</h3>
          <p className="text-muted-foreground mt-2 max-w-xs text-sm">
            Comece criando seu primeiro LinkUp para compartilhar seus links
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {linktrees.map((linktree) => (
            <Card
              key={linktree.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={linktree.avatarUrl}
                        alt={linktree.username}
                      />
                      <AvatarFallback>
                        {linktree.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">
                        @{linktree.username}
                      </h3>
                      {linktree.displayName && (
                        <p className="text-sm">
                          {linktree.displayName}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge variant={linktree.isPublic ? "default" : "secondary"}>
                    {linktree.isPublic ? "Público" : "Desativado"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                {linktree.bio && (
                  <p className="text-sm mb-4">
                    {linktree.bio}
                  </p>
                )}

                <div className="text-sm mb-4">
                  <span className="mx-2">•</span>
                  <span>Tema: {linktree.theme}</span>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      window.open(`/${linktree.username}`, "_blank")
                    }
                    className="gap-1"
                  >
                    <Eye className="h-3 w-3" />
                    Visualizar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1"
                    onClick={() => handleOpenEditDialog(linktree)}
                  >
                    <Edit className="h-3 w-3" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(linktree.username)}
                    className="gap-1"
                  >
                    <Copy className="h-3 w-3" />
                    Copiar Link
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-red-400 hover:text-red-500"
                      >
                        <Trash2 className="h-3 w-3" />
                        Deletar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Tem certeza de que deseja excluir esta tarefa?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não pode ser desfeita. Isso excluirá
                          permanentemente a tarefa.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteLinktree(linktree.id)}
                        >
                          Deletar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs">
                    Criado em{" "}
                    {new Date(linktree.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <LinktreeDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleFormSubmit}
        initialData={editingLinktree}
      />
    </div>
  );
}
