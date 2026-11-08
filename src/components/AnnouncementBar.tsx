import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, Copy, Check } from 'lucide-react';

interface AnnouncementBarProps {
  onShopClick: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onShopClick }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!isVisible) return null;

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('HIGH9VIP');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#121216] border-b border-white/10 text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-2 text-zinc-400">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
          <span>GLOBAL EXPRESS DISPATCH</span>
        </div>

        <div className="flex-1 flex items-center justify-center gap-2 text-center text-zinc-200">
          <span className="font-medium text-white">
            Free Worldwide Express on Orders $75+
          </span>
          <span className="hidden md:inline text-zinc-500">|</span>
          <span className="hidden md:inline text-zinc-300">
            Use code{' '}
            <button
              onClick={handleCopyCode}
              title="Click to copy code"
              className="inline-flex items-center gap-1 font-mono font-bold text-[#CCFF00] hover:underline cursor-pointer bg-white/5 px-1.5 py-0.5 rounded border border-[#CCFF00]/30"
            >
              HIGH9VIP
              {copied ? <Check className="w-3 h-3 text-[#CCFF00]" /> : <Copy className="w-3 h-3 text-zinc-400" />}
            </button>
            {' '}for 15% off
          </span>
          <button
            onClick={onShopClick}
            className="inline-flex items-center gap-1 text-[#CCFF00] font-semibold hover:text-[#e2ff4f] transition-colors ml-2 cursor-pointer underline underline-offset-2"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss announcement"
            className="text-zinc-400 hover:text-white p-1 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
