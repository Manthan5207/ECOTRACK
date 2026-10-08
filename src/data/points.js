/**
 * Points configuration and constants for EcoTrack Leaderboard
 */

export const POINT_VALUES = {
  // Action Plan Pledges (by difficulty)
  pledgeEasy: 10,
  pledgeMedium: 20,
  pledgeHard: 30,

  // Carbon Calculator
  calculatorComplete: 25, // Once per week

  // Daily Dashboard Check-in
  dailyCheckin: 5, // Once per day

  // Daily Green Choice Logs (15 pts each, max 3/day)
  greenChoice: 15,

  // Daily Activity Logging
  activityLogged: 10, // Max 3/day

  // Consecutive Streak Bonus (Day 3+)
  streakBonusPerDay: 10, // Max 50 pts / week
  streakBonusMaxWeekly: 50,

  // Limits
  weeklyUserPointsCap: 600,
  maxDailyGreenChoices: 3,
  maxDailyActivities: 3,
};

export const GREEN_CHOICES = [
  { id: 'public-transit', label: 'Used Metro / Bus / Bicycle', icon: '🚲', category: 'transport', points: 15 },
  { id: 'meatless-day', label: 'Ate 100% Plant-Based Meals Today', icon: '🥗', category: 'food', points: 15 },
  { id: 'zero-plastic', label: 'Refused Single-Use Plastic / Bags', icon: '🛍️', category: 'waste', points: 15 },
  { id: 'energy-saver', label: 'AC at 24°C & Unplugged Idle Devices', icon: '💡', category: 'energy', points: 15 },
  { id: 'short-shower', label: 'Saved Water (5-Min Bucket Bath)', icon: '🚿', category: 'water', points: 15 },
];

export const POINT_RULES_INFO = [
  { action: 'Pledge an Action', points: '10 - 30 pts', freq: 'Per pledge based on difficulty (Easy: 10, Med: 20, Hard: 30)' },
  { action: 'Complete Carbon Audit', points: '25 pts', freq: 'Once per weekly season' },
  { action: 'Daily Activity / Green Choice', points: '10 - 15 pts each', freq: 'Up to 3 choices daily (Max 45 pts/day)' },
  { action: 'Dashboard Check-In', points: '5 pts', freq: 'Once per day' },
  { action: 'Daily Activity Tracker Log', points: '10 pts', freq: 'Up to 3 activities daily (Max 30 pts/day)' },
  { action: 'Streak Bonus (Day 3+)', points: '+10 pts/day', freq: 'Consecutive active days (Capped at 50 pts/week)' },
  { action: 'Weekly Maximum Cap', points: '600 pts cap', freq: 'Protects competition fairness against spam' },
];
