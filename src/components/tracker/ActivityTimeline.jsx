import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Zap, Utensils, Recycle, Trash2, Calendar, Sparkles, Clock } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useToast } from '../common/Toast';

const CATEGORY_ICONS = {
  transport: { icon: Car, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
  energy: { icon: Zap, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  food: { icon: Utensils, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  lifestyle: { icon: Recycle, color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' }
};

export default function ActivityTimeline({ selectedDate, onOpenLogModal }) {
  const { activityLogs, deleteActivityLog } = useStore();
  const { addToast } = useToast();

  const filteredLogs = (activityLogs || []).filter(log => {
    if (!selectedDate) return true;
    return log.date === selectedDate;
  });

  const handleDelete = (id, title) => {
    deleteActivityLog(id);
    addToast({ message: `Removed "${title}" from activity log.`, type: 'info' });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center border border-blue-500/20">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {selectedDate ? `Activities on ${selectedDate}` : 'Recent Activity Feed'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {filteredLogs.length} logged {filteredLogs.length === 1 ? 'entry' : 'entries'}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenLogModal}
          className="px-3.5 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition"
        >
          + Log New
        </button>
      </div>

      {filteredLogs.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">No activities logged for this day</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-4">
            Log your transit, green energy, plant-based meals, or recycling to track daily CO₂ savings and build your eco streak!
          </p>
          <button
            onClick={onOpenLogModal}
            className="px-4 py-2 text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-xl transition shadow-md shadow-blue-500/20"
          >
            Log First Activity
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filteredLogs.map((log) => {
              const catConfig = CATEGORY_ICONS[log.category] || CATEGORY_ICONS.transport;
              const Icon = catConfig.icon;
              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border shrink-0 ${catConfig.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{log.title}</span>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 shrink-0">
                          {log.amount} {log.unit}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>{log.date}</span>
                        {log.notes && <span>• "{log.notes}"</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                        {log.emissionsKg} kg CO₂
                      </div>
                      {log.savingsKg > 0 && (
                        <div className="text-[11px] font-semibold text-blue-600 dark:text-cyan-400">
                          +{log.savingsKg} kg saved
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(log.id, log.title)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition opacity-70 group-hover:opacity-100"
                      title="Delete activity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
