import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Shield, User, Info, Copy, CheckCircle, Eye, EyeOff } from 'lucide-react';

interface AdminLoginInfoProps {
  onLoginClick: () => void;
}

export function AdminLoginInfo({ onLoginClick }: AdminLoginInfoProps) {
  const [showCredentials, setShowCredentials] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('admin@temanikan.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.log('Fallback: Could not copy to clipboard');
    }
  };

  return (
    <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-700">
          <Shield className="w-5 h-5" />
          Akses Admin Dashboard
          <Badge className="bg-red-500 text-white text-xs">DEMO</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Untuk Developer & Tester:</strong> Website temanikan memiliki 3 role pengguna dengan akses berbeda.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-700">Guest</span>
              <Badge variant="outline" className="text-xs">Terbatas</Badge>
            </div>
            <p className="text-sm text-gray-600">
              Dapat akses: Beranda, Ensiklopedia, Panduan, Shop (view only)
            </p>
          </div>

          <div className="p-4 bg-blue-100 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-700">Member</span>
              <Badge className="bg-blue-500 text-white text-xs">Standar</Badge>
            </div>
            <p className="text-sm text-blue-600">
              Dapat akses: Semua fitur + Forum, Diagnosa AI, Transaksi
            </p>
          </div>

          <div className="p-4 bg-red-100 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-red-600" />
              <span className="font-medium text-red-700">Admin</span>
              <Badge className="bg-red-500 text-white text-xs">Full Access</Badge>
            </div>
            <p className="text-sm text-red-600">
              Dapat akses: Semua fitur + Dashboard Admin lengkap
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border-2 border-dashed border-red-300">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-red-700">Demo Admin Account</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCredentials(!showCredentials)}
              className="text-red-600 border-red-300"
            >
              {showCredentials ? (
                <>
                  <EyeOff className="w-4 h-4 mr-1" />
                  Sembunyikan
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-1" />
                  Tampilkan
                </>
              )}
            </Button>
          </div>

          {showCredentials && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <p className="text-sm font-medium text-gray-700">Email:</p>
                  <p className="text-sm text-gray-600 font-mono">admin@temanikan.com</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyEmail}
                  className="text-xs"
                >
                  {copiedEmail ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>

              <div className="p-2 bg-gray-50 rounded">
                <p className="text-sm font-medium text-gray-700">Password:</p>
                <p className="text-sm text-gray-600">Bebas (isi apa saja)</p>
              </div>

              <Alert className="bg-yellow-50 border-yellow-200">
                <Info className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800 text-sm">
                  <strong>Atau</strong> klik tombol "Demo Admin" di modal login untuk akses langsung.
                </AlertDescription>
              </Alert>
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <Button
              onClick={onLoginClick}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
            >
              <Shield className="w-4 h-4 mr-2" />
              Login sebagai Admin
            </Button>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center">
          💡 <strong>Tip:</strong> Setelah login sebagai admin, menu "Admin" akan muncul di header dan tab navigation
        </div>
      </CardContent>
    </Card>
  );
}