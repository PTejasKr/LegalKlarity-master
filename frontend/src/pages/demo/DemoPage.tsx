import React from 'react';
import { Play, FileText, Shield, Brain, CheckCircle } from 'lucide-react';

const DemoPage: React.FC = () => {
  const features = [
    {
      icon: FileText,
      title: "Document Analysis",
      description: "See how our AI breaks down complex legal documents into understandable insights."
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Watch our color-coded risk scoring identify potential issues in seconds."
    },
    {
      icon: Brain,
      title: "AI Assistant",
      description: "Experience real-time legal guidance with our interactive chatbot."
    },
    {
      icon: CheckCircle,
      title: "Validation",
      description: "Observe how we verify document compliance with Indian legal frameworks."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            LegalKlarity Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how our AI-powered platform transforms the way you interact with legal documents.
          </p>
        </div>

        {/* Demo Video Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-16 text-center dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-100 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center mb-8 dark:bg-gray-700 dark:border-gray-600">
              <div className="text-center">
                <Play className="h-16 w-16 text-gray-400 mx-auto mb-4 dark:text-gray-500" />
                <p className="text-gray-500 dark:text-gray-400">Interactive Demo Video</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Experience Legal Clarity in Action</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Watch how our platform analyzes a rental agreement, identifies risks, and provides clear explanations in plain language.
            </p>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition dark:bg-indigo-700 dark:hover:bg-indigo-600">
              Watch Full Demo
            </button>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">What You'll See in the Demo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition dark:bg-gray-800 dark:hover:shadow-slate-800/50 border border-gray-200 dark:border-gray-700"
                >
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 dark:bg-indigo-900/30 dark:text-indigo-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Demo Section */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center dark:bg-gray-800 mb-16 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-cyan-400">Try Our Interactive Demo</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Upload your own document and see how LegalKlarity transforms complex legal language into clear, actionable insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition">
              Upload Sample Document
            </button>
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
              Browse Demo Documents
            </button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-50 rounded-xl shadow-sm p-8 text-center dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-indigo-400 mb-4">Ready to Transform Your Legal Workflow?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of legal professionals who have already revolutionized their practice with LegalKlarity.
          </p>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition dark:bg-indigo-700 dark:hover:bg-indigo-600">
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;