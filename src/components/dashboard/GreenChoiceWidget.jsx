import React from 'react';
import { Card } from '../common/Card';
import { GREEN_CHOICES } from '../../data/points';
import { useLeaderboardStore } from '../../store/useLeaderboardStore';
import { useToast } from '../common/Toast';
import { Sparkles, Check, Activity } from 'lucide-react';

export default function GreenChoiceWidget() {
  const { addPoints, events } = useLeaderboardStore();
  const { addToast } = useToast();

  const todayStr = new Date().toISOString().split('T')[0];
  const todayEvents = (events || []).filter(e => e.timestamp?.startsWith(todayStr) && e.type === 'greenChoice');
  const loggedChoiceIds = todayEvents.map(e => e.actionId);

  const handleLogChoice = (choice) => {
    if (loggedChoiceIds.includes(choice.id)) {
      addToast({ message: 'You already logged this green choice today!', type: 'info' });
      return;
    }

    if (loggedChoiceIds.length >= 3) {
      addToast({ message: 'Daily limit reached (max 3 green choices / day)!', type: 'warning' });
      return;
    }

    const res = addPoints('greenChoice', choice.id, choice.points, choice.category, choice.label);
    if (res.success) {
      addToast({ message: `+${choice.points} Eco Points! Logged "${choice.label}" 🌊`, type: 'success' });
    } else {
      addToast({ message: res.reason || 'Could not add points.', type: 'warning' });
    }
  };

  return (
    <Card className="p-5 border-blue-500/20" hover={false}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-500/15 text-blue-600 dark:text-cyan-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
              Log Today's Green Choice
            </h3>
            <p className="text-[11px] text-slate-400">
              Earn +15 Eco Points each (Logged: {loggedChoiceIds.length}/3 today)
            </p>
          </div>
        </div>

        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 font-mono border border-blue-500/20">
          +15 pts / choice
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {GREEN_CHOICES.map((choice) => {
          const isDone = loggedChoiceIds.includes(choice.id);

          return (
            <button
              key={choice.id}
              onClick={() => handleLogChoice(choice)}
              disabled={isDone || loggedChoiceIds.length >= 3}
              type="button"
              className={`p-3 rounded-2xl text-left border transition-all flex items-center justify-between gap-2 ${
                isDone
                  ? 'bg-blue-500/15 border-blue-500/40 text-blue-950 dark:text-cyan-200 cursor-default'
                  : 'bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 hover:bg-blue-50/50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-base">{choice.icon}</span>
                <span className="text-xs font-semibold truncate">{choice.label}</span>
              </div>

              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                isDone ? 'bg-blue-600 text-white border-blue-600 shadow-glow-blue' : 'border-slate-300 dark:border-slate-700'
              }`}>
                {isDone && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
