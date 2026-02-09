'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: 'What is your development process?',
      answer:
        'I follow a structured approach: requirement analysis, design mockups, development, testing, and deployment. Regular communication and updates ensure the project stays on track.',
    },
    {
      id: 2,
      question: 'Do you provide full source code?',
      answer:
        'Yes! You receive complete source code with documentation, allowing you to maintain or extend the project independently. All code is well-commented and follows best practices.',
    },
    {
      id: 3,
      question: 'How long does development take?',
      answer:
        'Timeline depends on project complexity. Simple websites: 1-2 weeks. Medium projects: 2-4 weeks. Complex applications: 4-12 weeks. Custom quotes available upon requirements discussion.',
    },
    {
      id: 4,
      question: 'What technologies do you use?',
      answer:
        'I specialize in modern tech stack: React, Next.js, TypeScript, Node.js, Express, MongoDB, PostgreSQL, Tailwind CSS, and more. I stay updated with latest industry standards.',
    },
    {
      id: 5,
      question: 'Do you offer post-launch support?',
      answer:
        'Absolutely! I provide bug fixes, maintenance, and feature updates. Support packages are available based on your needs - from hourly consulting to retainer agreements.',
    },
    {
      id: 6,
      question: 'How do you ensure code quality?',
      answer:
        'I follow SOLID principles, write clean code, perform testing, use version control, and conduct code reviews. Static analysis tools and linters ensure consistent code standards.',
    },
    {
      id: 7,
      question: 'Can you work on existing projects?',
      answer:
        'Yes, I can refactor, optimize, or extend existing codebases. I can debug issues, migrate to new technologies, or add new features to your current application.',
    },
    {
      id: 8,
      question: 'What is your pricing model?',
      answer:
        'I offer flexible pricing: project-based, hourly rates, or retainer arrangements. The cost depends on scope, complexity, and timeline. Let\'s discuss your requirements for a custom quote.',
    },
  ];

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
    <section className="min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="hex-grid absolute inset-0" />

      <motion.div
        className="max-w-3xl mx-auto relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-mono mb-6">
            <span className="section-title">FREQUENTLY ASKED</span>
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto" />
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              variants={itemVariants}
              className="glass-effect border border-cyan-400/30 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-cyan-400/5 transition-colors group"
              >
                <span className="text-left text-white font-semibold text-lg">{faq.question}</span>
                <motion.div
                  animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-cyan-400 flex-shrink-0 ml-4"
                >
                  <ChevronDown size={24} />
                </motion.div>
              </button>

              {/* Answer */}
              <motion.div
                initial={false}
                animate={{
                  height: expandedId === faq.id ? 'auto' : 0,
                  opacity: expandedId === faq.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-cyan-400/20"
              >
                <p className="px-6 py-4 text-gray-300 leading-relaxed">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Still Have Questions */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <p className="text-gray-300 mb-6">
            Can't find what you're looking for?{' '}
            <span className="text-cyan-400 font-semibold">Get in touch!</span>
          </p>
          <button className="btn-gradient">
            Ask Me Anything
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FAQ;