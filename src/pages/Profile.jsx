import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Home as HomeIcon, 
  Car, 
  Utensils, 
  Zap, 
  Settings, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Trash2, 
  Save, 
  Camera, 
  Check, 
  X, 
  Activity,
  Award,
  Flame,
  Globe,
  Trophy,
  Star,
  CheckCircle2,
  TreePine,
  TrendingDown,
  Clock,
  ChevronRight
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useStore } from '../store/useStore';
import { useLeaderboardStore } from '../store/useLeaderboardStore';
import { useToast } from '../components/common/Toast';
import CitySearch from '../components/dashboard/CitySearch';
import { Card } from '../components/common/Card';

const PRESET_INITIALS = ['AS', 'RS', 'PP', 'AM', 'ET', 'VK'];

const ALL_ACHIEVEMENTS = [
  { id: 'green_starter', name: 'Green Starter', icon: '🌊', desc: 'Completed initial carbon audit', unlocked: true },
  { id: 'energy_saver', name: 'Energy Saver', icon: '⚡', desc: 'Maintained monthly electricity below 200 kWh', unlocked: true },
  { id: 'food_hero', name: 'Food Hero', icon: '🥗', desc: 'Logged 7 consecutive plant-based meals', unlocked: true },
  { id: 'tree_planter', name: 'Tree Planter', icon: '🌳', desc: 'Offset over 500 kg CO₂ via verified pledges', unlocked: true },
  { id: 'clean_energy', name: 'Clean Energy', icon: '☀️', desc: 'Utilized solar/renewable tariff power', unlocked: false },
  { id: 'eco_leader', name: 'Eco Leader', icon: '👑', desc: 'Ranked Top 3 in Weekly Sustainability Sprint', unlocked: false },
];

export default function Profile() {
  const navigate = useNavigate();
  const { profile, updateProfile, isDemo, autofillSampleData, deleteLocalData, user } = useAuthStore();
  const { ecoScore, streak, pledges, badges, footprint, activityLogs } = useStore();
  const { addToast } = useToast();

  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    displayName: profile?.displayName || 'Alex Sharma',
    email: profile?.email || 'alex.sharma@ecotrack.app',
    photoURL: profile?.photoURL || '',
    initials: profile?.initials || 'AS',
    providerLabel: profile?.providerLabel || 'Demo Account',
    homeCity: profile?.homeCity || { name: 'Delhi', lat: 28.6139, lon: 77.2090, admin1: 'Delhi', country: 'India' },
    country: profile?.country || 'India',
    currency: profile?.currency || 'INR',
    units: profile?.units || 'metric',
    householdSize: profile?.householdSize || 4,
    homeType: profile?.homeType || 'apartment',
    mainCommute: profile?.mainCommute || 'metro-train',
    averageDailyCommuteKm: profile?.averageDailyCommuteKm || 16,
    dietType: profile?.dietType || 'vegetarian',
    monthlyElectricityKwh: profile?.monthlyElectricityKwh || 180,
    theme: profile?.theme || 'dark',
    aqiAlertThreshold: profile?.aqiAlertThreshold || 150,
    emailTips: profile?.emailTips !== undefined ? profile?.emailTips : true,
    memberSince: profile?.memberSince || 'Oct 2026'
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Sync state if profile changes
  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        ...profile,
        initials: profile.initials || 'AS'
      }));
    }
  }, [profile]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handlePresetInitials = (init) => {
    setFormData(prev => ({ ...prev, initials: init, photoURL: '' }));
    setHasChanges(true);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 200 * 1024) {
      addToast({ message: 'Please select an image smaller than 200 KB.', type: 'warning' });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({ ...prev, photoURL: reader.result }));
      setHasChanges(true);
      addToast({ message: 'Avatar image updated locally.', type: 'info' });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e?.preventDefault();
    if (!formData.displayName.trim()) {
      addToast({ message: 'Full Name is required.', type: 'warning' });
      return;
    }

    updateProfile(formData);
    setHasChanges(false);
    addToast({ message: 'Profile changes saved successfully!', type: 'success' });
  };

  const handleAutofill = () => {
    autofillSampleData();
    addToast({ message: 'Autofilled sample lifestyle profile data.', type: 'info' });
  };

  const handleDeleteConfirm = () => {
    deleteLocalData();
    setShowDeleteModal(false);
    addToast({ message: 'Local profile and user data cleared.', type: 'info' });
    navigate('/', { replace: true });
  };

  // Mock 4-month footprint history
  const monthlyHistory = [
    { month: 'Jul', tonnes: 5.1, heightPct: 100 },
    { month: 'Aug', tonnes: 4.8, heightPct: 94 },
    { month: 'Sep', tonnes: 4.5, heightPct: 88 },
    { month: 'Oct', tonnes: 4.2, heightPct: 82 },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-20 space-y-8">
      {/* 1. Header Passport Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-blue-500/25 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Large Avatar */}
            <div className="relative group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-700 text-white font-heading font-black text-2xl sm:text-3xl flex items-center justify-center shadow-glow-blue overflow-hidden border-2 border-cyan-400/40">
                {formData.photoURL ? (
                  <img src={formData.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>{formData.initials || 'AS'}</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 p-2 rounded-xl bg-blue-600 text-white shadow-lg hover:bg-cyan-500 transition-all hover:scale-110"
                title="Change Avatar"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[11px] font-bold px-3 py-0.5 rounded-full bg-blue-500/20 text-cyan-400 border border-blue-500/30 uppercase tracking-wider">
                  🌊 Eco Champion
                </span>
                {isDemo && (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Demo Account
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white">
                {formData.displayName}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {formData.email} • {formData.homeCity?.name || 'Delhi'}, {formData.country}
              </p>
            </div>
          </div>

          {/* Quick Metric Pills */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-initial px-4 py-3 rounded-2xl bg-blue-950/40 dark:bg-[#0B132B]/80 border border-blue-500/30 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-black text-base">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span>{streak}d</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mt-0.5">Eco Streak</span>
            </div>

            <div className="flex-1 md:flex-initial px-4 py-3 rounded-2xl bg-blue-950/40 dark:bg-[#0B132B]/80 border border-blue-500/30 text-center">
              <div className="text-cyan-400 font-heading font-black text-base">
                {ecoScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mt-0.5">EcoScore</span>
            </div>

            <div className="flex-1 md:flex-initial px-4 py-3 rounded-2xl bg-blue-950/40 dark:bg-[#0B132B]/80 border border-blue-500/30 text-center">
              <div className="text-blue-300 font-heading font-black text-base">
                {pledges.length}
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mt-0.5">Pledges</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Badges & Achievements Grid */}
      <div className="glass-card p-6 rounded-3xl border border-white/60 dark:border-blue-500/20 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-blue-500/15 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
              Badges & Achievements
            </h3>
          </div>
          <span className="text-xs font-bold text-cyan-400">
            {ALL_ACHIEVEMENTS.filter(a => a.unlocked).length} of {ALL_ACHIEVEMENTS.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {ALL_ACHIEVEMENTS.map((badge) => (
            <div
              key={badge.id}
              className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-between ${
                badge.unlocked
                  ? 'bg-blue-500/10 dark:bg-blue-950/40 border-blue-500/40 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/60 opacity-50 grayscale'
              }`}
            >
              <span className="text-2xl sm:text-3xl block mb-1">{badge.icon}</span>
              <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                {badge.name}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 leading-tight line-clamp-2">
                {badge.desc}
              </div>
              <div className="mt-2">
                {badge.unlocked ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-cyan-400">
                    <CheckCircle2 className="w-3 h-3" /> Unlocked
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 font-medium">Locked</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Monthly History & Progress Bar Chart */}
      <div className="glass-card p-6 rounded-3xl border border-white/60 dark:border-blue-500/20 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-blue-500/15 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
              Monthly Footprint Trajectory (tCO₂e)
            </h3>
          </div>
          <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>-18% Total Reduction</span>
          </span>
        </div>

        <div className="grid grid-cols-4 gap-4 pt-4 pb-2 items-end h-48">
          {monthlyHistory.map((item, idx) => (
            <div key={item.month} className="flex flex-col items-center h-full justify-end group">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1 group-hover:text-cyan-400 transition">
                {item.tonnes} t
              </span>
              <div className="w-full max-w-[56px] bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden p-1 flex items-end h-32">
                <div
                  className={`w-full rounded-xl transition-all duration-700 ${
                    idx === monthlyHistory.length - 1
                      ? 'bg-gradient-to-t from-blue-600 to-cyan-400 shadow-glow-cyan'
                      : 'bg-blue-600/40'
                  }`}
                  style={{ height: `${item.heightPct}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-slate-400 mt-2">{item.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Edit Lifestyle Profile & Preferences Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6 space-y-6" hover={false}>
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Settings className="w-4 h-4 text-cyan-400" />
              Lifestyle & Location Parameters
            </h3>
            <button
              type="button"
              onClick={handleAutofill}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/30 hover:bg-blue-500/20 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autofill Sample</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Full Display Name *
              </label>
              <input
                type="text"
                required
                value={formData.displayName}
                onChange={(e) => handleChange('displayName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={formData.email}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Home City & Coordinates (Live Satellite AQI)
            </label>
            <CitySearch onSelectCity={(city) => handleChange('homeCity', city)} />
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Active City: <strong>{formData.homeCity?.name || 'Delhi'}</strong> ({formData.homeCity?.admin1 ? `${formData.homeCity.admin1}, ` : ''}{formData.homeCity?.country || 'India'})</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Household Size
              </label>
              <select
                value={formData.householdSize}
                onChange={(e) => handleChange('householdSize', parseInt(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:border-blue-500 focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Primary Commute
              </label>
              <select
                value={formData.mainCommute}
                onChange={(e) => handleChange('mainCommute', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:border-blue-500 focus:outline-none"
              >
                <option value="metro-train">Metro Train / Rail</option>
                <option value="bus">Public Bus</option>
                <option value="two-wheeler">Two-Wheeler (Scooter/Bike)</option>
                <option value="car">Petrol / Diesel Car</option>
                <option value="auto-rickshaw">Auto-Rickshaw / Cab</option>
                <option value="walk-cycle">Walking / Bicycle</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Dietary Pattern
              </label>
              <select
                value={formData.dietType}
                onChange={(e) => handleChange('dietType', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:border-blue-500 focus:outline-none"
              >
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="eggetarian">Eggetarian</option>
                <option value="occasional meat">Occasional Meat (1-2x/wk)</option>
                <option value="meat daily">Daily Meat</option>
              </select>
            </div>
          </div>

          {/* Unsaved Changes Banner */}
          {hasChanges && (
            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                You have unsaved changes. Remember to click "Save Profile".
              </span>
            </div>
          )}

          {/* Bottom Actions Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="text-xs font-semibold text-rose-500 hover:underline flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete local data</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-heading font-bold text-xs sm:text-sm shadow-glow-blue transition-all active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </button>
            </div>
          </div>
        </Card>
      </form>

      {/* Confirmation Modal for Deleting Local Data */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-6 rounded-3xl max-w-sm w-full border border-rose-500/30 space-y-4 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-500 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                Delete Local Data?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                This will clear your local stored profile, pledges, and custom settings from this browser session.
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md"
                >
                  Yes, Delete Data
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
