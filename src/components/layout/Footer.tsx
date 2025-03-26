
import React from 'react';
import { cn } from '@/lib/utils';
import { Home, Wrench, Camera, Clock, User } from 'lucide-react';

interface FooterProps {
  activeRoute: string;
  onNavigate: (route: string) => void;
}

const Footer: React.FC<FooterProps> = ({ activeRoute, onNavigate }) => {
  const navItems = [
    { icon: Home, route: '/dashboard', label: 'Home' },
    { icon: Wrench, route: '/vehicle', label: 'Vehicle' },
    { icon: Camera, route: '/scan', label: 'Scan' },
    { icon: Clock, route: '/history', label: 'History' },
    { icon: User, route: '/profile', label: 'Profile' },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 bg-diag-card glass border-t border-zinc-800 px-2">
      <div className="flex items-center justify-around h-full max-w-md mx-auto">
        {navItems.map(({ icon: Icon, route, label }) => {
          const isActive = activeRoute === route;
          
          return (
            <button
              key={route}
              onClick={() => onNavigate(route)}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full transition-all duration-200",
                isActive ? "text-white" : "text-zinc-500"
              )}
            >
              <div 
                className={cn(
                  "flex items-center justify-center transition-transform duration-300",
                  isActive ? "scale-110" : "scale-100"
                )}
              >
                <Icon size={20} className={cn(isActive ? "text-diag-accent" : "")} />
              </div>
              <span className="text-xs mt-1">{label}</span>
              {isActive && (
                <div className="absolute bottom-0 w-1 h-1 bg-diag-accent rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
