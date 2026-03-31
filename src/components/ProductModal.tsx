import { Star, ShoppingCart, Check, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { Product } from '@/types';
import { useState } from 'react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#090909] border border-[#2A2A2A] max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <Badge
                className={`absolute top-4 left-4 ${
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
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="absolute top-4 right-4 w-10 h-10 bg-[#121212]/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
              data-cursor
            >
              <Heart
                className={`w-5 h-5 ${
                  isLiked ? 'fill-red-500 text-red-500' : 'text-white'
                }`}
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[#7000FF] text-sm font-medium mb-1">
                  {product.category}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-400">by {product.author}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-[#CCFF00] text-[#CCFF00]" />
                <span className="text-white font-semibold text-lg">
                  {product.rating}
                </span>
              </div>
              <span className="text-gray-500">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-white">
                ${product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice > product.price && (
                <Badge className="bg-[#CCFF00] text-black">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-400 mb-6">{product.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#121212] border border-[#2A2A2A] rounded-full text-gray-400 text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#7000FF]/20 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-[#7000FF]" />
                </div>
                <span className="text-gray-300 text-sm">
                  Instant digital download
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#7000FF]/20 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-[#7000FF]" />
                </div>
                <span className="text-gray-300 text-sm">
                  Lifetime access & updates
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#7000FF]/20 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-[#7000FF]" />
                </div>
                <span className="text-gray-300 text-sm">
                  Commercial license included
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-auto">
              <Button
                onClick={handleAddToCart}
                className={`flex-1 rounded-full py-6 font-semibold transition-all ${
                  isAdded
                    ? 'bg-[#CCFF00] text-black'
                    : 'bg-[#7000FF] hover:bg-[#7000FF]/90 text-white'
                }`}
                data-cursor
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 mr-2" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                  </>
                )}
              </Button>
              <button
                className="w-14 h-14 bg-[#121212] border border-[#2A2A2A] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                data-cursor
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
