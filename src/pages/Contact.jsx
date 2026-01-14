import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Send, CheckCircle, MessageCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';

export default function Contact() {
  const urlParams = new URLSearchParams(window.location.search);
  const pieceId = urlParams.get('piece');
  const pieceName = urlParams.get('name');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (pieceName) {
      setFormData(prev => ({
        ...prev,
        reason: `Hi! I'm interested in the "${decodeURIComponent(pieceName)}". Is it still available?\n\n`
      }));
    }
  }, [pieceName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await base44.entities.ContactInquiry.create({
      ...formData,
      furniture_piece_id: pieceId || null
    });
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

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
              Get in <span className="text-[#F5B800]">Touch</span>
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto">
              Questions about a piece? Looking for something specific? We're here to help.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          {pieceName && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Link 
                to={createPageUrl('AvailablePieces')}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-[#3a2efe] mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Available Pieces
              </Link>
              <div className="bg-[#F5B800]/10 border border-[#F5B800]/30 rounded-2xl p-4 flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-[#F5B800]" />
                <p className="text-slate-700">
                  Inquiring about: <span className="font-semibold">{decodeURIComponent(pieceName)}</span>
                </p>
              </div>
            </motion.div>
          )}

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-800 mb-2">Message Sent!</h3>
                    <p className="text-slate-600 mb-8">
                      Thanks for reaching out! We'll get back to you as soon as possible.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: '', email: '', phone: '', reason: '' });
                        }}
                        variant="outline"
                        className="rounded-full"
                      >
                        Send Another Message
                      </Button>
                      <Link 
                        to={createPageUrl('AvailablePieces')}
                        className="inline-flex items-center justify-center gap-2 bg-[#3a2efe] hover:bg-[#2a1fd8] text-white px-6 py-2 rounded-full font-medium transition-colors"
                      >
                        Browse More Pieces
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold text-slate-800 mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-slate-700">Name *</Label>
                          <Input 
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                            className="rounded-xl border-slate-200 focus:border-[#F5B800] focus:ring-[#F5B800] h-12"
                            placeholder="Your name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-slate-700">Email *</Label>
                          <Input 
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                            className="rounded-xl border-slate-200 focus:border-[#F5B800] focus:ring-[#F5B800] h-12"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-slate-700">Phone (Optional)</Label>
                        <Input 
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="rounded-xl border-slate-200 focus:border-[#F5B800] focus:ring-[#F5B800] h-12"
                          placeholder="(317) 555-1234"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reason" className="text-slate-700">Message *</Label>
                        <Textarea 
                          id="reason"
                          value={formData.reason}
                          onChange={(e) => setFormData({...formData, reason: e.target.value})}
                          required
                          rows={6}
                          className="rounded-xl border-slate-200 focus:border-[#F5B800] focus:ring-[#F5B800] resize-none"
                          placeholder="Tell us what you're looking for, ask about a specific piece, or just say hello..."
                        />
                      </div>
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-[#F5B800] hover:bg-amber-500 text-slate-900 font-medium rounded-full py-6 text-lg shadow-lg shadow-amber-200/50"
                      >
                        {isSubmitting ? (
                          'Sending...'
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-gradient-to-br from-[#3a2efe] to-[#5d51fe] text-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#F5B800]" />
                    </div>
                    <div>
                      <p className="font-bold mb-1">Location</p>
                      <p className="text-white/90">Indianapolis, IN</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#F5B800]" />
                    </div>
                    <div>
                      <p className="font-bold mb-1">Phone</p>
                      <a href="tel:3175551234" className="text-white/90 hover:text-white transition-colors">
                        (317) 555-1234
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#F5B800]" />
                    </div>
                    <div>
                      <p className="font-bold mb-1">Email</p>
                      <a href="mailto:hello@justwithpizzazz.com" className="text-white/90 hover:text-white transition-colors">
                        hello@justwithpizzazz.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#F5B800] to-[#ffcf40] rounded-3xl p-8 text-slate-900 shadow-xl">
                <h3 className="text-xl font-bold mb-3">The Personal Touch</h3>
                <p className="text-slate-900/90">
                  Every piece of furniture has a story, and we want to make sure yours finds the perfect home. 
                  That's why we take the time to chat with each customer personally.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Response Time</h3>
                <p className="text-slate-600 text-sm">
                  We typically respond within 24 hours. For urgent inquiries, give us a call!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}