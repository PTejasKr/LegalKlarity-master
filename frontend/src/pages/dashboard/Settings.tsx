import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../../components/ThemeToggle';

const Settings: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow px-6 py-8">
        <div className="border-b border-gray-200 dark:border-slate-700 pb-5 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="mt-1 text-gray-600 dark:text-slate-400">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Theme Settings Section */}
        <div className="mb-10">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Appearance</h2>
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-md font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
                  {darkMode 
                    ? "Dark mode is currently enabled" 
                    : "Light mode is currently enabled"}
                </p>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Additional settings sections can be added here */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6">
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Notifications</h3>
            <p className="text-sm text-gray-600 dark:text-slate-400">
              Configure how you receive notifications
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6">
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Privacy</h3>
            <p className="text-sm text-gray-600 dark:text-slate-400">
              Manage your privacy and data settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;