import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for individuals getting started with legal document analysis",
      features: [
        "5 document analyses per month",
        "Basic risk assessment",
        "Standard AI assistant",
        "Email support",
        "Access to legal guides"
      ],
      notIncluded: [
        "Advanced risk scoring",
        "Custom recommendations",
        "Priority support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: "₹999/month",
      description: "Ideal for students and small business owners",
      features: [
        "50 document analyses per month",
        "Advanced risk assessment",
        "Priority AI assistant",
        "Document validation",
        "Access to case laws",
        "Email & chat support"
      ],
      notIncluded: [
        "Team collaboration",
        "Custom AI models",
        "Dedicated account manager"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations with complex legal needs",
      features: [
        "Unlimited document analyses",
        "Premium risk assessment",
        "24/7 AI assistant",
        "Multi-jurisdiction compliance",
        "Team collaboration",
        "Custom AI models",
        "Dedicated account manager",
        "API access"
      ],
      notIncluded: [],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "Is there a free trial?",
      answer: "All plans come with a 14-day free trial. No credit card required to get started."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, UPI, and bank transfers for annual plans."
    },
    {
      question: "Do you offer discounts for students or non-profits?",
      answer: "Yes, we offer special pricing for students, educational institutions, and registered non-profit organizations. Contact our support team for details."
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
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-indigo-500 mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Choose the plan that works best for your legal document needs. All plans include our core AI analysis features.
        </p>
      </motion.div>

      {/* Plans */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
      >
        {plans.map((plan, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            className={`relative rounded-xl p-8 shadow-lg border ${
              plan.popular 
                ? "border-indigo-500 ring-2 ring-indigo-500 ring-opacity-50 dark:border-indigo-400 dark:ring-indigo-400 dark:ring-opacity-30" 
                : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </div>
            )}
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h2>
              <div className="mt-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                {plan.price !== "Custom" && plan.price !== "Free" && (
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                )}
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{plan.description}</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0 dark:text-green-400" />
                  <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                </li>
              ))}
              
              {plan.notIncluded.map((notIncluded, notIncludedIndex) => (
                <li key={notIncludedIndex} className="flex items-start opacity-60">
                  <XCircle className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0 dark:text-gray-500" />
                  <span className="text-gray-500 dark:text-gray-500 line-through">{notIncluded}</span>
                </li>
              ))}
            </ul>
            
            <button 
              className={`w-full py-3 px-4 rounded-lg font-semibold transition ${
                plan.popular
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              }`}
            >
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Features Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm p-8 mb-20 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
      >
        <motion.h2 
          className="text-3xl font-bold text-gray-900 dark:text-indigo-500 mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Plan Features Comparison
        </motion.h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-4 pr-4 text-gray-900 font-semibold dark:text-white">Feature</th>
                <th className="text-center py-4 px-4 text-gray-900 font-semibold dark:text-white">Starter</th>
                <th className="text-center py-4 px-4 text-gray-900 font-semibold dark:text-white">Professional</th>
                <th className="text-center py-4 px-4 text-gray-900 font-semibold dark:text-white">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="py-4 pr-4 text-gray-600 dark:text-gray-400">Document Analyses</td>
                <td className="py-4 px-4 text-center text-gray-900 dark:text-white">5/month</td>
                <td className="py-4 px-4 text-center text-gray-900 dark:text-white">50/month</td>
                <td className="py-4 px-4 text-center text-gray-900 dark:text-white">Unlimited</td>
              </tr>
              <tr>
                <td className="py-4 pr-4 text-gray-600 dark:text-gray-400">Risk Assessment</td>
                <td className="py-4 px-4 text-center text-gray-900 dark:text-white">Basic</td>
                <td className="py-4 px-4 text-center text-gray-900 dark:text-white">Advanced</td>
                <td className="py-4 px-4 text-center text-gray-900 dark:text-white">Premium</td>
              </tr>
              <tr>
                <td className="py-4 pr-4 text-gray-600 dark:text-gray-400">AI Assistant</td>
                <td className="py-4 px-4 text-center text-gray-900 dark:text-white">Standard</td>
                <td className="py-4 px-4 text-center text-gray-900 dark:text-white">Priority</td>
                <td className="py-4 px-4 text-center text-gray-900 dark:text-white">24/7</td>
              </tr>
              <tr>
                <td className="py-4 pr-4 text-gray-600 dark:text-gray-400">Document Validation</td>
                <td className="py-4 px-4 text-center text-gray-400 dark:text-gray-500">-</td>
                <td className="py-4 px-4 text-center text-gray-900 dark:text-white">Included</td>
                <td className="py-4 px-4 text-center text-gray-900 dark:text-white">Multi-jurisdiction</td>
              </tr>
              <tr>
                <td className="py-4 pr-4 text-gray-600 dark:text-gray-400">Team Collaboration</td>
                <td className="py-4 px-4 text-center text-gray-400 dark:text-gray-500">-</td>
                <td className="py-4 px-4 text-center text-gray-400 dark:text-gray-500">-</td>
                <td className="py-4 px-4 text-center text-gray-900 dark:text-white">Included</td>
              </tr>
              <tr>
                <td className="py-4 pr-4 text-gray-600 dark:text-gray-400">Custom AI Models</td>
                <td className="py-4 px-4 text-center text-gray-400 dark:text-gray-500">-</td>
                <td className="py-4 px-4 text-center text-gray-400 dark:text-gray-500">-</td>
                <td className="py-4 px-4 text-center text-gray-900 dark:text-white">Included</td>
              </tr>
              <tr>
                <td className="py-4 pr-4 text-gray-600 dark:text-gray-400">Support</td>
                <td className="py-4 px-4 text-center text-gray-900 dark:text-white">Email</td>
                <td className="py-4 px-4 text-center text-gray-900 dark:text-white">Email & Chat</td>
                <td className="py-4 px-4 text-center text-gray-900 dark:text-white">24/7 Priority</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-white rounded-xl shadow-sm p-8 mb-20 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
      >
        <motion.h2 
          className="text-3xl font-bold text-gray-900 dark:text-indigo-500 mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          Frequently Asked Questions
        </motion.h2>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              className="border-b border-gray-200 pb-6 last:border-0 last:pb-0 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
              <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="bg-gray-50 rounded-2xl p-8 text-center dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
      >
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-indigo-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          Questions About Pricing?
        </motion.h2>
        <motion.p 
          className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          Our team is here to help you choose the right plan for your needs. Contact us for personalized recommendations.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.7 }}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition dark:bg-indigo-700 dark:hover:bg-indigo-600"
        >
          Contact Sales
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PricingPage;