"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Linktree, UpdateLinktreePayload } from "@/types";

interface EditLinktreeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  linktree: Linktree;
  onSubmit: (data: UpdateLinktreePayload) => void;
}

interface LinkFormData {
  id: number;
  title: string;
  url: string;
}

export function EditLinktreeModal({
  open,
  onOpenChange,
  linktree,
  onSubmit,
}: EditLinktreeModalProps) {
  const [formData, setFormData] = useState({
    displayName: "",
    avatarUrl: "",
    bio: "",
    theme: "dark",
    customColor: "#8A2BE2",
    backgroundImageUrl: "",
    isPublic: true,
  });

  const [links, setLinks] = useState<LinkFormData[]>([]);
  const [loading, setLoading] = useState(false);

  // Preencher formulário quando o linktree mudar
  useEffect(() => {
    if (linktree) {
      setFormData({
        displayName: linktree.displayName || "",
        avatarUrl: linktree.avatarUrl || "",
        bio: linktree.bio || "",
        theme: linktree.theme,
        customColor: linktree.customColor,
        backgroundImageUrl: linktree.backgroundImageUrl || "",
        isPublic: linktree.isPublic,
      });

      setLinks(
        linktree.links.map((link, index) => ({
          id: index + 1,
          title: link.title,
          url: link.url,
        }))
      );
    }
  }, [linktree]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLinkChange = (id: number, field: string, value: string) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    );
  };

  const addLink = () => {
    const newLink: LinkFormData = {
      id: Math.max(...links.map((l) => l.id), 0) + 1,
      title: "",
      url: "https://",
    };
    setLinks((prev) => [...prev, newLink]);
  };

  const removeLink = (id: number) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload: UpdateLinktreePayload = {
        ...formData,
        links: links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
      };

      await onSubmit(payload);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Linktree</DialogTitle>
          <DialogDescription>
            Atualize as informações do seu Linktree @{linktree?.username}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Básico</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
            <TabsTrigger value="appearance">Aparência</TabsTrigger>
          </TabsList>

          {/* Aba Básico */}
          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-displayName">Nome de Exibição</Label>
              <Input
                id="edit-displayName"
                placeholder="Seu Nome Completo"
                value={formData.displayName}
                onChange={(e) =>
                  handleInputChange("displayName", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-avatarUrl">URL do Avatar</Label>
              <Input
                id="edit-avatarUrl"
                placeholder="https://exemplo.com/avatar.jpg"
                value={formData.avatarUrl}
                onChange={(e) => handleInputChange("avatarUrl", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-bio">Biografia</Label>
              <Textarea
                id="edit-bio"
                placeholder="Conte um pouco sobre você..."
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="edit-isPublic"
                checked={formData.isPublic}
                onCheckedChange={(checked) =>
                  handleInputChange("isPublic", checked)
                }
              />
              <Label htmlFor="edit-isPublic">Tornar público</Label>
            </div>
          </TabsContent>

          {/* Aba Links */}
          <TabsContent value="links" className="space-y-4">
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center gap-2 p-3 border rounded-lg"
                >
                  <div className="flex-grow space-y-2">
                    <Input
                      placeholder="Título do link"
                      value={link.title}
                      onChange={(e) =>
                        handleLinkChange(link.id, "title", e.target.value)
                      }
                    />
                    <Input
                      placeholder="URL (https://...)"
                      value={link.url}
                      onChange={(e) =>
                        handleLinkChange(link.id, "url", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLink(link.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={addLink}
              className="w-full gap-2"
            >
              <Plus className="h-4 w-4" />
              Adicionar Link
            </Button>
          </TabsContent>

          {/* Aba Aparência */}
          <TabsContent value="appearance" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tema</Label>
                <Tabs
                  value={formData.theme}
                  onValueChange={(value) => handleInputChange("theme", value)}
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="light">Claro</TabsTrigger>
                    <TabsTrigger value="dark">Escuro</TabsTrigger>
                    <TabsTrigger value="synthwave">Synthwave</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-customColor">Cor de Destaque</Label>
                <Input
                  id="edit-customColor"
                  type="color"
                  value={formData.customColor}
                  onChange={(e) =>
                    handleInputChange("customColor", e.target.value)
                  }
                  className="w-full h-10 p-1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-backgroundImageUrl">
                  Imagem de Fundo (Opcional)
                </Label>
                <Input
                  id="edit-backgroundImageUrl"
                  placeholder="https://exemplo.com/background.jpg"
                  value={formData.backgroundImageUrl}
                  onChange={(e) =>
                    handleInputChange("backgroundImageUrl", e.target.value)
                  }
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="flex-1" disabled={loading}>
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
