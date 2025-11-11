import React from 'react';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { UserCircle, LogIn, Eye } from 'lucide-react';

interface GuestModeBarProps {
  onLoginClick: () => void;
}

export function GuestModeBar({ onLoginClick }: GuestModeBarProps) {
  return (
    <Alert className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-md">
      <Eye className="h-4 w-4 text-amber-600" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserCircle className="h-4 w-4 text-amber-600" />
          <span className="text-amber-800">
            <strong>Mode Pengunjung:</strong> Anda sedang menjelajah sebagai tamu. 
            <span className="hidden sm:inline"> Beberapa fitur terbatas.</span>
          </span>
        </div>
        <Button
          onClick={onLoginClick}
          size="sm"
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600"
        >
          <LogIn className="w-4 h-4 mr-1" />
          Masuk/Daftar
        </Button>
      </AlertDescription>
    </Alert>
  );
}