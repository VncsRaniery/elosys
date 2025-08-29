"use client";

import { useState, useEffect } from "react";
import type {
  CreateLinktreePayload,
  LinkFormData,
  Linktree,
  LinktreeFormData,
} from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import GradientPicker from "./gradient-picker";
import ImageUploader from "./image-upload-field";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableLinkItem } from "./sortable-link-item";

const INITIAL_FORM_DATA: LinktreeFormData = {
  username: "",
  displayName: "",
  avatarUrl: "",
  bio: "",
  theme: "escuro",
  customColor: "#8A2BE2",
  backgroundImageUrl: "",
  isPublic: true,
};

type LinktreeDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateLinktreePayload) => void;
  initialData?: Linktree | null;
};

export default function LinktreeDialog({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: LinktreeDialogProps) {
  const isEditMode = !!initialData;

  const [formData, setFormData] = useState<LinktreeFormData>(INITIAL_FORM_DATA);
  const [links, setLinks] = useState<LinkFormData[]>([]);
  const [loading, setLoading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData({
        username: initialData.username,
        displayName: initialData.displayName || "",
        avatarUrl: initialData.avatarUrl || "",
        bio: initialData.bio || "",
        theme: initialData.theme,
        customColor: initialData.customColor,
        backgroundImageUrl: initialData.backgroundImageUrl || "",
        isPublic: initialData.isPublic,
      });
      // Garante que o estado dos links também limpe o "https://" para edição
      setLinks(
        initialData.links?.map((link) => ({
          ...link,
          url: link.url.replace("https://", ""),
        })) || []
      );
    } else {
      setFormData(INITIAL_FORM_DATA);
      setLinks([]);
    }
  }, [initialData, isEditMode, isOpen]);

  const handleInputChange = <K extends keyof LinktreeFormData>(
    field: K,
    value: LinktreeFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLinkChange = (
    id: number | string,
    field: "title" | "description" | "url",
    value: string
  ) => {
    // A lógica para remover "https://"" da URL é movida para o componente SortableLinkItem
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    );
  };

  const addLink = () => {
    const newLink: LinkFormData = {
      id: Date.now(),
      title: "",
      description: "",
      url: "", // <-- MUDANÇA: URL inicial é vazia
    };
    setLinks((prev) => [...prev, newLink]);
  };

  const removeLink = (id: number | string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLinks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const isUsernameValid = (username: string) => {
    return /^[a-zA-Z0-9_-]{3,30}$/.test(username);
  };

  const handleSubmit = async () => {
    if (!formData.username.trim() || !isUsernameValid(formData.username)) {
      return;
    }

    setLoading(true);
    try {
      // ✅ MELHORIA: Filtra links vazios antes de enviar
      const validLinks = links.filter(
        (link) => link.title.trim() !== "" && link.url.trim() !== ""
      );

      const payload: CreateLinktreePayload = {
        ...formData,
        links: validLinks.map(({ title, url, description }) => ({
          title,
          // ✅ MELHORIA: Adiciona "https://" de volta para salvar no banco de dados
          url: `https://${url.replace("https://", "")}`,
          description,
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Editar Linktree" : "Criar Novo Linktree"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Atualize as informações do seu Linktree."
              : "Preencha as informações para criar seu novo Linktree."}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Informações</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
            <TabsTrigger value="appearance">Aparência</TabsTrigger>
          </TabsList>

          {/* Aba Informações (sem alterações) */}
          <TabsContent value="basic" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nome de Usuário *</Label>
              <Input
                id="username"
                placeholder="seunome"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className={
                  !isUsernameValid(formData.username) && formData.username
                    ? "border-red-500"
                    : ""
                }
                disabled={isEditMode}
              />
              {formData.username && !isUsernameValid(formData.username) && (
                <p className="text-xs text-red-500">
                  Use apenas letras, números, _ e - (3-30 caracteres)
                </p>
              )}
              {formData.username && (
                <p className="text-xs text-gray-500">
                  Seu link será:{" "}
                  {typeof window !== "undefined"
                    ? window.location.origin
                    : "yoursite.com"}
                  /{formData.username}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Nome de Exibição</Label>
              <Input
                id="displayName"
                placeholder="Seu Nome Completo"
                value={formData.displayName}
                onChange={(e) =>
                  handleInputChange("displayName", e.target.value)
                }
              />
            </div>

            <ImageUploader
              label="Avatar"
              initialUrl={formData.avatarUrl}
              onUploadComplete={(url) => handleInputChange("avatarUrl", url)}
              cropType="avatar"
            />

            <div className="space-y-2">
              <Label htmlFor="bio">Biografia</Label>
              <Textarea
                id="bio"
                placeholder="Conte um pouco sobre você..."
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isPublic"
                checked={formData.isPublic}
                onCheckedChange={(checked) =>
                  handleInputChange("isPublic", checked)
                }
              />
              <Label htmlFor="isPublic">Tornar ativo</Label>
            </div>
          </TabsContent>

          {/* Aba Links (com alterações) */}
          <TabsContent value="links" className="space-y-4 pt-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={links}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {links.map((link) => (
                    <SortableLinkItem
                      key={link.id}
                      link={link}
                      handleLinkChange={handleLinkChange}
                      removeLink={removeLink}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
            <Button
              variant="outline"
              onClick={addLink}
              className="w-full gap-2"
            >
              <Plus className="h-4 w-4" />
              Adicionar Link
            </Button>
          </TabsContent>

          {/* Aba Aparência (sem alterações) */}
          <TabsContent value="appearance" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Tema</Label>
              <GradientPicker
                value={formData.theme}
                onChange={(themeId) => handleInputChange("theme", themeId)}
              />
            </div>

            <ImageUploader
              label="Imagem de Fundo (Opcional)"
              initialUrl={formData.backgroundImageUrl}
              onUploadComplete={(url) =>
                handleInputChange("backgroundImageUrl", url)
              }
              cropType="background"
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4 border-t">
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={
              loading ||
              !formData.username ||
              !isUsernameValid(formData.username)
            }
          >
            {loading
              ? isEditMode
                ? "Salvando..."
                : "Criando..."
              : isEditMode
              ? "Salvar Alterações"
              : "Criar Linktree"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
