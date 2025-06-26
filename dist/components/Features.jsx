'use client';
import { motion } from 'motion/react';
import { Brain, Zap, BarChart3, Target, Clock, Shield } from 'lucide-react';
var features = [
    {
        icon: Brain,
        title: 'LLM Understanding',
        description: 'Optimize your content to be better understood and recommended by AI assistants and LLMs.',
        color: 'text-blue-600'
    },
    {
        icon: Zap,
        title: 'AI Discovery Boost',
        description: 'Increase your visibility in AI-powered search engines and chatbot responses.',
        color: 'text-yellow-600'
    },
    {
        icon: BarChart3,
        title: 'Semantic Analysis',
        description: 'Analyze how AI systems interpret your content and optimize for semantic relevance.',
        color: 'text-green-600'
    },
    {
        icon: Target,
        title: 'Context Optimization',
        description: 'Structure your content to provide better context for AI systems and improve recommendations.',
        color: 'text-purple-600'
    },
    {
        icon: Clock,
        title: 'Real-time AI Monitoring',
        description: 'Track how AI systems discover and reference your content in real-time.',
        color: 'text-red-600'
    },
    {
        icon: Shield,
        title: 'AI Trust Signals',
        description: 'Build trust signals that AI systems recognize and use to recommend your content.',
        color: 'text-indigo-600'
    }
];
export default function Features() {
    return (<section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Optimize for AI Search?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Traditional SEO is evolving. AI assistants, chatbots, and LLM-powered search engines are becoming the primary way people discover content. Stay ahead of the curve.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(function (feature, index) { return (<motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors group">
              <div className={"w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ".concat(feature.color)}>
                <feature.icon className="w-6 h-6"/>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>); })}
        </div>
      </div>
    </section>);
}
