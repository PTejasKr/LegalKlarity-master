import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, MessageCircle, CheckCircle, Globe, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

const FeaturesPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isNavigating, setIsNavigating] = useState(false);
  
  const handleProtectedNavigation = (path: string) => {
    if (isNavigating) return; // Prevent multiple clicks
    
    setIsNavigating(true);
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate('/login');
    }
    
    // Reset navigation state after a short delay
    setTimeout(() => {
      setIsNavigating(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-28 px-4 md:px-20">
      {/* Header - Updating to match About page style */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-green-500 mb-4">
          Powerful Legal Intelligence Features
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover how our advanced AI technology transforms complex legal documents into clear, actionable insights that anyone can understand.
        </p>
      </motion.div>

      {/* Document Analysis Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-20"
      >
        <div className="flex items-center mb-8">
          <FileText className="h-10 w-10 text-green-600 dark:text-green-500 mr-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-green-500">Document Analysis</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <motion.h3 
              className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Clause-by-Clause Breakdown
            </motion.h3>
            <motion.p 
              className="text-gray-600 dark:text-gray-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Our AI reads through your entire document and breaks down every clause, section, and term into plain English explanations that anyone can understand.
            </motion.p>
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0 dark:text-green-400" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Smart Summarization</h4>
                  <p className="text-gray-600 dark:text-gray-400">Get concise summaries of lengthy legal sections</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0 dark:text-green-400" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Key Terms Highlighted</h4>
                  <p className="text-gray-600 dark:text-gray-400">Important clauses are automatically highlighted for quick review</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0 dark:text-green-400" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Instant Processing</h4>
                  <p className="text-gray-600 dark:text-gray-400">Get results in seconds, not hours</p>
                </div>
              </div>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              onClick={() => handleProtectedNavigation("/dashboard/role-selection")}
              disabled={isNavigating}
            >
              {isNavigating ? "Redirecting..." : "Try Document Analysis"}
            </motion.button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="bg-gray-50 rounded-xl p-6 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Employment Contract Analysis</h4>
              
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg dark:bg-gray-800">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Clause 3.1 - Salary Terms</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300">Standard salary structure with clear payment terms</span>
                  </div>
                </div>
                
                <div className="p-4 bg-white rounded-lg dark:bg-gray-800">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Clause 5.2 - Termination Notice</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-2">⚠</span>
                    <span className="text-gray-700 dark:text-gray-300">90-day notice period is longer than industry standard</span>
                  </div>
                </div>
                
                <div className="p-4 bg-white rounded-lg dark:bg-gray-800">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Clause 7.1 - Non-Compete</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-2">⚠</span>
                    <span className="text-gray-700 dark:text-gray-300">Broad non-compete clause may limit future opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Risk Assessment Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="mb-20"
      >
        <div className="flex items-center mb-8">
          <Shield className="h-10 w-10 text-green-600 dark:text-green-500 mr-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-green-500">Risk Assessment Dashboard</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <motion.h3 
              className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              Live Analysis
            </motion.h3>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Payment Terms</div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="font-medium text-gray-900 dark:text-white">Low Risk</span>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Liability Clauses</div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="font-medium text-gray-900 dark:text-white">Medium Risk</span>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Termination Rights</div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="font-medium text-gray-900 dark:text-white">High Risk</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-4 rounded-lg dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900 dark:text-white">Overall Risk Score</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium dark:bg-yellow-900/30 dark:text-yellow-400">Medium</span>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-400 mt-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              Color-coded risk scoring for quick identification of potential issues. Identify high-risk clauses at a glance with our intuitive scoring system that highlights areas requiring attention.
            </motion.p>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              <div className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-green-500 mt-1 mr-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Low Risk (Green)</h4>
                  <p className="text-gray-600 dark:text-gray-400">Standard terms that are generally favorable</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-yellow-500 mt-1 mr-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Medium Risk (Yellow)</h4>
                  <p className="text-gray-600 dark:text-gray-400">Terms that require careful consideration</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-red-500 mt-1 mr-3 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">High Risk (Red)</h4>
                  <p className="text-gray-600 dark:text-gray-400">Potentially unfavorable terms that need attention</p>
                </div>
              </div>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 }}
              className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              onClick={() => handleProtectedNavigation("/dashboard/role-selection")}
              disabled={isNavigating}
            >
              {isNavigating ? "Redirecting..." : "Try Risk Assessment"}
            </motion.button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="flex items-center justify-center"
          >
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center dark:bg-gray-700 dark:border-gray-600">
              <span className="text-gray-500 dark:text-gray-400">Risk Assessment Dashboard Visualization</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* AI Assistant Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.0 }}
        className="mb-20"
      >
        <div className="flex items-center mb-8">
          <MessageCircle className="h-10 w-10 text-green-600 dark:text-green-500 mr-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-green-500">AI Assistant</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <motion.h3 
              className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.2 }}
            >
              Ask Questions About Your Document
            </motion.h3>
            <motion.p 
              className="text-gray-600 dark:text-gray-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.3 }}
            >
              Chat with our AI to get specific answers about clauses, terms, and potential implications. It's like having a legal expert available 24/7.
            </motion.p>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.4 }}
            >
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0 dark:text-green-400" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Natural Language Queries</h4>
                  <p className="text-gray-600 dark:text-gray-400">Ask questions in plain English</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0 dark:text-green-400" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Instant Responses</h4>
                  <p className="text-gray-600 dark:text-gray-400">Get immediate answers with relevant context</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0 dark:text-green-400" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Document Context</h4>
                  <p className="text-gray-600 dark:text-gray-400">AI understands your specific document</p>
                </div>
              </div>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.5 }}
              className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              onClick={() => handleProtectedNavigation("/dashboard/ai-chatbot")}
              disabled={isNavigating}
            >
              {isNavigating ? "Redirecting..." : "Try AI Assistant"}
            </motion.button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.6 }}
          >
            <div className="bg-gray-50 rounded-xl p-6 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Legal Assistant</h4>
              
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg dark:bg-gray-800">
                  <div className="font-medium text-gray-900 dark:text-white mb-2">User:</div>
                  <p className="text-gray-700 dark:text-gray-300">What does the termination clause mean?</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg dark:bg-green-900/20">
                  <div className="font-medium text-green-700 dark:text-green-400 mb-2">AI Assistant:</div>
                  <p className="text-gray-700 dark:text-gray-300">
                    The termination clause (Section 8.2) allows either party to end the contract with 30 days written notice. 
                    However, the employer can terminate immediately for cause, while you must provide the full notice period.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* More Powerful Features */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.8 }}
        className="mb-20"
      >
        <motion.h2 
          className="text-3xl font-bold text-gray-900 dark:text-green-500 mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 3.0 }}
        >
          More Powerful Features
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 3.1 }}
        >
          Additional tools to ensure you have complete legal clarity and protection.
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 3.2 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 3.3 }}
            className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition dark:bg-gray-900 dark:hover:shadow-slate-800/50 border border-gray-200 dark:border-gray-700"
          >
            <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-6 dark:bg-green-900/30 dark:text-green-400">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Document Validation</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Verify compliance with Indian laws and regulations</p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>PAN and Aadhaar compliance checks</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Regulatory requirement validation</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Legal format verification</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Missing clause identification</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 3.4 }}
            className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition dark:bg-gray-900 dark:hover:shadow-slate-800/50 border border-gray-200 dark:border-gray-700"
          >
            <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-6 dark:bg-green-900/30 dark:text-green-400">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Multilingual Support</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Available in multiple Indian languages</p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Hindi and English support</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Regional language options</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Cultural context awareness</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Localized legal terminology</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 3.5 }}
            className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition dark:bg-gray-900 dark:hover:shadow-slate-800/50 border border-gray-200 dark:border-gray-700"
          >
            <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-6 dark:bg-green-900/30 dark:text-green-400">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Legal Precedents</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Access relevant case laws and legal guides</p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Similar case law references</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Court ruling insights</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Legal precedent database</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Expert commentary access</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 3.7 }}
        className="bg-gray-50 rounded-2xl p-8 text-center dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
      >
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-green-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 3.8 }}
        >
          Experience the Power of AI Legal Analysis
        </motion.h2>
        <motion.p 
          className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 3.9 }}
        >
          Join thousands of users who trust LegalKlarity to decode complex legal language and protect their interests.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 4.0 }}
        >
          <button 
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition" 
            onClick={() => {
              if (isNavigating) return;
              setIsNavigating(true);
              navigate("/register");
              setTimeout(() => setIsNavigating(false), 1000);
            }}
            disabled={isNavigating}
          >
            {isNavigating ? "Redirecting..." : "Start Free Trial"}
          </button>
          <button 
            className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700" 
            onClick={() => {
              if (isNavigating) return;
              setIsNavigating(true);
              navigate("/demo");
              setTimeout(() => setIsNavigating(false), 1000);
            }}
            disabled={isNavigating}
          >
            {isNavigating ? "Redirecting..." : "Watch Demo"}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeaturesPage;