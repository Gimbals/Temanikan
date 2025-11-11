import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Book, MessageCircle, Stethoscope, ShoppingBag, Fish, Heart, Star, TrendingUp, ArrowRight, Users, Calendar, Activity } from 'lucide-react';
import { AdminLoginInfo } from './AdminLoginInfo';

interface HomepageProps {
  onSectionChange: (section: string) => void;
  onLoginClick?: () => void;
}

export function Homepage({ onSectionChange, onLoginClick }: HomepageProps) {
  const quickAccessButtons = [
    {
      id: 'ensiklopedia',
      title: 'Fishpedia',
      description: 'Database lengkap spesies ikan hias',
      icon: Book,
      color: 'from-blue-500 to-cyan-500',
      stats: '500+ Spesies'
    },
    {
      id: 'monitoring',
      title: 'Monitoring IoT',
      description: 'Pantau akuarium real-time',
      icon: Activity,
      color: 'from-cyan-500 to-teal-500',
      stats: 'Real-time',
      badge: 'IoT'
    },
    {
      id: 'diagnosa',
      title: 'Diagnosa AI',
      description: 'Deteksi penyakit ikan otomatis',
      icon: Stethoscope,
      color: 'from-purple-500 to-pink-500',
      stats: 'YOLOv8',
      badge: 'AI'
    },
    {
      id: 'forum',
      title: 'Komunitas',
      description: 'Diskusi dengan sesama hobbis',
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-500',
      stats: '12K+ Member'
    },
    {
      id: 'shop',
      title: 'E-Commerce',
      description: 'Robotik & peralatan akuarium',
      icon: ShoppingBag,
      color: 'from-orange-500 to-red-500',
      stats: '500+ Produk'
    }
  ];

  const featuredArticles = [
    {
      id: 1,
      title: 'Cara Merawat Ikan Cupang untuk Pemula',
      category: 'Panduan Pemula',
      image: 'https://images.unsplash.com/photo-1728659328144-9b652a7acf3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXR0YSUyMGZpc2glMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc1NzkyMjYwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      author: 'Dr. Ikan Sehat',
      readTime: '5 menit',
      likes: 245
    },
    {
      id: 2,
      title: 'Aquascaping: Seni Menata Akuarium',
      category: 'Desain Akuarium',
      image: 'https://images.unsplash.com/photo-1646022112212-3538b61f74dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcXVhcml1bSUyMHBsYW50cyUyMGRlY29yYXRpb258ZW58MXx8fHwxNzU3OTIyNjA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      author: 'Aquascape Indo',
      readTime: '8 menit',
      likes: 189
    },
    {
      id: 3,
      title: 'Mengatasi Penyakit Bintik Putih pada Ikan',
      category: 'Kesehatan Ikan',
      image: 'https://images.unsplash.com/photo-1744366071536-7c0c536962a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHRyb3BpY2FsJTIwZmlzaCUyMGFxdWFyaXVtfGVufDF8fHx8MTc1NzkyMjU5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      author: 'Fish Health Pro',
      readTime: '6 menit',
      likes: 312
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600 via-blue-600 to-teal-700 text-white shadow-2xl">
        <div className="relative z-10 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  🐠 Platform Edukasi, Komunitas & Monitoring Ikan Hias
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  temanikan
                  <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Teman Setia Hobi Ikan Hias
                  </span>
                </h1>
                <p className="text-xl text-cyan-100 leading-relaxed">
                  Platform edukasi, komunitas, dan monitoring ikan hias berbasis Machine Learning dan IoT. Dari Fishpedia hingga AI diagnosis untuk ikan kesayangan Anda.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-white text-cyan-700 hover:bg-cyan-50 font-semibold px-8 py-3 rounded-xl shadow-lg"
                  onClick={() => onSectionChange('ensiklopedia')}
                >
                  <Book className="w-5 h-5 mr-2" />
                  Jelajahi Ensiklopedia
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 rounded-xl"
                  onClick={() => onSectionChange('diagnosa')}
                >
                  <Stethoscope className="w-5 h-5 mr-2" />
                  Coba Diagnosis AI
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-300" />
                  <span className="text-cyan-200">15K+ Hobbis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Fish className="w-5 h-5 text-cyan-300" />
                  <span className="text-cyan-200">500+ Spesies</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-cyan-300" />
                  <span className="text-cyan-200">4.9 Rating</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1744366071536-7c0c536962a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHRyb3BpY2FsJTIwZmlzaCUyMGFxdWFyaXVtfGVufDF8fHx8MTc1NzkyMjU5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Beautiful tropical fish aquarium"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                    <p className="text-white font-medium">Akuarium Tropis Premium</p>
                    <p className="text-cyan-200 text-sm">12 spesies • pH 7.2 • 26°C</p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-yellow-300 rounded-full blur-2xl"></div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Akses Cepat</h2>
          <p className="text-gray-600">Temukan semua yang Anda butuhkan untuk hobi ikan hias</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {quickAccessButtons.map((button) => {
            const Icon = button.icon;
            return (
              <Card 
                key={button.id}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                onClick={() => onSectionChange(button.id)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${button.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                <div className="relative p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${button.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {button.badge && (
                      <Badge className="bg-orange-100 text-orange-700 text-xs">
                        {button.badge}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-cyan-700 transition-colors">
                      {button.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {button.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Badge variant="secondary" className="text-xs">
                      {button.stats}
                    </Badge>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Featured Articles */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Artikel Unggulan</h2>
            <p className="text-gray-600 mt-1">Tips dan panduan terbaru dari para ahli</p>
          </div>
          <Button 
            variant="outline" 
            className="hidden sm:flex items-center gap-2"
            onClick={() => onSectionChange('panduan')}
          >
            Lihat Semua
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <Card key={article.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white/90 text-gray-700 text-xs">
                    {article.category}
                  </Badge>
                </div>
              </div>
              
              <div className="p-5 space-y-3">
                <h3 className="font-semibold text-lg leading-tight group-hover:text-cyan-700 transition-colors">
                  {article.title}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>{article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{article.likes}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Community Stats */}
      <section className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-8 border border-cyan-100">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Bergabung dengan Komunitas</h2>
            <p className="text-gray-600">Ribuan hobbis ikan hias sudah mempercayai temanikan</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-cyan-600">15K+</div>
              <div className="text-gray-600">Member Aktif</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Spesies Ikan</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-teal-600">2K+</div>
              <div className="text-gray-600">Artikel & Panduan</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-600">98%</div>
              <div className="text-gray-600">Kepuasan User</div>
            </div>
          </div>

          <Button 
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl shadow-lg"
            onClick={() => onSectionChange('forum')}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Gabung Forum Sekarang
          </Button>
        </div>
      </section>

      {/* Developer Info - Admin Access */}
      {onLoginClick && (
        <section className="space-y-6">
          <AdminLoginInfo onLoginClick={onLoginClick} />
        </section>
      )}
    </div>
  );
}