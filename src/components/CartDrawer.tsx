import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCartContext } from '@/contexts/CartContext';
import { useState } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, onCheckout }: CartDrawerProps) {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCartContext();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      onCheckout();
    }, 500);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-[#090909] border-l border-[#2A2A2A] w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="border-b border-[#2A2A2A] pb-4">
          <SheetTitle className="text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#7000FF]" />
            Your Cart
            <span className="text-sm text-gray-500 font-normal">
              ({cartItems.length} items)
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-[#121212] rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 text-sm max-w-xs">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button
                onClick={onClose}
                className="mt-6 bg-[#7000FF] hover:bg-[#7000FF]/90 text-white rounded-full"
                data-cursor
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 bg-[#121212] rounded-xl p-4 border border-[#2A2A2A]"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm mb-1">
                      {item.product.name}
                    </h4>
                    <p className="text-gray-500 text-xs mb-2">
                      by {item.product.author}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">
                        ${item.product.price}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="w-7 h-7 bg-[#1A1A1A] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                          data-cursor
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white text-sm w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="w-7 h-7 bg-[#1A1A1A] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                          data-cursor
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                    data-cursor
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-[#2A2A2A] pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white font-semibold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Tax</span>
              <span className="text-white font-semibold">
                ${(totalPrice * 0.1).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#2A2A2A]">
              <span className="text-white font-semibold">Total</span>
              <span className="text-2xl font-bold text-white">
                ${(totalPrice * 1.1).toFixed(2)}
              </span>
            </div>
            <Button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-[#7000FF] hover:bg-[#7000FF]/90 text-white rounded-full py-6 font-semibold"
              data-cursor
            >
              {isCheckingOut ? (
                'Processing...'
              ) : (
                <>
                  Checkout <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
