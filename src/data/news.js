/**
 * Curated Environmental & Climate News for EcoTrack
 * Structured for future live API integration (NewsAPI / GNews / RSS).
 */

export const NEWS_CATEGORIES = [
  { id: 'all', label: 'All News' },
  { id: 'renewable', label: 'Renewable Energy' },
  { id: 'greentech', label: 'Green Tech & AI' },
  { id: 'policy', label: 'Climate Policy' },
  { id: 'mobility', label: 'Clean Mobility' },
  { id: 'conservation', label: 'Nature & Oceans' }
];

export const DAILY_NEWS = [
  {
    id: 'news-1',
    title: 'Global Solar Capacity Surpasses 2 Terawatts Milestone Ahead of Projections',
    summary: 'Spurred by rapid rooftop adoption in Asia and utility-scale grids in Europe, renewable generation accounts for over 85% of newly installed power capacity worldwide this year.',
    category: 'renewable',
    categoryLabel: 'Renewable Energy',
    publishedAt: '2 hours ago',
    date: 'Today',
    readTime: '3 min read',
    source: 'Clean Energy Monitor',
    author: 'Elena Vance',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    tags: ['Solar Power', 'Grid Modernization', 'Clean Energy'],
    impactBadge: 'High Impact',
    content: `Global installed solar photovoltaic (PV) capacity has officially crossed the 2 Terawatt milestone, reaching the target a full three years earlier than the International Energy Agency (IEA) had forecasted in 2021.
    
The surge has been driven predominantly by decentralized rooftop installations across urban metropolises and massive utility-scale battery-integrated microgrids. Solar power is now consistently recognized as the cheapest source of bulk electricity in history across more than 130 countries.
    
Industry analysts note that integrated grid storage and localized microgrids will be the next major frontier to sustain continuous 24/7 clean baseload power.`
  },
  {
    id: 'news-2',
    title: 'New Solid-State Battery Breakthrough Promises 800km Range for Urban EVs',
    summary: 'Next-generation solid-state chemistry demonstrates 1,200 charge cycles with near-zero degradation, slashing battery pack carbon footprint by 34%.',
    category: 'greentech',
    categoryLabel: 'Green Tech & AI',
    publishedAt: '4 hours ago',
    date: 'Today',
    readTime: '4 min read',
    source: 'Tech & Sustainable Mobility',
    author: 'Dr. Julian Morales',
    imageUrl: 'https://images.unsplash.com/photo-1558441719-8d48980f89a6?auto=format&fit=crop&w=800&q=80',
    tags: ['EV Batteries', 'Innovation', 'Decarbonization'],
    impactBadge: 'Breakthrough',
    content: `Materials scientists have unveiled a scalable manufacturing method for high-density silicon-anode solid-state battery cells that eliminate volatile liquid electrolytes.
    
The newly engineered cell chemistry provides exceptional thermal safety, charges from 10% to 80% in under 9 minutes, and reduces mineral extraction requirements by over 40% compared to legacy NMC cells.
    
Automotive manufacturers are accelerating pilot lines, with commercial fleet rollout expected within 18 months, dramatically bringing down the lifecycle emissions of daily urban transportation.`
  },
  {
    id: 'news-3',
    title: 'Global Urban Air Quality Standard Mandates Real-Time Low Emission Zones',
    summary: 'Over 40 global mega-cities agree to enforce dynamic congestion pricing and zero-emission delivery corridors based on live satellite and ground AQI monitoring.',
    category: 'policy',
    categoryLabel: 'Climate Policy',
    publishedAt: '6 hours ago',
    date: 'Today',
    readTime: '3 min read',
    source: 'Global Urban Climate Accord',
    author: 'Kavita Menon',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80',
    tags: ['Clean Air', 'Urban Policy', 'Low Emission Zones'],
    impactBadge: 'Policy Shift',
    content: `A coalition of 40 global metropolitan mayors has ratified the Clean Urban Corridors Accord, committing to establish dynamic Low Emission Zones (LEZs) linked directly to real-time atmospheric sensor grids.
    
Under the new framework, commercial freight, delivery vans, and private combustion vehicles will face automated tariffs during peak particulate matter spikes, while public transit subsidies and EV charging lanes will be dynamically expanded.
    
Pilot implementations in major cities have already demonstrated a 28% decrease in localized PM2.5 and nitrogen dioxide concentrations within their first quarter of operation.`
  },
  {
    id: 'news-4',
    title: 'High-Speed Electric Rail Corridors Cut Regional Flight Emissions by 45%',
    summary: 'Massive investments in electrified intercity rail infrastructure prompt a significant consumer shift from short-haul domestic flights to high-speed rail.',
    category: 'mobility',
    categoryLabel: 'Clean Mobility',
    publishedAt: '8 hours ago',
    date: 'Yesterday',
    readTime: '5 min read',
    source: 'Transit Horizons',
    author: 'Marcus Lindqvist',
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80',
    tags: ['Electric Rail', 'Public Transit', 'Aviation Emissions'],
    impactBadge: 'Transit Win',
    content: `New transport data reveals that electrified high-speed rail lines operating at 300+ km/h have successfully captured over 65% of passenger volume on routes under 600 kilometers previously dominated by domestic airlines.
    
The shift has prevented an estimated 1.4 million metric tonnes of aviation CO₂ emissions over the past 12 months alone, while reducing per-passenger travel emissions by up to 92%.
    
Governments are now linking rail terminals directly with multimodal cycling networks and shared electric micro-mobility hubs for seamless first-to-last-mile connectivity.`
  },
  {
    id: 'news-5',
    title: 'AI-Powered Reforestation Drones Plant 10 Million Native Seedlings in Record Time',
    summary: 'Autonomous bio-drone swarms map degraded watersheds and fire-damaged forests, planting pre-germinated seed pods with an 85% survival rate.',
    category: 'conservation',
    categoryLabel: 'Nature & Oceans',
    publishedAt: '12 hours ago',
    date: 'Yesterday',
    readTime: '3 min read',
    source: 'EcoRestoration Daily',
    author: 'Sarah Chen',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    tags: ['Reforestation', 'Biodiversity', 'AI For Earth'],
    impactBadge: 'Conservation',
    content: `A groundbreaking ecological restoration initiative utilizing autonomous drone fleets has completed the planting of 10 million biodiverse native trees across critical subtropical catchment zones.
    
Each drone is equipped with multispectral LiDAR to assess soil moisture, gradient, and existing canopy cover before pneumatically embedding nutrient-coated seed pods into the earth at optimal depths.
    
The technology operates at 10x the speed and 20% of the cost of traditional manual replanting, accelerating ecosystem restoration and natural carbon sequestration.`
  },
  {
    id: 'news-6',
    title: 'Offshore Floating Wind Farms Demonstrate Resilience in Extreme Storm Tests',
    summary: 'Next-generation 15-megawatt deepwater floating wind turbines achieve uninterrupted power generation during severe ocean squalls, validating deep-sea clean power.',
    category: 'renewable',
    categoryLabel: 'Renewable Energy',
    publishedAt: '1 day ago',
    date: 'Yesterday',
    readTime: '4 min read',
    source: 'Ocean Clean Power Review',
    author: 'Henrik Olsen',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
    tags: ['Wind Energy', 'Offshore', 'Clean Grid'],
    impactBadge: 'Trending',
    content: `Deep-sea floating wind platforms anchored in waters exceeding 100 meters depth have proven their structural reliability and peak efficiency during seasonal gale-force trials.
    
Floating wind enables power capture in deep coastal waters where winds are stronger and more consistent than near-shore installations, unlocking vast new oceanic renewable territories for coastal metropolises.`
  }
];
