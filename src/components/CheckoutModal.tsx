import { useState } from 'react';
import { Check, CreditCard, Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useCartContext } from '@/contexts/CartContext';
import { useAuthContext } from '@/contexts/AuthContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CheckoutModal({ isOpen, onClose, onSuccess }: CheckoutModalProps) {
  const { cartItems, totalPrice, clearCart } = useCartContext();
  const { user } = useAuthContext();
  const [step, setStep] = useState<'cart' | 'payment' | 'success'>('cart');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      clearCart();
    }, 2000);
  };

  const handleClose = () => {
    if (step === 'success') {
      onSuccess();
    }
    onClose();
    setStep('cart');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#090909] border border-[#2A2A2A] max-w-lg p-0 overflow-hidden">
        {step === 'cart' && (
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={onClose}
                className="w-10 h-10 bg-[#121212] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                data-cursor
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-white">Checkout</h2>
            </div>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 bg-[#121212] rounded-xl p-4"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm">
                      {item.product.name}
                    </h4>
                    <p className="text-gray-500 text-xs">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-white font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#2A2A2A] pt-4 space-y-2 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax (10%)</span>
                <span>${(totalPrice * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-lg pt-2">
                <span>Total</span>
                <span>${(totalPrice * 1.1).toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={() => setStep('payment')}
              className="w-full bg-[#7000FF] hover:bg-[#7000FF]/90 text-white rounded-full py-6 font-semibold"
              data-cursor
            >
              Proceed to Payment
            </Button>
          </div>
        )}

        {step === 'payment' && (
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setStep('cart')}
                className="w-10 h-10 bg-[#121212] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                data-cursor
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-white">Payment</h2>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full pl-12 pr-4 py-3 bg-[#121212] border border-[#2A2A2A] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7000FF] transition-colors"
                    defaultValue="4242 4242 4242 4242"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 bg-[#121212] border border-[#2A2A2A] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7000FF] transition-colors"
                    defaultValue="12/25"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">CVC</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full pl-12 pr-4 py-3 bg-[#121212] border border-[#2A2A2A] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7000FF] transition-colors"
                      defaultValue="123"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-[#121212] border border-[#2A2A2A] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7000FF] transition-colors"
                  defaultValue={user?.name || ''}
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Lock className="w-4 h-4 text-gray-500" />
                <span className="text-gray-500 text-xs">
                  Your payment is secured with SSL encryption
                </span>
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#7000FF] hover:bg-[#7000FF]/90 text-white rounded-full py-6 font-semibold mt-4"
                data-cursor
              >
                {isProcessing ? (
                  'Processing...'
                ) : (
                  <>
                    Pay ${(totalPrice * 1.1).toFixed(2)}
                  </>
                )}
              </Button>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-[#CCFF00]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-[#CCFF00]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-400 mb-6">
              Thank you for your purchase. You will receive an email with your download links shortly.
            </p>
            <Button
              onClick={handleClose}
              className="bg-[#7000FF] hover:bg-[#7000FF]/90 text-white rounded-full px-8"
              data-cursor
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
