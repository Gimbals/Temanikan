import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Home, Book, Stethoscope, MessageCircle, ShoppingBag, Lock, Settings, Activity } from 'lucide-react';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: 'guest' | 'member' | 'admin';
  avatar?: string;
}

interface MobileTabNavigationWebsiteProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  user?: UserData | null;
  canAccessSection: (section: string) => boolean;
}

export function MobileTabNavigationWebsite({ activeSection, onSectionChange, user, canAccessSection }: MobileTabNavigationWebsiteProps) {
  const baseTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'ensiklopedia', label: 'Fish', icon: Book },
    { id: 'monitoring', label: 'Monitor', icon: Activity, badge: 'IoT' },
    { id: 'diagnosa', label: 'AI', icon: Stethoscope },
    { id: 'forum', label: 'Forum', icon: MessageCircle }
  ];

  // Add admin tab if user is admin
  const tabs = user?.role === 'admin' 
    ? [...baseTabs, { id: 'admin', label: 'Admin', icon: Settings, badge: 'ADM' }]
    : baseTabs;

  // Dynamic grid columns based on number of tabs
  const gridCols = tabs.length === 5 ? 'grid-cols-5' : 'grid-cols-6';

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-cyan-200 shadow-xl z-50 md:hidden">
      <div className={`grid ${gridCols} gap-1 p-2`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          const hasAccess = canAccessSection(tab.id);
          const isLocked = !hasAccess;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              onClick={() => hasAccess ? onSectionChange(tab.id) : null}
              disabled={isLocked}
              className={`
                relative flex flex-col items-center gap-1 p-3 h-auto rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-gradient-to-br from-cyan-100 to-blue-100 text-cyan-700 shadow-md' 
                  : isLocked
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-cyan-50'
                }
              `}
            >
              <div className="relative">
                {isLocked ? (
                  <Lock className="w-5 h-5 text-gray-400" />
                ) : (
                  <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-600' : 'text-gray-500'}`} />
                )}
                {tab.badge && !isLocked && (
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-orange-500 text-white p-0 flex items-center justify-center text-xs">
                    {tab.badge}
                  </Badge>
                )}
              </div>
              <span className={`text-xs font-medium ${
                isActive ? 'text-cyan-700' : 
                isLocked ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {tab.label}
              </span>
              {isActive && !isLocked && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-500 rounded-full"></div>
              )}
            </Button>
          );
        })}
      </div>
      
      {/* Bottom safe area */}
      <div className="h-safe-area-inset-bottom bg-white/95"></div>
    </div>
  );
}