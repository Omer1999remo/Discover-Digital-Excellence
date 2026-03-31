import { useEffect, useRef, useState } from 'react';
import { Search, Sparkles, Palette, Box, Grid3X3 } from 'lucide-react';
import { gsap } from 'gsap';

interface HeroProps {
  onSearchChange: (search: string) => void;
  onCategorySelect: (category: string) => void;
}

const tags = [
  { name: 'UI Kits', icon: Layout },
  { name: 'Fonts', icon: Type },
  { name: '3D Models', icon: Box },
  { name: 'Icon Sets', icon: Grid3X3 },
  { name: 'Illustrations', icon: Palette },
];

import { Layout, Type } from 'lucide-react';

export function Hero({ onSearchChange, onCategorySelect }: HeroProps) {
  const [searchValue, setSearchValue] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
        .fromTo(
          subheadingRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          searchRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          tagsRef.current?.children || [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchValue);
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTagClick = (tagName: string) => {
    onCategorySelect(tagName);
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#7000FF]/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#CCFF00]/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7000FF]/20 border border-[#7000FF]/30 rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-[#CCFF00]" />
          <span className="text-sm text-[#CCFF00] font-medium">
            Premium Digital Assets
          </span>
        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Discover Digital{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7000FF] to-[#CCFF00]">
            Excellence
          </span>
        </h1>

        {/* Subheading */}
        <p
          ref={subheadingRef}
          className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
        >
          Premium assets for creators who demand the best. UI kits, fonts, 3D models, and more.
        </p>

        {/* Search Bar */}
        <div ref={searchRef} className="max-w-xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for fonts, UI kits, icons..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full px-6 py-4 pl-14 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-[#7000FF] focus:ring-2 focus:ring-[#7000FF]/20 transition-all"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-[#7000FF] hover:bg-[#7000FF]/90 text-white rounded-full font-medium transition-colors"
              data-cursor
            >
              Search
            </button>
          </form>
        </div>

        {/* Tags */}
        <div ref={tagsRef} className="flex flex-wrap justify-center gap-3">
          {tags.map((tag) => {
            const Icon = tag.icon;
            return (
              <button
                key={tag.name}
                onClick={() => handleTagClick(tag.name)}
                className="flex items-center gap-2 px-4 py-2 bg-[#121212] border border-[#2A2A2A] rounded-full text-gray-300 hover:text-white hover:border-[#7000FF]/50 hover:bg-[#7000FF]/10 transition-all"
                data-cursor
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{tag.name}</span>
              </button>
            );
          })}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-16 pt-8 border-t border-[#2A2A2A]">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1">10K+</div>
            <div className="text-sm text-gray-500">Premium Assets</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1">50K+</div>
            <div className="text-sm text-gray-500">Happy Creators</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1">4.9</div>
            <div className="text-sm text-gray-500">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
