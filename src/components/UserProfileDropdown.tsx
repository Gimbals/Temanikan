import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { User, Settings, LogOut, Shield, UserCircle } from 'lucide-react';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: 'guest' | 'member' | 'admin';
  avatar?: string;
}

interface UserProfileDropdownProps {
  user: UserData;
  onLogout: () => void;
  onSwitchToGuest: () => void;
  onNavigateToAdmin?: () => void;
}

export function UserProfileDropdown({ user, onLogout, onSwitchToGuest, onNavigateToAdmin }: UserProfileDropdownProps) {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-500 text-white text-xs">Admin</Badge>;
      case 'member':
        return <Badge className="bg-blue-500 text-white text-xs">Member</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Guest</Badge>;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-red-600';
      case 'member':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <UserCircle className="h-8 w-8 text-gray-600" />
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              {getRoleBadge(user.role)}
            </div>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        {user.role !== 'guest' && (
          <>
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profil Saya</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Pengaturan</span>
            </DropdownMenuItem>
            
            {user.role === 'admin' && (
              <DropdownMenuItem className="cursor-pointer" onClick={onNavigateToAdmin}>
                <Shield className="mr-2 h-4 w-4" />
                <span>Panel Admin</span>
              </DropdownMenuItem>
            )}
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="cursor-pointer" onClick={onSwitchToGuest}>
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Mode Pengunjung</span>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuItem className="cursor-pointer text-red-600" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{user.role === 'guest' ? 'Keluar dari Mode Guest' : 'Keluar'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}