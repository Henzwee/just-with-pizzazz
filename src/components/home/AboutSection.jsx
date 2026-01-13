import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Heart, Sparkles, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  const features = [
    {
      icon: Heart,
      title: "Hand-Selected",
      description: "Every piece is carefully chosen for quality, character, and style."
    },
    {
      icon: Users,
      title: "Personal Touch",
      description: "No automated checkouts—just real conversations to find your perfect piece."
    },
    {
      icon: Sparkles,
      title: "Unique Finds",
      description: "One-of-a-kind furniture that brings character to your space."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[#1E3A5F] to-[#162d4a] text-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B800]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
              Give Your Home
              <span className="block font-semibold text-[#F5B800]">Some Pizzazz</span>
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-8">
              We believe furniture shopping should be personal. That's why we don't have an 
              "Add to Cart" button—instead, we have conversations. Tell us about your space, 
              your style, and what you're looking for. We'll help you find the perfect piece 
              that makes your house feel like home.
            </p>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[#F5B800]/20 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-[#F5B800]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-blue-200 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400"
                alt="Living room furniture"
                className="rounded-2xl w-full aspect-[3/4] object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=400"
                alt="Modern interior"
                className="rounded-2xl w-full aspect-[3/4] object-cover mt-8"
              />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white text-slate-800 px-6 py-4 rounded-xl shadow-xl">
              <p className="font-semibold text-center">Serving Indianapolis & Beyond</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}