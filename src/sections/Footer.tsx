import { useState } from 'react';
import {
  Twitter,
  Instagram,
  Github,
  Youtube,
  Send,
  Heart,
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#7000FF] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-white font-bold text-xl">PixelMart</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Premium digital assets for creators who demand the best. Join our community of 50,000+ designers and developers.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-[#121212] border border-[#2A2A2A] rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-[#7000FF]/50 transition-all"
                data-cursor
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#121212] border border-[#2A2A2A] rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-[#7000FF]/50 transition-all"
                data-cursor
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#121212] border border-[#2A2A2A] rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-[#7000FF]/50 transition-all"
                data-cursor
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#121212] border border-[#2A2A2A] rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-[#7000FF]/50 transition-all"
                data-cursor
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h3 className="text-white font-semibold mb-4">Marketplace</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#products"
                  className="text-gray-400 hover:text-white transition-colors"
                  data-cursor
                >
                  All Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  data-cursor
                >
                  UI Kits
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  data-cursor
                >
                  Fonts
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  data-cursor
                >
                  3D Models
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  data-cursor
                >
                  Icon Sets
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  data-cursor
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  data-cursor
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  data-cursor
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  data-cursor
                >
                  Press Kit
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest updates on new products and exclusive deals.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 pr-12 bg-[#121212] border border-[#2A2A2A] rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-[#7000FF] transition-colors text-sm"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#7000FF] hover:bg-[#7000FF]/90 rounded-full flex items-center justify-center transition-colors"
                data-cursor
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
            {isSubscribed && (
              <p className="text-[#CCFF00] text-sm mt-2">Thanks for subscribing!</p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 PixelMart. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
              data-cursor
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
              data-cursor
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
              data-cursor
            >
              Cookie Policy
            </a>
          </div>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by PixelMart Team
          </p>
        </div>
      </div>
    </footer>
  );
}
