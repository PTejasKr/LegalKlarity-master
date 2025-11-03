import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Shield, FileText, CheckCircle, Globe, Zap, Search, BarChart } from 'lucide-react';

const SolutionsPage: React.FC = () => {
  const solutions = [
    {
      icon: FileText,
      title: "Document Analysis",
      description: "AI-powered clause-by-clause analysis of legal documents with risk scoring.",
      features: [
        "Clause-level breakdown with plain language explanations",
        "Color-coded risk assessment for quick identification",
        "Custom recommendations based on your role (student, citizen, business)"
      ]
    },
    {
      icon: Shield,
      title: "Risk Scoring",
      description: "Comprehensive risk evaluation with detailed mitigation strategies.",
      features: [
        "Instant risk scoring for all document types",
        "Detailed risk category breakdown (financial, legal, compliance)",
        "Actionable mitigation recommendations"
      ]
    },
    {
      icon: Brain,
      title: "AI Legal Assistant",
      description: "Interactive chatbot for real-time legal guidance and question answering.",
      features: [
        "24/7 availability for instant legal questions",
        "Context-aware responses based on uploaded documents",
        "Citation of relevant laws and precedents"
      ]
    },
    {
      icon: CheckCircle,
      title: "Validation & Compliance",
      description: "Automated compliance checking for Indian legal frameworks.",
      features: [
        "PAN, Aadhaar, and other document validation",
        "Multi-jurisdiction compliance checking",
        "Regulatory requirement verification"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black py-28 px-4 md:px-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-orange-500 mb-4">
          Legal Intelligence Solutions
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Comprehensive tools designed to demystify legal documents and empower informed decision-making.
        </p>
      </motion.div>

      {/* Solutions Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
      >
        {solutions.map((solution, index) => {
          const Icon = solution.icon;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl p-8 hover:shadow-lg transition dark:bg-gray-900 dark:hover:shadow-gray-800/50 border border-gray-200 dark:border-gray-700"
            >
              <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-6 dark:bg-orange-900/30 dark:text-orange-400">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{solution.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{solution.description}</p>
              <ul className="space-y-2">
                {solution.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0 dark:text-green-400" />
                    <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Additional Features */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="bg-white rounded-xl shadow-sm p-8 mb-20 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
      >
        <motion.h2 
          className="text-3xl font-bold text-gray-900 dark:text-orange-500 mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Additional Capabilities
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-6 dark:bg-orange-900/30 dark:text-orange-400">
              <Globe className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Multi-jurisdiction Support</h3>
            <p className="text-gray-600 dark:text-gray-400">Analysis across different legal frameworks and jurisdictions.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-6 dark:bg-orange-900/30 dark:text-orange-400">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Lightning Fast Processing</h3>
            <p className="text-gray-600 dark:text-gray-400">Analyze complex documents in seconds with our optimized AI engine.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-6 dark:bg-orange-900/30 dark:text-orange-400">
              <BarChart className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Insights Dashboard</h3>
            <p className="text-gray-600 dark:text-gray-400">Track your legal health and identify patterns across documents.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="bg-gray-50 rounded-2xl p-8 text-center dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
      >
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-orange-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          Experience Legal Clarity Today
        </motion.h2>
        <motion.p 
          className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          Join thousands of users who have transformed their approach to legal documents with AI-powered insights.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition dark:bg-orange-700 dark:hover:bg-orange-600"
        >
          Start Free Trial
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SolutionsPage;