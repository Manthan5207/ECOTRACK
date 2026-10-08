/**
 * Emission factors and baseline constants for Daily Activity Logging in EcoTrack
 */

export const ACTIVITY_CATEGORIES = [
  { id: 'transport', label: 'Commute & Travel', icon: 'Car', color: 'emerald' },
  { id: 'energy', label: 'Home Energy', icon: 'Zap', color: 'amber' },
  { id: 'food', label: 'Diet & Meals', icon: 'Utensils', color: 'lime' },
  { id: 'lifestyle', label: 'Waste & Lifestyle', icon: 'Recycle', color: 'sky' }
];

export const ACTIVITY_TYPES = {
  transport: [
    {
      id: 'metro-commute',
      label: 'Metro / Electric Train',
      unit: 'km',
      defaultAmount: 15,
      factorKgPerUnit: 0.03, // 0.03 kg CO2/km
      baselineFactor: 0.17,  // Petrol car baseline 0.17 kg CO2/km
      savingsDescription: 'Saved ~0.14 kg CO2/km compared to driving a solo car'
    },
    {
      id: 'bus-commute',
      label: 'City Bus / Transit',
      unit: 'km',
      defaultAmount: 10,
      factorKgPerUnit: 0.06,
      baselineFactor: 0.17,
      savingsDescription: 'Saved ~0.11 kg CO2/km vs single-occupancy driving'
    },
    {
      id: 'bicycle-walk',
      label: 'Walked or Cycled (Zero Emission)',
      unit: 'km',
      defaultAmount: 5,
      factorKgPerUnit: 0.0,
      baselineFactor: 0.17,
      savingsDescription: '100% zero emissions commute!'
    },
    {
      id: 'ev-commute',
      label: 'Electric Vehicle / E-Scooter',
      unit: 'km',
      defaultAmount: 15,
      factorKgPerUnit: 0.05,
      baselineFactor: 0.17,
      savingsDescription: 'Low operational emission with green grid potential'
    },
    {
      id: 'carpool',
      label: 'Carpool / Shared Ride',
      unit: 'km',
      defaultAmount: 15,
      factorKgPerUnit: 0.07,
      baselineFactor: 0.17,
      savingsDescription: 'Halved vehicular footprint per passenger'
    },
    {
      id: 'petrol-car',
      label: 'Solo Petrol / Diesel Car',
      unit: 'km',
      defaultAmount: 15,
      factorKgPerUnit: 0.17,
      baselineFactor: 0.17,
      savingsDescription: 'Standard fossil fuel commute'
    }
  ],
  energy: [
    {
      id: 'ac-eco-mode',
      label: 'AC Set to 24°C+ (Eco Mode)',
      unit: 'hours',
      defaultAmount: 6,
      factorKgPerUnit: 0.55,
      baselineFactor: 0.85,
      savingsDescription: 'Saved ~0.30 kg CO2 per cooling hour'
    },
    {
      id: 'solar-power-day',
      label: 'Rooftop Solar Generated',
      unit: 'kWh',
      defaultAmount: 5,
      factorKgPerUnit: 0.04,
      baselineFactor: 0.72,
      savingsDescription: 'Displaced high-carbon grid thermal power'
    },
    {
      id: 'natural-ventilation',
      label: 'Natural Ventilation / Fan only',
      unit: 'hours',
      defaultAmount: 8,
      factorKgPerUnit: 0.04,
      baselineFactor: 0.85,
      savingsDescription: 'Avoided heavy compressor energy consumption'
    },
    {
      id: 'led-lighting-day',
      label: 'Efficient LED Lighting usage',
      unit: 'hours',
      defaultAmount: 6,
      factorKgPerUnit: 0.01,
      baselineFactor: 0.06,
      savingsDescription: '75%+ power reduction vs incandescent bulbs'
    }
  ],
  food: [
    {
      id: 'plant-based-meal',
      label: 'Plant-Based / Vegan Meal',
      unit: 'meals',
      defaultAmount: 2,
      factorKgPerUnit: 0.6,
      baselineFactor: 2.5,
      savingsDescription: 'Saved ~1.9 kg CO2e per meal compared to high-meat diet'
    },
    {
      id: 'vegetarian-meal',
      label: 'Vegetarian / Dairy Meal',
      unit: 'meals',
      defaultAmount: 2,
      factorKgPerUnit: 1.1,
      baselineFactor: 2.5,
      savingsDescription: 'Saved ~1.4 kg CO2e per meal'
    },
    {
      id: 'local-seasonal-food',
      label: 'Locally Sourced / Seasonal Produce',
      unit: 'meals',
      defaultAmount: 1,
      factorKgPerUnit: 0.8,
      baselineFactor: 1.8,
      savingsDescription: 'Minimized long-distance food miles and refrigeration'
    },
    {
      id: 'zero-food-waste',
      label: 'Zero Food Waste Day',
      unit: 'days',
      defaultAmount: 1,
      factorKgPerUnit: 0.0,
      baselineFactor: 1.2,
      savingsDescription: 'Prevented methane emissions from landfill decay'
    }
  ],
  lifestyle: [
    {
      id: 'recycled-plastics-paper',
      label: 'Segregated & Recycled Waste',
      unit: 'kg',
      defaultAmount: 1,
      factorKgPerUnit: 0.1,
      baselineFactor: 1.5,
      savingsDescription: 'Saved virgin material extraction & processing'
    },
    {
      id: 'reusable-bag-bottle',
      label: 'Used Reusable Bags & Bottle',
      unit: 'items',
      defaultAmount: 3,
      factorKgPerUnit: 0.0,
      baselineFactor: 0.25,
      savingsDescription: 'Eliminated single-use plastic waste'
    },
    {
      id: 'home-composting',
      label: 'Home Kitchen Organic Composting',
      unit: 'kg',
      defaultAmount: 1,
      factorKgPerUnit: 0.05,
      baselineFactor: 0.8,
      savingsDescription: 'Converted bio-waste into fertile soil nutrient'
    }
  ]
};

export const INITIAL_SAMPLE_LOGS = [
  {
    id: 'log-1',
    date: new Date().toISOString().split('T')[0],
    category: 'transport',
    activityId: 'metro-commute',
    title: 'Metro / Electric Train',
    amount: 18,
    unit: 'km',
    emissionsKg: 0.54,
    savingsKg: 2.52,
    timestamp: Date.now() - 3600 * 1000 * 3
  },
  {
    id: 'log-2',
    date: new Date().toISOString().split('T')[0],
    category: 'food',
    activityId: 'plant-based-meal',
    title: 'Plant-Based / Vegan Meal',
    amount: 2,
    unit: 'meals',
    emissionsKg: 1.2,
    savingsKg: 3.8,
    timestamp: Date.now() - 3600 * 1000 * 5
  },
  {
    id: 'log-3',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    category: 'energy',
    activityId: 'ac-eco-mode',
    title: 'AC Set to 24°C+ (Eco Mode)',
    amount: 6,
    unit: 'hours',
    emissionsKg: 3.3,
    savingsKg: 1.8,
    timestamp: Date.now() - 86400000 - 3600 * 1000 * 4
  },
  {
    id: 'log-4',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    category: 'transport',
    activityId: 'bicycle-walk',
    title: 'Walked or Cycled (Zero Emission)',
    amount: 4,
    unit: 'km',
    emissionsKg: 0.0,
    savingsKg: 0.68,
    timestamp: Date.now() - 86400000 - 3600 * 1000 * 8
  }
];
