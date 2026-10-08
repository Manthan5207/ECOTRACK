import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Activity, 
  TrendingDown, 
  ArrowRight, 
  Share2, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import ShareModal from '../common/ShareModal';

export default function CalculatorResults({ footprint, onRecalculate }) {
  const [shareOpen, setShareOpen] = useState(false);

  const totalTonnes = +(footprint?.total ? footprint.total / 1000 : 4.2).toFixed(1);
  const totalKg = footprint?.total || 4200;

  const transportVal = footprint?.transport || 1344;
  const energyVal = footprint?.energy || 1176;
  const foodVal = footprint?.food || 924;
  const wasteVal = (footprint?.shopping || 400) + (footprint?.waste || 356);

  const totalSum = transportVal + energyVal + foodVal + wasteVal || 4200;
  const transportPct = Math.round((transportVal / totalSum) * 100);
  const energyPct = Math.round((energyVal / totalSum) * 100);
  const foodPct = Math.round((foodVal / totalSum) * 100);
  const wastePct = 100 - (transportPct + energyPct + foodPct);

  const donutData = [
    { name: 'Transport', value: transportPct, color: '#2563EB' },
    { name: 'Energy', value: energyPct, color: '#06B6D4' },
    { name: 'Food', value: foodPct, color: '#38BDF8' },
    { name: 'Waste', value: wastePct, color: '#818CF8' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Main Results Card */}
      <div className="p-7 sm:p-9 rounded-3xl glass dark:bg-[#0F172A]/85 border border-white/70 dark:border-blue-500/25 shadow-2xl backdrop-blur-2xl space-y-6">
        {/* Header Title */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
            Your Carbon Footprint Results
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Here's how you compare and where you can improve.
          </p>
        </div>

        {/* Hero Circular Badge */}
        <div className="text-center my-4 py-6 px-4 rounded-3xl bg-gradient-to-b from-blue-500/15 via-cyan-500/5 to-transparent border border-blue-500/25">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-3 shadow-glow-blue">
            <Activity className="w-6 h-6" />
          </div>

          <div className="flex items-baseline justify-center gap-1.5">
            <span className="text-5xl sm:text-6xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
              {totalTonnes}
            </span>
            <span className="text-sm font-semibold text-slate-400">tCO₂e / year</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-bold mt-3">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>↓ 18% vs last year</span>
          </div>
        </div>

        {/* Comparative Benchmarks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-4 rounded-2xl bg-white/50 dark:bg-black/20 border border-slate-200/60 dark:border-blue-500/15">
            <span className="text-[11px] text-slate-400 block font-medium">vs National Average</span>
            <div className="text-xl font-heading font-bold text-slate-900 dark:text-white mt-0.5">
              6.8 <span className="text-xs font-normal text-slate-400">tCO₂e</span>
            </div>
            <span className="text-[11px] text-blue-600 dark:text-cyan-400 font-semibold block mt-1">
              You're 38% lower
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/50 dark:bg-black/20 border border-slate-200/60 dark:border-blue-500/15">
            <span className="text-[11px] text-slate-400 block font-medium">vs Global Average</span>
            <div className="text-xl font-heading font-bold text-slate-900 dark:text-white mt-0.5">
              7.1 <span className="text-xs font-normal text-slate-400">tCO₂e</span>
            </div>
            <span className="text-[11px] text-blue-600 dark:text-cyan-400 font-semibold block mt-1">
              You're 41% lower
            </span>
          </div>
        </div>

        {/* Breakdown Donut Chart */}
        <div className="p-5 rounded-2xl bg-white/50 dark:bg-black/20 border border-slate-200/60 dark:border-blue-500/15 space-y-3">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
            Breakdown
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-6 h-36 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={56}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-base font-heading font-black text-slate-900 dark:text-white">
                  {totalTonnes}
                </span>
                <span className="text-[9px] text-slate-400">tCO₂e</span>
              </div>
            </div>

            <div className="sm:col-span-6 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span className="text-slate-600 dark:text-slate-300">Transport</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{transportPct}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  <span className="text-slate-600 dark:text-slate-300">Energy</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{energyPct}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <span className="text-slate-600 dark:text-slate-300">Food</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{foodPct}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                  <span className="text-slate-600 dark:text-slate-300">Waste</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{wastePct}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary CTA: Get Action Plan */}
        <div className="space-y-3 pt-2">
          <Link
            to="/actions"
            className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-heading font-bold text-sm shadow-glow-blue transition-all active:scale-[0.98] flex items-center justify-center gap-2 block text-center"
          >
            <span>Get Action Plan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center justify-center gap-4 text-xs">
            <button
              onClick={() => setShareOpen(true)}
              className="text-slate-500 dark:text-slate-400 hover:text-blue-500 flex items-center gap-1.5 transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Result Card</span>
            </button>
            <span>•</span>
            <button
              onClick={onRecalculate}
              className="text-slate-500 dark:text-slate-400 hover:text-blue-500 flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Recalculate</span>
            </button>
          </div>
        </div>
      </div>

      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  );
}

