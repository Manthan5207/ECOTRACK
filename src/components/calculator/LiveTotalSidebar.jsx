import React from 'react';
import { Car, Zap, Utensils, Trash2, RotateCcw, MapPin } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function LiveTotalSidebar({ breakdown = {}, total = 0, currentStep = 1, onReset }) {
  const { location } = useStore();
  const monthlyTonnes = +(total / 1000 / 12).toFixed(1);
  const annualTonnes = +(total / 1000).toFixed(1);

  const categories = [
    { key: 'transport', label: 'Transport', value: +(breakdown.transport / 1000 / 12).toFixed(1), icon: Car, color: 'bg-blue-600' },
    { key: 'energy', label: 'Energy', value: +(breakdown.energy / 1000 / 12).toFixed(1), icon: Zap, color: 'bg-cyan-500' },
    { key: 'food', label: 'Food', value: +(breakdown.food / 1000 / 12).toFixed(1), icon: Utensils, color: 'bg-sky-400' },
    { key: 'waste', label: 'Waste', value: +((breakdown.shopping + breakdown.waste) / 1000 / 12).toFixed(1), icon: Trash2, color: 'bg-indigo-400' },
  ];

  return (
    <div className="p-6 rounded-3xl glass dark:bg-[#0F172A]/80 border border-white/70 dark:border-blue-500/25 shadow-sm space-y-5">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 block">Live Total</span>
          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-blue-500" />
            <span>{location.name}</span>
          </span>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-cyan-400 border border-blue-500/30">
          Step {currentStep} / 4
        </span>
      </div>

      {/* Large Total Meter */}
      <div className="text-center py-4 px-3 rounded-2xl bg-white/40 dark:bg-black/20 border border-slate-200/50 dark:border-blue-500/15">
        <div className="text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
          {monthlyTonnes > 0 ? monthlyTonnes : '1.8'}
        </div>
        <span className="text-xs text-slate-400 mt-1 block">tCO₂e / month</span>
        <span className="text-[11px] text-blue-600 dark:text-cyan-400 font-semibold block mt-0.5">
          ~{annualTonnes > 0 ? annualTonnes : '4.2'} tCO₂e / year
        </span>
      </div>

      {/* Breakdown Rows */}
      <div className="space-y-3 pt-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.key} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <div className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                <span>{cat.label}</span>
              </div>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {cat.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Reset Button */}
      <div className="pt-3 border-t border-slate-100 dark:border-blue-500/20 text-center">
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-blue-500 dark:hover:text-cyan-400 transition-colors flex items-center justify-center gap-1.5 mx-auto font-medium"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}

