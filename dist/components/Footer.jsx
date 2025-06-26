'use client';
import { Zap, Twitter, Linkedin, Github } from 'lucide-react';
export default function Footer() {
    return (<footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
                <Zap className="w-5 h-5 text-white"/>
              </div>
              <span className="text-xl font-bold">AI SEO Helper</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Professional tools to optimize your website for AI search engines, LLMs, and AI-powered discovery. Get found by AI assistants and chatbots.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5"/>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5"/>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5"/>
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              <li><a href="/tools/keyword-analyzer" className="text-gray-400 hover:text-white transition-colors">LLM Keyword Analyzer</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">AI Content Optimizer</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Semantic Analyzer</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">AI Discovery Monitor</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 AI SEO Helper. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>);
}
