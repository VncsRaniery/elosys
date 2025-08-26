// Define a estrutura para cada link individual
export interface SocialLink {
  id: number;
  title: string;
  url: string;
}

// Define os temas disponíveis para o card
export type CardTheme = 'light' | 'dark' | 'synthwave';

// Define a estrutura completa dos dados do perfil
export interface ProfileData {
  username: string;
  avatarUrl: string;
  bio: string;
  links: SocialLink[];
  theme: CardTheme;
  customColor: string; // Ex: '#8A2BE2' (BlueViolet)
  backgroundImageUrl?: string; // Opcional
}