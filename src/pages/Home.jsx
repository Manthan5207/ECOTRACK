import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Leaf, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Wind,
  ShieldCheck,
  TrendingDown,
  Layers,
  Flame,
  Globe2,
  Zap
} from 'lucide-react';
import GlobeIllustration from '../components/common/GlobeIllustration';
import { useStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';
import { fetchLiveEnvironmentalData } from '../api/openMeteo';

export default function Home() {
  const navigate = useNavigate();
  const { location, footprint, ecoScore } = useStore();
  const { loginDemo, user } = useAuthStore();
  const [cityData, setCityData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchLiveEnvironmentalData(location.lat, location.lon, location.name).then(data => {
      if (isMounted) setCityData(data);
    });
    return () => { isMounted = false; };
  }, [location]);

  const aqi = cityData?.airQuality?.aqi ?? 87;
  const aqiCategory = cityData?.airQuality?.category ?? 'Moderate';
  const pm25 = cityData?.airQuality?.pollutants?.pm2_5?.value ?? 32;
  const pm10 = cityData?.airQuality?.pollutants?.pm10?.value ?? 56;
  const no2 = cityData?.airQuality?.pollutants?.nitrogen_dioxide?.value ?? 18;
  const o3 = cityData?.airQuality?.pollutants?.ozone?.value ?? 42;

  const handleTryDemo = () => {
    loginDemo();
    navigate('/dashboard');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-8 pb-20">
      {/* 1. Hero Canvas Card */}
      <section className="relative rounded-3xl p-6 sm:p-10 lg:p-12 glass dark:bg-[#0F172A]/85 border border-white/60 dark:border-blue-500/25 shadow-2xl overflow-hidden">
        {/* Misty Atmosphere Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline & Action Buttons */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-1"
            >
              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                Track your<br />
                footprint.<br />
                <span className="text-blue-600 dark:text-[#38BDF8] drop-shadow-[0_0_25px_rgba(56,189,248,0.45)]">
                  Change your<br />
                  future.
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed"
            >
              A unified platform to track, understand and reduce your carbon footprint with live environmental data.
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <Link
                to={user ? "/dashboard" : "/calculator"}
                className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-heading font-bold text-sm shadow-glow-blue transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={handleTryDemo}
                className="px-6 py-3 rounded-full bg-white/70 dark:bg-blue-950/40 hover:bg-white dark:hover:bg-blue-900/60 text-slate-800 dark:text-slate-100 font-heading font-semibold text-sm border border-slate-200 dark:border-blue-500/30 backdrop-blur-md transition-all active:scale-95"
              >
                Try Demo
              </button>
            </motion.div>

            {/* 3 Frosted Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4"
            >
              {/* Card 1: Track */}
              <Link
                to="/tracker"
                className="p-4 rounded-2xl glass dark:bg-[#1E293B]/70 border border-slate-200/80 dark:border-blue-500/20 hover:border-blue-500/50 transition-all group block shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-600 dark:text-cyan-400 flex items-center justify-center font-bold mb-2.5 group-hover:scale-105 transition-transform">
                  <Activity className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-white">Track</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                  Monitor your carbon footprint in real-time.
                </p>
              </Link>

              {/* Card 2: Understand */}
              <Link
                to="/dashboard"
                className="p-4 rounded-2xl glass dark:bg-[#1E293B]/70 border border-slate-200/80 dark:border-blue-500/20 hover:border-blue-500/50 transition-all group block shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold mb-2.5 group-hover:scale-105 transition-transform">
                  <Wind className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-white">Understand</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                  Get insights with live environmental data.
                </p>
              </Link>

              {/* Card 3: Take Action */}
              <Link
                to="/actions"
                className="p-4 rounded-2xl glass dark:bg-[#1E293B]/70 border border-slate-200/80 dark:border-blue-500/20 hover:border-blue-500/50 transition-all group block shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold mb-2.5 group-hover:scale-105 transition-transform">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-white">Take Action</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                  Follow personalized recommendations.
                </p>
              </Link>
            </motion.div>

            {/* Bottom Live Telemetry Pill */}
            <div className="p-3 rounded-2xl glass dark:bg-[#0B132B]/85 border border-slate-200/80 dark:border-blue-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                <span className="font-bold text-slate-800 dark:text-slate-200">Live AQI</span>
                <span className="text-slate-400 text-[11px]">📍 {location.name}</span>
              </div>

              <div className="flex items-center gap-3 font-mono">
                <div className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30 font-bold flex items-center gap-1 text-[11px]">
                  <span>{aqi}</span>
                  <span>{aqiCategory}</span>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400">
                  <span>PM2.5: <strong className="text-slate-700 dark:text-slate-200 font-bold">{pm25}</strong></span>
                  <span>PM10: <strong className="text-slate-700 dark:text-slate-200 font-bold">{pm10}</strong></span>
                  <span>NO₂: <strong className="text-slate-700 dark:text-slate-200 font-bold">{no2}</strong></span>
                  <span>O₃: <strong className="text-slate-700 dark:text-slate-200 font-bold">{o3}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Holographic Foliage Earth Globe */}
          <div className="lg:col-span-5 flex justify-center items-center py-6 lg:py-0">
            <GlobeIllustration />
          </div>
        </div>
      </section>
    </div>
  );
}

