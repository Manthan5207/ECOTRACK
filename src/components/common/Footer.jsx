import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-blue-500/10 bg-white/40 dark:bg-[#030712]/80 backdrop-blur-md pt-12 pb-20 md:pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-glow-blue">
                <Activity className="w-4 h-4" />
              </div>
              <span className="font-heading font-black text-xl text-slate-900 dark:text-white">
                EcoTrack
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Understand live atmospheric air metrics, calculate personal carbon footprints, track daily eco-activities with monthly budgets, and explore breaking global environmental news.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-cyan-400 font-semibold bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                Open-Meteo & CAMS Live Data
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-500">
                Default: Delhi, India (INR)
              </span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Live Dashboard & AQI</Link></li>
              <li><Link to="/tracker" className="hover:text-cyan-400 transition-colors">Daily Activity Tracker</Link></li>
              <li><Link to="/calculator" className="hover:text-cyan-400 transition-colors">Carbon Calculator</Link></li>
              <li><Link to="/actions" className="hover:text-cyan-400 transition-colors">Action Plan & Badges</Link></li>
              <li><Link to="/news" className="hover:text-cyan-400 transition-colors">Environmental News</Link></li>
              <li><Link to="/leaderboard" className="hover:text-cyan-400 transition-colors">Community Leaderboard</Link></li>
            </ul>
          </div>

          {/* Model & Research Attribution */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Scientific Basis
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400 leading-normal">
              <li>Emission factors calibrated to Indian Central Electricity Authority & GHG Protocol.</li>
              <li>Activity tracking calculations aligned with IPCC urban transit & diet benchmarks.</li>
              <li>Tree absorption standard: ~21 kg CO₂e / mature tree / year.</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-500/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <span>Built with precision for climate action • EcoTrack 2026</span>
          </div>
          <div>
            <span>100% Free • No API Key required • Client-side privacy guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
