import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useStore();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={`relative p-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        isDark ? 'bg-slate-800 border border-blue-500/30' : 'bg-slate-200 border border-slate-300'
      }`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-90" />
        ) : (
          <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300 rotate-0 hover:-rotate-12" />
        )}
      </div>
    </button>
  );
}
