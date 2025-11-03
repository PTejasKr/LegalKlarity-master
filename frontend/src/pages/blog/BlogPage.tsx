import React from 'react';

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Legal Insights Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest legal technology trends, industry insights, and LegalKlarity news.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Coming Soon</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We're working on bringing you valuable content about legal technology, AI in law, and industry insights. Check back soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;