import { useEffect, useRef } from 'react';
import { Layout, Type, Box, Image, Smartphone, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Category {
  id: number;
  name: string;
  count: number;
  icon: string;
}

interface CategoriesProps {
  categories: Category[];
  onCategorySelect: (category: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Layout,
  Type,
  Grid,
  Box,
  Image,
  Smartphone,
};

import { Grid } from 'lucide-react';

export function Categories({ categories, onCategorySelect }: CategoriesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.category-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    onCategorySelect(categoryName);
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="categories"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our curated collection of premium digital assets across different categories
          </p>
        </div>

        {/* Categories Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Layout;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className="category-card group relative bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#7000FF]/50 hover:bg-[#7000FF]/5 transition-all duration-300"
                data-cursor
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#1A1A1A] group-hover:bg-[#7000FF]/20 rounded-2xl flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-8 h-8 text-gray-400 group-hover:text-[#7000FF] transition-colors" />
                  </div>
                  <h3 className="text-white font-semibold mb-1 group-hover:text-[#7000FF] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{category.count} items</p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-[#7000FF]" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Featured Categories Row */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#7000FF]/20 to-[#7000FF]/5 border border-[#7000FF]/30 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#7000FF]/30 rounded-xl flex items-center justify-center">
                <Layout className="w-6 h-6 text-[#7000FF]" />
              </div>
              <div>
                <h3 className="text-white font-semibold">UI Kits</h3>
                <p className="text-gray-400 text-sm">Most Popular</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Complete design systems with components, styles, and guidelines for your next project.
            </p>
            <button
              onClick={() => handleCategoryClick('UI Kits')}
              className="text-[#7000FF] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
            >
              Explore UI Kits <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-gradient-to-br from-[#CCFF00]/20 to-[#CCFF00]/5 border border-[#CCFF00]/30 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#CCFF00]/30 rounded-xl flex items-center justify-center">
                <Type className="w-6 h-6 text-[#CCFF00]" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Fonts</h3>
                <p className="text-gray-400 text-sm">Trending Now</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Unique typefaces from independent foundries to make your designs stand out.
            </p>
            <button
              onClick={() => handleCategoryClick('Fonts')}
              className="text-[#CCFF00] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
            >
              Explore Fonts <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center">
                <Box className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">3D Models</h3>
                <p className="text-gray-400 text-sm">New Arrivals</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              High-quality 3D assets for web, mobile, and game development projects.
            </p>
            <button
              onClick={() => handleCategoryClick('3D')}
              className="text-purple-400 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
            >
              Explore 3D <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
