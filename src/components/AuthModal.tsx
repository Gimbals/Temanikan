import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, Mail, Lock, UserPlus, LogIn } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: any) => void;
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - in real app, this would call an API
    const userData = {
      id: 1,
      name: loginData.email === 'admin@temanikan.com' ? 'Admin' : 'User Demo',
      email: loginData.email,
      role: loginData.email === 'admin@temanikan.com' ? 'admin' : 'member',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'
    };

    onLogin(userData);
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }

    // Mock registration
    const userData = {
      id: 2,
      name: registerData.name,
      email: registerData.email,
      role: 'member',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b8fd?w=40&h=40&fit=crop&crop=face'
    };

    onLogin(userData);
    onClose();
  };

  const handleDemoLogin = (role: 'member' | 'admin') => {
    const userData = {
      id: role === 'admin' ? 999 : 123,
      name: role === 'admin' ? 'Admin Demo' : 'Member Demo',
      email: role === 'admin' ? 'admin@temanikan.com' : 'member@temanikan.com',
      role: role,
      avatar: role === 'admin' 
        ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'
    };

    onLogin(userData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <span className="text-2xl">🐠</span>
            <div className="mt-2">Masuk ke temanikan</div>
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-600">
            Bergabunglah dengan komunitas pecinta ikan hias
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Masuk</TabsTrigger>
            <TabsTrigger value="register">Daftar</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    className="pl-10"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password Anda"
                    className="pl-10"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                <LogIn className="w-4 h-4 mr-2" />
                Masuk
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">atau coba demo</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleDemoLogin('member')}
                  className="text-sm"
                >
                  <User className="w-4 h-4 mr-1" />
                  Demo Member
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleDemoLogin('admin')}
                  className="text-sm bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                >
                  <Badge className="w-4 h-4 mr-1" />
                  Demo Admin
                </Button>
              </div>
              
              <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-lg">
                <p className="text-xs text-cyan-800">
                  <strong>Info Login Admin:</strong><br/>
                  • Email: <code className="bg-white px-1 py-0.5 rounded">admin@temanikan.com</code><br/>
                  • Password: <code className="bg-white px-1 py-0.5 rounded">apa saja</code><br/>
                  Atau klik tombol "Demo Admin" di atas
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nama lengkap Anda"
                    className="pl-10"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="nama@email.com"
                    className="pl-10"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="Minimal 6 karakter"
                    className="pl-10"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Ulangi password"
                    className="pl-10"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                <UserPlus className="w-4 h-4 mr-2" />
                Daftar Sekarang
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}