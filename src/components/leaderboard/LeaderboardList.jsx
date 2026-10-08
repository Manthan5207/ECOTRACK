import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ArrowUp, ArrowDown, Minus, Sparkles, MapPin, Award } from 'lucide-react';
import { Card } from '../common/Card';

export default function LeaderboardList({ rankedPlayers = [], currentUserId = null, startIndex = 3 }) {
  const displayList = rankedPlayers.slice(startIndex);

  if (displayList.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-slate-400">
        No participants found in this filter category yet.
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      <AnimatePresence>
        {displayList.map((player) => {
          const isUser = player.isCurrentUser || player.uid === currentUserId;
          const score = player.displayScore !== undefined ? player.displayScore : (player.weeklyPoints || 0);

          return (
            <motion.div
              key={player.uid}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            >
              <div
                className={`p-3.5 sm:p-4 rounded-2xl transition-all flex items-center justify-between gap-3 border ${
                  isUser
                    ? 'bg-blue-500/15 dark:bg-blue-950/40 border-blue-500/50 shadow-glow-blue/30 ring-1 ring-cyan-500/40'
                    : 'glass-card border-white/60 dark:border-blue-500/20 hover:border-cyan-500/30'
                }`}
              >
                {/* Left: Rank & Change Indicator */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-8 text-center">
                    <span className={`font-heading font-black text-sm ${isUser ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-700 dark:text-slate-300'}`}>
                      #{player.rank}
                    </span>
                    <div className="flex items-center justify-center text-[10px] mt-0.5">
                      {player.rankChange === 'up' ? (
                        <span className="text-cyan-400 flex items-center font-bold">
                          <ArrowUp className="w-3 h-3" />
                        </span>
                      ) : player.rankChange === 'down' ? (
                        <span className="text-rose-500 flex items-center font-bold">
                          <ArrowDown className="w-3 h-3" />
                        </span>
                      ) : player.rankChange === 'new' ? (
                        <span className="text-[9px] font-bold text-sky-400 uppercase">NEW</span>
                      ) : (
                        <span className="text-slate-400">
                          <Minus className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full font-heading font-bold text-xs flex items-center justify-center shrink-0 border ${
                    isUser ? 'bg-blue-600 text-white border-white' : 'bg-slate-800 text-slate-200 border-slate-700'
                  }`}>
                    {player.initials || 'ET'}
                  </div>
                </div>

                {/* Center: Name, City & Meta */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className={`font-heading font-bold text-sm truncate ${isUser ? 'text-blue-700 dark:text-cyan-300' : 'text-slate-900 dark:text-white'}`}>
                      {player.name}
                    </h4>
                    {isUser && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                        YOU
                      </span>
                    )}
                    {player.isDemoPlayer && !isUser && (
                      <span className="text-[9px] font-medium px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-400">
                        Demo
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{player.city}</span>
                    </span>

                    {(player.streak || 0) > 0 && (
                      <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                        <Flame className="w-3 h-3 fill-amber-400 text-amber-500" />
                        <span>{player.streak}d streak</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Eco Points */}
                <div className="text-right shrink-0">
                  <span className={`text-base sm:text-lg font-heading font-black tabular-nums ${
                    isUser ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-900 dark:text-white'
                  }`}>
                    {score.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-medium uppercase">
                    Eco pts
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
