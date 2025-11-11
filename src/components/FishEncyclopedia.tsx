import React, { useState, useMemo } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Search, Filter, Heart, Eye, MapPin } from 'lucide-react';

export function FishEncyclopedia() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const fishData = useMemo(() => [
    {
      id: 1,
      name: 'Ikan Cupang Crown Tail',
      scientificName: 'Betta splendens',
      category: 'Air Tawar',
      difficulty: 'Pemula',
      size: '5-7 cm',
      temperature: '24-28°C',
      ph: '6.5-7.5',
      origin: 'Thailand',
      image: 'https://images.unsplash.com/photo-1728659328144-9b652a7acf3b?w=300&h=300&fit=crop',
      description: 'Ikan cupang dengan sirip yang menyerupai mahkota, mudah dipelihara dan cocok untuk pemula.',
      lifespan: '2-3 tahun',
      tankSize: '10-20 liter',
      compatibility: 'Soliter'
    },
    {
      id: 2,
      name: 'Ikan Neon Tetra',
      scientificName: 'Paracheirodon innesi',
      category: 'Air Tawar',
      difficulty: 'Pemula',
      size: '2-3 cm',
      temperature: '22-26°C',
      ph: '6.0-7.0',
      origin: 'Amerika Selatan',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=300&fit=crop',
      description: 'Ikan kecil berwarna biru dan merah yang hidup berkelompok.',
      lifespan: '3-5 tahun',
      tankSize: '40+ liter',
      compatibility: 'Kelompok'
    },
    {
      id: 3,
      name: 'Ikan Discus',
      scientificName: 'Symphysodon',
      category: 'Air Tawar',
      difficulty: 'Mahir',
      size: '15-20 cm',
      temperature: '26-30°C',
      ph: '6.0-6.5',
      origin: 'Amazon',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=300&h=300&fit=crop',
      description: 'Raja ikan hias air tawar dengan bentuk pipih dan warna yang indah.',
      lifespan: '10-15 tahun',
      tankSize: '200+ liter',
      compatibility: 'Damai'
    }
  ], []);

  const categories = ['all', 'Air Tawar', 'Air Laut', 'Air Payau'];
  const difficulties = ['all', 'Pemula', 'Menengah', 'Mahir'];

  const filteredFish = useMemo(() => {
    return fishData.filter(fish => {
      const matchesSearch = fish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          fish.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || fish.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || fish.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [fishData, searchTerm, selectedCategory, selectedDifficulty]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Pemula': return 'bg-green-500';
      case 'Menengah': return 'bg-yellow-500';
      case 'Mahir': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fish-Pedia</h1>
        <p className="text-gray-600 mt-2">Ensiklopedia lengkap ikan hias untuk hobbis</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Cari nama ikan atau nama ilmiah..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Semua Kategori' : cat}
              </option>
            ))}
          </select>
          
          <select 
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            {difficulties.map(diff => (
              <option key={diff} value={diff}>
                {diff === 'all' ? 'Semua Level' : diff}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600">
        Menampilkan {filteredFish.length} dari {fishData.length} spesies ikan
      </div>

      {/* Fish Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFish.map((fish) => (
          <Card key={fish.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className="aspect-square relative overflow-hidden">
              <ImageWithFallback
                src={fish.image}
                alt={fish.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge className={`${getDifficultyColor(fish.difficulty)} text-white text-xs`}>
                  {fish.difficulty}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-cyan-700 transition-colors">
                  {fish.name}
                </h3>
                <p className="text-sm text-gray-500 italic">{fish.scientificName}</p>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{fish.origin}</span>
                <Badge variant="outline" className="ml-auto text-xs">
                  {fish.category}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2">
                {fish.description}
              </p>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                <div>Ukuran: {fish.size}</div>
                <div>Suhu: {fish.temperature}</div>
                <div>pH: {fish.ph}</div>
                <div>Umur: {fish.lifespan}</div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                <Eye className="w-4 h-4 mr-2" />
                Lihat Detail
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredFish.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">🐠</div>
          <p className="text-gray-500">Tidak ditemukan ikan yang sesuai dengan pencarian</p>
        </div>
      )}
    </div>
  );
}

export default FishEncyclopedia;