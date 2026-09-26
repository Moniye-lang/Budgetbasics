import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  RotateCcw
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
  category: 'Needs' | 'Wants' | 'Savings';
}

interface ExpenseTablePageProps {
  onBackToHome?: () => void;
  onNavigateToPlanner?: () => void;
}

export const ExpenseTablePage: React.FC<ExpenseTablePageProps> = () => {
  const { currentCurrency, formatAmount } = useCurrency();

  const [monthlyBudgetLimit, setMonthlyBudgetLimit] = useState<number>(1200);
  const [filterCategory, setFilterCategory] = useState<'All' | 'Needs' | 'Wants' | 'Savings'>('All');
  const [copied, setCopied] = useState<boolean>(false);

  // Form input state
  const [newExpName, setNewExpName] = useState('');
  const [newExpAmount, setNewExpAmount] = useState('');
  const [newExpCat, setNewExpCat] = useState<'Needs' | 'Wants' | 'Savings'>('Needs');

  // Initial expenses list
  const defaultExpenses: ExpenseItem[] = [
    { id: '1', name: 'Campus Dorm / Rent Share', amount: 550, category: 'Needs' },
    { id: '2', name: 'Weekly Groceries & Meal Prep', amount: 220, category: 'Needs' },
    { id: '3', name: 'Metro / Campus Transit Pass', amount: 65, category: 'Needs' },
    { id: '4', name: 'Weekend Dining & Coffee Runs', amount: 120, category: 'Wants' },
    { id: '5', name: 'Music & Streaming Subscriptions', amount: 20, category: 'Wants' },
    { id: '6', name: 'Emergency Cushion Deposit', amount: 150, category: 'Savings' }
  ];

  const [expensesList, setExpensesList] = useState<ExpenseItem[]>(defaultExpenses);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpName.trim() || !newExpAmount) return;
    const item: ExpenseItem = {
      id: `exp-${Date.now()}`,
      name: newExpName.trim(),
      amount: parseFloat(newExpAmount) || 0,
      category: newExpCat
    };
    setExpensesList(prev => [...prev, item]);
    setNewExpName('');
    setNewExpAmount('');
  };

  const handleRemoveExpense = (id: string) => {
    setExpensesList(prev => prev.filter(item => item.id !== id));
  };

  const handleReset = () => {
    setExpensesList(defaultExpenses);
  };

  // Calculations
  const filteredList = filterCategory === 'All' 
    ? expensesList 
    : expensesList.filter(item => item.category === filterCategory);

  const totalNeeds = expensesList
    .filter(i => i.category === 'Needs')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalWants = expensesList
    .filter(i => i.category === 'Wants')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalSavings = expensesList
    .filter(i => i.category === 'Savings')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const grandTotal = totalNeeds + totalWants + totalSavings;
  const remainingBudget = monthlyBudgetLimit - grandTotal;
  const isOverBudget = remainingBudget < 0;

  const handleCopySummary = () => {
    const sym = currentCurrency.symbol;
    let text = `📋 BudgetBasics Expense Log (${currentCurrency.code}):\n`;
    text += `Target Monthly Budget: ${sym}${monthlyBudgetLimit}\n`;
    text += `Grand Total Logged: ${sym}${grandTotal} (${remainingBudget >= 0 ? `+${sym}${remainingBudget} left` : `⚠️ OVER by ${sym}${Math.abs(remainingBudget)}`})\n\n`;
    text += `Breakdown:\n`;
    text += `• Needs: ${sym}${totalNeeds} (${Math.round((totalNeeds / (grandTotal || 1)) * 100)}%)\n`;
    text += `• Wants: ${sym}${totalWants} (${Math.round((totalWants / (grandTotal || 1)) * 100)}%)\n`;
    text += `• Savings: ${sym}${totalSavings} (${Math.round((totalSavings / (grandTotal || 1)) * 100)}%)\n\n`;
    text += `Logged Items:\n`;
    expensesList.forEach((item, idx) => {
      text += `${idx + 1}. [${item.category}] ${item.name} - ${sym}${item.amount}\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1a1919] font-sans antialiased pb-24 relative selection:bg-[#0922b0]/20 selection:text-[#0922b0]">
      
      {/* Sub-Header Breadcrumb */}
      <div className="border-b border-[#1a1919]/8 bg-white/70 backdrop-blur-md sticky top-[68px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#0922b0] bg-[#0922b0]/10 px-2.5 py-1 rounded-lg border border-[#0922b0]/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0922b0] animate-ping" />
              02 · Practice Studio
            </span>
            <span className="text-xs text-[#1a1919]/60 font-medium">
              / Live Expense Planner Table
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0922b0] bg-white px-3 py-1.5 rounded-xl border border-[#1a1919]/10 shadow-xs">
            LIVE TRACKER
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* 1. Hero Introduction */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-[#1a1919]/10 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0922b0]/10 border border-[#0922b0]/20 text-xs font-mono font-bold text-[#0922b0]">
              <CreditCard className="w-3.5 h-3.5" />
              <span>INTERACTIVE SESSION TRACKER</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1a1919] leading-tight">
              Live Expense <span className="text-[#0922b0]">Planner Table</span>
            </h1>
            <p className="text-sm sm:text-base text-[#1a1919]/75 leading-relaxed font-medium">
              Log your individual monthly outlays item-by-item, tag them into Needs (50%), Wants (30%), or Savings (20%), and monitor your remaining semester cash flow in real time.
            </p>
          </div>
        </section>

        {/* 2. Top Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Target Limit */}
          <div className="bg-white rounded-2xl p-5 border border-[#1a1919]/10 shadow-xs space-y-2">
            <span className="text-xs font-mono text-[#1a1919]/60 uppercase font-bold">Target Allowance Limit</span>
            <div className="text-2xl font-black text-[#1a1919]">{formatAmount(monthlyBudgetLimit)}</div>
            <div className="flex items-center gap-2">
              <input 
                type="number"
                value={monthlyBudgetLimit}
                onChange={(e) => setMonthlyBudgetLimit(Number(e.target.value) || 0)}
                className="w-full text-xs font-bold px-2 py-1 bg-slate-100 rounded-lg border border-[#1a1919]/10 focus:outline-none focus:border-[#0922b0]"
              />
            </div>
          </div>

          {/* Needs Outlay */}
          <div className="bg-blue-50/60 rounded-2xl p-5 border border-[#0922b0]/20 shadow-xs space-y-1">
            <span className="text-xs font-mono text-[#0922b0] uppercase font-bold">Needs (50% Target)</span>
            <div className="text-2xl font-black text-[#0922b0]">{formatAmount(totalNeeds)}</div>
            <div className="text-[11px] text-[#1a1919]/60">
              {grandTotal > 0 ? `${Math.round((totalNeeds / grandTotal) * 100)}% of total logged` : '0%'}
            </div>
          </div>

          {/* Wants Outlay */}
          <div className="bg-emerald-50/60 rounded-2xl p-5 border border-[#0eb02c]/20 shadow-xs space-y-1">
            <span className="text-xs font-mono text-[#0eb02c] uppercase font-bold">Wants (30% Target)</span>
            <div className="text-2xl font-black text-[#0eb02c]">{formatAmount(totalWants)}</div>
            <div className="text-[11px] text-[#1a1919]/60">
              {grandTotal > 0 ? `${Math.round((totalWants / grandTotal) * 100)}% of total logged` : '0%'}
            </div>
          </div>

          {/* Remaining Balance */}
          <div className={`rounded-2xl p-5 border shadow-xs space-y-1 ${
            isOverBudget 
              ? 'bg-red-50 border-[#d12828]/30' 
              : 'bg-white border-[#1a1919]/10'
          }`}>
            <span className="text-xs font-mono text-[#1a1919]/60 uppercase font-bold">Remaining Cushion</span>
            <div className={`text-2xl font-black ${isOverBudget ? 'text-[#d12828]' : 'text-[#0eb02c]'}`}>
              {formatAmount(remainingBudget)}
            </div>
            <div className="text-[11px] text-[#1a1919]/60">
              {isOverBudget ? '⚠️ Over allowance limit' : 'Safe cash buffer remaining'}
            </div>
          </div>

        </section>

        {/* 3. Add Expense Form & Table */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1a1919]/10 shadow-sm space-y-6">
          
          {/* Add Item Row Form */}
          <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 rounded-2xl bg-slate-50 border border-[#1a1919]/8">
            <div className="sm:col-span-5">
              <input
                type="text"
                value={newExpName}
                onChange={(e) => setNewExpName(e.target.value)}
                placeholder="Expense name (e.g. WiFi Bill, Boba, Gym...)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#1a1919]/15 text-xs font-bold text-[#1a1919] bg-white focus:outline-none focus:border-[#0922b0]"
              />
            </div>
            
            <div className="sm:col-span-3">
              <input
                type="number"
                value={newExpAmount}
                onChange={(e) => setNewExpAmount(e.target.value)}
                placeholder={`Amount (${currentCurrency.symbol})`}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#1a1919]/15 text-xs font-bold text-[#1a1919] bg-white focus:outline-none focus:border-[#0922b0]"
              />
            </div>

            <div className="sm:col-span-2">
              <select
                value={newExpCat}
                onChange={(e) => setNewExpCat(e.target.value as 'Needs' | 'Wants' | 'Savings')}
                className="w-full px-3 py-2.5 rounded-xl border border-[#1a1919]/15 text-xs font-bold text-[#1a1919] bg-white focus:outline-none focus:border-[#0922b0]"
              >
                <option value="Needs">Needs (50%)</option>
                <option value="Wants">Wants (30%)</option>
                <option value="Savings">Savings (20%)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#0922b0] hover:bg-[#071a8a] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </button>
            </div>
          </form>

          {/* Table Controls & Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(['All', 'Needs', 'Wants', 'Savings'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-[#0922b0] text-white shadow-xs'
                      : 'bg-slate-100 text-[#1a1919]/70 hover:bg-slate-200'
                  }`}
                >
                  {cat} ({cat === 'All' ? expensesList.length : expensesList.filter(i => i.category === cat).length})
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#1a1919]/70 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
                title="Reset to sample student expenses"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Default</span>
              </button>

              <button
                onClick={handleCopySummary}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Summary Copied!' : 'Copy Summary'}</span>
              </button>
            </div>
          </div>

          {/* Table List */}
          <div className="overflow-x-auto rounded-2xl border border-[#1a1919]/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-[#1a1919]/10 font-mono text-[#1a1919]/60 uppercase">
                <tr>
                  <th className="py-3 px-4">Expense Description</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-right">Cost</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1919]/8 font-medium">
                {filteredList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-[#1a1919]">{item.name}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold ${
                        item.category === 'Needs' 
                          ? 'bg-blue-100 text-[#0922b0]' 
                          : item.category === 'Wants' 
                          ? 'bg-emerald-100 text-[#0eb02c]' 
                          : 'bg-red-100 text-[#d12828]'
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-[#1a1919]">
                      {formatAmount(item.amount)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleRemoveExpense(item.id)}
                        className="p-1.5 text-[#1a1919]/40 hover:text-[#d12828] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredList.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-xs text-[#1a1919]/50 font-medium">
                      No expenses logged in this category. Use the form above to add an item.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-slate-50/80 border-t border-[#1a1919]/10 font-bold">
                <tr>
                  <td colSpan={2} className="py-3.5 px-4 text-[#1a1919]">Logged Total ({filteredList.length} items)</td>
                  <td className="py-3.5 px-4 text-right text-sm font-black text-[#0922b0] font-mono">
                    {formatAmount(filteredList.reduce((acc, curr) => acc + curr.amount, 0))}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

        </section>

      </main>
    </div>
  );
};
