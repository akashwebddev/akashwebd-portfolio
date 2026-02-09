'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  featured?: boolean;
}

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration and admin dashboard.',
      image: '/projects/ecommerce.jpg',
      tags: ['Next.js', 'React', 'MongoDB', 'Stripe'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: true,
    },
    {
      id: 2,
      title: 'Real-Time Chat App',
      description: 'Real-time messaging application with user authentication and notifications.',
      image: '/projects/chat.jpg',
      tags: ['React', 'Socket.io', 'Node.js', 'Firebase'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: true,
    },
    {
      id: 3,
      title: 'Fitness Tracking App',
      description: 'Mobile-responsive fitness tracker with workout logging and analytics.',
      image: '/projects/fitness.jpg',
      tags: ['React', 'TypeScript', 'Chart.js', 'PostgreSQL'],
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      id: 4,
      title: 'Blog Platform',
      description: 'Blogging platform with markdown support and comment system.',
      image: '/projects/blog.jpg',
      tags: ['Next.js', 'Markdown', 'API Routes', 'Prisma'],
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      id: 5,
      title: 'Task Management',
      description: 'Collaborative task management tool with real-time updates.',
      image: '/projects/tasks.jpg',
      tags: ['React', 'Redux', 'Firebase', 'Material-UI'],
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      id: 6,
      title: 'Portfolio Generator',
      description: 'Dynamic portfolio generator with customizable templates.',
      image: '/projects/portfolio.jpg',
      tags: ['Next.js', 'Tailwind', 'Vercel', 'React'],
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
  ];

  const allTags = ['all', ...new Set(projects.flatMap((p) => p.tags))];

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.tags.includes(filter));

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
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="hex-grid absolute inset-0" />

      <motion.div
        className="max-w-6xl mx-auto relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-mono mb-6">
            <span className="section-title">PROJECT ARCHIVE</span>
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto" />
        </motion.div>

        {/* Filter Tags */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
          {allTags.map((tag) => (
            <motion.button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-full font-mono text-sm transition-all ${
                filter === tag
                  ? 'bg-cyan-400 text-black font-bold'
                  : 'border border-cyan-400/50 text-cyan-400 hover:border-cyan-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Project Card */}
              <div className="glass-effect border border-cyan-400/30 rounded-xl overflow-hidden h-full flex flex-col hover:glow-box transition-all">
                {/* Image Placeholder */}
                <div className="relative overflow-hidden bg-gradient-to-br from-cyan-400/10 to-purple-500/10 h-48 border-b border-cyan-400/20">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-6xl opacity-20">&lt;/&gt;</div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2 }}
                      className="p-3 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300"
                    >
                      <Github size={20} />
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2 }}
                      className="p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-400"
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-cyan-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                      ⭐ FEATURED
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 flex-1">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 rounded-full font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="text-center py-20 text-gray-400"
          >
            <p className="text-lg">No projects found with the selected filter.</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Projects;