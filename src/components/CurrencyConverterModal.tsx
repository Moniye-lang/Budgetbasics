import React, { useState } from 'react';
import { 
  X, 
  ArrowRightLeft, 
  Sparkles, 
  TrendingUp, 
  Check, 
  RefreshCw, 
  Info 
} from 'lucide-react';
import { useCurrency, SUPPORTED_CURRENCIES } from '../context/CurrencyContext';

interface CurrencyConverterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CurrencyConverterModal: React.FC<CurrencyConverterModalProps> = ({ isOpen, onClose }) => {
  const { currentCurrency, setCurrencyByCode, convert, formatRaw } = useCurrency();
  
  const [amount, setAmount] = useState<number>(100);
  const [fromCode, setFromCode] = useState<string>(currentCurrency.code);
  const [toCode, setToCode] = useState<string>(currentCurrency.code === 'USD' ? 'NGN' : 'USD');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fromCurr = SUPPORTED_CURRENCIES.find(c => c.code === fromCode) || SUPPORTED_CURRENCIES[0];
  const toCurr = SUPPORTED_CURRENCIES.find(c => c.code === toCode) || SUPPORTED_CURRENCIES[1];

  const convertedResult = convert(amount, fromCode, toCode);
  const singleUnitRate = convert(1, fromCode, toCode);
  const inverseUnitRate = convert(1, toCode, fromCode);

  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  const handleApplyAsActive = () => {
    setCurrencyByCode(toCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presetAmounts = [25, 50, 100, 250, 500, 1000];

  return (
    <div className="fixed inset-0 z-[600] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-[#1a1919]/15 shadow-2xl relative space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1a1919]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0922b0]/10 text-[#0922b0] flex items-center justify-center font-bold">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#1a1919] tracking-tight">Student Currency Converter</h3>
              <p className="text-xs text-[#1a1919]/60 font-medium">Real-time exchange & international allowance calculator</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 text-[#1a1919]/60 hover:text-[#1a1919] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-[#1a1919] uppercase tracking-wider font-mono">
              Amount to Convert
            </label>
            <span className="text-[11px] text-[#1a1919]/50 font-medium">
              Active: <span className="font-bold text-[#0922b0]">{fromCurr.symbol} ({fromCurr.code})</span>
            </span>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold text-lg text-[#1a1919]/40">
              {fromCurr.symbol}
            </span>
            <input
              type="number"
              min="0"
              step="any"
              value={amount || ''}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#f0f0f0] border border-transparent focus:border-[#0922b0] focus:bg-white text-lg font-mono font-bold text-[#1a1919] focus:outline-none transition-all shadow-inner"
              placeholder="100"
            />
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2 mt-2.5 overflow-x-auto pb-1">
            <span className="text-[10px] font-mono font-bold text-[#1a1919]/40 uppercase shrink-0">Presets:</span>
            {presetAmounts.map(val => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
                  amount === val 
                    ? 'bg-[#0922b0] text-white shadow-2xs' 
                    : 'bg-[#f0f0f0] hover:bg-slate-200 text-[#1a1919]/70'
                }`}
              >
                {fromCurr.symbol}{val}
              </button>
            ))}
          </div>
        </div>

        {/* Currency Selectors & Swap Button */}
        <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center">
          {/* From Currency */}
          <div className="sm:col-span-5 space-y-1">
            <label className="text-[11px] font-bold text-[#1a1919]/70 block font-mono">FROM</label>
            <div className="relative">
              <select
                value={fromCode}
                onChange={(e) => setFromCode(e.target.value)}
                className="w-full px-3.5 py-3 rounded-2xl bg-[#f0f0f0] hover:bg-slate-200/70 border border-transparent focus:border-[#0922b0] focus:bg-white text-xs font-bold text-[#1a1919] focus:outline-none transition-all cursor-pointer font-mono"
              >
                {SUPPORTED_CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} ({c.symbol}) - {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="sm:col-span-1 flex justify-center pt-3 sm:pt-4">
            <button
              type="button"
              onClick={handleSwap}
              className="p-3 rounded-2xl bg-[#0922b0]/10 hover:bg-[#0922b0] text-[#0922b0] hover:text-white border border-[#0922b0]/20 transition-all duration-200 shadow-2xs cursor-pointer hover:rotate-180"
              title="Swap Currencies"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* To Currency */}
          <div className="sm:col-span-5 space-y-1">
            <label className="text-[11px] font-bold text-[#1a1919]/70 block font-mono">TO</label>
            <div className="relative">
              <select
                value={toCode}
                onChange={(e) => setToCode(e.target.value)}
                className="w-full px-3.5 py-3 rounded-2xl bg-[#f0f0f0] hover:bg-slate-200/70 border border-transparent focus:border-[#0eb02c] focus:bg-white text-xs font-bold text-[#1a1919] focus:outline-none transition-all cursor-pointer font-mono"
              >
                {SUPPORTED_CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} ({c.symbol}) - {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Converted Output Display Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0922b0]/5 via-white to-[#0eb02c]/5 border border-[#0922b0]/20 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-[#1a1919]/60 font-mono">
            <span>Converted Total</span>
            <div className="flex items-center gap-1.5 text-[#0eb02c] font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>1 {fromCurr.code} = {formatRaw(singleUnitRate, toCurr.code)}</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-black font-mono text-[#0922b0] tracking-tight">
              {formatRaw(convertedResult, toCurr.code)}
            </span>
            <span className="text-sm font-bold text-[#1a1919]/60 font-mono">
              {toCurr.code}
            </span>
          </div>

          <div className="pt-2 border-t border-[#1a1919]/10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#1a1919]/60">
            <span className="font-mono text-[11px]">
              Inverse: 1 {toCurr.code} = {formatRaw(inverseUnitRate, fromCurr.code)}
            </span>

            <button
              onClick={handleApplyAsActive}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#1a1919]/10 hover:border-[#0922b0] text-[#1a1919] text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#0eb02c]" />
                  <span className="text-[#0eb02c]">Applied Across Site!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#0922b0]" />
                  <span>Set {toCurr.code} as Site Default</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Student Purchasing Power Insights */}
        <div className="p-4 rounded-2xl bg-[#f0f0f0] border border-[#1a1919]/10 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1a1919]">
            <Info className="w-4 h-4 text-[#0922b0]" />
            <span>Student Purchasing Power Reference ({toCurr.code})</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium">
            <div className="p-2.5 rounded-xl bg-white border border-[#1a1919]/5">
              <div className="text-[10px] text-[#1a1919]/50 font-mono">Meal / Groceries</div>
              <div className="font-bold text-[#1a1919] font-mono mt-0.5">{formatRaw(convert(15, 'USD', toCode), toCode)}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#1a1919]/5">
              <div className="text-[10px] text-[#1a1919]/50 font-mono">Textbook Pack</div>
              <div className="font-bold text-[#1a1919] font-mono mt-0.5">{formatRaw(convert(60, 'USD', toCode), toCode)}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#1a1919]/5">
              <div className="text-[10px] text-[#1a1919]/50 font-mono">Campus Transit</div>
              <div className="font-bold text-[#1a1919] font-mono mt-0.5">{formatRaw(convert(45, 'USD', toCode), toCode)}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#1a1919]/5">
              <div className="text-[10px] text-[#1a1919]/50 font-mono">Monthly Cushion</div>
              <div className="font-bold text-[#0eb02c] font-mono mt-0.5">{formatRaw(convert(100, 'USD', toCode), toCode)}</div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#1a1919]/10">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
