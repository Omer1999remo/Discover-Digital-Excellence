import { useEffect, useRef, useState } from 'react';
import { Star, ShoppingCart, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProductGridProps {
  products: Product[];
  categories: { id: number; name: string; count: number }[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  searchQuery: string;
}

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

function ProductCard({
  product,
  onClick,
  onAddToCart,
  index,
}: {
  product: Product;
  onClick: () => void;
  onAddToCart: (e: React.MouseEvent) => void;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      const threshold = 200;

      if (distance < threshold) {
        const factor = (1 - distance / threshold) * 0.15;
        setTransform({
          x: distanceX * factor,
          y: distanceY * factor,
          rotateY: (distanceX / threshold) * 5,
          rotateX: -(distanceY / threshold) * 5,
        });
      }
    };

    const handleMouseLeave = () => {
      setTransform({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: index * 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative bg-[#121212] rounded-2xl overflow-hidden border border-[#2A2A2A] cursor-pointer transition-all duration-300"
      style={{
        transform: `perspective(1000px) translate3d(${transform.x}px, ${transform.y}px, ${isHovered ? 30 : 0}px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onClick}
      data-cursor
      data-cursor-text="VIEW"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {product.badge && (
          <Badge
            className={`absolute top-3 right-3 ${
              product.badge === 'Sale'
                ? 'bg-red-500'
                : product.badge === 'New'
                ? 'bg-[#CCFF00] text-black'
                : 'bg-[#7000FF]'
            }`}
          >
            {product.badge}
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-[#7000FF] transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-500 text-sm">by {product.author}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[#CCFF00] text-[#CCFF00]" />
            <span className="text-white text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-gray-600 text-sm">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-lg">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-gray-500 text-sm line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={onAddToCart}
            className="bg-[#7000FF] hover:bg-[#7000FF]/90 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
            data-cursor
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({
  products,
  categories,
  selectedCategory,
  onCategoryChange,
  onProductClick,
  onAddToCart,
  searchQuery,
}: ProductGridProps) {
  const [sortBy, setSortBy] = useState('newest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter((product) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    return true;
  });

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Browse Products
            </h2>
            <p className="text-gray-400">
              {filteredProducts.length} products available
            </p>
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-[#121212] border border-[#2A2A2A] rounded-full text-gray-300 hover:text-white transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm">
                {sortOptions.find((o) => o.value === sortBy)?.label}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showSortDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#121212] border border-[#2A2A2A] rounded-xl overflow-hidden z-20">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortDropdown(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                      sortBy === option.value
                        ? 'bg-[#7000FF]/20 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => onCategoryChange('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === 'All'
                ? 'bg-[#7000FF] text-white'
                : 'bg-[#121212] text-gray-400 border border-[#2A2A2A] hover:text-white hover:border-[#7000FF]/50'
            }`}
            data-cursor
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.name
                  ? 'bg-[#7000FF] text-white'
                  : 'bg-[#121212] text-gray-400 border border-[#2A2A2A] hover:text-white hover:border-[#7000FF]/50'
              }`}
              data-cursor
            >
              {category.name}
              <span className="ml-2 text-xs opacity-60">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => onProductClick(product)}
                onAddToCart={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-[#121212] rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
