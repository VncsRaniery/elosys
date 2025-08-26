"use client"; 

import { useState } from "react";
import { ProfileData } from "@/types";
import { ProfileView } from "./profile-view";
import { SettingsView } from "./seetings-view";

const initialProfileData: ProfileData = {
  username: "gdev",
  avatarUrl: "https://avatars.githubusercontent.com/u/1024025?v=4",
  bio: "Desenvolvedor Full-Stack apaixonado por TypeScript, Next.js e soluções criativas.",
  links: [
    { id: 1, title: "Meu Portfólio", url: "https://github.com" },
    { id: 2, title: "LinkedIn", url: "https://linkedin.com" },
    { id: 3, title: "Twitter / X", url: "https://twitter.com" },
  ],
  theme: "dark",
  customColor: "#8A2BE2", // BlueViolet
};

export function LinktreeCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(initialProfileData);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSave = (newProfile: ProfileData) => {
    setProfile(newProfile);
    console.log("Perfil salvo:", newProfile);
  };

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
    </div>
  );
}
