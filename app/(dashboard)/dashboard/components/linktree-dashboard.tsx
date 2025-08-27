"use client";

import { useState, useEffect } from "react";
import { Plus, Eye, Edit, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreateLinktreeModal } from "./create-linktree-modal";
import { EditLinktreeModal } from "./edit-linktree-modal";
import { Linktree } from "@/types";
import { toast } from "sonner";

export function LinktreeDashboard() {
  const [linktrees, setLinktrees] = useState<Linktree[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingLinktree, setEditingLinktree] = useState<Linktree | null>(null);

  // Buscar Linktrees do usuário
  const fetchLinktrees = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/linktrees");
      if (!response.ok) throw new Error("Failed to fetch linktrees");
      const data = await response.json();
      setLinktrees(data);
    } catch (error) {
      console.error("Error fetching linktrees:", error);
      toast.error("Erro ao carregar Linktrees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinktrees();
  }, []);

  const handleCreateLinktree = async (data: any) => {
    try {
      const response = await fetch("/api/linktrees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create linktree");
      }

      const newLinktree = await response.json();
      setLinktrees([newLinktree, ...linktrees]);
      setCreateModalOpen(false);
      toast.success("Linktree criado com sucesso!");
    } catch (error: any) {
      console.error("Error creating linktree:", error);
      toast.error(error.message || "Erro ao criar Linktree");
    }
  };

  const handleUpdateLinktree = async (id: string, data: any) => {
    try {
      const response = await fetch(`/api/linktrees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update linktree");

      const updatedLinktree = await response.json();
      setLinktrees(
        linktrees.map((lt) => (lt.id === id ? updatedLinktree : lt))
      );
      setEditModalOpen(false);
      setEditingLinktree(null);
      toast.success("Linktree atualizado com sucesso!");
    } catch (error) {
      console.error("Error updating linktree:", error);
      toast.error("Erro ao atualizar Linktree");
    }
  };

  const handleDeleteLinktree = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este Linktree?")) return;

    try {
      const response = await fetch(`/api/linktrees/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete linktree");

      setLinktrees(linktrees.filter((lt) => lt.id !== id));
      toast.success("Linktree deletado com sucesso!");
    } catch (error) {
      console.error("Error deleting linktree:", error);
      toast.error("Erro ao deletar Linktree");
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Meus Linktrees
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gerencie todos os seus Linktrees em um só lugar
          </p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Criar Novo Linktree
        </Button>
      </div>

      {linktrees.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                <Plus className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Nenhum Linktree encontrado
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Comece criando seu primeiro Linktree para compartilhar seus links
            </p>
            <Button onClick={() => setCreateModalOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Criar Primeiro Linktree
            </Button>
          </div>
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
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {linktree.displayName}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge variant={linktree.isPublic ? "default" : "secondary"}>
                    {linktree.isPublic ? "Público" : "Privado"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                {linktree.bio && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {linktree.bio}
                  </p>
                )}

                <div className="text-sm text-gray-500 mb-4">
                  <span>{linktree.links.length} links</span>
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
                    onClick={() => {
                      setEditingLinktree(linktree);
                      setEditModalOpen(true);
                    }}
                    className="gap-1"
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
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteLinktree(linktree.id)}
                    className="gap-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                    Deletar
                  </Button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500">
                    Criado em{" "}
                    {new Date(linktree.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CreateLinktreeModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSubmit={handleCreateLinktree}
      />

      {editingLinktree && (
        <EditLinktreeModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          linktree={editingLinktree}
          onSubmit={(data) => handleUpdateLinktree(editingLinktree.id, data)}
        />
      )}
    </div>
  );
}
