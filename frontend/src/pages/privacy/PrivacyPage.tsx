import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Information We Collect</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We collect information necessary to provide our services, including account information and document data.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">How We Use Your Information</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We use your information to provide and improve our services, communicate with you, and comply with legal obligations.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Data Protection</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We implement appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;