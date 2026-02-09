'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

const Hero = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const { playHackerAccess, playLoadingTick, playClick } = useSound();

  const loadingMessages = [
    'Initiating neural link...',
    'Bypassing firewall protocols...',
    'Decrypting access credentials...',
    'Scanning biometric data...',
    'Establishing secure tunnel...',
    'Loading system core...',
    'Verifying clearance level...',
    'Synchronizing quantum modules...',
    'Mounting encrypted drives...',
    'ACCESS GRANTED',
  ];

  useEffect(() => {
    if (!showLoading) return;

    let messageIndex = 0;
    let progressInterval: NodeJS.Timeout;
    let messageInterval: NodeJS.Timeout;

    // Simulate progress increments
    progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const next = prev + Math.random() * 15;
        if (next >= 100) {
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          playHackerAccess();
          setTimeout(() => {
            setShowLoading(false);
            setShowContent(true);
          }, 800);
          return 100;
        }
        playLoadingTick();
        return next;
      });
    }, 200);

    // Update loading messages
    messageInterval = setInterval(() => {
      if (messageIndex < loadingMessages.length - 1) {
        messageIndex += 1;
        setLoadingText(loadingMessages[messageIndex]);
      }
    }, 300);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [showLoading, playHackerAccess, playLoadingTick]);

  const handleLoadingClick = () => {
    playClick();
    playHackerAccess();
    setShowLoading(false);
    setShowContent(true);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="hex-grid absolute inset-0" />

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-400 text-5xl opacity-10"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
          >
            {'</>'}
          </motion.div>
        ))}
      </div>

      {/* Cyber Hacking Access Loading Screen */}
      {showLoading && (
        <motion.div
          className="fixed inset-0 loading-screen cursor-pointer overflow-hidden"
          onClick={handleLoadingClick}
          exit={{ opacity: 0 }}
        >
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500 to-purple-500" />
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(0deg, transparent 24%, rgba(0, 212, 255, 0.1) 25%, rgba(0, 212, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, 0.1) 75%, rgba(0, 212, 255, 0.1) 76%, transparent 77%, transparent),
                  linear-gradient(90deg, transparent 24%, rgba(0, 212, 255, 0.1) 25%, rgba(0, 212, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, 0.1) 75%, rgba(0, 212, 255, 0.1) 76%, transparent 77%, transparent)
                `,
                backgroundSize: '50px 50px',
              }}
              animate={{ backgroundPosition: ['0 0', '50px 50px'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Main Container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-2xl px-6">
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h1 className="text-4xl md:text-5xl font-black font-mono text-cyan-400 mb-2">
                  ≫ NEURAL ACCESS ≪
                </h1>
                <div className="h-1 w-48 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mx-auto" />
              </motion.div>

              {/* Vertical Loading Bar (Fills from bottom to top) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative h-64 bg-black/50 border-2 border-cyan-400 rounded-lg overflow-hidden mb-8 shadow-lg"
                style={{
                  boxShadow: '0 0 20px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.1)',
                }}
              >
                {/* Vertical Fill (Bottom to Top) */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-400 via-purple-500 to-transparent"
                  style={{
                    height: `${loadingProgress}%`,
                    boxShadow: '0 0 20px rgba(0, 212, 255, 0.6), inset 0 0 20px rgba(0, 212, 255, 0.3)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Scanning Lines */}
                  <motion.div
                    className="absolute inset-0 opacity-50"
                    animate={{ y: [0, 256] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 212, 255, 0.3) 2px, rgba(0, 212, 255, 0.3) 4px)',
                      backgroundSize: '100% 8px',
                    }}
                  />
                </motion.div>

                {/* Percentage Text */}
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <motion.div
                    className="text-cyan-400 font-mono text-5xl font-black drop-shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {Math.round(loadingProgress)}%
                  </motion.div>
                </div>

                {/* Border Glow */}
                <motion.div
                  className="absolute inset-0 border-2 border-cyan-400 rounded-lg pointer-events-none"
                  animate={{
                    boxShadow: [
                      '0 0 10px rgba(0, 212, 255, 0.5)',
                      '0 0 20px rgba(0, 212, 255, 0.8)',
                      '0 0 10px rgba(0, 212, 255, 0.5)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Loading Messages */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-black/60 border border-cyan-400/50 rounded p-6 mb-8 min-h-24 flex items-center justify-center"
                style={{
                  boxShadow: 'inset 0 0 20px rgba(0, 212, 255, 0.1)',
                }}
              >
                <div className="text-center">
                  <motion.div
                    className="text-cyan-400 font-mono text-lg mb-3"
                    key={loadingText}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {loadingText || 'Initiating neural link...'}
                  </motion.div>

                  {/* Blinking Cursor */}
                  <motion.div
                    className="text-cyan-400 font-mono text-sm inline-block"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    █
                  </motion.div>
                </div>
              </motion.div>

              {/* Status Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-center space-y-2"
              >
                <div className="text-cyan-400 font-mono text-xs tracking-widest">
                  [SECURITY CLEARANCE: LEVEL {Math.round(loadingProgress / 20)}]
                </div>
                {loadingProgress >= 100 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-green-400 font-mono text-sm font-bold animate-pulse"
                  >
                    [OK] ACCESS GRANTED - [CLICK TO CONTINUE]
                  </motion.div>
                )}
                {loadingProgress < 100 && (
                  <div className="text-cyan-400/50 font-mono text-xs">
                    Click to force access...
                  </div>
                )}
              </motion.div>

              {/* Corner Decorations */}
              <motion.div
                className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-cyan-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              />
              <motion.div
                className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-cyan-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              />
              <motion.div
                className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      {showContent && (
        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="neon-border inline-block px-4 py-2 mb-8 rounded-full text-cyan-400 font-mono text-sm"
          >
            ⭐ ESTABLISHED SINCE 2019
          </motion.div>

          {/* Main Title - Removed "I AM" */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-4 font-mono">
              <span className="gradient-text">akashwebd</span>
            </h1>
          </motion.div>

          {/* Multiple Typing Animations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-2xl mb-8 font-mono text-cyan-400 min-h-16 font-semibold"
          >
            <TypewriterSequence />
          </motion.div>

          {/* Description */}
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Hi! I'm akashwebd, a passionate Full Stack Developer based in India. With expertise in modern web
            technologies and a love for clean code, I create seamless digital experiences that drive real
            business value. From conceptualization to deployment, I handle the entire development lifecycle
            with precision and creativity.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <button
              type="button"
              onClick={() => {
                playClick();
                setTimeout(() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
              className="btn-neon group hover:scale-105 transition-transform cursor-pointer"
            >
              <span className="flex items-center gap-2">
                View Work
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                playClick();
                setTimeout(() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
              className="btn-gradient hover:scale-105 transition-transform cursor-pointer"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-cyan-400 font-mono text-xs"
            >
              ▼ SCROLL TO CONTINUE
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

// Typewriter Sequence Component
const TypewriterSequence = () => {
  const professions = [
    'I am a Full Stack Developer',
    'I am a Game Developer',
    'I am a Source Code Expert',
    'I am a Payment Gateway Expert',
  ];

  const [displayedText, setDisplayedText] = useState('');
  const [professionIndex, setProfessionIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (professionIndex >= professions.length) return;

    const currentProfession = professions[professionIndex];

    if (charIndex <= currentProfession.length) {
      const timer = setTimeout(() => {
        setDisplayedText(currentProfession.slice(0, charIndex));
        setCharIndex(charIndex + 1);
      }, 50);

      return () => clearTimeout(timer);
    } else {
      // Wait 1.5 seconds before moving to next profession
      const pauseTimer = setTimeout(() => {
        setProfessionIndex(professionIndex + 1);
        setCharIndex(0);
        setDisplayedText('');
      }, 1500);

      return () => clearTimeout(pauseTimer);
    }
  }, [charIndex, professionIndex]);

  return (
    <div className="min-h-12 w-full flex items-center justify-center text-center">
      <span className="inline-block">
        {displayedText}
        {charIndex <= professions[professionIndex]?.length && (
          <span className="animate-pulse">_</span>
        )}
      </span>
    </div>
  );
};

export default Hero;