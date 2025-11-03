import { Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center">
                <span className="text-white font-bold">LK</span>
              </div>
              <span className="text-xl font-bold">LegalKlarity</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Transforming legal complexity into clarity with AI-powered insights and collaborative tools for modern legal professionals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="/features" className="text-gray-400 hover:text-white transition text-sm">Features</a></li>
              <li><a href="/use-cases" className="text-gray-400 hover:text-white transition text-sm">Use Cases</a></li>
              <li><a href="/resources" className="text-gray-400 hover:text-white transition text-sm">Resources</a></li>
              <li><a href="/demo" className="text-gray-400 hover:text-white transition text-sm">Demo</a></li>
              <li><a href="/pricing" className="text-gray-400 hover:text-white transition text-sm">Pricing</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="/about" className="text-gray-400 hover:text-white transition text-sm">About</a></li>
              <li><a href="/careers" className="text-gray-400 hover:text-white transition text-sm">Careers</a></li>
              <li><a href="/blog" className="text-gray-400 hover:text-white transition text-sm">Blog</a></li>
              <li><a href="/press" className="text-gray-400 hover:text-white transition text-sm">Press</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="/resources" className="text-gray-400 hover:text-white transition text-sm">Legal Guides</a></li>
              <li><a href="/resources" className="text-gray-400 hover:text-white transition text-sm">Case Laws</a></li>
              <li><a href="/resources" className="text-gray-400 hover:text-white transition text-sm">FAQs</a></li>
              <li><a href="/support" className="text-gray-400 hover:text-white transition text-sm">Support</a></li>
              <li><a href="/api" className="text-gray-400 hover:text-white transition text-sm">API</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} LegalKlarity. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</a>
            <a href="/terms" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</a>
            <a href="/security" className="text-gray-400 hover:text-white text-sm transition">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
