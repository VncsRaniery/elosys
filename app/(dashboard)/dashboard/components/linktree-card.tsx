"use client";

import { useState, useEffect } from "react";
import {
  ProfileData,
  Linktree,
  linktreeToProfileData,
  profileDataToUpdatePayload,
} from "@/types";
import { ProfileView } from "./profile-view";
import { SettingsView } from "./seetings-view";
import { toast } from "sonner";

interface LinktreeCardProps {
  linktreeId?: string;
  username?: string;
}

export function LinktreeCard({ linktreeId, username }: LinktreeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    username: "demo",
    avatarUrl: "https://avatars.githubusercontent.com/u/1024025?v=4",
    bio: "Desenvolvedor Full-Stack apaixonado por TypeScript, Next.js e soluções criativas.",
    links: [
      { id: 1, title: "Meu Portfólio", url: "https://github.com" },
      { id: 2, title: "LinkedIn", url: "https://linkedin.com" },
      { id: 3, title: "Twitter / X", url: "https://twitter.com" },
    ],
    theme: "dark",
    customColor: "#8A2BE2",
  });
  const [loading, setLoading] = useState(false);
  const [currentLinktree, setCurrentLinktree] = useState<Linktree | null>(null);

  useEffect(() => {
    const loadLinktree = async () => {
      if (!linktreeId && !username) return;

      setLoading(true);
      try {
        let response;
        if (linktreeId) {
          response = await fetch(`/api/linktrees/${linktreeId}`);
        } else if (username) {
          response = await fetch(`/api/public/${username}`);
        }

        if (response && response.ok) {
          const linktree: Linktree = await response.json();
          setCurrentLinktree(linktree);
          setProfile(linktreeToProfileData(linktree));
        }
      } catch (error) {
        console.error("Error loading linktree:", error);
        toast.error("Erro ao carregar Linktree");
      } finally {
        setLoading(false);
      }
    };

    loadLinktree();
  }, [linktreeId, username]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSave = async (newProfile: ProfileData) => {
    if (!currentLinktree) {
      console.log("Perfil salvo localmente:", newProfile);
      setProfile(newProfile);
      return;
    }

    setLoading(true);
    try {
      const payload = profileDataToUpdatePayload(newProfile);
      const response = await fetch(`/api/linktrees/${currentLinktree.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update linktree");
      }

      const updatedLinktree: Linktree = await response.json();
      setCurrentLinktree(updatedLinktree);
      setProfile(linktreeToProfileData(updatedLinktree));
      toast.success("Linktree atualizado com sucesso!");
    } catch (error) {
      console.error("Error updating linktree:", error);
      toast.error("Erro ao salvar alterações");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile.username) {
    return (
      <div className="flip-card-container">
        <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-950 rounded-lg p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flip-card-container">
      <div className={`flip-card-inner ${isFlipped ? "is-flipped" : ""}`}>
        {/* Frente do Card */}
        <div className="flip-card-front">
          <ProfileView profile={profile} onFlip={handleFlip} />
        </div>

        {/* Verso do Card */}
        <div className="flip-card-back">
          <SettingsView
            initialProfile={profile}
            onSave={handleSave}
            onFlip={handleFlip}
          />
        </div>
      </div>

      {/* Indicador de carregamento durante salvamento */}
      {loading && (
        <div className="absolute top-2 right-2 z-50">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
}
