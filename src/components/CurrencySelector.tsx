import React, { useState, useRef, useEffect } from 'react';
import { useCurrency, SUPPORTED_CURRENCIES } from '../context/CurrencyContext';
import { ChevronDown, ArrowRightLeft, Check } from 'lucide-react';

interface CurrencySelectorProps {
  onOpenConverterModal?: () => void;
  variant?: 'navbar' | 'compact' | 'pill';
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({ 
  onOpenConverterModal,
  variant = 'navbar' 
}) => {
  const { currentCurrency, setCurrencyByCode } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-[13px] font-bold transition-all cursor-pointer shadow-2xs ${
          variant === 'pill'
            ? 'bg-white/95 border-[#1a1919]/10 hover:border-[#1a1919]/25 text-[#1a1919]'
            : 'bg-white/95 border-[#1a1919]/10 hover:border-[#0922b0]/30 hover:bg-white text-[#1a1919]'
        }`}
        title="Change display currency"
      >
        <span className="text-base leading-none">{currentCurrency.flag}</span>
        <span className="font-mono font-bold text-[#0922b0]">{currentCurrency.code}</span>
        <span className="text-[#1a1919]/60 text-xs font-mono">({currentCurrency.symbol})</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#1a1919]/40 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#0922b0]' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white/98 backdrop-blur-xl rounded-2xl p-2.5 shadow-2xl border border-[#1a1919]/15 z-[100] text-left animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2.5 py-1.5 border-b border-[#1a1919]/10 flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono font-bold text-[#1a1919]/60 uppercase tracking-wider">
              Select Currency
            </span>
            {onOpenConverterModal && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenConverterModal();
                }}
                className="text-[10px] font-bold text-[#0922b0] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <ArrowRightLeft className="w-3 h-3" />
                <span>Converter Tool</span>
              </button>
            )}
          </div>

          <div className="max-h-60 overflow-y-auto space-y-1 custom-scrollbar">
            {SUPPORTED_CURRENCIES.map((c) => {
              const isSelected = c.code === currentCurrency.code;
              return (
                <button
                  key={c.code}
                  onClick={() => {
                    setCurrencyByCode(c.code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-2.5 py-1.5 rounded-xl flex items-center justify-between text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#0922b0]/10 text-[#0922b0] font-bold'
                      : 'hover:bg-[#f0f0f0] text-[#1a1919]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{c.flag}</span>
                    <span className="font-mono font-bold">{c.code}</span>
                    <span className="text-[11px] text-[#1a1919]/60 truncate max-w-[90px]">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-semibold text-[#1a1919]/70">{c.symbol}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#0922b0]" />}
                  </div>
                </button>
              );
            })}
          </div>

          {onOpenConverterModal && (
            <div className="pt-2 mt-1 border-t border-[#1a1919]/10">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenConverterModal();
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Launch Currency Converter ↗</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
