'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Moon, Sun, Palette } from 'lucide-react';
import Link from 'next/link';
import { useSound } from '@/hooks/useSound';
import { SoundSystem } from '@/lib/soundSystem';

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [highContrast, setHighContrast] = useState(false);
  const [accent, setAccent] = useState<string | null>(null);
  const colors = ['#00d4ff', '#8b5cf6', '#ec4899'];
  const { playClick, playRotatingHackerSound } = useSound();

  useEffect(() => {
    // Apply high contrast mode
    if (highContrast) {
      document.documentElement.style.filter = 'contrast(1.5)';
    } else {
      document.documentElement.style.filter = 'contrast(1)';
    }
    try {
      localStorage.setItem('nightMode', String(highContrast));
    } catch (e) {
      // ignore
    }
  }, [highContrast]);

  // Initialize nightMode (default: Day / Sun => highContrast=true)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('nightMode');
      if (stored !== null) {
        setHighContrast(stored === 'true');
      } else {
        setHighContrast(true);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Apply persisted accent color on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('accentColor');
      if (stored) {
        setAccent(stored);
        document.documentElement.style.setProperty('--neon-blue', stored);
        document.documentElement.style.setProperty('--accent', stored);
        document.documentElement.style.setProperty('--primary', stored);
      }
    } catch (e) {
      // ignore (SSR-safe)
    }
  }, []);

  const applyAccent = (color: string) => {
    setAccent(color);
    document.documentElement.style.setProperty('--neon-blue', color);
    document.documentElement.style.setProperty('--accent', color);
    document.documentElement.style.setProperty('--primary', color);
    try {
      localStorage.setItem('accentColor', color);
    } catch (e) {
      // ignore
    }
  };

  const navItems: NavItem[] = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navItems.map(item => item.id);
      const currentSection = sections.find(sectionId => {
        const element = document.getElementById(sectionId);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    if (soundEnabled) {
      playClick();
      playRotatingHackerSound();
    }
    setMenuOpen(false);
    setActiveSection(sectionId);
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className="logo cursor-pointer" onClick={() => handleNavClick('home')}>
          akashwebd PVT LTD
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`hover-glow transition-all ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              onMouseEnter={() => soundEnabled && playClick()}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {/* Single Color Switch (cycles colors, persists choice) */}
          <button
            onClick={() => {
              const current = (accent ?? getComputedStyle(document.documentElement).getPropertyValue('--neon-blue')) || colors[0];
              const cur = current.trim();
              const idx = colors.findIndex(c => c.toLowerCase() === cur.toLowerCase());
              const next = colors[(idx + 1) % colors.length];
              applyAccent(next);
              if (soundEnabled) playClick();
            }}
            title="Change accent color"
            className="p-2 rounded-lg border flex items-center justify-center"
            style={{ borderColor: accent ?? undefined }}
          >
            <Palette size={18} />
          </button>
          {/* Contrast Toggle */}
          <button
            onClick={() => {
              setHighContrast(!highContrast);
              if (soundEnabled) playClick();
            }}
            className="p-2 rounded-lg bg-rgba(147, 112, 219, 0.1) border border-purple-400 text-purple-400 hover:bg-rgba(147, 112, 219, 0.2) transition-all"
            title={highContrast ? 'Normal Contrast' : 'High Contrast'}
          >
            {highContrast ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              if (soundEnabled) {
                playClick();
              }
              const next = !soundEnabled;
              setSoundEnabled(next);
              SoundSystem.setMuted(!next);
            }}
            className="p-2 rounded-lg bg-rgba(0, 212, 255, 0.1) border border-cyan-400 text-cyan-400 hover:bg-rgba(0, 212, 255, 0.2) transition-all"
            title={soundEnabled ? 'Mute' : 'Unmute'}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          {/* Hamburger Menu */}
          <button
            className={`hamburger md:hidden ${menuOpen ? 'active' : ''}`}
            onClick={() => {
              setMenuOpen(!menuOpen);
              if (soundEnabled) {
                playClick();
                playRotatingHackerSound();
              }
            }}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={item.href}
              className="text-white hover:text-cyan-400 transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleNavClick(item.id)}
              onMouseEnter={() => soundEnabled && playClick()}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
