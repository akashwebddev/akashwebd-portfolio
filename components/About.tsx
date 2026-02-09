'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const About = () => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
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

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  };

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
        {/* VIDEO Section at Top */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.div
            className="inline-block rounded-3xl overflow-hidden border-2 border-cyan-400/50 shadow-2xl relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {/* Video Container */}
            <div className="relative w-full max-w-sm h-auto">
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onLoadedData={handleVideoLoad}
                className="w-full h-auto object-cover rounded-3xl"
                poster="/video-poster.jpg"
              >
                <source src="/about-video.mp4" type="video/mp4" />
                <source src="/about-video.webm" type="video/webm" />
                <img 
                  src="/about-fallback.jpg" 
                  alt="About System" 
                  className="w-full h-auto"
                />
              </video>
              
              {!isVideoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 rounded-3xl">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400 mb-2"></div>
                    <p className="text-cyan-400 text-sm font-mono">LOADING SYSTEM...</p>
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => videoRef.current?.paused ? videoRef.current.play() : videoRef.current?.pause()}
                  className="bg-gray-900/70 hover:bg-gray-900/90 text-cyan-400 p-2 rounded-lg backdrop-blur-sm transition-all"
                  aria-label={videoRef.current?.paused ? "Play video" : "Pause video"}
                >
                  {videoRef.current?.paused ? '▶' : '⏸'}
                </button>
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.muted = !videoRef.current.muted;
                    }
                  }}
                  className="bg-gray-900/70 hover:bg-gray-900/90 text-cyan-400 p-2 rounded-lg backdrop-blur-sm transition-all"
                  aria-label={videoRef.current?.muted ? "Unmute video" : "Mute video"}
                >
                  {videoRef.current?.muted ? '🔇' : '🔊'}
                </button>
              </div>
            </div>
          </motion.div>
          
          <p className="text-gray-400 text-sm mt-4 font-mono">
            <span className="text-cyan-400">[VIDEO_ACTIVE]</span> System overview • Loop enabled
          </p>
        </motion.div>

        {/* Main Title */}
        <motion.div variants={itemVariants} className="text-center mb-20">
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

        {/* Bio Card - Enhanced with NEON TEXT EFFECT */}
        <motion.div
          variants={itemVariants}
          className="glass-effect-modern p-16 md:p-20 mb-24 rounded-3xl border border-cyan-400/40 backdrop-blur-xl hover:border-cyan-400/70 transition-all duration-500 shadow-2xl relative overflow-hidden group"
        >
          {/* Animated Neon Border Glow */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl opacity-30 group-hover:opacity-70 transition-opacity duration-500 animate-pulse" />
          <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-40 group-hover:blur-2xl transition-all duration-700" />
          
          {/* Content */}
          <div className="relative z-10">
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
              Hi! I'm{' '}
              <span className="neon-text-name">
                akashwebd
              </span>
              , a passionate{' '}
              <span className="neon-text-cyan">Full Stack Developer</span>{' '}
              based in{' '}
              <span className="neon-text-purple">India</span>
              . With expertise in{' '}
              <span className="neon-text-pink">modern web technologies</span>{' '}
              and a love for{' '}
              <span className="neon-text-cyan">clean code</span>
              , I create{' '}
              <span className="neon-text-purple">seamless digital experiences</span>{' '}
              that drive{' '}
              <span className="neon-text-pink">real business value</span>
              . From{' '}
              <span className="neon-text-cyan">conceptualization</span>{' '}
              to{' '}
              <span className="neon-text-purple">deployment</span>
              , I handle the entire development lifecycle with{' '}
              <span className="neon-text-pink">precision</span>{' '}
              and{' '}
              <span className="neon-text-cyan">creativity</span>
              . My passion for{' '}
              <span className="neon-text-purple">innovation</span>{' '}
              and{' '}
              <span className="neon-text-pink">problem-solving</span>{' '}
              drives me to build{' '}
              <span className="neon-text-cyan">solutions that matter</span>{' '}
              and make an{' '}
              <span className="neon-text-purple">impact</span>
              .
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
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

        {/* Timeline */}
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

        {/* API Integrations Section */}
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

      {/* Add these CSS styles to your global CSS or style tag */}
      <style jsx global>{`
        @keyframes neonGlow {
          0%, 100% {
            text-shadow: 
              0 0 5px #00ffff,
              0 0 10px #00ffff,
              0 0 15px #00ffff,
              0 0 20px #00ffff;
          }
          50% {
            text-shadow: 
              0 0 10px #00ffff,
              0 0 20px #00ffff,
              0 0 30px #00ffff,
              0 0 40px #00ffff,
              0 0 50px #00ffff;
          }
        }

        @keyframes neonPulse {
          0%, 100% {
            opacity: 1;
            text-shadow: 
              0 0 5px currentColor,
              0 0 10px currentColor,
              0 0 15px currentColor;
          }
          50% {
            opacity: 0.8;
            text-shadow: 
              0 0 10px currentColor,
              0 0 20px currentColor,
              0 0 30px currentColor;
          }
        }

        .neon-text-name {
          color: #ffffff;
          font-weight: 900;
          font-size: 2.5rem;
          background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: neonGlow 2s ease-in-out infinite alternate;
          position: relative;
          display: inline-block;
          padding: 0 8px;
          margin: 0 4px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .neon-text-cyan {
          color: #00ffff;
          font-weight: 700;
          animation: neonPulse 3s ease-in-out infinite;
          text-shadow: 
            0 0 5px #00ffff,
            0 0 10px #00ffff,
            0 0 15px #00ffff;
          position: relative;
          display: inline-block;
          padding: 0 4px;
          margin: 0 2px;
        }

        .neon-text-purple {
          color: #ff00ff;
          font-weight: 700;
          animation: neonPulse 3.5s ease-in-out infinite;
          text-shadow: 
            0 0 5px #ff00ff,
            0 0 10px #ff00ff,
            0 0 15px #ff00ff;
          position: relative;
          display: inline-block;
          padding: 0 4px;
          margin: 0 2px;
        }

        .neon-text-pink {
          color: #ff1493;
          font-weight: 700;
          animation: neonPulse 4s ease-in-out infinite;
          text-shadow: 
            0 0 5px #ff1493,
            0 0 10px #ff1493,
            0 0 15px #ff1493;
          position: relative;
          display: inline-block;
          padding: 0 4px;
          margin: 0 2px;
        }

        /* Add subtle glow to all colored text */
        .neon-text-cyan::before,
        .neon-text-purple::before,
        .neon-text-pink::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: currentColor;
          filter: blur(10px);
          opacity: 0.3;
          transform: translate(-50%, -50%);
          z-index: -1;
          border-radius: 4px;
        }

        /* Enhanced container glow */
        .glass-effect-modern {
          box-shadow: 
            0 0 20px rgba(0, 255, 255, 0.1),
            inset 0 0 20px rgba(0, 255, 255, 0.05);
        }

        .glass-effect-modern:hover {
          box-shadow: 
            0 0 40px rgba(0, 255, 255, 0.2),
            0 0 60px rgba(255, 0, 255, 0.1),
            inset 0 0 20px rgba(0, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
};

export default About;
