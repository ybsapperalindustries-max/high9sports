import React, { useState } from 'react';
import { X, Ruler, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [gender, setGender] = useState<'men' | 'women'>('men');

  if (!isOpen) return null;

  const menDataIn = [
    { size: 'XS', chest: '33 - 35', waist: '27 - 29', hips: '33 - 35' },
    { size: 'S', chest: '36 - 38', waist: '30 - 32', hips: '36 - 38' },
    { size: 'M', chest: '39 - 41', waist: '33 - 35', hips: '39 - 41' },
    { size: 'L', chest: '42 - 44', waist: '36 - 38', hips: '42 - 44' },
    { size: 'XL', chest: '45 - 48', waist: '39 - 42', hips: '45 - 48' },
    { size: 'XXL', chest: '49 - 52', waist: '43 - 46', hips: '49 - 52' }
  ];

  const menDataCm = [
    { size: 'XS', chest: '84 - 89', waist: '68 - 74', hips: '84 - 89' },
    { size: 'S', chest: '91 - 97', waist: '76 - 81', hips: '91 - 97' },
    { size: 'M', chest: '99 - 104', waist: '84 - 89', hips: '99 - 104' },
    { size: 'L', chest: '107 - 112', waist: '91 - 97', hips: '107 - 112' },
    { size: 'XL', chest: '114 - 122', waist: '99 - 107', hips: '114 - 122' },
    { size: 'XXL', chest: '124 - 132', waist: '109 - 117', hips: '124 - 132' }
  ];

  const womenDataIn = [
    { size: 'XS', bust: '31 - 33', waist: '24 - 26', hips: '34 - 36' },
    { size: 'S', bust: '34 - 36', waist: '27 - 29', hips: '37 - 39' },
    { size: 'M', bust: '37 - 39', waist: '30 - 32', hips: '40 - 42' },
    { size: 'L', bust: '40 - 42', waist: '33 - 35', hips: '43 - 45' },
    { size: 'XL', bust: '43 - 45', waist: '36 - 38', hips: '46 - 48' }
  ];

  const womenDataCm = [
    { size: 'XS', bust: '79 - 84', waist: '61 - 66', hips: '86 - 91' },
    { size: 'S', bust: '86 - 91', waist: '69 - 74', hips: '94 - 99' },
    { size: 'M', bust: '94 - 99', waist: '76 - 81', hips: '102 - 107' },
    { size: 'L', bust: '102 - 107', waist: '84 - 89', hips: '109 - 114' },
    { size: 'XL', bust: '109 - 114', waist: '91 - 97', hips: '117 - 122' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#0F0F14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#CCFF00]" />
            <h3 className="font-display text-2xl font-black text-white uppercase">
              Athletic Sizing Matrix
            </h3>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gender & Unit Toggles */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-1 p-1 bg-[#16161D] rounded-lg border border-white/10">
            <button
              onClick={() => setGender('men')}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded ${
                gender === 'men' ? 'bg-[#CCFF00] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Men's
            </button>
            <button
              onClick={() => setGender('women')}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded ${
                gender === 'women' ? 'bg-[#CCFF00] text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Women's
            </button>
          </div>

          <div className="flex gap-1 p-1 bg-[#16161D] rounded-lg border border-white/10 font-mono text-xs">
            <button
              onClick={() => setUnit('in')}
              className={`px-2.5 py-1 rounded ${
                unit === 'in' ? 'bg-white/20 text-white font-bold' : 'text-zinc-400'
              }`}
            >
              INCHES
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-2.5 py-1 rounded ${
                unit === 'cm' ? 'bg-white/20 text-white font-bold' : 'text-zinc-400'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Sizing Table with Tabular Numerals */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 uppercase">
                <th className="py-2.5 pr-4">Size</th>
                <th className="py-2.5 px-4">{gender === 'men' ? 'Chest' : 'Bust'} ({unit})</th>
                <th className="py-2.5 px-4">Waist ({unit})</th>
                <th className="py-2.5 pl-4">Hips ({unit})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {gender === 'men'
                ? (unit === 'in' ? menDataIn : menDataCm).map((row) => (
                    <tr key={row.size} className="hover:bg-white/5 transition-colors">
                      <td className="py-2.5 pr-4 font-bold text-[#CCFF00]">{row.size}</td>
                      <td className="py-2.5 px-4 tabular-nums">{row.chest}</td>
                      <td className="py-2.5 px-4 tabular-nums">{row.waist}</td>
                      <td className="py-2.5 pl-4 tabular-nums">{row.hips}</td>
                    </tr>
                  ))
                : (unit === 'in' ? womenDataIn : womenDataCm).map((row) => (
                    <tr key={row.size} className="hover:bg-white/5 transition-colors">
                      <td className="py-2.5 pr-4 font-bold text-[#CCFF00]">{row.size}</td>
                      <td className="py-2.5 px-4 tabular-nums">{row.bust}</td>
                      <td className="py-2.5 px-4 tabular-nums">{row.waist}</td>
                      <td className="py-2.5 pl-4 tabular-nums">{row.hips}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Fit Recommendation Note */}
        <div className="p-4 rounded-xl bg-[#14141A] border border-white/10 space-y-2 text-xs">
          <div className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Check className="w-4 h-4 text-[#CCFF00]" />
            <span>Athletic Fit Advice</span>
          </div>
          <p className="text-zinc-400 leading-relaxed">
            Our compression garments are engineered to fit tight against muscle bellies. If your measurements are on the border, order the smaller size for a tighter compression profile or the larger size for a relaxed athletic fit.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#18181F] hover:bg-[#23232C] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg border border-white/10 transition-colors"
        >
          Got It, Close Guide
        </button>

      </div>
    </div>
  );
};
