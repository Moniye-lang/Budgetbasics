import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  rateAgainstUSD: number; // 1 USD = rate units of this currency
  flag: string;
}

export const SUPPORTED_CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rateAgainstUSD: 1.0, flag: '🇺🇸' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', rateAgainstUSD: 1500.0, flag: '🇳🇬' },
  { code: 'EUR', name: 'Euro', symbol: '€', rateAgainstUSD: 0.92, flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', rateAgainstUSD: 0.79, flag: '🇬🇧' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', rateAgainstUSD: 1.36, flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rateAgainstUSD: 1.52, flag: '🇦🇺' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rateAgainstUSD: 83.5, flag: '🇮🇳' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rateAgainstUSD: 155.0, flag: '🇯🇵' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: 'GH₵', rateAgainstUSD: 14.8, flag: '🇬🇭' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', rateAgainstUSD: 130.0, flag: '🇰🇪' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', rateAgainstUSD: 18.2, flag: '🇿🇦' }
];

interface CurrencyContextType {
  currentCurrency: CurrencyInfo;
  setCurrencyByCode: (code: string) => void;
  convert: (amount: number, fromCode: string, toCode: string) => number;
  formatAmount: (amountInUSD: number, targetCode?: string) => string;
  formatRaw: (amount: number, currencyCode: string) => string;
  currencies: CurrencyInfo[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyInfo>(() => {
    const saved = localStorage.getItem('budgetbasics_currency');
    if (saved) {
      const found = SUPPORTED_CURRENCIES.find(c => c.code === saved);
      if (found) return found;
    }
    return SUPPORTED_CURRENCIES[0];
  });

  useEffect(() => {
    localStorage.setItem('budgetbasics_currency', currentCurrency.code);
  }, [currentCurrency]);

  const setCurrencyByCode = (code: string) => {
    const found = SUPPORTED_CURRENCIES.find(c => c.code.toUpperCase() === code.toUpperCase());
    if (found) {
      setCurrentCurrency(found);
    }
  };

  const convert = (amount: number, fromCode: string, toCode: string): number => {
    const from = SUPPORTED_CURRENCIES.find(c => c.code === fromCode) || SUPPORTED_CURRENCIES[0];
    const to = SUPPORTED_CURRENCIES.find(c => c.code === toCode) || SUPPORTED_CURRENCIES[0];

    // Convert to USD first, then to target currency
    const amountInUSD = amount / from.rateAgainstUSD;
    return amountInUSD * to.rateAgainstUSD;
  };

  const formatRaw = (amount: number, currencyCode: string): string => {
    const curr = SUPPORTED_CURRENCIES.find(c => c.code === currencyCode) || currentCurrency;
    const formattedNum = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: curr.rateAgainstUSD > 50 ? 0 : 2,
      minimumFractionDigits: curr.rateAgainstUSD > 50 ? 0 : 2
    }).format(amount);
    return `${curr.symbol}${formattedNum}`;
  };

  const formatAmount = (amountInUSD: number, targetCode?: string): string => {
    const curr = targetCode 
      ? (SUPPORTED_CURRENCIES.find(c => c.code === targetCode) || currentCurrency)
      : currentCurrency;
    const converted = amountInUSD * curr.rateAgainstUSD;
    return formatRaw(converted, curr.code);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currentCurrency,
        setCurrencyByCode,
        convert,
        formatAmount,
        formatRaw,
        currencies: SUPPORTED_CURRENCIES
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
