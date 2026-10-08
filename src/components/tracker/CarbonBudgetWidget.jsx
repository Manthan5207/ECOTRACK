import React, { useState } from 'react';
import { Target, TrendingUp, AlertTriangle, CheckCircle2, Sliders, Info } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useToast } from '../common/Toast';

export default function CarbonBudgetWidget() {
  const { carbonBudget, setCarbonBudget, activityLogs } = useStore();
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [tempBudget, setTempBudget] = useState(carbonBudget);

  // Current month calculations
  const now = new Date();
  const currentYearMonth = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const currentDay = now.getDate();
  const daysRemaining = daysInMonth - currentDay;

  // Total emissions logged this calendar month
  const currentMonthLogs = (activityLogs || []).filter(log => (log.date || '').startsWith(currentYearMonth));
  const totalEmittedThisMonth = +(currentMonthLogs.reduce((sum, l) => sum + (l.emissionsKg || 0), 0)).toFixed(1);
  const totalSavedThisMonth = +(currentMonthLogs.reduce((sum, l) => sum + (l.savingsKg || 0), 0)).toFixed(1);

  const percentageUsed = Math.min(100, Math.round((totalEmittedThisMonth / Math.max(1, carbonBudget)) * 100));
  const remainingBudgetKg = Math.max(0, +(carbonBudget - totalEmittedThisMonth).toFixed(1));

  // Projected end-of-month based on burn rate
  const dailyAverageEmitted = currentDay > 0 ? (totalEmittedThisMonth / currentDay) : 0;
  const projectedMonthTotal = +(dailyAverageEmitted * daysInMonth).toFixed(1);
  const isOverProjected = projectedMonthTotal > carbonBudget;

  const handleSaveBudget = (e) => {
    e.preventDefault();
    const val = Number(tempBudget);
    if (val < 20 || val > 2000) {
      addToast({ message: 'Budget must be between 20 kg and 2000 kg CO₂.', type: 'error' });
      return;
    }
    setCarbonBudget(val);
    setIsEditing(false);
    addToast({ message: `Monthly carbon budget set to ${val} kg CO₂!`, type: 'success' });
  };

  return (
    <div className="glass-card rounded-3xl p-6 border border-white/60 dark:border-blue-500/20 shadow-sm relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-cyan-400 flex items-center justify-center border border-blue-500/20 shadow-glow-cyan/30">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">Monthly Carbon Budget</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Target allowance for {now.toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>

        <button
          onClick={() => {
            setTempBudget(carbonBudget);
            setIsEditing(!isEditing);
          }}
          className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-blue-950/40 rounded-xl transition flex items-center gap-1.5 border border-slate-200 dark:border-blue-500/20"
        >
          <Sliders className="w-3.5 h-3.5" />
          {isEditing ? 'Cancel' : 'Adjust Goal'}
        </button>
      </div>

      {/* Adjust Goal Modal / Inset */}
      {isEditing && (
        <form onSubmit={handleSaveBudget} className="mb-5 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-blue-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">Set Monthly Target (kg CO₂)</label>
            <span className="text-xs font-semibold text-blue-600 dark:text-cyan-400">{tempBudget} kg CO₂</span>
          </div>
          <input
            type="range"
            min="30"
            max="600"
            step="10"
            value={tempBudget}
            onChange={(e) => setTempBudget(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Aggressive (50 kg)</span>
            <span>Sustainable (180 kg)</span>
            <span>Relaxed (450 kg)</span>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition shadow-md shadow-blue-500/20"
            >
              Save Target
            </button>
          </div>
        </form>
      )}

      {/* Progress Bar & Numerical Metrics */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-heading">{totalEmittedThisMonth}</span>
            <span className="text-sm font-semibold text-slate-400 ml-1">/ {carbonBudget} kg CO₂</span>
          </div>
          <div className="text-right">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              percentageUsed >= 90
                ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                : percentageUsed >= 70
                ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                : 'bg-blue-500/15 text-blue-600 dark:text-cyan-400 border border-blue-500/20'
            }`}>
              {percentageUsed}% used
            </span>
          </div>
        </div>

        {/* Dynamic Progress Track */}
        <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              percentageUsed >= 90
                ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                : percentageUsed >= 70
                ? 'bg-gradient-to-r from-blue-500 to-amber-500'
                : 'bg-gradient-to-r from-cyan-400 to-blue-600 shadow-glow-cyan'
            }`}
            style={{ width: `${Math.min(100, Math.max(4, percentageUsed))}%` }}
          />
        </div>

        {/* 3-Column Quick Glance */}
        <div className="grid grid-cols-3 gap-2 pt-2 text-center">
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Remaining</div>
            <div className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{remainingBudgetKg} kg</div>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Eco Saved</div>
            <div className="text-sm font-bold text-blue-600 dark:text-cyan-400 mt-0.5">+{totalSavedThisMonth} kg</div>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Projected</div>
            <div className={`text-sm font-bold mt-0.5 ${isOverProjected ? 'text-amber-500' : 'text-slate-800 dark:text-white'}`}>
              {projectedMonthTotal} kg
            </div>
          </div>
        </div>

        {/* Context Status Banner */}
        <div className={`p-3 rounded-2xl text-xs flex items-center gap-2.5 border ${
          isOverProjected
            ? 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300'
            : 'bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-cyan-300'
        }`}>
          {isOverProjected ? (
            <>
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
              <span>Burn rate projection suggests you may exceed your {carbonBudget}kg budget by ~{+(projectedMonthTotal - carbonBudget).toFixed(1)}kg. Try replacing 2 solo car rides with metro!</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 shrink-0 text-cyan-400" />
              <span>Great pacing! You are on track to stay safely within your {carbonBudget} kg CO₂ monthly allowance with {daysRemaining} days left.</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
