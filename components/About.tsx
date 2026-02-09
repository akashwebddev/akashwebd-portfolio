'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const About = () => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const { playChime, playSectionTransition } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('about');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        setVisibleItems(Array(4).fill(true));
        playSectionTransition();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [playSectionTransition]);

  const timeline: TimelineItem[] = [
    {
      year: '2019',
      title: 'Started Journey',
      description: 'Began web development with HTML, CSS, and JavaScript basics.',
    },
    {
      year: '2020',
      title: 'Backend Development',
      description: 'Mastered Node.js and Express for backend development.',
    },
    {
      year: '2022',
      title: 'Full Stack Expert',
      description: 'Became proficient in React, Next.js, and modern frameworks.',
    },
    {
      year: '2024',
      title: 'Present - Building',
      description: 'Creating innovative solutions for clients and personal projects.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-32 px-4 md:px-6 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="hex-grid absolute inset-0" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <motion.div
        className="max-w-6xl mx-auto relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* GIF Section at Top */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.div
            className="inline-block rounded-3xl overflow-hidden border-2 border-cyan-400/50 shadow-2xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="/about-gif.svg"
              alt="About System"
              className="w-full max-w-sm h-auto object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Main Title */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          {/* Animated Cyber Scan Line Above Title */}
          <motion.div
            className="flex items-center justify-center mb-8"
            animate={{ scaleX: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="relative w-32 h-20 border-2 border-cyan-400/50 rounded-lg overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-cyan-400/30 to-transparent"
                animate={{ y: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs text-cyan-400 font-mono opacity-50">
                [SCAN]
              </div>
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black font-mono mb-6 leading-tight">
            <span className="section-title-modern">ABOUT THE SYSTEM</span>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-purple-500" />
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500" />
          </div>
        </motion.div>

        {/* Bio Card - Enhanced */}
        <motion.div
          variants={itemVariants}
          className="glass-effect-modern p-16 md:p-20 mb-24 rounded-3xl border border-cyan-400/40 backdrop-blur-xl hover:border-cyan-400/70 transition-all duration-500 shadow-2xl"
        >
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
            Hi! I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bold text-2xl md:text-3xl">akashwebd</span>, a passionate Full Stack Developer based in India. With expertise in modern web technologies and a love for clean code, I create seamless digital experiences that drive real business value. From conceptualization to deployment, I handle the entire development lifecycle with precision and creativity. My passion for innovation and problem-solving drives me to build solutions that matter and make an impact.
          </p>
        </motion.div>

        {/* Stats Grid - Modern */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {[
            { label: 'Projects Completed', value: '50+', icon: '[>]' },
            { label: 'Happy Clients', value: '30+', icon: '[*]' },
            { label: 'Years Experience', value: '5+', icon: '[+]' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group glass-effect-modern p-8 rounded-2xl text-center border border-cyan-400/30 hover:border-cyan-400/70 transition-all duration-300 backdrop-blur-xl cursor-pointer"
              onHoverStart={() => playChime()}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 font-mono">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline - Modern */}
        <motion.div variants={itemVariants} className="mb-24">
          <h3 className="text-4xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-12 text-center">
            <span className="text-cyan-400">&lt;</span> JOURNEY TIMELINE <span className="text-cyan-400">&gt;</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                variants={{
                  hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-effect-modern p-8 rounded-2xl border border-cyan-400/30 hover:border-cyan-400/70 transition-all duration-300 backdrop-blur-xl group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-400/20 flex items-center justify-center border border-cyan-400/50 group-hover:border-cyan-400 transition-colors">
                    <span className="text-2xl font-mono font-bold text-cyan-400">{item.year.substring(2)}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* API Integrations Section - Modern */}
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-4xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-12 text-center">
            <span className="text-purple-400">&lt;</span> API & PAYMENT INTEGRATIONS <span className="text-purple-400">&gt;</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Gaming API Integration */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-effect-modern p-10 rounded-2xl border border-purple-400/40 hover:border-purple-400/70 transition-all duration-300 backdrop-blur-xl group cursor-pointer"
            >
              <div className="flex items-start gap-5 mb-6">
                <div className="text-5xl group-hover:scale-110 transition-transform font-bold text-cyan-400">[GAME]</div>
                <div>
                  <h4 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">Gaming API</h4>
                  <p className="text-xs text-purple-300 font-mono mt-1">Multiplayer & Real-time</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-5 text-sm">
                Expertise in integrating gaming APIs for seamless gameplay experiences and social features.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Multiplayer', 'Real-time Sync', 'Leaderboards'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-xs rounded-full bg-gradient-to-r from-purple-400/20 to-purple-400/10 border border-purple-400/50 text-purple-300 font-medium hover:border-purple-400 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Payment Gateway Integration */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-effect-modern p-10 rounded-2xl border border-pink-400/40 hover:border-pink-400/70 transition-all duration-300 backdrop-blur-xl group cursor-pointer"
            >
              <div className="flex items-start gap-5 mb-6">
                <div className="text-5xl group-hover:scale-110 transition-transform font-bold text-cyan-400">[PAY]</div>
                <div>
                  <h4 className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors">Payment Gateway</h4>
                  <p className="text-xs text-pink-300 font-mono mt-1">Secure & Scalable</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-5 text-sm">
                Secure payment solutions with support for multiple methods and international transactions.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Stripe', 'PayPal', 'Razorpay'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-xs rounded-full bg-gradient-to-r from-pink-400/20 to-pink-400/10 border border-pink-400/50 text-pink-300 font-medium hover:border-pink-400 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Advanced Features */}
          <motion.div
            variants={itemVariants}
            className="glass-effect-modern p-10 rounded-2xl border border-cyan-400/40 hover:border-cyan-400/70 transition-all duration-300 backdrop-blur-xl"
          >
            <h5 className="text-cyan-400 font-mono text-sm font-bold mb-8 tracking-wider">ADVANCED CAPABILITIES</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Analytics', icon: '[#]' },
                { name: 'WebSocket', icon: '[~]' },
                { name: 'OAuth 2.0', icon: '[*]' },
                { name: 'Webhooks', icon: '[<>]' },
              ].map((feature) => (
                <motion.div
                  key={feature.name}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 rounded-xl border border-cyan-400/30 hover:border-cyan-400/70 transition-all duration-300 bg-cyan-400/5 hover:bg-cyan-400/10 cursor-pointer"
                  onHoverStart={() => playChime()}
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <p className="text-xs text-cyan-400 font-mono font-bold">{feature.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;