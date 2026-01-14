import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-white">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-[#F5B800]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#3a2efe]/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68f597597c98c143a14a4d0f/d299ada7e_justwithpizzazzlogo.png"
              alt="Just with Pizzazz"
              className="h-24 md:h-32 object-contain"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Curated Furniture,
              <span className="block bg-gradient-to-r from-[#3a2efe] to-[#5d51fe] bg-clip-text text-transparent">Personal Service</span>
            </h1>
            <p className="text-lg text-slate-700 max-w-lg leading-relaxed">
              Each piece is hand-selected with care. No online checkout—just genuine conversations 
              to help you find exactly what your space needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to={createPageUrl('AvailablePieces')}
                className="inline-flex items-center justify-center gap-2 bg-[#F5B800] hover:bg-amber-500 text-slate-900 font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-amber-200/50 hover:shadow-amber-300/50"
              >
                Browse Available Pieces
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to={createPageUrl('Contact')}
                className="inline-flex items-center justify-center gap-2 border-2 border-[#3a2efe] text-[#3a2efe] hover:bg-[#3a2efe] hover:text-white font-medium px-8 py-4 rounded-full transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#F5B800]/20 to-[#1E3A5F]/10 rounded-3xl blur-2xl" />
              <img 
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
                alt="Beautiful furniture"
                className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-[#3a2efe] to-[#5d51fe] p-6 rounded-2xl shadow-xl">
                <p className="text-sm text-white/80 uppercase tracking-wider">Indianapolis</p>
                <p className="text-xl font-bold text-white">Locally Owned</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}