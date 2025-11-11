import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { 
  Users, 
  MessageSquare, 
  ShoppingBag, 
  FileText, 
  Settings, 
  BarChart3, 
  Fish, 
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  TrendingUp,
  UserCheck
} from 'lucide-react';

interface AdminDashboardProps {
  user: any;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalPosts: 3456,
    totalProducts: 234,
    totalFishEntries: 156,
    pendingReviews: 23
  };

  const recentUsers = [
    { id: 1, name: 'Ahmad Fauzi', email: 'ahmad@email.com', role: 'member', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Siti Nurhaliza', email: 'siti@email.com', role: 'member', status: 'active', joinDate: '2024-01-14' },
    { id: 3, name: 'Budi Setiawan', email: 'budi@email.com', role: 'member', status: 'suspended', joinDate: '2024-01-13' }
  ];

  const recentPosts = [
    { id: 1, title: 'Tips Merawat Ikan Cupang Hias', author: 'Ahmad Fauzi', category: 'Panduan', status: 'published', date: '2024-01-15' },
    { id: 2, title: 'Penyakit Jamur pada Ikan Koi', author: 'Dr. Aqua', category: 'Kesehatan', status: 'pending', date: '2024-01-15' },
    { id: 3, title: 'Setup Aquarium Nano Tank', author: 'Siti Nurhaliza', category: 'Tutorial', status: 'published', date: '2024-01-14' }
  ];

  const pendingProducts = [
    { id: 1, name: 'Filter Canister 1000L/H', seller: 'AquaShop Jakarta', price: 850000, status: 'pending' },
    { id: 2, name: 'LED Aquarium RGB 60cm', seller: 'Toko Ikan Hias', price: 275000, status: 'pending' },
    { id: 3, name: 'Substrat Soil Premium 5kg', seller: 'Aquatic Store', price: 125000, status: 'pending' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Admin</h1>
            <p className="text-cyan-100">Selamat datang kembali, {user?.name}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-cyan-100">Terakhir login</div>
            <div className="font-medium">Hari ini, 14:30</div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pengguna</p>
                <p className="text-2xl font-bold text-cyan-600">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% bulan ini
                </p>
              </div>
              <Users className="w-8 h-8 text-cyan-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pengguna Aktif</p>
                <p className="text-2xl font-bold text-blue-600">{stats.activeUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <UserCheck className="w-3 h-3" />
                  71% dari total
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Postingan</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalPosts.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <MessageSquare className="w-3 h-3" />
                  +45 hari ini
                </p>
              </div>
              <MessageSquare className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Perlu Review</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingReviews}</p>
                <p className="text-xs text-orange-600 flex items-center gap-1 mt-1">
                  <AlertTriangle className="w-3 h-3" />
                  Perlu perhatian
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Pengguna</TabsTrigger>
          <TabsTrigger value="content">Konten</TabsTrigger>
          <TabsTrigger value="products">Produk</TabsTrigger>
          <TabsTrigger value="fish">Ikan</TabsTrigger>
          <TabsTrigger value="settings">Pengaturan</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Users */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Pengguna Terbaru
                </CardTitle>
                <CardDescription>Pendaftaran pengguna dalam 3 hari terakhir</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                          {user.status === 'active' ? 'Aktif' : 'Suspend'}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{user.joinDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Postingan Terbaru
                </CardTitle>
                <CardDescription>Konten yang perlu direview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-gray-600">oleh {post.author}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                          {post.status === 'published' ? 'Publish' : 'Pending'}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Manajemen Pengguna</CardTitle>
                  <CardDescription>Kelola semua pengguna terdaftar</CardDescription>
                </div>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Pengguna
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input placeholder="Cari pengguna..." className="flex-1" />
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="suspended">Suspend</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border rounded-lg">
                  <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 font-medium text-sm">
                    <div>Nama</div>
                    <div>Email</div>
                    <div>Role</div>
                    <div>Status</div>
                    <div>Aksi</div>
                  </div>
                  {recentUsers.map((user) => (
                    <div key={user.id} className="grid grid-cols-5 gap-4 p-4 border-t items-center">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-gray-600">{user.email}</div>
                      <div>
                        <Badge variant="outline">{user.role}</Badge>
                      </div>
                      <div>
                        <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                          {user.status === 'active' ? 'Aktif' : 'Suspend'}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Ban className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Manajemen Konten</CardTitle>
                  <CardDescription>Review dan kelola semua konten</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Semua
                  </Button>
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Konten
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input placeholder="Cari konten..." className="flex-1" />
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="panduan">Panduan</SelectItem>
                      <SelectItem value="kesehatan">Kesehatan</SelectItem>
                      <SelectItem value="tutorial">Tutorial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border rounded-lg">
                  <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 font-medium text-sm">
                    <div>Judul</div>
                    <div>Penulis</div>
                    <div>Kategori</div>
                    <div>Status</div>
                    <div>Tanggal</div>
                    <div>Aksi</div>
                  </div>
                  {recentPosts.map((post) => (
                    <div key={post.id} className="grid grid-cols-6 gap-4 p-4 border-t items-center">
                      <div className="font-medium">{post.title}</div>
                      <div className="text-gray-600">{post.author}</div>
                      <div>
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                      <div>
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                          {post.status === 'published' ? 'Published' : 'Pending'}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">{post.date}</div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Manajemen Produk</CardTitle>
                  <CardDescription>Review dan kelola produk toko</CardDescription>
                </div>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Produk
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pendingProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="aspect-video bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-cyan-600" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">oleh {product.seller}</p>
                        <p className="text-lg font-bold text-cyan-600 mb-3">
                          Rp {product.price.toLocaleString()}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fish" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Fish className="w-5 h-5" />
                    Database Ikan Hias
                  </CardTitle>
                  <CardDescription>Kelola ensiklopedia ikan hias</CardDescription>
                </div>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Ikan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="fish-name">Nama Ikan</Label>
                  <Input id="fish-name" placeholder="Contoh: Ikan Cupang Halfmoon" />
                  
                  <div className="space-y-2">
                    <Label htmlFor="fish-category">Kategori</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="freshwater">Air Tawar</SelectItem>
                        <SelectItem value="saltwater">Air Asin</SelectItem>
                        <SelectItem value="brackish">Air Payau</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Tingkat Kesulitan</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tingkat kesulitan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Pemula</SelectItem>
                        <SelectItem value="intermediate">Menengah</SelectItem>
                        <SelectItem value="advanced">Mahir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fish-description">Deskripsi</Label>
                    <Textarea 
                      id="fish-description" 
                      placeholder="Masukkan deskripsi ikan..."
                      className="min-h-32"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="care-notes">Catatan Perawatan</Label>
                    <Textarea 
                      id="care-notes" 
                      placeholder="Tips perawatan khusus..."
                      className="min-h-20"
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Simpan Ikan Baru
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Pengaturan Sistem
                </CardTitle>
                <CardDescription>Konfigurasi umum website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Nama Website</Label>
                  <Input id="site-name" value="temanikan" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input id="tagline" value="Teman Setia Hobi Ikan Hias" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea 
                    id="description" 
                    value="Platform komprehensif untuk para hobbyist ikan hias"
                  />
                </div>

                <Button className="w-full">Simpan Pengaturan</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Statistik Sistem
                </CardTitle>
                <CardDescription>Monitor performa website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Server Status</span>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Database Status</span>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Storage Usage</span>
                    <span className="text-sm text-gray-600">2.1GB / 10GB</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Monthly Visitors</span>
                    <span className="font-medium">25,847</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Page Views</span>
                    <span className="font-medium">89,234</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}