import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PastPieces() {
  const { data: pieces, isLoading } = useQuery({
    queryKey: ['furniture-pieces'],
    queryFn: () => base44.entities.FurniturePiece.list(),
    initialData: []
  });

  const soldPieces = pieces.filter(p => p.status === 'sold');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3a2efe] via-[#4d3dfe] to-[#5d51fe] py-20 text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Past <span className="text-[#F5B800]">Pieces</span>
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto">
              A gallery of furniture that found their forever homes. See our style and quality.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 py-12">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                <div className="bg-slate-200 aspect-square rounded-xl mb-4" />
                <div className="bg-slate-200 h-5 w-3/4 rounded" />
              </div>
            ))}
          </div>
        ) : soldPieces.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Gallery Coming Soon</h3>
            <p className="text-slate-500 mb-6">Check back to see our past pieces and get inspired!</p>
            <Link 
              to={createPageUrl('AvailablePieces')}
              className="inline-flex items-center gap-2 bg-[#F5B800] hover:bg-amber-500 text-slate-900 px-6 py-3 rounded-full font-medium transition-colors"
            >
              Browse Available Pieces
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {soldPieces.map((piece, index) => (
                <motion.div
                  key={piece.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative"
                >
                  <div className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-200/50">
                    <div className="relative aspect-square overflow-hidden">
                      <img 
                        src={piece.image_url || 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600'}
                        alt={piece.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[30%]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-lg">{piece.name}</h3>
                        {piece.category && (
                          <span className="text-white/80 text-sm capitalize">{piece.category}</span>
                        )}
                      </div>
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Sold
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="bg-white rounded-3xl p-8 max-w-2xl mx-auto shadow-xl shadow-slate-200/50">
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                  See Something You Like?
                </h3>
                <p className="text-slate-600 mb-6">
                  While these pieces have found new homes, we're always sourcing similar styles. 
                  Tell us what catches your eye!
                </p>
                <Link 
                  to={createPageUrl('Contact')}
                  className="inline-flex items-center gap-2 bg-[#F5B800] hover:bg-amber-500 text-slate-900 px-8 py-4 rounded-full font-medium transition-colors"
                >
                  Get in Touch
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}