import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Banknote
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const { cart, subtotal, discountAmount, shipping, tax, total, clearCart } = useCart();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Vance',
    email: 'alex.vance@athlete.high9.com',
    phone: '+1 (555) 234-8901',
    address: '742 Evergreen Athletic Boulevard',
    city: 'Boulder',
    postalCode: '80302',
    country: 'United States'
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'express' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 9924');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('784');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState<string>('');

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const generatedOrderId = `H9-${Math.floor(100000 + Math.random() * 900000)}`;
      setCompletedOrderId(generatedOrderId);
      setIsProcessing(false);
      setStep(3);
      clearCart();
      onOrderSuccess(generatedOrderId);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-3xl bg-[#0F0F14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#14141A] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display text-2xl font-black text-white uppercase tracking-wider">
              HIGH<span className="text-[#CCFF00]">9</span> CHECKOUT
            </span>
            <span className="hidden sm:inline text-xs font-mono text-zinc-500">|</span>
            <span className="hidden sm:inline text-xs font-mono text-zinc-400">
              {step === 1 && 'STEP 1: ATHLETE & DISPATCH DETAILS'}
              {step === 2 && 'STEP 2: PAYMENT & VERIFICATION'}
              {step === 3 && 'STEP 3: ORDER CONFIRMATION'}
            </span>
          </div>

          {step !== 3 && (
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Progress Dots (Zero-pill, clean minimal lines) */}
        {step !== 3 && (
          <div className="grid grid-cols-2 text-xs font-mono uppercase tracking-wider border-b border-white/10">
            <div
              className={`py-2 px-6 text-center border-r border-white/10 ${
                step === 1 ? 'bg-[#CCFF00]/10 text-[#CCFF00] font-bold' : 'text-zinc-500'
              }`}
            >
              1. Shipping Address
            </div>
            <div
              className={`py-2 px-6 text-center ${
                step === 2 ? 'bg-[#CCFF00]/10 text-[#CCFF00] font-bold' : 'text-zinc-500'
              }`}
            >
              2. Payment & Method
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto max-h-[75vh]">
          
          {/* STEP 1: Shipping Address */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-white uppercase">
                  Athlete Dispatch Location
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Enter your delivery coordinates for priority tracked express dispatch.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-400 uppercase mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-[#16161D] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-400 uppercase mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-[#16161D] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-400 uppercase mb-1">
                    Athlete Email (For Tracking)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#16161D] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-400 uppercase mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-[#16161D] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono font-bold text-zinc-400 uppercase mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-[#16161D] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-400 uppercase mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-[#16161D] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-mono font-bold text-zinc-400 uppercase mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full bg-[#16161D] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-zinc-400 uppercase mb-1">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full bg-[#16161D] border border-white/15 rounded-lg px-2.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                      <option>Australia</option>
                      <option>Japan</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Order Quick Summary */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span>Total Items: <strong className="text-white">{cart.reduce((s, i) => s + i.quantity, 0)}</strong></span>
                <span>Subtotal: <strong className="text-white tabular-nums">${subtotal}</strong></span>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="bg-[#CCFF00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider py-3 px-6 rounded-lg flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Payment Method */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-white uppercase">
                  Payment Verification
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Select your preferred settlement method. All transactions are 256-bit SSL encrypted.
                </p>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#CCFF00] bg-[#CCFF00]/10 text-white'
                      : 'border-white/10 bg-[#14141A] text-zinc-400 hover:border-white/20'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#CCFF00] mb-2" />
                  <span className="text-xs font-bold uppercase tracking-wider">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('express')}
                  className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'express'
                      ? 'border-[#CCFF00] bg-[#CCFF00]/10 text-white'
                      : 'border-white/10 bg-[#14141A] text-zinc-400 hover:border-white/20'
                  }`}
                >
                  <Lock className="w-5 h-5 text-[#CCFF00] mb-2" />
                  <span className="text-xs font-bold uppercase tracking-wider">Apple / Google Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-[#CCFF00] bg-[#CCFF00]/10 text-white'
                      : 'border-white/10 bg-[#14141A] text-zinc-400 hover:border-white/20'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-[#CCFF00] mb-2" />
                  <span className="text-xs font-bold uppercase tracking-wider">Cash on Delivery</span>
                </button>
              </div>

              {/* Method Forms */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 p-4 rounded-xl bg-[#14141A] border border-white/10">
                  <div>
                    <label className="block text-xs font-mono font-bold text-zinc-400 uppercase mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#181822] border border-white/15 rounded-lg px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#CCFF00]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-zinc-400 uppercase mb-1">
                        Expires
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#181822] border border-white/15 rounded-lg px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#CCFF00]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-zinc-400 uppercase mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-[#181822] border border-white/15 rounded-lg px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#CCFF00]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'express' && (
                <div className="p-4 rounded-xl bg-[#14141A] border border-white/10 text-center space-y-2">
                  <p className="text-xs text-zinc-300">
                    One-touch biometric authorization enabled. Your payment method on file will be charged directly.
                  </p>
                  <span className="inline-block font-mono text-xs text-[#CCFF00]">
                    FAST CHECKOUT VERIFIED
                  </span>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 rounded-xl bg-[#14141A] border border-white/10 space-y-2">
                  <div className="text-xs font-bold text-white uppercase">
                    Cash On Delivery (COD) Terms
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    You can pay the courier in cash upon arrival of your package. Exact cash is appreciated. Free returns and size swaps remain 100% active.
                  </p>
                </div>
              )}

              {/* Order Cost Breakdown Box */}
              <div className="p-4 rounded-xl bg-[#14141A] border border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white tabular-nums">${subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#CCFF00]">
                    <span>VIP Code Discount</span>
                    <span className="tabular-nums">-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Tracked Express Dispatch</span>
                  <span className="text-white tabular-nums">
                    {shipping === 0 ? 'FREE' : `$${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Estimated Tax</span>
                  <span className="text-white tabular-nums">${tax}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold text-white">
                  <span>Authorized Charge</span>
                  <span className="text-base text-[#CCFF00] tabular-nums font-mono">
                    ${total}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Address</span>
                </button>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="bg-[#CCFF00] hover:bg-[#b8e600] text-black font-black text-xs uppercase tracking-wider py-3.5 px-8 rounded-lg flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(204,255,0,0.3)] disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Authorizing Order...</span>
                  ) : (
                    <>
                      <span>Authorize & Place Order (${total})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Confirmation Receipt */}
          {step === 3 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/40 flex items-center justify-center mx-auto text-[#CCFF00]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <div className="text-xs font-mono font-bold text-[#CCFF00] uppercase tracking-widest mb-1">
                  DISPATCH CONFIRMED
                </div>
                <h3 className="font-display text-3xl font-black text-white uppercase tracking-tight">
                  ORDER AUTHORIZED #{completedOrderId}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 max-w-md mx-auto">
                  Confirmation receipt and live tracking link dispatched to <strong className="text-white">{formData.email}</strong>.
                </p>
              </div>

              {/* Receipt Summary Box */}
              <div className="max-w-md mx-auto text-left p-5 rounded-xl bg-[#14141A] border border-white/10 space-y-3 text-xs">
                <div className="flex justify-between font-mono pb-2 border-b border-white/10">
                  <span className="text-zinc-400">Order Reference:</span>
                  <span className="text-[#CCFF00] font-bold">{completedOrderId}</span>
                </div>
                <div className="flex justify-between font-mono pb-2 border-b border-white/10">
                  <span className="text-zinc-400">Recipient:</span>
                  <span className="text-white font-medium">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between font-mono pb-2 border-b border-white/10">
                  <span className="text-zinc-400">Destination:</span>
                  <span className="text-white truncate max-w-[200px]">{formData.city}, {formData.country}</span>
                </div>
                <div className="flex justify-between font-mono pb-2 border-b border-white/10">
                  <span className="text-zinc-400">Estimated Delivery:</span>
                  <span className="text-white font-semibold">2-3 Business Days</span>
                </div>
                <div className="flex justify-between font-mono text-sm font-bold text-white pt-1">
                  <span>Total Settled:</span>
                  <span className="text-[#CCFF00] tabular-nums">${total}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="bg-[#CCFF00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider py-3.5 px-8 rounded-lg cursor-pointer"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
