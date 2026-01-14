import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { MessageCircle, Filter, Grid, LayoutList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';

export default function AvailablePieces() {
  const [category, setCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const { data: pieces, isLoading } = useQuery({
    queryKey: ['furniture-pieces'],
    queryFn: () => base44.entities.FurniturePiece.list(),
    initialData: []
  });

  const availablePieces = pieces.filter(p => p.status === 'available');
  const filteredPieces = category === 'all' 
    ? availablePieces 
    : availablePieces.filter(p => p.category === category);

  const categories = ['all', 'table', 'chair', 'sofa', 'cabinet', 'decor', 'other'];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3a2efe] to-[#2a1fd8] py-20 text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Available <span className="font-semibold text-[#F5B800]">Pieces</span>
            </h1>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Browse our current collection. Found something you love? Get in touch—we'd love to help.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-slate-200 py-4">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-slate-500" />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-40 rounded-full border-slate-200">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm text-slate-500">
                {filteredPieces.length} piece{filteredPieces.length !== 1 ? 's' : ''} available
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                size="icon"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-[#3a2efe]' : ''}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'ghost'} 
                size="icon"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-[#3a2efe]' : ''}
              >
                <LayoutList className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 py-12">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                <div className="bg-slate-200 aspect-[4/3] rounded-xl mb-4" />
                <div className="bg-slate-200 h-6 w-3/4 rounded mb-2" />
                <div className="bg-slate-200 h-4 w-1/2 rounded" />
              </div>
            ))}
          </div>
        ) : filteredPieces.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No pieces found</h3>
            <p className="text-slate-500 mb-6">
              {category !== 'all' ? 'Try a different category or ' : ''}Check back soon for new arrivals!
            </p>
            <Link 
              to={createPageUrl('Contact')}
              className="inline-flex items-center gap-2 text-[#3a2efe] font-medium hover:text-[#F5B800] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Looking for something specific? Let us know!
            </Link>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPieces.map((piece, index) => (
                  <motion.div
                    key={piece.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow"
                  >
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img 
                        src={piece.image_url || 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600'}
                        alt={piece.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                        <span className="font-bold text-[#3a2efe]">${piece.price?.toLocaleString()}</span>
                      </div>
                      {piece.category && (
                        <div className="absolute top-4 left-4 bg-[#3a2efe]/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-xs text-white uppercase tracking-wider">{piece.category}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">{piece.name}</h3>
                      {piece.dimensions && (
                        <p className="text-sm text-slate-500 mb-2">{piece.dimensions}</p>
                      )}
                      {piece.description && (
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{piece.description}</p>
                      )}
                      <Link 
                        to={createPageUrl(`Contact?piece=${piece.id}&name=${encodeURIComponent(piece.name)}`)}
                        className="inline-flex items-center gap-2 bg-[#F5B800] hover:bg-amber-500 text-slate-900 px-6 py-3 rounded-full font-medium transition-colors w-full justify-center"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Check Availability
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {filteredPieces.map((piece, index) => (
                  <motion.div
                    key={piece.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 flex flex-col md:flex-row"
                  >
                    <div className="md:w-64 h-48 md:h-auto flex-shrink-0">
                      <img 
                        src={piece.image_url || 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600'}
                        alt={piece.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold text-slate-800">{piece.name}</h3>
                          <span className="font-bold text-[#3a2efe] text-lg">${piece.price?.toLocaleString()}</span>
                        </div>
                        {piece.category && (
                          <span className="inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-2">
                            {piece.category}
                          </span>
                        )}
                        {piece.dimensions && (
                          <p className="text-sm text-slate-500 mb-2">{piece.dimensions}</p>
                        )}
                        {piece.description && (
                          <p className="text-slate-600 text-sm">{piece.description}</p>
                        )}
                      </div>
                      <div className="mt-4">
                        <Link 
                          to={createPageUrl(`Contact?piece=${piece.id}&name=${encodeURIComponent(piece.name)}`)}
                          className="inline-flex items-center gap-2 bg-[#F5B800] hover:bg-amber-500 text-slate-900 px-6 py-3 rounded-full font-medium transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Check Availability
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}