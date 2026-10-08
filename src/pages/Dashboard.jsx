import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Leaf, 
  Wind, 
  Sun, 
  CloudSun, 
  TrendingDown, 
  Trophy, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  MapPin, 
  Search,
  Zap,
  Utensils,
  Car,
  Trash2
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { useStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';
import { useLeaderboardStore } from '../store/useLeaderboardStore';
import { fetchLiveEnvironmentalData } from '../api/openMeteo';
import CitySearch from '../components/dashboard/CitySearch';
import { useToast } from '../components/common/Toast';

const WEEKLY_TREND_DATA = [
  { day: 'Mon', value: 3.8 },
  { day: 'Tue', value: 4.5 },
  { day: 'Wed', value: 4.0 },
  { day: 'Thu', value: 4.2 },
  { day: 'Fri', value: 3.6 },
  { day: 'Sat', value: 4.1 },
  { day: 'Sun', value: 4.2 },
];

export default function Dashboard() {
  const { location, footprint, ecoScore } = useStore();
  const { profile, user, isDemo } = useAuthStore();
  const { players } = useLeaderboardStore();
  const { addToast } = useToast();

  const [envData, setEnvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  const displayName = profile?.displayName || user?.displayName || 'Manthan Singh';
  const firstName = displayName.split(' ')[0] || 'Manthan';

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchLiveEnvironmentalData(location.lat, location.lon, location.name);
      setEnvData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Carbon totals and breakdown calculations
  const totalTonnes = footprint?.total ? +(footprint.total / 1000).toFixed(1) : 4.2;
  const transportVal = footprint?.transport ? Math.round(footprint.transport / 10) : 32;
  const energyVal = footprint?.energy ? Math.round(footprint.energy / 10) : 28;
  const foodVal = footprint?.food ? Math.round(footprint.food / 10) : 22;
  const wasteVal = footprint?.waste ? Math.round(footprint.waste / 10) : 18;

  const totalSum = transportVal + energyVal + foodVal + wasteVal || 100;
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

  // User rank
  const userRank = React.useMemo(() => {
    if (!user) return 12;
    const sorted = [...players].sort((a, b) => b.weeklyPoints - a.weeklyPoints);
    const targetUid = user.uid;
    const idx = sorted.findIndex(p => p.uid === targetUid || (isDemo && (p.isDemo || p.uid === 'user-demo')));
    return idx !== -1 ? idx + 1 : 12;
  }, [players, user, isDemo]);

  const userPoints = 2850 + (ecoScore * 5);

  const aqi = envData?.airQuality?.aqi ?? 87;
  const aqiCategory = envData?.airQuality?.category ?? 'Moderate';
  const aqiColor = envData?.airQuality?.color ?? '#F59E0B';
  const temp = envData?.weather?.temperature ?? 28;
  const condition = envData?.weather?.condition ?? 'Partly Cloudy';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-20">
      {/* Top Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
            Good morning, {firstName}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
            <span>Small steps make a big impact.</span>
            <span>⚡</span>
          </p>
        </div>

        {/* Location / Search Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="px-3.5 py-1.5 rounded-full glass dark:bg-[#0F172A]/80 border border-slate-200 dark:border-blue-500/30 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-blue-500 flex items-center gap-1.5 transition"
          >
            <MapPin className="w-3.5 h-3.5 text-blue-500" />
            <span>{location.name}</span>
          </button>
          <button
            onClick={loadData}
            className="p-2 rounded-full glass dark:bg-[#0F172A]/80 border border-slate-200 dark:border-blue-500/30 text-slate-400 hover:text-blue-500 transition"
            title="Refresh Live Telemetry"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {showSearch && (
        <div className="p-4 rounded-2xl glass dark:bg-[#0F172A]/90 border border-blue-500/30 animate-in fade-in duration-150">
          <CitySearch />
        </div>
      )}

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 1. Top Left: Your Carbon Footprint (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass dark:bg-[#0F172A]/80 border border-white/70 dark:border-blue-500/25 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2.5 text-slate-400 mb-4">
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-600 dark:text-cyan-400 flex items-center justify-center font-bold">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Your Carbon Footprint</span>
          </div>

          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
                {totalTonnes}
              </span>
              <span className="text-sm font-semibold text-slate-400">tCO₂e / year</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-bold mt-3">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>↓ 18% vs last month</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-blue-500/20 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Target: 2.3 tCO₂e (IPCC 2030)</span>
            <Link to="/calculator" className="text-blue-500 dark:text-cyan-400 font-bold hover:underline">Recalculate →</Link>
          </div>
        </div>

        {/* 2. Top Right: Weekly Trend Chart (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl glass dark:bg-[#0F172A]/80 border border-white/70 dark:border-blue-500/25 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Weekly Trend</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-cyan-400 border border-blue-500/30">
              {totalTonnes} tCO₂e
            </span>
          </div>

          <div className="h-40 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WEEKLY_TREND_DATA} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="blueArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} domain={[2, 6]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0b132b', borderColor: '#2563EB', borderRadius: '12px', fontSize: '12px', color: '#fff' }}
                  itemStyle={{ color: '#38BDF8' }}
                />
                <Area type="monotone" dataKey="value" stroke="#38BDF8" strokeWidth={3} fillOpacity={1} fill="url(#blueArea)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Middle Left: Footprint Breakdown Donut (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass dark:bg-[#0F172A]/80 border border-white/70 dark:border-blue-500/25 shadow-sm">
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-4">Footprint Breakdown</div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            {/* Donut Chart with Center Label */}
            <div className="sm:col-span-6 h-40 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
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
                <span className="text-lg font-heading font-black text-slate-900 dark:text-white leading-tight">
                  {totalTonnes}
                </span>
                <span className="text-[10px] text-slate-400">tCO₂e</span>
              </div>
            </div>

            {/* Legend List */}
            <div className="sm:col-span-6 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span className="text-slate-600 dark:text-slate-300">Transport</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{transportPct}%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                  <span className="text-slate-600 dark:text-slate-300">Energy</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{energyPct}%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  <span className="text-slate-600 dark:text-slate-300">Food</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{foodPct}%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
                  <span className="text-slate-600 dark:text-slate-300">Waste</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{wastePct}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Middle Right: Live AQI & Weather Cards (7 cols: 2 subcards) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Subcard 1: Live AQI */}
          <div className="p-6 rounded-3xl glass dark:bg-[#0F172A]/80 border border-white/70 dark:border-blue-500/25 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Live AQI</span>
                <span className="text-[11px] flex items-center gap-1">📍 {location.name}</span>
              </div>
              <div className="flex items-baseline gap-3 my-2">
                <span className="text-5xl font-heading font-black text-slate-900 dark:text-white">
                  {aqi}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/30">
                  {aqiCategory}
                </span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100 dark:border-blue-500/20">
              WHO Clean air guideline: Safe for general outdoor activity.
            </div>
          </div>

          {/* Subcard 2: Weather */}
          <div className="p-6 rounded-3xl glass dark:bg-[#0F172A]/80 border border-white/70 dark:border-blue-500/25 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Weather</span>
                <span className="text-[11px] flex items-center gap-1">📍 {location.name}</span>
              </div>
              <div className="flex items-center justify-between my-2">
                <div>
                  <div className="text-4xl font-heading font-black text-slate-900 dark:text-white">
                    {temp}°C
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{condition}</div>
                </div>
                <CloudSun className="w-12 h-12 text-amber-400 shrink-0" />
              </div>
            </div>
            <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100 dark:border-blue-500/20">
              H: {temp + 3}° L: {temp - 4}° • Moderate humidity
            </div>
          </div>
        </div>

        {/* 5. Bottom Left: Your Points & Rank (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass dark:bg-[#0F172A]/80 border border-white/70 dark:border-blue-500/25 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Your Points & Rank</span>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
              Rank #{userRank}
            </span>
          </div>

          <div className="my-2">
            <div className="text-4xl font-heading font-black text-slate-900 dark:text-white">
              {userPoints.toLocaleString()} <span className="text-xs font-normal text-slate-400">pts</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Top 15% in your community this week</p>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-blue-500/20">
            <Link
              to="/leaderboard"
              className="w-full py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-heading font-bold flex items-center justify-center gap-2 shadow-glow-blue transition active:scale-95"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>View Leaderboard</span>
            </Link>
          </div>
        </div>

        {/* 6. Bottom Right: Top 3 Daily Tips (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl glass dark:bg-[#0F172A]/80 border border-white/70 dark:border-blue-500/25 shadow-sm space-y-3">
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">Top 3 Daily Tips</div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-2xl bg-white/50 dark:bg-black/20 border border-slate-200/60 dark:border-blue-500/15 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 font-bold flex items-center justify-center text-[11px]">1</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Use public transport</span>
              </div>
              <span className="font-bold text-blue-600 dark:text-cyan-400 text-[11px]">-1.2 kg CO₂e</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/50 dark:bg-black/20 border border-slate-200/60 dark:border-blue-500/15 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 font-bold flex items-center justify-center text-[11px]">2</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Reduce food waste</span>
              </div>
              <span className="font-bold text-blue-600 dark:text-cyan-400 text-[11px]">-0.8 kg CO₂e</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/50 dark:bg-black/20 border border-slate-200/60 dark:border-blue-500/15 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 font-bold flex items-center justify-center text-[11px]">3</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Switch to LED bulbs</span>
              </div>
              <span className="font-bold text-blue-600 dark:text-cyan-400 text-[11px]">-0.5 kg CO₂e</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

