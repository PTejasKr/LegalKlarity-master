import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, ListTodo, Scale } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  
  const features = [
    {
      name: "Upload Document",
      description: "Upload and analyze legal documents with our AI-powered platform to understand key points, risks, and clauses.",
      icon: FileText,
      path: "/dashboard/role-selection",
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      hoverColor: "hover:bg-blue-100 dark:hover:bg-blue-900/50"
    },
    {
      name: "Document Analysis",
      description: "AI-powered analysis of legal documents with risk scoring and clause breakdown.",
      icon: ListTodo,
      path: "/dashboard/agreement/summary",
      color: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
      hoverColor: "hover:bg-green-100 dark:hover:bg-green-900/50"
    },
    {
      name: "Case Summary",
      description: "Search, review, and analyze landmark legal cases with detailed insights.",
      icon: Scale,
      path: "/dashboard/case/case-details",
      color: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
      hoverColor: "hover:bg-purple-100 dark:hover:bg-purple-900/50"
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Legal Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Access all your legal tools and services in one place
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-primary-600 dark:text-primary-400 font-medium">LK</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-primary-600 to-indigo-700 rounded-xl shadow-md p-8 mb-12"
        >
          <div className="max-w-3xl">
            <motion.h2 
              className="text-3xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Welcome to LegalKlarity
            </motion.h2>
            <motion.p 
              className="text-primary-100 text-xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Simplify your legal journey with AI-powered document analysis and expert guidance.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              onClick={() => navigate("/dashboard/role-selection")}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <motion.h3 
            className="text-2xl font-semibold text-gray-900 dark:text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Legal Tools
          </motion.h3>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  onClick={() => navigate(feature.path)}
                  className={`cursor-pointer rounded-xl p-8 shadow-sm transition-all bg-white border border-gray-200 ${feature.hoverColor} hover:shadow-lg dark:bg-gray-900 dark:border-gray-700 dark:hover:shadow-gray-800/50`}
                >
                  <div className={`w-16 h-16 rounded-lg ${feature.color} flex items-center justify-center mb-6 mx-auto`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 text-center dark:text-white">
                    {feature.name}
                  </h2>
                  <p className="text-gray-600 text-center dark:text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 dark:bg-gray-900 dark:border-gray-700"
          >
            <div className="flex items-center">
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30">
                <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Agreements Analyzed</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">24</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 dark:bg-gray-900 dark:border-gray-700"
          >
            <div className="flex items-center">
              <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/30">
                <Scale className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cases Reviewed</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">18</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 dark:bg-gray-900 dark:border-gray-700"
          >
            <div className="flex items-center">
              <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/30">
                <ListTodo className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Processes Completed</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">32</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 dark:bg-gray-900 dark:border-gray-700"
        >
          <motion.h3 
            className="text-2xl font-semibold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            Recent Activity
          </motion.h3>
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 }}
              className="flex items-start"
            >
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center dark:bg-gray-700">
                  <FileText className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  Rental Agreement Analysis
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Completed 2 hours ago
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              className="flex items-start"
            >
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900/30">
                  <Scale className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  Case: Smith vs. Corporation Ltd.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Viewed yesterday
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
