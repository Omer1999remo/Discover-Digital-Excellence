import { useEffect, useRef } from 'react';
import { Check, Clock, ShoppingCart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FeaturedDeal as FeaturedDealType } from '@/types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedDealProps {
  deal: FeaturedDealType | null;
  onAddToCart: () => void;
}

export function FeaturedDeal({ deal, onAddToCart }: FeaturedDealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!deal) return;

    const ctx = gsap.context(() => {
      // Background blob animation
      gsap.to('.blob-1', {
        x: 100,
        y: -50,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.blob-2', {
        x: -80,
        y: 60,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center+=100',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center+=100',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [deal]);

  if (!deal) return null;

  return (
    <section
      id="featured"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7000FF]/15 rounded-full blur-[120px]" />
        <div className="blob-2 absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#CCFF00]/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#CCFF00]/20 border border-[#CCFF00]/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#CCFF00]" />
              <span className="text-sm text-[#CCFF00] font-medium">
                Limited Time Offer
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {deal.name}
            </h2>

            <p className="text-lg text-gray-400 mb-8">{deal.description}</p>

            {/* Includes List */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {deal.includes.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#7000FF]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#7000FF]" />
                  </div>
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* Timer */}
            <div className="flex items-center gap-2 text-gray-400 mb-8">
              <Clock className="w-5 h-5" />
              <span>Offer ends in: {deal.endsIn}</span>
            </div>

            {/* Price & CTA */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold text-white">
                  ${deal.price}
                </span>
                <span className="text-2xl text-gray-500 line-through">
                  ${deal.originalPrice}
                </span>
                <span className="px-3 py-1 bg-[#CCFF00] text-black text-sm font-bold rounded-full">
                  -{deal.discount}%
                </span>
              </div>

              <Button
                size="lg"
                onClick={onAddToCart}
                className="bg-[#CCFF00] hover:bg-[#CCFF00]/90 text-black font-bold rounded-full px-8 py-6 text-lg"
                data-cursor
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Grab the Deal
              </Button>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="order-1 lg:order-2">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden border border-[#2A2A2A]">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-[#121212] border border-[#2A2A2A] rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#7000FF]/20 rounded-xl flex items-center justify-center">
                    <Check className="w-6 h-6 text-[#7000FF]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">500+</div>
                    <div className="text-gray-500 text-sm">Assets</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-[#121212] border border-[#2A2A2A] rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#CCFF00]/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#CCFF00]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Premium</div>
                    <div className="text-gray-500 text-sm">Quality</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
