export interface SocialLink {
  id: string;
  title: string;
  url: string;
  order: number;
  isActive: boolean;
}

export type CardTheme = "light" | "dark" | "synthwave";

export interface ProfileData {
  username: string;
  avatarUrl: string;
  bio: string;
  links: Array<{
    id: number;
    title: string;
    url: string;
  }>;
  theme: CardTheme;
  customColor: string;
  backgroundImageUrl?: string;
}

export interface Linktree {
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
}

export type LinktreeInput = {
  username: string;
  displayName?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  isPublic: boolean;
  theme: string;
  // Se os links forem editáveis no mesmo formulário, adicione-os aqui.
  links?: { title: string; url: string }[];
};

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

export interface UpdateLinktreePayload {
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

export function linktreeToProfileData(linktree: Linktree): ProfileData {
  return {
    username: linktree.username,
    avatarUrl: linktree.avatarUrl || "",
    bio: linktree.bio || "",
    links: linktree.links.map((link, index) => ({
      id: index + 1,
      title: link.title,
      url: link.url,
    })),
    theme: (linktree.theme as CardTheme) || "dark",
    customColor: linktree.customColor || "#8A2BE2",
    backgroundImageUrl: linktree.backgroundImageUrl,
  };
}

export function profileDataToUpdatePayload(
  profileData: ProfileData
): UpdateLinktreePayload {
  return {
    displayName: profileData.username,
    avatarUrl: profileData.avatarUrl,
    bio: profileData.bio,
    theme: profileData.theme,
    customColor: profileData.customColor,
    backgroundImageUrl: profileData.backgroundImageUrl,
    links: profileData.links.map((link) => ({
      title: link.title,
      url: link.url,
    })),
  };
}
