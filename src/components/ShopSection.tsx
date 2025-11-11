import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Search, Filter, Heart, Star, ShoppingBag } from 'lucide-react';

export function ShopSection() {
  const productCategories = [
    { id: 'robot', name: 'Robot Pembersih', count: 24, icon: '🤖' },
    { id: 'sensor', name: 'Sensor IoT', count: 18, icon: '📡' },
    { id: 'filter', name: 'Sistem Filter', count: 32, icon: '⚙️' },
    { id: 'feeder', name: 'Auto Feeder', count: 15, icon: '🔄' },
    { id: 'light', name: 'Lampu LED', count: 28, icon: '💡' },
    { id: 'controller', name: 'Controller', count: 12, icon: '🎮' }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Robot Pembersih Akuarium AquaClean Pro',
      category: 'Robot Pembersih',
      price: 2500000,
      originalPrice: 3000000,
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1712512161600-cd767fcc37a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcXVhcml1bSUyMHJvYm90JTIwY2xlYW5lcnxlbnwxfHx8fDE3NjI4NTA4OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Sensor IoT Water Quality Monitor',
      category: 'Sensor IoT',
      price: 1200000,
      rating: 4.8,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1749570464328-52731ce35063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcXVhcml1bSUyMHNlbnNvciUyMGRldmljZXxlbnwxfHx8fDE3NjI4NTA4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      badge: 'Terbaru'
    },
    {
      id: 3,
      name: 'Sistem Filter Canister Advanced',
      category: 'Sistem Filter',
      price: 1800000,
      originalPrice: 2200000,
      rating: 4.7,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1628859266125-8dc2adef1416?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGZpbHRlciUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjI4NTA4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      badge: 'Diskon'
    },
    {
      id: 4,
      name: 'Auto Feeder Smart WiFi',
      category: 'Auto Feeder',
      price: 850000,
      rating: 4.6,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1655435252195-037f716ba6c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0aWMlMjBmaXNoJTIwZmVlZGVyfGVufDF8fHx8MTc2Mjg1MDg5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">E-Commerce Robotik Akuarium</h1>
          <p className="text-gray-600 mt-2">Peralatan robotik dan IoT untuk akuarium modern Anda</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Cari produk..."
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {productCategories.map((category) => (
          <Card key={category.id} className="p-4 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <div className="text-3xl mb-2">{category.icon}</div>
            <h3 className="font-medium text-gray-900 group-hover:text-cyan-700 transition-colors text-sm">
              {category.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{category.count} produk</p>
          </Card>
        ))}
      </div>

      {/* Featured Products */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Produk Unggulan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="aspect-square relative overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  {product.badge && (
                    <Badge className={`text-xs ${
                      product.badge === 'Best Seller' ? 'bg-orange-500 text-white' :
                      product.badge === 'Terbaru' ? 'bg-blue-500 text-white' :
                      'bg-green-500 text-white'
                    }`}>
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <Badge variant="outline" className="text-xs mb-2">
                    {product.category}
                  </Badge>
                  <h3 className="font-medium text-gray-900 group-hover:text-cyan-700 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-semibold text-lg text-gray-900">
                      Rp {product.price.toLocaleString()}
                    </div>
                    {product.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        Rp {product.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    Beli
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShopSection;