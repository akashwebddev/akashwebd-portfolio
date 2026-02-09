'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MessageCircle, MapPin } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

interface FormData {
  name: string;
  telegram: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    telegram: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });

  const { playSuccess, playClick } = useSound();

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'hello@akashwebd.com',
      href: 'mailto:hello@akashwebd.com',
    },
    {
      icon: <MessageCircle size={24} />,
      label: 'Telegram',
      value: '@akashwebd',
      href: 'https://t.me/akashwebd',
    },
    {
      icon: <MapPin size={24} />,
      label: 'Location',
      value: 'India',
      href: '#',
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending...' });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      playSuccess();

      setStatus({
        type: 'success',
        message: '[OK] Message sent successfully! I\'ll get back to you soon.',
      });

      setFormData({ name: '', telegram: '', subject: '', message: '' });

      setTimeout(() => {
        setStatus({ type: 'idle', message: '' });
      }, 5000);
    } catch (error) {
      setStatus({
        type: 'error',
        message: '✗ Failed to send message. Please try again.',
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="hex-grid absolute inset-0" />

      <motion.div
        className="max-w-5xl mx-auto relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-mono mb-6">
            <span className="section-title">OPEN CHANNEL</span>
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto" />
          <p className="text-gray-400 mt-6 text-lg">
            Have a project in mind? Let's collaborate and create something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 lg:col-span-1"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                className="glass-effect border border-cyan-400/30 rounded-lg p-6 hover:glow-box transition-all group"
              >
                <div className="text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wide mb-1">
                  {info.label}
                </div>
                <div className="text-white font-semibold">{info.value}</div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="lg:col-span-2 glass-effect-strong border border-cyan-400/30 rounded-xl p-8"
          >
            <div className="space-y-6">
              {/* Name Input */}
              <motion.div whileHover={{ y: -2 }}>
                <label className="block text-sm font-mono text-cyan-400 mb-2">
                  Name <span className="text-pink-400 text-xs">(Real Name Only)</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your real name"
                  pattern="^[a-zA-Z\s\-']+$"
                  title="Please enter a valid name (letters, spaces, hyphens, and apostrophes only)"
                  className="w-full bg-black/30 border border-cyan-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-400 focus:outline-none focus:glow-box transition-all"
                />
              </motion.div>

              {/* Telegram Input */}
              <motion.div whileHover={{ y: -2 }}>
                <label className="block text-sm font-mono text-cyan-400 mb-2">
                  What's up <span className="text-pink-400 text-xs">/ Telegram</span>
                </label>
                <input
                  type="text"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleChange}
                  required
                  placeholder="Your Telegram handle (@username) or phone"
                  className="w-full bg-black/30 border border-cyan-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-400 focus:outline-none focus:glow-box transition-all"
                />
              </motion.div>

              {/* Subject Input */}
              <motion.div whileHover={{ y: -2 }}>
                <label className="block text-sm font-mono text-cyan-400 mb-2">
                  Subject <span className="text-pink-400 text-xs">(What you want)</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project inquiry"
                  className="w-full bg-black/30 border border-cyan-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-400 focus:outline-none focus:glow-box transition-all"
                />
              </motion.div>

              {/* Message Input */}
              <motion.div whileHover={{ y: -2 }}>
                <label className="block text-sm font-mono text-cyan-400 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="w-full bg-black/30 border border-cyan-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-400 focus:outline-none focus:glow-box transition-all resize-none"
                />
              </motion.div>

              {/* Status Message */}
              {status.type !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg font-mono text-sm ${
                    status.type === 'success'
                      ? 'bg-green-500/10 border border-green-500 text-green-400'
                      : status.type === 'error'
                      ? 'bg-red-500/10 border border-red-500 text-red-400'
                      : 'bg-cyan-500/10 border border-cyan-500 text-cyan-400'
                  }`}
                >
                  {status.message}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status.type === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-gradient font-mono flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send size={18} />
                {status.type === 'loading'
                  ? 'SENDING TRANSMISSION...'
                  : 'SEND TRANSMISSION'}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
