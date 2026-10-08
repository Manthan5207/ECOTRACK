import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Calendar as CalendarIcon, 
  Plus, 
  Sparkles, 
  Flame, 
  Award, 
  ShieldCheck, 
  Car, 
  Zap, 
  Utensils, 
  Recycle,
  TrendingDown,
  Info
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';
import ActivityLogModal from '../components/tracker/ActivityLogModal';
import CarbonBudgetWidget from '../components/tracker/CarbonBudgetWidget';
import ActivityTimeline from '../components/tracker/ActivityTimeline';

export default function ActivityTracker() {
  const { profile } = useAuthStore();
  const { activityLogs, streak, ecoScore } = useStore();

  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // Computed metrics for selected date
  const selectedDateLogs = (activityLogs || []).filter(l => l.date === selectedDate);
  const selectedDateEmissions = +(selectedDateLogs.reduce((sum, l) => sum + (l.emissionsKg || 0), 0)).toFixed(2);
  const selectedDateSavings = +(selectedDateLogs.reduce((sum, l) => sum + (l.savingsKg || 0), 0)).toFixed(2);

  // Cumulative all-time savings
  const totalAllTimeSavings = +(activityLogs || []).reduce((sum, l) => sum + (l.savingsKg || 0), 0).toFixed(1);

  // Category breakdown for pie/bar metrics
  const categoryEmissions = {
    transport: 0,
    energy: 0,
    food: 0,
    lifestyle: 0
  };
  (activityLogs || []).forEach(log => {
    if (categoryEmissions[log.category] !== undefined) {
      categoryEmissions[log.category] += (log.emissionsKg || 0);
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Date Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-br from-blue-700 via-blue-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-blue-500/20">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-cyan-200 mb-3">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>EcoTrack Daily Activity & Budget Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading">
            Personal Carbon Activity Logger
          </h1>
          <p className="text-sm text-blue-100/80 mt-1 max-w-xl">
            Track daily transportation, green energy usage, dietary choices, and waste reductions with verified carbon coefficients.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-2xl">
            <CalendarIcon className="w-4 h-4 text-cyan-300" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={todayStr}
              className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
            />
          </div>

          <button
            onClick={() => setIsLogModalOpen(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 text-white" />
            Log Activity
          </button>
        </div>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-3xl p-5 border border-white/60 dark:border-blue-500/20 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Today's Footprint</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-heading">
            {selectedDateEmissions} <span className="text-xs font-normal text-slate-400">kg CO₂</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {selectedDateLogs.length} {selectedDateLogs.length === 1 ? 'activity' : 'activities'} on {selectedDate === todayStr ? 'Today' : selectedDate}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-5 border border-white/60 dark:border-blue-500/20 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Carbon Avoided</span>
            <TrendingDown className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-blue-600 dark:text-cyan-400 font-heading">
            +{totalAllTimeSavings} <span className="text-xs font-normal text-slate-400">kg saved</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            +{selectedDateSavings} kg saved on this day
          </div>
        </div>

        <div className="glass-card rounded-3xl p-5 border border-white/60 dark:border-blue-500/20 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Habit Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-500 font-heading">
            {streak} <span className="text-xs font-normal text-slate-400">Days</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Log daily to unlock badge multiplier
          </div>
        </div>

        <div className="glass-card rounded-3xl p-5 border border-white/60 dark:border-blue-500/20 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">EcoScore Rating</span>
            <Award className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-heading">
            {ecoScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
          </div>
          <div className="text-[11px] text-blue-600 dark:text-cyan-400 mt-1 font-medium">
            Top Tier Eco Citizen
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column = Carbon Budget + Quick Log; Right Column = Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <CarbonBudgetWidget />

          {/* Quick Category Logger Shortcuts */}
          <div className="glass-card rounded-3xl p-6 border border-white/60 dark:border-blue-500/20 shadow-sm">
            <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-white mb-3">Quick Activity Shortcuts</h3>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setIsLogModalOpen(true)}
                className="p-3 bg-slate-50 dark:bg-blue-950/30 hover:bg-blue-500/10 dark:hover:bg-blue-500/20 border border-slate-200 dark:border-blue-500/20 hover:border-cyan-500/40 rounded-2xl text-left transition group"
              >
                <Car className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition" />
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Log Commute</div>
                <div className="text-[11px] text-slate-400">Metro, Bus, Walk, EV</div>
              </button>

              <button
                onClick={() => setIsLogModalOpen(true)}
                className="p-3 bg-slate-50 dark:bg-blue-950/30 hover:bg-blue-500/10 dark:hover:bg-blue-500/20 border border-slate-200 dark:border-blue-500/20 hover:border-cyan-500/40 rounded-2xl text-left transition group"
              >
                <Zap className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition" />
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Log Energy</div>
                <div className="text-[11px] text-slate-400">AC Eco, Solar, LED</div>
              </button>

              <button
                onClick={() => setIsLogModalOpen(true)}
                className="p-3 bg-slate-50 dark:bg-blue-950/30 hover:bg-blue-500/10 dark:hover:bg-blue-500/20 border border-slate-200 dark:border-blue-500/20 hover:border-cyan-500/40 rounded-2xl text-left transition group"
              >
                <Utensils className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition" />
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Log Meal</div>
                <div className="text-[11px] text-slate-400">Plant-based, Local</div>
              </button>

              <button
                onClick={() => setIsLogModalOpen(true)}
                className="p-3 bg-slate-50 dark:bg-blue-950/30 hover:bg-blue-500/10 dark:hover:bg-blue-500/20 border border-slate-200 dark:border-blue-500/20 hover:border-cyan-500/40 rounded-2xl text-left transition group"
              >
                <Recycle className="w-5 h-5 text-sky-400 mb-2 group-hover:scale-110 transition" />
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Log Lifestyle</div>
                <div className="text-[11px] text-slate-400">Recycle, Compost</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <ActivityTimeline 
            selectedDate={selectedDate} 
            onOpenLogModal={() => setIsLogModalOpen(true)} 
          />
        </div>
      </div>

      {/* Activity Log Modal */}
      <ActivityLogModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        selectedDate={selectedDate}
      />
    </div>
  );
}
