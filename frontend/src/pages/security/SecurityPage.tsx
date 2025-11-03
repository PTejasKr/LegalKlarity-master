import React from 'react';

const SecurityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Security</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We take the security of your data seriously. Learn about our security measures and practices.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Data Encryption</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We use industry-standard encryption to protect your data both in transit and at rest.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Access Controls</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We implement strict access controls to ensure only authorized personnel can access your information.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Regular Audits</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We conduct regular security audits and assessments to maintain the highest level of protection for your data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;