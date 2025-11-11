import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { MessageCircle, Search } from 'lucide-react';

export function ForumSection() {
  const forumCategories = [
    {
      id: 'freshwater',
      name: 'Air Tawar',
      description: 'Diskusi seputar ikan air tawar',
      topics: 1234,
      posts: 8567,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'saltwater',
      name: 'Air Laut',
      description: 'Diskusi ikan laut dan terumbu karang',
      topics: 856,
      posts: 4321,
      color: 'from-teal-500 to-blue-500'
    },
    {
      id: 'aquascaping',
      name: 'Aquascaping',
      description: 'Seni menata akuarium dan tanaman',
      topics: 567,
      posts: 2890,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'disease',
      name: 'Konsultasi Penyakit',
      description: 'Tanya jawab masalah kesehatan ikan',
      topics: 890,
      posts: 5678,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'marketplace',
      name: 'Jual Beli',
      description: 'Jual beli ikan dan peralatan',
      topics: 2345,
      posts: 12456,
      color: 'from-orange-500 to-yellow-500'
    },
    {
      id: 'showcase',
      name: 'Pamer Akuarium',
      description: 'Pamerkan setup akuarium Anda',
      topics: 456,
      posts: 3456,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const recentTopics = [
    {
      id: 1,
      title: 'Ikan cupang saya tidak mau makan, kenapa ya?',
      author: 'BettaLover23',
      category: 'Konsultasi Penyakit',
      replies: 12,
      views: 234,
      lastReply: '2 jam lalu',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      title: 'Setup aquascape natural style untuk pemula',
      author: 'AquascapeIndo',
      category: 'Aquascaping',
      replies: 28,
      views: 567,
      lastReply: '4 jam lalu',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b8fd?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 3,
      title: 'Jual discus import berkualitas tinggi',
      author: 'DiscusMaster',
      category: 'Jual Beli',
      replies: 15,
      views: 189,
      lastReply: '6 jam lalu',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Forum Komunitas</h1>
          <p className="text-gray-600 mt-2">Bergabung dengan komunitas hobbis ikan hias di temanikan</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Cari topik diskusi..."
              className="pl-10"
            />
          </div>
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
            <MessageCircle className="w-4 h-4 mr-2" />
            Buat Topik Baru
          </Button>
        </div>
      </div>

      {/* Forum Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forumCategories.map((category) => (
          <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className={`h-2 bg-gradient-to-r ${category.color} rounded-t-lg`}></div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-cyan-700 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div>
                  <span className="font-medium">{category.topics.toLocaleString()}</span> topik
                </div>
                <div>
                  <span className="font-medium">{category.posts.toLocaleString()}</span> post
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Topics */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Topik Terbaru</h3>
        <div className="space-y-4">
          {recentTopics.map((topic) => (
            <div key={topic.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <img 
                src={topic.avatar} 
                alt={topic.author}
                className="w-10 h-10 rounded-full"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 hover:text-cyan-700 transition-colors">
                  {topic.title}
                </h4>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>oleh <strong>{topic.author}</strong></span>
                  <Badge variant="outline" className="text-xs">
                    {topic.category}
                  </Badge>
                  <span>{topic.lastReply}</span>
                </div>
              </div>
              <div className="text-right text-sm text-gray-500">
                <div>{topic.replies} balasan</div>
                <div>{topic.views} views</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default ForumSection;