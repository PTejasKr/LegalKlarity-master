import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Please read these terms carefully before using LegalKlarity services.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Acceptance of Terms</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            By accessing or using LegalKlarity, you agree to be bound by these Terms of Service.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Use of Services</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You agree to use our services only for lawful purposes and in accordance with these terms.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Intellectual Property</h2>
          <p className="text-gray-600 dark:text-gray-300">
            All content and materials provided through our services are protected by intellectual property laws.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;