import { Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProfileData } from '@/types';
import { GetSocialIcon } from './icons';

const themeClasses = {
  light: 'bg-gray-100 text-gray-900',
  dark: 'bg-gray-900 text-gray-100',
  synthwave: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white',
};

interface ProfileViewProps {
  profile: ProfileData;
  onFlip: () => void;
}

export function ProfileView({ profile, onFlip }: ProfileViewProps) {
  const themeClass = themeClasses[profile.theme] || themeClasses.light;

  return (
    <Card 
      className={`w-full max-w-md mx-auto overflow-hidden transition-all duration-300 ${themeClass}`}
      style={{
        '--custom-color': profile.customColor,
        '--custom-color-hover': `${profile.customColor}E6`,
      } as React.CSSProperties}
    >
      <CardContent className="p-6 text-center relative">
        <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={onFlip}>
          <Settings className="h-5 w-5" />
        </Button>

        <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-[var(--custom-color)]">
          <AvatarImage src={profile.avatarUrl} alt={profile.username} />
          <AvatarFallback>{profile.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        
        <h1 className="text-2xl font-bold">@{profile.username}</h1>
        <p className="text-sm mt-2 opacity-80">{profile.bio}</p>

        <div className="flex flex-col gap-4 mt-6">
          {profile.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button
                className="w-full h-14 text-md transition-transform transform hover:scale-105 relative"
                style={{ 
                  backgroundColor: 'var(--custom-color)', 
                  color: profile.theme === 'light' ? '#fff' : 'inherit'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--custom-color-hover)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--custom-color)'}
              >
                <div className="flex items-center justify-center w-full">
                  {/* 👇 Ícone posicionado à esquerda */}
                  <span className="absolute left-4">
                    <GetSocialIcon url={link.url} className="h-6 w-6" />
                  </span>
                  {link.title}
                </div>
              </Button>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}