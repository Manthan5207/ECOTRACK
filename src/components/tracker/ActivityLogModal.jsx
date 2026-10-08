import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Car, Zap, Utensils, Recycle, Plus, Sparkles, AlertCircle } from 'lucide-react';
import { ACTIVITY_CATEGORIES, ACTIVITY_TYPES } from '../../data/activityFactors';
import { useStore } from '../../store/useStore';
import { useToast } from '../common/Toast';

const CATEGORY_ICONS = {
  transport: Car,
  energy: Zap,
  food: Utensils,
  lifestyle: Recycle
};

export default function ActivityLogModal({ isOpen, onClose, selectedDate = new Date().toISOString().split('T')[0] }) {
  const { addActivityLog } = useStore();
  const { addToast } = useToast();

  const [activeCategory, setActiveCategory] = useState('transport');
  const [selectedActivityId, setSelectedActivityId] = useState(ACTIVITY_TYPES.transport[0]?.id);
  const [amount, setAmount] = useState(ACTIVITY_TYPES.transport[0]?.defaultAmount || 10);
  const [logDate, setLogDate] = useState(selectedDate);
  const [notes, setNotes] = useState('');

  const currentCategoryList = ACTIVITY_TYPES[activeCategory] || [];
  const currentActivity = currentCategoryList.find(a => a.id === selectedActivityId) || currentCategoryList[0];

  const parsedAmount = Math.max(0, Number(amount) || 0);
  const emissionFactor = currentActivity?.factorKgPerUnit ?? 0;
  const baselineFactor = currentActivity?.baselineFactor ?? emissionFactor;

  const totalEmissionsKg = +(parsedAmount * emissionFactor).toFixed(2);
  const totalBaselineKg = +(parsedAmount * baselineFactor).toFixed(2);
  const totalSavingsKg = Math.max(0, +(totalBaselineKg - totalEmissionsKg).toFixed(2));

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    const firstInCat = ACTIVITY_TYPES[catId]?.[0];
    if (firstInCat) {
      setSelectedActivityId(firstInCat.id);
      setAmount(firstInCat.defaultAmount);
    }
  };

  const handleActivitySelect = (act) => {
    setSelectedActivityId(act.id);
    setAmount(act.defaultAmount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentActivity || parsedAmount <= 0) {
      addToast({ message: 'Please specify a valid amount or distance.', type: 'error' });
      return;
    }

    addActivityLog({
      date: logDate,
      category: activeCategory,
      activityId: currentActivity.id,
      title: currentActivity.label,
      amount: parsedAmount,
      unit: currentActivity.unit,
      emissionsKg: totalEmissionsKg,
      savingsKg: totalSavingsKg,
      notes: notes.trim()
    });

    addToast({
      message: `Logged ${currentActivity.label}! Saved ${totalSavingsKg} kg CO₂.`,
      type: 'success'
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center border border-blue-500/20">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Log Daily Eco-Activity</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Record habits and monitor real-time carbon impact</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Date Picker */}
            <div className="flex items-center justify-between gap-4 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Activity Date:</span>
              <input
                type="date"
                value={logDate}
                onChange={(e) => setLogDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Switcher */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                1. Select Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ACTIVITY_CATEGORIES.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat.id] || Car;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                        isActive
                          ? 'bg-blue-500/10 border-blue-500 text-blue-600 dark:text-cyan-400 shadow-sm font-semibold'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <Icon className="w-5 h-5 mb-1.5" />
                      <span className="text-xs leading-tight">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Activity Type Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                2. Choose Specific Activity
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {currentCategoryList.map((act) => {
                  const isSelected = selectedActivityId === act.id;
                  return (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => handleActivitySelect(act)}
                      className={`p-3 rounded-xl border text-left flex items-start justify-between gap-2 transition ${
                        isSelected
                          ? 'bg-blue-500/15 border-blue-500 dark:border-cyan-500 text-blue-950 dark:text-cyan-200 font-medium'
                          : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="text-xs">
                        <div className="font-semibold">{act.label}</div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{act.savingsDescription}</div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Amount / Duration input */}
            {currentActivity && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Amount ({currentActivity.unit})
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="any"
                      min="0.1"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="e.g. 15"
                      className="w-full px-4 py-2.5 text-sm font-semibold bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs font-medium text-slate-400 dark:text-slate-500">
                      {currentActivity.unit}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Optional Note
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Morning commute to office"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Real-Time Impact Metric Preview Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-transparent border border-blue-500/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Estimated Impact</div>
                  <div className="text-sm font-bold text-slate-800 dark:text-white">
                    {totalEmissionsKg} kg CO₂ emitted
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-blue-600 dark:text-cyan-400 font-semibold">
                  +{totalSavingsKg} kg CO₂ Saved
                </div>
                <div className="text-[11px] text-slate-400">vs fossil baseline</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add to Daily Track
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
