'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Database, Zap } from 'lucide-react';
import type { ReactNode } from 'react';

interface Service {
  id: number;
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
}

const Services = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const services: Service[] = [
    {
      id: 1,
      icon: <Code2 size={32} />,
      title: 'Full Stack Development',
      description:
        'Complete web application development from frontend to backend with modern technologies.',
      features: [
        'React & Next.js Frontend',
        'Node.js & Express Backend',
        'Database Design & Optimization',
        'API Development & Integration',
      ],
    },
    {
      id: 2,
      icon: <Globe size={32} />,
      title: 'Web Design & UI/UX',
      description:
        'Beautiful, responsive designs that convert visitors into customers with optimal user experience.',
      features: [
        'Responsive Design',
        'UI/UX Design',
        'Accessibility Compliance',
        'Performance Optimization',
      ],
    },
    {
      id: 3,
      icon: <Database size={32} />,
      title: 'Database Solutions',
      description:
        'Scalable database architecture design and optimization for high-performance applications.',
      features: [
        'Schema Design',
        'Query Optimization',
        'Data Migration',
        'Backup & Recovery',
      ],
    },
    {
      id: 4,
      icon: <Zap size={32} />,
      title: 'Performance & Maintenance',
      description:
        'Keep your applications running smoothly with continuous optimization and bug fixes.',
      features: [
        'Code Optimization',
        'Performance Monitoring',
        'Security Updates',
        'Bug Fixing',
      ],
    },
  ];

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
    <section className="min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden">
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
            <span className="section-title">ELITE SERVICES</span>
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto" />
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
              className="cursor-pointer group"
            >
              <div className="glass-effect-strong border border-cyan-400/30 rounded-xl p-8 h-full flex flex-col hover:glow-box transition-all">
                {/* Icon */}
                <div className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6 flex-1">{service.description}</p>

                {/* Features - Expandable */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedId === service.id ? 'auto' : 0,
                    opacity: expandedId === service.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-2 pt-4 border-t border-cyan-400/20">
                    {service.features.map((feature, index) => (
                      <li key={index} className="text-cyan-400 text-sm flex items-center gap-2">
                        <span className="text-purple-500">▸</span> {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Expand Button */}
                <div className="mt-4 text-cyan-400 font-mono text-sm">
                  {expandedId === service.id ? '[ COLLAPSE ]' : '[ EXPAND ]'}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services;