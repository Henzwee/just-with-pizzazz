import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, MessageCircle, Package, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function Product() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  const { data: product, isLoading } = useQuery({
    queryKey: ['furniture-piece', productId],
    queryFn: async () => {
      const pieces = await base44.entities.FurniturePiece.list();
      return pieces.find(p => p.id === productId);
    },
    enabled: !!productId
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3a2efe] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Product Not Found</h2>
          <Link 
            to={createPageUrl('AvailablePieces')}
            className="inline-flex items-center gap-2 text-[#3a2efe] hover:text-[#F5B800]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Available Pieces
          </Link>
        </div>
      </div>
    );
  }

  const stockStatus = product.status === 'available' ? 1 : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <Link 
            to={createPageUrl('AvailablePieces')}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-[#3a2efe] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Available Pieces
          </Link>
        </div>
      </div>

      {/* Product Content */}
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="relative rounded-3xl overflow-hidden bg-slate-100 aspect-square shadow-2xl">
              <img 
                src={product.image_url || 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.status === 'available' && (
                <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                  In Stock
                </div>
              )}
              {product.status === 'sold' && (
                <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                  Sold
                </div>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-4">
              {product.category && (
                <span className="inline-block bg-[#3a2efe]/10 text-[#3a2efe] px-4 py-1 rounded-full text-sm font-medium uppercase tracking-wider">
                  {product.category}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {product.name}
            </h1>

            <div className="text-5xl font-bold text-[#3a2efe] mb-8">
              ${product.price?.toLocaleString()}
            </div>

            {product.dimensions && (
              <div className="mb-6 pb-6 border-b">
                <p className="text-slate-500 text-sm uppercase tracking-wider mb-2">Dimensions</p>
                <p className="text-lg text-slate-800 font-medium">{product.dimensions}</p>
              </div>
            )}

            <div className="mb-6 pb-6 border-b">
              <p className="text-slate-500 text-sm uppercase tracking-wider mb-2">Availability</p>
              <div className="flex items-center gap-2">
                <Package className={`w-5 h-5 ${stockStatus > 0 ? 'text-green-600' : 'text-red-600'}`} />
                <span className="text-lg font-semibold text-slate-800">
                  {stockStatus > 0 ? `${stockStatus} in stock` : 'Sold'}
                </span>
              </div>
            </div>

            {product.description && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Description</h3>
                <p className="text-slate-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Contact CTA */}
            <div className="space-y-4">
              <Link 
                to={createPageUrl(`Contact?piece=${product.id}&name=${encodeURIComponent(product.name)}`)}
                className="block"
              >
                <Button className="w-full bg-[#F5B800] hover:bg-[#ffcf40] text-slate-900 font-bold text-lg py-7 rounded-full shadow-xl">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Inquire About This Piece
                </Button>
              </Link>

              {/* Why No Cart */}
              <div className="bg-gradient-to-br from-[#3a2efe] to-[#5d51fe] rounded-2xl p-6 text-white">
                <div className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-[#F5B800] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-2">Why No "Add to Cart"?</h4>
                    <p className="text-white/90 text-sm">
                      At Just with Pizzazz, we believe every piece deserves a personal conversation. 
                      We want to make sure this furniture is the perfect fit for your space and style. 
                      Let's chat!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}