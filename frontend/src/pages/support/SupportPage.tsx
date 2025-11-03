import React from 'react';

const SupportPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Support Center</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get help with using LegalKlarity and answers to frequently asked questions.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">How Can We Help?</h2>
          <p className="text-gray-600 dark:text-gray-300">
            For support inquiries, please contact us at support@legalklarity.com or visit our Help Center.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;