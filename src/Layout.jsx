import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', page: 'Home' },
    { name: 'Available Pieces', page: 'AvailablePieces' },
    { name: 'Past Pieces', page: 'PastPieces' },
    { name: 'Contact', page: 'Contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#3a2efe] text-white py-2 text-sm hidden md:block">
        <div className="container mx-auto px-6 lg:px-12 flex justify-end items-center gap-6">
          <a href="tel:3175551234" className="flex items-center gap-2 hover:text-[#F5B800] transition-colors">
            <Phone className="w-4 h-4" />
            (317) 555-1234
          </a>
          <a href="mailto:hello@justwithpizzazz.com" className="flex items-center gap-2 hover:text-[#F5B800] transition-colors">
            <Mail className="w-4 h-4" />
            hello@justwithpizzazz.com
          </a>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex-shrink-0">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68f597597c98c143a14a4d0f/d299ada7e_justwithpizzazzlogo.png"
                alt="Just with Pizzazz"
                className="h-12 md:h-14 object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link 
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`font-medium transition-colors ${
                    currentPageName === link.page 
                      ? 'text-[#F5B800]' 
                      : 'text-slate-700 hover:text-[#3a2efe]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to={createPageUrl('Contact')}
                className="bg-[#F5B800] hover:bg-amber-500 text-slate-900 font-medium px-6 py-3 rounded-full transition-colors"
              >
                Get in Touch
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-700" />
              ) : (
                <Menu className="w-6 h-6 text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t overflow-hidden"
            >
              <div className="container mx-auto px-6 py-4 space-y-4">
                {navLinks.map(link => (
                  <Link 
                    key={link.page}
                    to={createPageUrl(link.page)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 font-medium ${
                      currentPageName === link.page 
                        ? 'text-[#F5B800]' 
                        : 'text-slate-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t space-y-3">
                  <a href="tel:3175551234" className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-4 h-4" />
                    (317) 555-1234
                  </a>
                  <a href="mailto:hello@justwithpizzazz.com" className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-4 h-4" />
                    hello@justwithpizzazz.com
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#3a2efe] text-white">
        <div className="container mx-auto px-6 lg:px-12 py-12">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68f597597c98c143a14a4d0f/d299ada7e_justwithpizzazzlogo.png"
                alt="Just with Pizzazz"
                className="h-16 object-contain mb-4 brightness-0 invert"
              />
              <p className="text-blue-200 text-sm">
                Curated furniture with a personal touch. Serving Indianapolis and beyond.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {navLinks.map(link => (
                  <Link 
                    key={link.page}
                    to={createPageUrl(link.page)}
                    className="block text-blue-200 hover:text-[#F5B800] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-blue-200 text-sm">
                <p>Indianapolis, IN</p>
                <p>(317) 555-1234</p>
                <p>hello@justwithpizzazz.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-300 text-sm">
            <p>© {new Date().getFullYear()} Just with Pizzazz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}