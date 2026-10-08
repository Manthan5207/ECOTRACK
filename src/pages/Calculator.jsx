import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator as CalcIcon, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Car, 
  Zap, 
  Utensils, 
  Trash2,
  Sparkles,
  Plane,
  Bike
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';
import { useLeaderboardStore } from '../store/useLeaderboardStore';
import { useToast } from '../components/common/Toast';
import LiveTotalSidebar from '../components/calculator/LiveTotalSidebar';
import CalculatorResults from '../components/calculator/CalculatorResults';

export default function Calculator() {
  const { footprint, setFootprint } = useStore();
  const { profile } = useAuthStore();
  const { addPoints } = useLeaderboardStore();
  const { addToast } = useToast();

  const [step, setStep] = useState(1);
  const [showResults, setShowResults] = useState(false);

  // Form state
  const [personalCarKm, setPersonalCarKm] = useState(50);
  const [publicTransport, setPublicTransport] = useState(true);
  const [flightsPerYear, setFlightsPerYear] = useState(0);
  const [bikeWalkKm, setBikeWalkKm] = useState(10);

  const [electricityKWh, setElectricityKWh] = useState(180);
  const [lpgCylinders, setLpgCylinders] = useState(8);

  const [dietType, setDietType] = useState('vegetarian'); // 'vegan' | 'vegetarian' | 'occasionalMeat' | 'dailyMeat'
  const [shoppingLevel, setShoppingLevel] = useState('medium');
  const [recycling, setRecycling] = useState(true);

  // Dynamic calculations
  // Transport: Car (~0.17 kg/km * 365) + flights (~250 kg/trip) - public transit / bike offset
  const transportAnnual = Math.round(
    personalCarKm * 0.17 * 300 + 
    flightsPerYear * 280 + 
    (publicTransport ? 240 : 0) - 
    (bikeWalkKm * 0.12 * 250)
  );

  // Energy: kWh * 0.72 kg CO2 * 12 + LPG cylinders * 38 kg
  const energyAnnual = Math.round(electricityKWh * 0.72 * 12 + lpgCylinders * 38);

  // Food: diet factor
  const dietFactors = { vegan: 650, vegetarian: 950, occasionalMeat: 1400, dailyMeat: 2100 };
  const foodAnnual = dietFactors[dietType] || 950;

  // Waste & Goods
  const shoppingFactors = { low: 250, medium: 500, high: 900 };
  const wasteAnnual = Math.round((shoppingFactors[shoppingLevel] || 500) - (recycling ? 120 : 0));

  const totalCalculatedKg = Math.max(800, transportAnnual + energyAnnual + foodAnnual + wasteAnnual);

  const breakdown = {
    transport: Math.max(100, transportAnnual),
    energy: Math.max(100, energyAnnual),
    food: Math.max(100, foodAnnual),
    shopping: Math.max(100, wasteAnnual),
    waste: 0,
    total: totalCalculatedKg
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Save footprint to store
      setFootprint({
        ...breakdown,
        hasCalculated: true,
        answers: {
          personalCarKm,
          publicTransport,
          flightsPerYear,
          bikeWalkKm,
          electricityKWh,
          lpgCylinders,
          dietType,
          shoppingLevel,
          recycling
        }
      });
      addPoints('CALCULATOR_COMPLETE', 'calc-audit-season', 25, 'CALCULATOR', 'Completed Carbon Audit');
      addToast({ message: 'Carbon Footprint Audit Saved! +25 pts', type: 'success' });
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setPersonalCarKm(20);
    setPublicTransport(true);
    setFlightsPerYear(0);
    setBikeWalkKm(5);
    setElectricityKWh(150);
    setLpgCylinders(6);
    setDietType('vegetarian');
    setShoppingLevel('medium');
    setRecycling(true);
    setStep(1);
    setShowResults(false);
    addToast({ message: 'Calculator inputs reset to defaults.', type: 'info' });
  };

  if (showResults) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CalculatorResults 
          footprint={footprint?.total ? footprint : breakdown} 
          onRecalculate={() => setShowResults(false)} 
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="text-blue-500">←</span>
            <span>Your Carbon Calculator</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Here's how you compare and where you can improve.
          </p>
        </div>
      </div>

      {/* Stepper Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { num: 1, label: 'Transport', icon: Car },
          { num: 2, label: 'Energy', icon: Zap },
          { num: 3, label: 'Food', icon: Utensils },
          { num: 4, label: 'Goods & Waste', icon: Trash2 },
        ].map((s) => {
          const isActive = step === s.num;
          const isDone = step > s.num;
          return (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-blue-600 text-white font-bold shadow-glow-blue'
                  : isDone
                  ? 'bg-blue-500/15 text-blue-600 dark:text-cyan-400 border border-blue-500/30'
                  : 'glass dark:bg-[#0F172A]/60 text-slate-400 border border-slate-200/60 dark:border-blue-500/20'
              }`}
            >
              <span>{s.num}.</span>
              <span>{s.label}</span>
              {isDone && <Check className="w-3.5 h-3.5 text-cyan-400" />}
            </button>
          );
        })}
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Wizard Controls (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl glass dark:bg-[#0F172A]/80 border border-white/70 dark:border-blue-500/25 shadow-sm space-y-6">
          {/* Step 1: Transport */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">Transport</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Tell us about your daily travel habits</p>
              </div>

              {/* Personal Car Slider */}
              <div className="space-y-2 p-4 rounded-2xl bg-white/40 dark:bg-black/20 border border-slate-200/50 dark:border-blue-500/15">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                    <Car className="w-4 h-4 text-blue-500" />
                    <span>Personal Car</span>
                  </span>
                  <span className="font-bold font-mono text-blue-600 dark:text-cyan-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full">
                    {personalCarKm} km/day
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  step="5"
                  value={personalCarKm}
                  onChange={(e) => setPersonalCarKm(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Public Transport Toggle */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/40 dark:bg-black/20 border border-slate-200/50 dark:border-blue-500/15">
                <div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 block">Public Transport</span>
                  <span className="text-[11px] text-slate-400">Use Metro, Bus, or Shared Transit regularly</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPublicTransport(!publicTransport)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    publicTransport ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      publicTransport ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Flight frequency */}
              <div className="space-y-2 p-4 rounded-2xl bg-white/40 dark:bg-black/20 border border-slate-200/50 dark:border-blue-500/15">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                    <Plane className="w-4 h-4 text-sky-400" />
                    <span>Domestic / Regional Flights</span>
                  </span>
                  <span className="font-bold font-mono text-sky-500 bg-sky-500/10 px-2.5 py-0.5 rounded-full">
                    {flightsPerYear} trips / year
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={flightsPerYear}
                  onChange={(e) => setFlightsPerYear(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Bike / Walk */}
              <div className="space-y-2 p-4 rounded-2xl bg-white/40 dark:bg-black/20 border border-slate-200/50 dark:border-blue-500/15">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                    <Bike className="w-4 h-4 text-cyan-400" />
                    <span>Bike / Walk (Zero Emission)</span>
                  </span>
                  <span className="font-bold font-mono text-blue-600 dark:text-cyan-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full">
                    {bikeWalkKm} km/day
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="2"
                  value={bikeWalkKm}
                  onChange={(e) => setBikeWalkKm(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </motion.div>
          )}

          {/* Step 2: Energy */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">Home Energy</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Monthly power and cooking gas consumption</p>
              </div>

              <div className="space-y-2 p-4 rounded-2xl bg-white/40 dark:bg-black/20 border border-slate-200/50 dark:border-blue-500/15">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Monthly Electricity (kWh)</span>
                  </span>
                  <span className="font-bold font-mono text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                    {electricityKWh} kWh
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="600"
                  step="20"
                  value={electricityKWh}
                  onChange={(e) => setElectricityKWh(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2 p-4 rounded-2xl bg-white/40 dark:bg-black/20 border border-slate-200/50 dark:border-blue-500/15">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">LPG Cooking Cylinders (per year)</span>
                  <span className="font-bold font-mono text-blue-500 dark:text-cyan-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full">
                    {lpgCylinders} cylinders
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="16"
                  step="1"
                  value={lpgCylinders}
                  onChange={(e) => setLpgCylinders(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </motion.div>
          )}

          {/* Step 3: Food */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">Diet & Nutrition</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Select your typical daily meal profile</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'vegan', label: '100% Plant-Based / Vegan', desc: '~0.65 tCO₂e/yr', tag: 'Lowest' },
                  { id: 'vegetarian', label: 'Indian Lacto-Vegetarian', desc: '~0.95 tCO₂e/yr', tag: 'Recommended' },
                  { id: 'occasionalMeat', label: 'Flexitarian (Occasional Meat)', desc: '~1.40 tCO₂e/yr', tag: 'Moderate' },
                  { id: 'dailyMeat', label: 'Daily Meat & Poultry', desc: '~2.10 tCO₂e/yr', tag: 'High Carbon' },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDietType(d.id)}
                    className={`p-4 rounded-2xl border text-left transition ${
                      dietType === d.id
                        ? 'bg-blue-500/15 border-blue-500 dark:border-cyan-400 text-slate-900 dark:text-white font-semibold'
                        : 'bg-white/40 dark:bg-black/20 border-slate-200/60 dark:border-blue-500/15 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{d.label}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-600 dark:text-cyan-300 font-bold">
                        {d.tag}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">{d.desc}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Waste */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">Goods & Waste</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Shopping habits and recycling practices</p>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/40 dark:bg-black/20 border border-slate-200/50 dark:border-blue-500/15">
                <div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 block">Home Waste Segregation & Recycling</span>
                  <span className="text-[11px] text-slate-400">Recycle plastics, dry paper, and compost kitchen organics</span>
                </div>
                <button
                  type="button"
                  onClick={() => setRecycling(!recycling)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    recycling ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      recycling ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </motion.div>
          )}

          {/* Wizard Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-blue-500/20">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className="px-5 py-2.5 rounded-xl glass text-slate-600 dark:text-slate-300 text-xs font-bold disabled:opacity-30 flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-heading font-bold text-xs shadow-glow-blue transition active:scale-95 flex items-center gap-2"
            >
              <span>{step === 4 ? 'View Results' : 'Next'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Live Total Sidebar (4 cols) */}
        <div className="lg:col-span-4">
          <LiveTotalSidebar 
            breakdown={breakdown} 
            total={totalCalculatedKg} 
            currentStep={step}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
  );
}

