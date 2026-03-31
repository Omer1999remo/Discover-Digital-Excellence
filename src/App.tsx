import { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster, toast } from 'sonner';

// Contexts
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';

// Components
import { CustomCursor } from '@/components/CustomCursor';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { ProductModal } from '@/components/ProductModal';
import { AuthModal } from '@/components/AuthModal';
import { CheckoutModal } from '@/components/CheckoutModal';

// Sections
import { Hero } from '@/sections/Hero';
import { ProductGrid } from '@/sections/ProductGrid';
import { FeaturedDeal } from '@/sections/FeaturedDeal';
import { Categories } from '@/sections/Categories';
import { Footer } from '@/sections/Footer';

// Hooks
import { useProducts } from '@/hooks/useProducts';
import { useCartContext } from '@/contexts/CartContext';
import type { Product } from '@/types';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Loading Screen Component
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const tl = gsap.timeline();

    // Pixel assembly animation
    tl.fromTo(
      '.pixel',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        stagger: {
          grid: [5, 5],
          from: 'center',
          amount: 0.5,
        },
        ease: 'back.out(1.7)',
      }
    )
      .to('.pixel', {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        stagger: {
          grid: [5, 5],
          from: 'edges',
          amount: 0.3,
        },
        ease: 'power2.in',
      })
      .to('.loading-screen', {
        opacity: 0,
        duration: 0.5,
        onComplete,
      });
  }, [onComplete]);

  return (
    <div className="loading-screen fixed inset-0 bg-[#090909] z-[9999] flex items-center justify-center">
      <div className="grid grid-cols-5 gap-1">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className={`pixel w-4 h-4 rounded-sm ${
              i === 12 ? 'bg-[#7000FF]' : 'bg-[#CCFF00]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Main App Content
function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const {
    products,
    categories,
    featuredDeal,
    fetchProducts,
  } = useProducts();

  const { addToCart } = useCartContext();

  useEffect(() => {
    fetchProducts({ category: selectedCategory, search: searchQuery });
  }, [selectedCategory, searchQuery, fetchProducts]);

  const handleAddToCart = useCallback(
    async (product: Product) => {
      await addToCart(product);
      toast.success(`${product.name} added to cart!`, {
        description: `$${product.price} - Click to view cart`,
        action: {
          label: 'View Cart',
          onClick: () => setIsCartOpen(true),
        },
      });
    },
    [addToCart]
  );

  const handleAddFeaturedToCart = useCallback(async () => {
    if (featuredDeal) {
      // Create a product from featured deal
      const dealProduct: Product = {
        id: featuredDeal.id,
        name: featuredDeal.name,
        description: featuredDeal.description,
        price: featuredDeal.price,
        originalPrice: featuredDeal.originalPrice,
        category: 'Bundle',
        author: 'PixelMart',
        rating: 5.0,
        reviews: 999,
        image: featuredDeal.image,
        badge: 'Deal',
        tags: ['bundle', 'deal'],
      };
      await handleAddToCart(dealProduct);
    }
  }, [featuredDeal, handleAddToCart]);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
  }, []);

  const handleSearchChange = useCallback((search: string) => {
    setSearchQuery(search);
    setSelectedCategory('All');
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <CustomCursor />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#121212',
            border: '1px solid #2A2A2A',
            color: '#fff',
          },
        }}
      />

      <Navbar
        onSearchClick={() => {
          const searchInput = document.querySelector('input[type="text"]');
          if (searchInput) {
            (searchInput as HTMLInputElement).focus();
          }
        }}
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => setIsAuthOpen(true)}
      />

      <main>
        <Hero
          onSearchChange={handleSearchChange}
          onCategorySelect={handleCategorySelect}
        />

        <ProductGrid
          products={products}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategorySelect}
          onProductClick={setSelectedProduct}
          onAddToCart={handleAddToCart}
          searchQuery={searchQuery}
        />

        <FeaturedDeal deal={featuredDeal} onAddToCart={handleAddFeaturedToCart} />

        <Categories categories={categories} onCategorySelect={handleCategorySelect} />
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}

// App with Providers
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
