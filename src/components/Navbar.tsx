import { useState, useEffect } from 'react';
import { ShoppingBag, User, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCartContext } from '@/contexts/CartContext';
import { useAuthContext } from '@/contexts/AuthContext';
import { gsap } from 'gsap';

interface NavbarProps {
  onSearchClick: () => void;
  onCartClick: () => void;
  onAuthClick: () => void;
}

export function Navbar({ onSearchClick, onCartClick, onAuthClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { totalItems } = useCartContext();
  const { user, isAuthenticated, logout } = useAuthContext();

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(
      '.navbar-container',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' }
    );
    setIsVisible(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`navbar-container fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[rgba(18,18,18,0.95)] backdrop-blur-xl border border-[#2A2A2A]'
            : 'bg-[rgba(18,18,18,0.6)] backdrop-blur-md border border-[#2A2A2A]/50'
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 mr-4"
        >
          <div className="w-8 h-8 bg-[#7000FF] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="text-white font-bold text-lg hidden sm:block">PixelMart</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <button
            onClick={() => scrollToSection('products')}
            className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
          >
            Products
          </button>
          <button
            onClick={() => scrollToSection('categories')}
            className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
          >
            Categories
          </button>
          <button
            onClick={() => scrollToSection('featured')}
            className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
          >
            Deals
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={onSearchClick}
            className="p-2 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
            data-cursor
            data-cursor-text=""
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onCartClick}
            className="p-2 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/5 relative"
            data-cursor
            data-cursor-text=""
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#CCFF00] text-black text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300 hidden lg:block">{user?.name}</span>
              <button
                onClick={logout}
                className="p-2 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Button
              onClick={onAuthClick}
              className="bg-[#7000FF] hover:bg-[#7000FF]/90 text-white rounded-full px-4 py-2 text-sm font-medium"
              data-cursor
            >
              Sign In
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/5 md:hidden">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#090909] border-[#2A2A2A] w-[300px]">
              <div className="flex flex-col gap-6 mt-8">
                <button
                  onClick={() => scrollToSection('products')}
                  className="text-left text-lg text-gray-300 hover:text-white transition-colors"
                >
                  Products
                </button>
                <button
                  onClick={() => scrollToSection('categories')}
                  className="text-left text-lg text-gray-300 hover:text-white transition-colors"
                >
                  Categories
                </button>
                <button
                  onClick={() => scrollToSection('featured')}
                  className="text-left text-lg text-gray-300 hover:text-white transition-colors"
                >
                  Deals
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
