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
