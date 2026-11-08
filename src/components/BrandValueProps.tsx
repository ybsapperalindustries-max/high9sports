import React from 'react';
import { Layers, Wind, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';
import { BRAND_VALUES } from '../data/products';

export const BrandValueProps: React.FC = () => {
  const icons = [
    <Layers className="w-6 h-6 text-[#CCFF00]" key="layer" />,
    <Wind className="w-6 h-6 text-[#CCFF00]" key="wind" />,
    <ShieldCheck className="w-6 h-6 text-[#CCFF00]" key="shield" />,
    <Truck className="w-6 h-6 text-[#CCFF00]" key="truck" />
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#0B0B0E] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Trust Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase mb-2">
            THE HIGH9 ARCHITECTURE
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            ENGINEERED WITHOUT COMPROMISE
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 leading-relaxed">
            Every fiber, bonded seam, and tension band is designed to enhance biometric output and eliminate thermal fatigue in demanding competitive environments.
          </p>
        </div>

        {/* 4-Column Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRAND_VALUES.map((val, idx) => (
            <div
              key={val.title}
              className="p-6 sm:p-7 rounded-xl bg-[#121217] border border-white/10 hover:border-[#CCFF00]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-[#CCFF00]/10 transition-all">
                  {icons[idx]}
                </div>
                
                <h3 className="font-display text-xl font-bold text-white uppercase tracking-wide group-hover:text-[#CCFF00] transition-colors">
                  {val.title}
                </h3>

                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {val.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#CCFF00] uppercase">
                <span>BENCHMARK</span>
                <span className="font-bold text-white tabular-nums">{val.metric}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Athletic Trust Banner */}
        <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-[#14141A] via-[#1A1A22] to-[#14141A] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/30 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-[#CCFF00]" />
            </div>
            <div>
              <div className="text-sm font-bold text-white uppercase tracking-wider">
                30-Day On-Track Guarantee
              </div>
              <div className="text-xs text-zinc-400 mt-0.5">
                Train in it for 30 full days. If it doesn't upgrade your output, return it for a 100% full refund.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 shrink-0 text-xs font-mono text-zinc-300">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#CCFF00]" />
              <span>Free Exchanges</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
              <span>Certified IAAF Tested</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
