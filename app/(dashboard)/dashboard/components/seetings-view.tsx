import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileData } from '@/types';

interface SettingsViewProps {
  initialProfile: ProfileData;
  onSave: (newProfile: ProfileData) => void;
  onFlip: () => void;
}

export function SettingsView({ initialProfile, onSave, onFlip }: SettingsViewProps) {
  const [formData, setFormData] = useState<ProfileData>(initialProfile);

  // ... (manter as funções handleInputChange, handleLinkChange, addLink, removeLink)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleLinkChange = (index: number, field: 'title' | 'url', value: string) => {
    const newLinks = [...formData.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFormData(prev => ({ ...prev, links: newLinks }));
  };

  const addLink = () => {
    const newLink = { id: Date.now(), title: 'Novo Link', url: 'https://' };
    setFormData(prev => ({ ...prev, links: [...prev.links, newLink] }));
  };

  const removeLink = (id: number) => {
    setFormData(prev => ({ ...prev, links: prev.links.filter(link => link.id !== id) }));
  };


  const handleSave = () => {
    onSave(formData);
    onFlip();
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-950">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Configurações</CardTitle>
        <Button variant="ghost" size="icon" onClick={onFlip}>
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="links" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="links">Links</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="appearance">Aparência</TabsTrigger>
          </TabsList>
          
          {/* Aba de Links */}
          <TabsContent value="links" className="py-4 max-h-[55vh] overflow-y-auto">
            <div className="space-y-4">
                {formData.links.map((link, index) => (
                  <div key={link.id} className="flex items-center gap-2 p-3 border rounded-lg">
                    <div className="flex-grow space-y-2">
                        <Input placeholder="Título" value={link.title} onChange={(e) => handleLinkChange(index, 'title', e.target.value)} />
                        <Input placeholder="URL" value={link.url} onChange={(e) => handleLinkChange(index, 'url', e.target.value)} />
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeLink(link.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={addLink}>
                  <Plus className="mr-2 h-4 w-4"/> Adicionar Link
                </Button>
            </div>
          </TabsContent>
          
          {/* Aba de Perfil */}
          <TabsContent value="profile" className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nome de Usuário</Label>
                <Input id="username" name="username" value={formData.username} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatarUrl">URL do Avatar</Label>
                <Input id="avatarUrl" name="avatarUrl" value={formData.avatarUrl} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} />
              </div>
            </div>
          </TabsContent>

          {/* Aba de Aparência */}
          <TabsContent value="appearance" className="py-4">
             <div className="space-y-4">
                <h3 className="text-md font-semibold">Tema</h3>
                 <Tabs defaultValue={formData.theme} onValueChange={(value) => setFormData(p => ({...p, theme: value as ProfileData['theme']}))}>
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="light">Claro</TabsTrigger>
                        <TabsTrigger value="dark">Escuro</TabsTrigger>
                        <TabsTrigger value="synthwave">Synth</TabsTrigger>
                    </TabsList>
                 </Tabs>
                <div className="space-y-2 pt-4">
                    <Label>Cor de Destaque</Label>
                    <Input type="color" name="customColor" value={formData.customColor} onChange={handleInputChange} className="w-full h-10 p-1"/>
                </div>
            </div>
          </TabsContent>
        </Tabs>
        <Button className="w-full mt-4" onClick={handleSave}>Salvar Alterações</Button>
      </CardContent>
    </Card>
  );
}