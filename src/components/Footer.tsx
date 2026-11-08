import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Mail, Instagram, Twitter, Youtube, Facebook } from 'lucide-react';
import { CategoryType } from '../types';

interface FooterProps {
  onNavigate: (tab: string, category?: CategoryType) => void;
  onOpenTech: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTech }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid athlete email address');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#08080A] border-t border-white/10 text-zinc-400 text-xs">
      {/* Newsletter Signup Strip */}
      <div className="border-b border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md text-center md:text-left">
            <div className="text-xs font-mono font-bold text-[#CCFF00] uppercase tracking-wider mb-1">
              APEX ATHLETE DISPATCH
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              JOIN THE HIGH9 INNER ROSTER
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Receive private drop alerts, aerodynamic lab reports, and exclusive 15% VIP access codes.
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[320px] max-w-md">
            {subscribed ? (
              <div className="flex items-center gap-2 p-3.5 rounded-lg bg-[#CCFF00]/10 border border-[#CCFF00]/40 text-[#CCFF00] font-mono text-xs">
                <Check className="w-4 h-4 shrink-0" />
                <span>Roster Confirmed. Welcome to HIGH9. Code HIGH9VIP is ready.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="Enter athlete email..."
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      className="w-full bg-[#121217] border border-white/15 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#CCFF00]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#CCFF00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {error && (
                  <p className="text-[11px] text-red-400 font-mono">{error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <span className="font-display text-2xl font-black text-white uppercase tracking-wider">
              HIGH<span className="text-[#CCFF00]">9</span>SPORTS
            </span>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Engineered activewear and high-compression apparel for athletes who refuse to accept biological plateaus. Tested in high-velocity wind tunnels and elite weight rooms.
            </p>
            <div className="flex items-center gap-4 text-zinc-400">
              <a href="#instagram" className="hover:text-[#CCFF00] transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#twitter" className="hover:text-[#CCFF00] transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#youtube" className="hover:text-[#CCFF00] transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#facebook" className="hover:text-[#CCFF00] transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Shop Collections
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('shop', 'all')}
                  className="hover:text-[#CCFF00] transition-colors text-left"
                >
                  All Activewear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'men')}
                  className="hover:text-[#CCFF00] transition-colors text-left"
                >
                  Men's Compression
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'women')}
                  className="hover:text-[#CCFF00] transition-colors text-left"
                >
                  Women's Activewear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'accessories')}
                  className="hover:text-[#CCFF00] transition-colors text-left"
                >
                  Bags & Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Apex Labs & Innovation */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Apex Labs
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenTech} className="hover:text-[#CCFF00] transition-colors text-left">
                  ApexFlex™ Weave
                </button>
              </li>
              <li>
                <button onClick={onOpenTech} className="hover:text-[#CCFF00] transition-colors text-left">
                  Bio-Adaptive Venting
                </button>
              </li>
              <li>
                <button onClick={onOpenTech} className="hover:text-[#CCFF00] transition-colors text-left">
                  Tensile Lab Reports
                </button>
              </li>
              <li>
                <button onClick={onOpenTech} className="hover:text-[#CCFF00] transition-colors text-left">
                  Silver-Ion Antimicrobial
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Support & Guarantee
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-zinc-400">Track Order Status</span>
              </li>
              <li>
                <span className="text-zinc-400">30-Day On-Track Trial</span>
              </li>
              <li>
                <span className="text-zinc-400">Prepaid Returns & Swaps</span>
              </li>
              <li>
                <span className="text-zinc-400">Athletic Sizing Concierge</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Security */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} HIGH9SPORTS INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Performance</span>
            <span>Accessibility</span>
            <span className="flex items-center gap-1 text-[#CCFF00]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SSL SECURED</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
