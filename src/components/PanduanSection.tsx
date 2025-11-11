import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Search, Heart, MessageCircle } from 'lucide-react';

export function PanduanSection() {
  const guideCategories = [
    {
      id: 'beginner',
      name: 'Panduan Pemula',
      description: 'Mulai hobi ikan hias dari nol',
      articles: 45,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'care',
      name: 'Perawatan Harian',
      description: 'Tips merawat ikan setiap hari',
      articles: 32,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'breeding',
      name: 'Breeding & Reproduksi',
      description: 'Cara mengembangbiakkan ikan',
      articles: 28,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'aquascaping',
      name: 'Aquascaping',
      description: 'Seni menata akuarium indah',
      articles: 38,
      color: 'from-teal-500 to-green-500'
    },
    {
      id: 'diy',
      name: 'DIY & Projects',
      description: 'Project buatan sendiri',
      articles: 22,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'troubleshooting',
      name: 'Problem Solving',
      description: 'Solusi masalah umum',
      articles: 35,
      color: 'from-red-500 to-pink-500'
    }
  ];

  const featuredGuides = [
    {
      id: 1,
      title: 'Panduan Lengkap Setup Akuarium Pertama',
      excerpt: 'Semua yang perlu Anda ketahui untuk memulai hobi ikan hias, dari memilih akuarium hingga ikan pertama.',
      category: 'Panduan Pemula',
      readTime: '15 menit',
      author: 'Dr. Ikan Sehat',
      publishDate: '2 hari lalu',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop',
      likes: 245,
      comments: 32
    },
    {
      id: 2,
      title: 'Teknik Aquascaping Natural Style untuk Pemula',
      excerpt: 'Pelajari cara membuat aquascape natural yang indah dengan teknik dan tanaman yang tepat.',
      category: 'Aquascaping',
      readTime: '12 menit',
      author: 'Aquascape Master',
      publishDate: '4 hari lalu',
      image: 'https://images.unsplash.com/photo-1646022112212-3538b61f74dc?w=400&h=250&fit=crop',
      likes: 189,
      comments: 28
    },
    {
      id: 3,
      title: 'Cara Breeding Ikan Cupang yang Benar',
      excerpt: 'Step by step mengembangbiakkan ikan cupang dari persiapan hingga merawat burayak.',
      category: 'Breeding & Reproduksi',
      readTime: '20 menit',
      author: 'Betta Breeder Pro',
      publishDate: '1 minggu lalu',
      image: 'https://images.unsplash.com/photo-1728659328144-9b652a7acf3b?w=400&h=250&fit=crop',
      likes: 312,
      comments: 45
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panduan Perawatan & Artikel</h1>
          <p className="text-gray-600 mt-2">Tips, tricks, dan panduan lengkap dari para ahli</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Cari panduan atau artikel..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Guide Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guideCategories.map((category) => (
          <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className={`h-2 bg-gradient-to-r ${category.color} rounded-t-lg`}></div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-cyan-700 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {category.articles} artikel
                </Badge>
                <div className="text-cyan-600 group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Featured Guides */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Artikel Unggulan</h2>
        
        <div className="space-y-6">
          {featuredGuides.map((guide) => (
            <Card key={guide.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="aspect-video md:aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={guide.image}
                      alt={guide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                
                <div className="p-6 md:w-2/3 space-y-4">
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {guide.category}
                    </Badge>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-cyan-700 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">
                      {guide.excerpt}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>oleh {guide.author}</span>
                      <span>{guide.readTime}</span>
                      <span>{guide.publishDate}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{guide.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{guide.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PanduanSection;