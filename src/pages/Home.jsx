import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import HeroSection from '@/components/home/HeroSection';
import FeaturedPieces from '@/components/home/FeaturedPieces';
import AboutSection from '@/components/home/AboutSection';
import ContactSection from '@/components/home/ContactSection';

export default function Home() {
  const { data: pieces } = useQuery({
    queryKey: ['furniture-pieces'],
    queryFn: () => base44.entities.FurniturePiece.list(),
    initialData: []
  });

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedPieces pieces={pieces} />
      <AboutSection />
      <ContactSection />
    </div>
  );
}