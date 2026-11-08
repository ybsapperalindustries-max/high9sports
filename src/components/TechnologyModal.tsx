import React from 'react';
import { X, Layers, Wind, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { COMPRESSION_TOP_IMAGE, HERO_IMAGE } from '../data/products';

interface TechnologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShopTech: () => void;
}

export const TechnologyModal: React.FC<TechnologyModalProps> = ({
  isOpen,
  onClose,
  onShopTech
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-4xl bg-[#0F0F14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#14141A] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#CCFF00]" />
            <h2 className="font-display text-2xl font-black text-white uppercase tracking-wider">
              APEX LABS // FABRIC BIO-ENGINEERING
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto max-h-[78vh]">
          
          {/* Hero Banner inside modal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center rounded-xl bg-[#14141A] border border-white/10 p-6 overflow-hidden relative">
            <div className="space-y-3 z-10">
              <div className="text-xs font-mono font-bold text-[#CCFF00] uppercase">
                PROPRIETARY INNOVATION
              </div>
              <h3 className="font-display text-3xl font-black text-white uppercase tracking-tight">
                ApexFlex™ Warp-Knit Weave
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Traditional circular knits break down under repetitive stretching. ApexFlex™ utilizes multi-filament continuous warp chains that adapt dynamically to muscle expansion while maintaining targeted 20-25 mmHg stabilization.
              </p>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
              <img
                src={COMPRESSION_TOP_IMAGE}
                alt="ApexFlex Weave Detail"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* 3 Pillars of Innovation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-[#14141A] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#CCFF00]/10 border border-[#CCFF00]/30 flex items-center justify-center text-[#CCFF00]">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg font-bold text-white uppercase">
                Dual-Zone Stabilization
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Dense compressive bands run along major muscle groups to dampen lateral kinetic oscillation by up to 34%, conserving metabolic energy during sprint phases.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#14141A] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                <Wind className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg font-bold text-white uppercase">
                Bio-Vapor Micro-Channels
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Engineered micro-porosities widen as body temperature increases, rapidly pulling moisture from the dermis to achieve 3.4x faster evaporation than untreated synthetics.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#14141A] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg font-bold text-white uppercase">
                Silver-Ion Matrix
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Permanent ionic silver permanently bonded at the filament level neutralizes bacterial odor proteins at the cellular source, guaranteeing zero permastink across years of usage.
              </p>
            </div>
          </div>

          {/* Testing Standards Table */}
          <div className="rounded-xl bg-[#14141A] border border-white/10 p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase text-zinc-400">
              <span>Apex Quality Benchmarks</span>
              <span className="text-[#CCFF00]">100% Passed Rigorous Testing</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-center">
              <div className="p-3 rounded-lg bg-[#181822] border border-white/5">
                <div className="font-mono text-xl font-bold text-white">1,200N</div>
                <div className="text-[11px] text-zinc-400 uppercase mt-0.5">Tensile Load</div>
              </div>
              <div className="p-3 rounded-lg bg-[#181822] border border-white/5">
                <div className="font-mono text-xl font-bold text-white">500+</div>
                <div className="text-[11px] text-zinc-400 uppercase mt-0.5">Wash Endurance</div>
              </div>
              <div className="p-3 rounded-lg bg-[#181822] border border-white/5">
                <div className="font-mono text-xl font-bold text-white">99.8%</div>
                <div className="text-[11px] text-zinc-400 uppercase mt-0.5">Odor Reduction</div>
              </div>
              <div className="p-3 rounded-lg bg-[#181822] border border-white/5">
                <div className="font-mono text-xl font-bold text-white">UPF 50+</div>
                <div className="text-[11px] text-zinc-400 uppercase mt-0.5">Solar Shield</div>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onClose}
              className="text-xs font-mono text-zinc-400 hover:text-white"
            >
              Close Window
            </button>
            <button
              onClick={() => {
                onClose();
                onShopTech();
              }}
              className="bg-[#CCFF00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider py-3 px-6 rounded-lg flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Shop Apex Technology Gear</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
