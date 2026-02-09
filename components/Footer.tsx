'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ArrowUp, MessageCircle, MessageSquare, Facebook } from 'lucide-react';

type Status = 'available' | 'coding' | 'meeting' | 'offline';

const Footer = () => {
  const [status, setStatus] = useState<Status>('available');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / windowHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'Telegram',
      url: 'https://t.me/akashwebd',
      icon: <MessageCircle size={40} />,
      color: 'hover:text-cyan-400',
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/8801919155003',
      icon: <MessageSquare size={40} />,
      color: 'hover:text-green-400',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/akashwebddev',
      icon: <Github size={40} />,
      color: 'hover:text-white',
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/akashwebd',
      icon: <Facebook size={40} />,
      color: 'hover:text-blue-500',
    },
  ];

  const statusColors = {
    available: 'status-indicator',
    coding: 'status-indicator coding',
    meeting: 'status-indicator meeting',
    offline: 'status-indicator offline',
  };

  const statusLabels = {
    available: '🟢 AVAILABLE',
    coding: '🟡 CODING',
    meeting: '🔴 IN MEETING',
    offline: '⚫ OFFLINE',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="relative">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Status Indicator */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        {/* Status Dot */}
        <motion.div
          className={statusColors[status]}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          title={statusLabels[status]}
        />

        {/* Status Label */}
        <motion.div
          className="text-xs font-mono text-gray-400 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {statusLabels[status]}
        </motion.div>

        {/* Change Status Buttons */}
        <motion.div className="flex gap-2 text-xs" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {(['available', 'coding', 'meeting', 'offline'] as Status[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-2 py-1 rounded border transition-all ${
                status === s
                  ? 'border-cyan-400 bg-cyan-400/20 text-cyan-400'
                  : 'border-gray-600 bg-gray-900/20 text-gray-400 hover:border-gray-400'
              }`}
              title={statusLabels[s]}
            >
              {s.charAt(0).toUpperCase()}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Main Footer */}
      <motion.section
        className="min-h-96 border-t border-cyan-400/20 px-6 py-16 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Background */}
        <div className="hex-grid absolute inset-0" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Top Section - Brand & Social Links */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
            {/* Brand */}
            <motion.div variants={itemVariants}>
              <h3 className="logo text-2xl mb-4">akashwebd</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Building scalable web solutions with modern technologies. Let's create something great together.
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className={`text-gray-400 transition-colors ${link.color}`}
                    title={link.name}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <motion.p variants={itemVariants} className="text-sm text-gray-500 font-mono">
              © 2024 akashwebd PVT LTD. ALL SYSTEMS OPERATIONAL.
            </motion.p>

            {/* Back to Top */}
            <motion.button
              variants={itemVariants}
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
              className="flex items-center gap-2 text-cyan-400 hover:text-purple-400 transition-colors font-mono text-sm"
            >
              BACK TO TOP
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </motion.section>
    </footer>
  );
};

export default Footer;
