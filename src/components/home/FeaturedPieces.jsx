import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturedPieces({ pieces }) {
  const availablePieces = pieces?.filter(p => p.status === 'available')?.slice(0, 3) || [];

  if (availablePieces.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Available <span className="bg-gradient-to-r from-[#F5B800] to-[#ffcf40] bg-clip-text text-transparent">Pieces</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Unique furniture ready for their new home. Interested? Just reach out—we'd love to chat.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {availablePieces.map((piece, index) => (
            <motion.div
              key={piece.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-slate-100 aspect-[4/3] mb-4">
                <img 
                  src={piece.image_url || 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600'}
                  alt={piece.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="font-semibold text-[#3a2efe]">${piece.price?.toLocaleString()}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{piece.name}</h3>
              {piece.dimensions && (
                <p className="text-sm text-slate-500 mb-3">{piece.dimensions}</p>
              )}
              <Link 
                to={createPageUrl(`Product?id=${piece.id}`)}
                className="inline-flex items-center gap-2 text-[#3a2efe] hover:text-[#F5B800] font-medium transition-colors"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to={createPageUrl('AvailablePieces')}
            className="inline-flex items-center gap-2 border-2 border-slate-300 hover:border-[#3a2efe] text-slate-700 hover:text-[#3a2efe] px-8 py-4 rounded-full font-medium transition-all duration-300"
          >
            See All Available Stock
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}