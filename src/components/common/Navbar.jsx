import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Globe2, 
  LayoutDashboard, 
  Calculator, 
  Activity, 
  CheckSquare, 
  BookOpen, 
  Trophy,
  Newspaper,
  User, 
  LogOut, 
  Edit3, 
  ChevronDown, 
  Star, 
  Footprints,
  Menu,
  X,
  MoreHorizontal,
  Zap
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuthStore } from '../../store/useAuthStore';
import { useStore } from '../../store/useStore';
import { useLeaderboardStore } from '../../store/useLeaderboardStore';

const desktopNavItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/calculator', label: 'Calculator', icon: Calculator },
  { path: '/tracker', label: 'Tracker', icon: Activity },
  { path: '/actions', label: 'Plan', icon: CheckSquare },
  { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { path: '/news', label: 'News', icon: Newspaper },
  { path: '/learn', label: 'Learn', icon: BookOpen },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, isDemo, logout } = useAuthStore();
  const { ecoScore } = useStore();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMoreOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    setDropdownOpen(false);
    setMobileMoreOpen(false);
    await logout();
    navigate('/');
  };

  const displayName = profile?.displayName || user?.displayName || 'Alex Sharma';
  const nameParts = displayName.split(' ');
  const shortName = nameParts.length > 1 ? `${nameParts[0]} ${nameParts[1][0]}.` : nameParts[0];
  const initials = profile?.initials || (nameParts[0]?.[0] + (nameParts[1]?.[0] || '')).toUpperCase() || 'AS';
  const homeCityName = profile?.homeCity?.name || 'Delhi';

  const { players } = useLeaderboardStore();
  const userRank = React.useMemo(() => {
    if (!user) return null;
    const sorted = [...players].sort((a, b) => b.weeklyPoints - a.weeklyPoints);
    const targetUid = user.uid;
    const idx = sorted.findIndex(p => p.uid === targetUid || (isDemo && (p.isDemo || p.uid === 'user-demo')));
    return idx !== -1 ? idx + 1 : 12;
  }, [players, user, isDemo]);

  return (
    <>
      {/* Top Floating Glass Navbar */}
      <header className="w-full pt-3 pb-1 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-50">
        <div className="glass rounded-full px-5 py-2.5 flex items-center justify-between shadow-glass dark:shadow-glass-dark border border-white/60 dark:border-blue-500/25 bg-white/80 dark:bg-[#0B132B]/85 backdrop-blur-xl">
          {/* Brand Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-glow-blue group-hover:scale-105 transition-transform duration-300">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
              EcoTrack
            </span>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7">
            {desktopNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-blue-600 dark:text-cyan-400 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-300'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-cyan-400 shadow-glow-cyan"></span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Controls: User Avatar Button / Login + Theme Switch */}
          <div className="flex items-center gap-2.5">
            {user && userRank && (
              <Link
                to="/leaderboard"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 hover:bg-blue-500/25 text-blue-700 dark:text-cyan-300 border border-blue-500/30 text-xs font-bold transition-all shadow-sm"
                title="Your Current Leaderboard Rank"
              >
                <span>🏆</span>
                <span>#{userRank}</span>
              </Link>
            )}

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-blue-500/30 hover:border-blue-500 transition-all shadow-sm group"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-950 text-white font-heading font-bold text-[11px] flex items-center justify-center overflow-hidden shrink-0 border border-blue-500/30">
                    {profile?.photoURL ? (
                      <img src={profile.photoURL} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-400 hidden sm:inline">
                    {shortName}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-blue-400' : ''}`} />
                </button>

                {/* Dropdown Card */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-3xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-blue-500/30 shadow-2xl p-4 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white truncate">
                          {displayName}
                        </h4>
                        {isDemo && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                            Demo
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {homeCityName} • {profile?.homeType || 'Apartment'}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-cyan-500 mt-1">
                        <Star className="w-3 h-3 fill-cyan-400 text-cyan-400" />
                        <span>{ecoScore}/100 Verified Eco Citizen</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 dark:border-blue-500/20"></div>

                    <div className="space-y-1 text-xs">
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-blue-500/10 font-medium transition-colors"
                      >
                        <Edit3 className="w-4 h-4 text-blue-500" />
                        <span>Edit Profile & Passport</span>
                      </Link>

                      <Link
                        to="/tracker"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-blue-500/10 font-medium transition-colors"
                      >
                        <Activity className="w-4 h-4 text-cyan-500" />
                        <span>Daily Activity Logger</span>
                      </Link>

                      <Link
                        to="/leaderboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-blue-500/10 font-medium transition-colors"
                      >
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span>Weekly Leaderboard</span>
                      </Link>

                      <Link
                        to="/calculator"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-blue-500/10 font-medium transition-colors"
                      >
                        <Footprints className="w-4 h-4 text-sky-500" />
                        <span>Carbon Footprint Results</span>
                      </Link>

                      <Link
                        to="/actions"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-blue-500/10 font-medium transition-colors"
                      >
                        <CheckSquare className="w-4 h-4 text-blue-500" />
                        <span>Action Plan & Pledges</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 dark:border-blue-500/20"></div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 p-2 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-xs font-bold transition-colors border border-rose-500/20"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-blue transition-all active:scale-95"
              >
                <User className="w-3.5 h-3.5" />
                <span>Log in</span>
              </Link>
            )}

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-blue-500/20 px-2 py-1.5 shadow-glass-dark bg-white/90 dark:bg-[#0B132B]/95 backdrop-blur-xl">
        <div className="grid grid-cols-5 gap-1 items-center">
          <NavLink
            to="/"
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
              location.pathname === '/'
                ? 'text-blue-600 dark:text-cyan-400 bg-blue-500/10 font-bold'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Home</span>
          </NavLink>

          <NavLink
            to="/dashboard"
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
              location.pathname === '/dashboard'
                ? 'text-blue-600 dark:text-cyan-400 bg-blue-500/10 font-bold'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Dashboard</span>
          </NavLink>

          <NavLink
            to="/calculator"
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
              location.pathname === '/calculator'
                ? 'text-blue-600 dark:text-cyan-400 bg-blue-500/10 font-bold'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Calculator</span>
          </NavLink>

          <NavLink
            to="/tracker"
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
              location.pathname === '/tracker'
                ? 'text-blue-600 dark:text-cyan-400 bg-blue-500/10 font-bold'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Tracker</span>
          </NavLink>

          <button
            type="button"
            onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
              mobileMoreOpen || ['/actions', '/leaderboard', '/news', '/learn', '/profile'].includes(location.pathname)
                ? 'text-blue-600 dark:text-cyan-400 bg-blue-500/10 font-bold'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <MoreHorizontal className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">More</span>
          </button>
        </div>
      </nav>

      {/* Mobile "More" Drawer / Modal */}
      {mobileMoreOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end">
          <div className="bg-white dark:bg-[#0F172A] rounded-t-3xl border-t border-blue-500/30 p-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-blue-500/20">
              <span className="font-heading font-bold text-sm text-slate-900 dark:text-white">EcoTrack Navigation</span>
              <button
                onClick={() => setMobileMoreOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <Link
                to="/actions"
                onClick={() => setMobileMoreOpen(false)}
                className="p-3 bg-slate-50 dark:bg-blue-950/30 rounded-2xl border border-slate-200/80 dark:border-blue-500/20 text-slate-800 dark:text-slate-200 flex items-center gap-2.5 text-xs font-semibold"
              >
                <CheckSquare className="w-4 h-4 text-blue-500" />
                <span>Action Plan</span>
              </Link>

              <Link
                to="/leaderboard"
                onClick={() => setMobileMoreOpen(false)}
                className="p-3 bg-slate-50 dark:bg-blue-950/30 rounded-2xl border border-slate-200/80 dark:border-blue-500/20 text-slate-800 dark:text-slate-200 flex items-center gap-2.5 text-xs font-semibold"
              >
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Leaderboard</span>
              </Link>

              <Link
                to="/news"
                onClick={() => setMobileMoreOpen(false)}
                className="p-3 bg-slate-50 dark:bg-blue-950/30 rounded-2xl border border-slate-200/80 dark:border-blue-500/20 text-slate-800 dark:text-slate-200 flex items-center gap-2.5 text-xs font-semibold"
              >
                <Newspaper className="w-4 h-4 text-sky-500" />
                <span>Daily News</span>
              </Link>

              <Link
                to="/learn"
                onClick={() => setMobileMoreOpen(false)}
                className="p-3 bg-slate-50 dark:bg-blue-950/30 rounded-2xl border border-slate-200/80 dark:border-blue-500/20 text-slate-800 dark:text-slate-200 flex items-center gap-2.5 text-xs font-semibold"
              >
                <BookOpen className="w-4 h-4 text-cyan-500" />
                <span>Climate Learn</span>
              </Link>

              {user ? (
                <Link
                  to="/profile"
                  onClick={() => setMobileMoreOpen(false)}
                  className="col-span-2 p-3 bg-blue-500/10 rounded-2xl border border-blue-500/30 text-blue-700 dark:text-cyan-300 flex items-center justify-between text-xs font-bold"
                >
                  <div className="flex items-center gap-2.5">
                    <Edit3 className="w-4 h-4 text-blue-500" />
                    <span>User Profile ({displayName})</span>
                  </div>
                  <span>#{userRank || 12}</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMoreOpen(false)}
                  className="col-span-2 p-3 bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-2 text-xs font-bold shadow-glow-blue"
                >
                  <User className="w-4 h-4" />
                  <span>Log in to EcoTrack</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

