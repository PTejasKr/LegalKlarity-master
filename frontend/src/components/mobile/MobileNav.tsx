import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700 dark:focus:ring-blue-500"
        aria-expanded="false"
      >
        <span className="sr-only">Open menu</span>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-slate-800 dark:divide-slate-700 dark:ring-slate-700">
            <div className="px-5 pb-6 pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="/assets/legalklarity-logo.svg"
                    alt="LegalKlarity"
                  />
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-300 dark:focus:ring-blue-500"
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <a
                    href="/"
                    className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50 dark:hover:bg-slate-700"
                  >
                    <span className="ml-3 text-base font-medium text-gray-900 dark:text-white">Home</span>
                  </a>
                  <a
                    href="/about"
                    className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50 dark:hover:bg-slate-700"
                  >
                    <span className="ml-3 text-base font-medium text-gray-900 dark:text-white">About</span>
                  </a>
                  <a
                    href="/solutions"
                    className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50 dark:hover:bg-slate-700"
                  >
                    <span className="ml-3 text-base font-medium text-gray-900 dark:text-white">Solutions</span>
                  </a>
                  <a
                    href="/dashboard"
                    className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50 dark:hover:bg-slate-700"
                  >
                    <span className="ml-3 text-base font-medium text-gray-900 dark:text-white">Dashboard</span>
                  </a>
                </nav>
              </div>
            </div>
            <div className="px-5 py-6">
              <a
                href="/login"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                Login
              </a>
              <p className="mt-6 text-center text-base font-medium text-gray-500 dark:text-slate-400">
                Don't have an account?{' '}
                <a href="/register" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                  Register
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}