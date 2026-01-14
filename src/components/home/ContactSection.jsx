import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await base44.entities.ContactInquiry.create(formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', reason: '' });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Have Questions? <span className="bg-gradient-to-r from-[#3a2efe] to-[#5d51fe] bg-clip-text text-transparent">Get in Touch!</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Whether you're looking for something specific or just browsing, we'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-2">Message Sent!</h3>
                <p className="text-slate-600 mb-6">We'll get back to you as soon as possible.</p>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="rounded-full"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-700">Name</Label>
                    <Input 
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="rounded-xl border-slate-200 focus:border-[#F5B800] focus:ring-[#F5B800]"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="rounded-xl border-slate-200 focus:border-[#F5B800] focus:ring-[#F5B800]"
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
                    className="rounded-xl border-slate-200 focus:border-[#F5B800] focus:ring-[#F5B800]"
                    placeholder="(317) 555-1234"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason" className="text-slate-700">How can we help?</Label>
                  <Textarea 
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                    required
                    rows={4}
                    className="rounded-xl border-slate-200 focus:border-[#F5B800] focus:ring-[#F5B800] resize-none"
                    placeholder="Tell us what you're looking for..."
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#F5B800] hover:bg-amber-500 text-slate-900 font-medium rounded-full py-6 shadow-lg shadow-amber-200/50"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-[#3a2efe] to-[#5d51fe] text-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
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
                    <p className="text-white/90">(317) 555-1234</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#F5B800]" />
                  </div>
                  <div>
                    <p className="font-bold mb-1">Email</p>
                    <p className="text-white/90">hello@justwithpizzazz.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#F5B800] to-[#ffcf40] rounded-3xl p-8 text-slate-900 shadow-xl">
              <h3 className="text-xl font-bold mb-3">Why No Shopping Cart?</h3>
              <p className="text-slate-900/90">
                We believe in the personal touch. Furniture is an investment, and we want to make sure 
                each piece finds the perfect home. Let's talk about what you're looking for!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}