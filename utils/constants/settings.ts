import { Palette, User } from "lucide-react";

const themeItems = [
  { value: "light", label: "Claro", image: "/theme/ui-light.png" },
  { value: "dark", label: "Escuro", image: "/theme/ui-dark.png" },
  { value: "system", label: "Sistema", image: "/theme/ui-system.png" },
];

const data = {
  nav: [
    { name: "Início", icon: User, description: "Informações pessoais" },
    { name: "Aparência", icon: Palette, description: "Temas e cores" },
  ],
};

const pageContent = {
  Início: {
    title: "Perfil",
    description: "Gerencie suas informações pessoais e preferências.",
    content: "Personalize o layout e os widgets da sua página inicial.",
  },
  Aparência: {
    title: "Aparência",
    description: "Personalize a aparência do sistema.",
    content:
      "Escolha entre temas claro e escuro, e ajuste as cores da interface.",
  },
};

export const SETTINGS = {
  themeItems,
  data,
  pageContent,
};