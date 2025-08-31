// ======= TYPES E INTERFACES PARA LINKUP DIALOG ======= //
export interface LinktreeFormData {
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  theme: string;
  customColor: string;
  backgroundImageUrl: string;
  isPublic: boolean;
}
export interface LinkFormData {
  id: number | string;
  title: string;
  description?: string;
  url: string;
}
export interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
}

// ======= TYPES E INTERFACES PARA LINKUP CARD ======= //
export type Linktree = {
  id: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  theme: string;
  customColor: string;
  backgroundImageUrl?: string;
  isPublic: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  links: SocialLink[];
};
export interface SocialLink {
  id: string;
  title: string;
  description?: string;
  url: string;
  order: number;
  isActive: boolean;
}
export interface CreateLinktreePayload {
  username: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  theme?: string;
  customColor?: string;
  backgroundImageUrl?: string;
  isPublic?: boolean;
  links?: Array<{
    title: string;
    url: string;
  }>;
}

// ======= INTERFACE PARA AS ANÁLISES ======= //
export interface AnalyticsData {
  totalLinkUps: number;
  totalLinks: number;
  activeLinks: number;
  totalClicks: number;
  todayClicks: number;
  mostClickedLink: {
    title: string;
    url: string;
    clicks: number;
  } | null;
}