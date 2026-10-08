import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useToast } from '../components/common/Toast';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    loginWithGoogle, 
    loginEmail, 
    signupEmail, 
    loginDemo, 
    loginGuest,
    hasFirebaseKeys 
  } = useAuthStore();
  const { addToast } = useToast();

  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSuccess = (isNewUser = false) => {
    addToast({ 
      message: `Welcome to EcoTrack, ${useAuthStore.getState().profile?.displayName || 'Explorer'}!`, 
      type: 'success' 
    });
    if (isNewUser && !useAuthStore.getState().profile?.hasCompletedOnboarding) {
      navigate('/onboarding', { replace: true });
    } else {
      navigate(from, { replace: true });
    }
  };

  const handleGoogleAuth = async () => {
    if (!hasFirebaseKeys) {
      addToast({ 
        message: 'Firebase keys not configured. Launching instant Demo Account instead.', 
        type: 'info' 
      });
      loginDemo();
      handleSuccess();
      return;
    }

    try {
      setLoading(true);
      await loginWithGoogle();
      handleSuccess();
    } catch (err) {
      addToast({ message: err.message || 'Google sign in failed.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast({ message: 'Please enter both email and password.', type: 'error' });
      return;
    }

    if (!hasFirebaseKeys) {
      addToast({ 
        message: 'Firebase not configured in .env. Logging in with Demo Explorer profile.', 
        type: 'info' 
      });
      loginDemo();
      handleSuccess();
      return;
    }

    try {
      setLoading(true);
      if (mode === 'signup') {
        await signupEmail(email, password, displayName || 'Eco Citizen');
        handleSuccess(true);
      } else {
        await loginEmail(email, password);
        handleSuccess(false);
      }
    } catch (err) {
      addToast({ message: err.message || 'Authentication failed. Please verify credentials.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    loginDemo();
    handleSuccess();
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center px-4 py-8 relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md p-7 sm:p-9 rounded-3xl glass dark:bg-[#0B132B]/85 border border-white/70 dark:border-blue-500/25 shadow-2xl backdrop-blur-2xl relative overflow-hidden text-center"
      >
        {/* Logo Badge */}
        <div className="inline-flex items-center justify-center gap-2 mb-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-glow-blue">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <span className="font-heading font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
            EcoTrack
          </span>
        </div>

        {/* Header Title */}
        <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900 dark:text-white mt-1">
          {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6">
          {mode === 'signup' ? 'Start your journey towards zero emissions' : 'Sign in to continue your green journey'}
        </p>

        {/* 1-Click Google Button */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-xs border border-slate-200 dark:border-blue-500/30 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-5">
          <div className="border-t border-slate-200 dark:border-blue-500/20 w-full" />
          <span className="bg-white dark:bg-[#0B132B] px-3 text-[11px] text-slate-400 font-medium uppercase tracking-wider relative">
            or
          </span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-3.5 text-left">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Manthan Singh"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-blue-500/30 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Email address
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-blue-500/30 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-9 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-blue-500/30 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 absolute right-2.5 top-2"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between text-[11px] pt-0.5">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => addToast({ message: 'Password reset link sent if registered.', type: 'info' })}
              className="text-slate-500 dark:text-slate-400 hover:text-cyan-400"
            >
              Forgot password?
            </button>
          </div>

          {/* Primary Blue Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-heading font-bold text-xs shadow-glow-blue transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Processing...' : mode === 'signup' ? 'Create Account' : 'Log In'}
          </button>
        </form>

        {/* Switch Mode / Sign up footer */}
        <div className="mt-5 text-center text-xs text-slate-500 dark:text-slate-400">
          {mode === 'signup' ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-blue-600 dark:text-cyan-400 font-bold hover:underline"
              >
                Sign in
              </button>
            </span>
          ) : (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-blue-600 dark:text-cyan-400 font-bold hover:underline"
              >
                Sign up
              </button>
            </span>
          )}
        </div>

        {/* 1-Click Demo Shortcut */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-blue-500/20 text-center">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="text-[11px] text-slate-400 hover:text-cyan-400 transition-colors"
          >
            ✨ Or explore immediately with a <strong className="text-cyan-400">Demo Account</strong>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
