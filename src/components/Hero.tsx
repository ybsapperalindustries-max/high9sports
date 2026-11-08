import React from 'react';
import { ArrowRight, Zap, Shield, Flame, Activity } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onShopNewArrivals: () => void;
  onExploreMen: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNewArrivals, onExploreMen }) => {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#0B0B0E]">
      {/* Background Subtle Gradient & Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#CCFF00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Aggressive Athletic Messaging */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Clean unboxed category kicker without pill badge */}
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-[#CCFF00] uppercase">
              <span>APEX PERFORMANCE DIVISION</span>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-400">SERIES 09 DROP</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[0.95] text-balance">
              ELEVATE YOUR GAME. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#CCFF00]">
                REACH HIGH9.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-xl font-normal leading-relaxed">
              Engineered with proprietary <strong className="text-white font-semibold">ApexFlex™</strong> warp-knit weave. Built to stabilize high-output muscular oscillation, dispel heat in milliseconds, and redefine human athletic potential.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopNewArrivals}
                className="inline-flex items-center justify-center gap-2.5 bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold text-sm tracking-wider uppercase px-7 py-3.5 rounded-lg transition-all duration-200 hover:shadow-[0_0_24px_rgba(204,255,0,0.35)] cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onExploreMen}
                className="inline-flex items-center justify-center gap-2 bg-[#18181D] hover:bg-[#23232A] text-white border border-white/15 hover:border-white/30 font-semibold text-sm tracking-wider uppercase px-6 py-3.5 rounded-lg transition-all duration-200 cursor-pointer"
              >
                <span>Men's Pro Series</span>
              </button>
            </div>

            {/* Quiet attribute markers */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-zinc-400 font-medium">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#CCFF00]" />
                <span>Graduated 25 mmHg Compression</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#CCFF00]" />
                <span>30-Day On-Track Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#CCFF00]" />
                <span>Anti-Chafe Welded Seams</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-xl overflow-hidden border border-white/10 bg-[#141418] shadow-2xl group">
              
              {/* Media image container with measured contrast scrim */}
              <div className="aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] w-full relative overflow-hidden bg-[#18181D]">
                <img
                  src={HERO_IMAGE}
                  alt="Elite sprinter athlete accelerating in HIGH9SPORTS compression activewear"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Measured Scrim for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Corner accent marker */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded text-[11px] font-mono font-bold tracking-widest text-white uppercase">
                  APEX LAB TESTED
                </div>

                {/* Floating dynamic bottom metric card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-[#0F0F14]/90 backdrop-blur-md border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                        Featured Race Suit
                      </div>
                      <div className="font-display text-lg font-bold text-white uppercase tracking-wide">
                        ApexFlex™ Sprint Suit V9
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-zinc-400">Launch Tier</div>
                      <div className="font-mono font-bold text-[#CCFF00] text-sm tabular-nums">
                        $148
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Technical Metrics Strip below hero split */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
              4-WAY
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#CCFF00]">
              Tensile Recovery Weave
            </div>
            <div className="text-xs text-zinc-400">
              Zero deformation under 1,000+ reps
            </div>
          </div>

          <div className="space-y-1">
            <div className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
              3.4<span className="text-[#CCFF00]">X</span>
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#CCFF00]">
              Vapor Transit Velocity
            </div>
            <div className="text-xs text-zinc-400">
              Immediate core evaporative cooling
            </div>
          </div>

          <div className="space-y-1">
            <div className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
              58<span className="text-[#CCFF00]">G</span>
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#CCFF00]">
              Ultralight Aerodynamic
            </div>
            <div className="text-xs text-zinc-400">
              Featherlight racing specifications
            </div>
          </div>

          <div className="space-y-1">
            <div className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
              100<span className="text-[#CCFF00]">%</span>
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#CCFF00]">
              Squat-Proof Opacity
            </div>
            <div className="text-xs text-zinc-400">
              Dual-layer circular warp knit
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
