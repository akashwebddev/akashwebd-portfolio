'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Zap, Link2 } from 'lucide-react';

interface Skill {
  category: string;
  items: Array<{ name: string; percentage: number }>;
}

interface PaymentGateway {
  name: string;
  type: string;
  features: string[];
}

interface APIIntegration {
  name: string;
  category: string;
  methods: string[];
}

const Skills = () => {
  const [animateProgress, setAnimateProgress] = useState(false);
  const [activeTab, setActiveTab] = useState<'skills' | 'payments' | 'apis'>('skills');

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('skills');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.7) {
        setAnimateProgress(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills: Skill[] = [
    {
      category: 'Frontend',
      items: [
        { name: 'React.js', percentage: 95 },
        { name: 'Next.js', percentage: 90 },
        { name: 'TypeScript', percentage: 88 },
        { name: 'Tailwind CSS', percentage: 95 },
        { name: 'JavaScript', percentage: 95 },
      ],
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js', percentage: 90 },
        { name: 'Express.js', percentage: 88 },
        { name: 'Python', percentage: 75 },
        { name: 'REST APIs', percentage: 92 },
        { name: 'GraphQL', percentage: 80 },
      ],
    },
    {
      category: 'Database & Tools',
      items: [
        { name: 'MongoDB', percentage: 88 },
        { name: 'PostgreSQL', percentage: 85 },
        { name: 'Git & GitHub', percentage: 95 },
        { name: 'Docker', percentage: 75 },
        { name: 'Linux', percentage: 80 },
      ],
    },
  ];

  const paymentGateways: PaymentGateway[] = [
    {
      name: 'Stripe',
      type: 'Payment Processor',
      features: ['Card Payments', 'Subscriptions', 'Connect', 'Webhooks'],
    },
    {
      name: 'PayPal',
      type: 'Digital Wallet',
      features: ['Express Checkout', 'Billing', 'Disputes', 'Multi-currency'],
    },
    {
      name: 'Razorpay',
      type: 'Indian Gateway',
      features: ['UPI', 'Cards', 'Wallets', 'Settlements'],
    },
    {
      name: 'Square',
      type: 'Omnichannel',
      features: ['Online Payments', 'In-Person', 'Invoices', 'Analytics'],
    },
    {
      name: 'Authorize.net',
      type: 'Payment Processor',
      features: ['SIM', 'DPM', 'Recurring', 'Fraud Tools'],
    },
    {
      name: 'Coinbase',
      type: 'Crypto Payments',
      features: ['Bitcoin', 'Ethereum', 'USDC', 'Settlements'],
    },
  ];

  const apiIntegrations: APIIntegration[] = [
    {
      name: 'REST APIs',
      category: 'Architecture',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    },
    {
      name: 'GraphQL',
      category: 'Query Language',
      methods: ['Queries', 'Mutations', 'Subscriptions', 'Fragments'],
    },
    {
      name: 'Webhooks',
      category: 'Event-Driven',
      methods: ['Payment Events', 'User Events', 'Order Updates'],
    },
    {
      name: 'OAuth 2.0',
      category: 'Authentication',
      methods: ['Authorization Code', 'Implicit', 'Client Credentials'],
    },
    {
      name: 'JWT',
      category: 'Token-Based',
      methods: ['Access Tokens', 'Refresh Tokens', 'Verification'],
    },
    {
      name: 'Third-Party APIs',
      category: 'Integrations',
      methods: ['Google Maps', 'SendGrid', 'AWS S3', 'Twilio'],
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
    <section
      id="skills"
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
            <span className="section-title">TECHNICAL SPECIFICATIONS</span>
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto" />
        </motion.div>

        {/* Tab Navigation */}
        <motion.div variants={itemVariants} className="flex justify-center gap-4 mb-16 flex-wrap">
          {[
            { id: 'skills', label: 'Skills', icon: '[>>]' },
            { id: 'payments', label: 'Payment Gateways', icon: '[$$]' },
            { id: 'apis', label: 'API Integrations', icon: '[/]' },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg font-mono text-sm transition-all border ${
                activeTab === tab.id
                  ? 'bg-cyan-400 text-black border-cyan-400 font-bold'
                  : 'border-cyan-400/50 text-cyan-400 hover:border-cyan-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {skills.map((skillGroup, groupIndex) => (
              <motion.div
                key={skillGroup.category}
                variants={itemVariants}
                className="glass-effect-strong p-8 rounded-xl border border-cyan-400/30 hover:border-cyan-400 transition-all hover:glow-box"
              >
                <h3 className="text-2xl font-bold text-cyan-400 mb-8 font-mono">
                  <span className="text-pink-500">&lt;</span> {skillGroup.category} <span className="text-pink-500">/&gt;</span>
                </h3>

                <div className="space-y-6">
                  {skillGroup.items.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-cyan-400 font-mono text-sm">
                          {animateProgress ? skill.percentage : 0}%
                        </span>
                      </div>

                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-cyan-400/20">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={animateProgress ? { width: `${skill.percentage}%` } : { width: 0 }}
                          transition={{
                            duration: 1,
                            delay: groupIndex * 0.2 + index * 0.1,
                            ease: 'easeOut',
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* PAYMENT GATEWAYS TAB */}
        {activeTab === 'payments' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 font-mono text-center">
                <CreditCard className="inline mr-2" size={28} />
                <span className="text-pink-500">&lt;</span> PAYMENT GATEWAY INTEGRATIONS <span className="text-pink-500">/&gt;</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paymentGateways.map((gateway, index) => (
                <motion.div
                  key={gateway.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect-strong p-8 rounded-xl border border-cyan-400/30 hover:border-cyan-400 transition-all hover:glow-box h-full flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CreditCard size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{gateway.name}</h4>
                      <p className="text-xs text-cyan-400/80 font-mono">{gateway.type}</p>
                    </div>
                  </div>

                  <div className="space-y-3 flex-1">
                    {gateway.features.map((feature) => (
                      <div key={feature} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-pink-500 mt-1">▸</span> 
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* API INTEGRATIONS TAB */}
        {activeTab === 'apis' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 font-mono text-center">
                <Link2 className="inline mr-2" size={28} />
                <span className="text-pink-500">&lt;</span> API & PAYMENT INTEGRATIONS <span className="text-pink-500">/&gt;</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {apiIntegrations.map((api, index) => (
                <motion.div
                  key={api.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect-strong p-8 rounded-xl border border-cyan-400/30 hover:border-purple-400 transition-all hover:glow-box h-full flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyan-400/20">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{api.name}</h4>
                      <p className="text-xs text-purple-400/80 font-mono">{api.category}</p>
                    </div>
                  </div>

                  <div className="space-y-2 flex-1">
                    {api.methods.map((method) => (
                      <div key={method} className="text-sm text-gray-300 flex items-start gap-2 font-mono">
                        <span className="text-cyan-400 flex-shrink-0">→</span> 
                        <span>{method}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Additional Skills - shared across tabs */}
        <motion.div
          variants={itemVariants}
          className="glass-effect-strong p-8 rounded-xl border border-cyan-400/30"
        >
          <h3 className="text-xl font-bold text-cyan-400 mb-6 font-mono">
            &lt; ADDITIONAL EXPERTISE /&gt;
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Web Design',
              'UI/UX',
              'SEO',
              'Performance',
              'Testing',
              'CI/CD',
              'Cloud Deploy',
              'Agile',
            ].map((skill) => (
              <motion.div
                key={skill}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-cyan-400/10 to-purple-500/10 border border-cyan-400/30 rounded-lg py-3 px-4 text-center text-gray-300 font-medium hover:border-cyan-400 transition-all cursor-pointer"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;