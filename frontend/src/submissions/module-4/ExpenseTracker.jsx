import React, { useState } from 'react';
import { PlusCircle, Trash2, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export default function ExpenseTracker() {
  const [transactions, setTransactions] = useState([
    { id: 1, text: 'Freelance Project', amount: 2500, type: 'income' },
    { id: 2, text: 'Office Rent', amount: 800, type: 'expense' },
    { id: 3, text: 'Cloud Hosting', amount: 120, type: 'expense' }
  ]);

  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !amount) return;

    const newTransaction = {
      id: Date.now(),
      text: text.trim(),
      amount: parseFloat(amount),
      type
    };

    setTransactions([newTransaction, ...transactions]);
    setText('');
    setAmount('');
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-5">
        
        <div className="md:col-span-2 bg-slate-900 p-8 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-wide">LedgerFlow</span>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Total Balance</p>
              <h1 className="text-4xl font-bold tracking-tight">
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h1>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-slate-800/50 border border-slate-800 p-4 rounded-xl">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  <TrendingUp className="h-3.5 w-3.5" /> Income
                </div>
                <p className="text-lg font-bold">${income.toLocaleString()}</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-800 p-4 rounded-xl">
                <div className="flex items-center gap-1.5 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  <TrendingDown className="h-3.5 w-3.5" /> Expenses
                </div>
                <p className="text-lg font-bold">${expenses.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 border-t border-slate-800 pt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">New Transaction</h3>
            
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Description</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g., Software Subscription"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-medium text-sm rounded-lg py-2.5 px-4 flex items-center justify-center gap-2 transition-colors mt-2 shadow-sm"
            >
              <PlusCircle className="h-4 w-4" /> Add Transaction
            </button>
          </form>
        </div>

        <div className="md:col-span-3 p-8 flex flex-col h-[600px]">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-950">Transaction History</h2>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {transactions.length} items
            </span>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1 scrollbar-thin">
            {transactions.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
                <p className="text-sm">No transactions recorded yet.</p>
              </div>
            ) : (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-slate-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {transaction.type === 'income' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    </div>
                    <span className="font-medium text-sm text-slate-700">{transaction.text}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`font-semibold text-sm ${
                      transaction.type === 'income' ? 'text-emerald-600' : 'text-slate-900'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </span>
                    <button
                      onClick={() => deleteTransaction(transaction.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                      aria-label="Delete transaction"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}