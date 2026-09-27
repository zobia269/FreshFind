// Farmers Markets Dataset for FreshFind
// Contains all required fields: Name, Location, Operating Days & Hours, Produce Types

export const FARMERS_MARKETS = [
  {
    id: 'downtown-artisan-market',
    name: 'Downtown Artisan Farmers Market',
    area: 'Downtown Civic Plaza',
    address: '450 Civic Center Way, Central Plaza',
    coordinates: { lat: 31.5204, lng: 74.3587 },
    distance: '1.2 km away',
    openDays: ['Wednesday', 'Saturday'],
    openDaysIndices: [3, 6], // 0=Sun, 1=Mon, ..., 6=Sat
    openTimeHours: 8,
    closeTimeHours: 14,
    hoursDisplay: '8:00 AM – 2:00 PM',
    stallCount: 42,
    produceTypes: ['Heirloom Fruits', 'Organic Leafy Greens', 'Raw Wildflower Honey', 'Artisan Sourdough'],
    description: 'Central city market featuring 40+ multi-generational growers, stone-ground flour bakers, and pesticide-free heirloom produce.',
    bannerColor: 'emerald',
    rating: 4.9,
    reviewsCount: 128,
    phone: '+1 (555) 234-8901',
    parking: 'Free 2-hour underground parking at Plaza',
    featured: true
  },
  {
    id: 'green-valley-organic',
    name: 'Green Valley Organic Harvest',
    area: 'Green Valley District',
    address: '1280 Orchard Valley Road, West Fields',
    coordinates: { lat: 31.5401, lng: 74.3211 },
    distance: '2.8 km away',
    openDays: ['Saturday', 'Sunday'],
    openDaysIndices: [0, 6],
    openTimeHours: 7,
    closeTimeHours: 13,
    hoursDisplay: '7:00 AM – 1:00 PM',
    stallCount: 56,
    produceTypes: ['Certified Organic Veggies', 'Microgreens', 'Free-Range Eggs', 'Goat Cheese & Dairy'],
    description: 'Premier certified regenerative organic hub directly adjacent to local orchards and greenhouse hydroponic growers.',
    bannerColor: 'teal',
    rating: 4.8,
    reviewsCount: 94,
    phone: '+1 (555) 492-1022',
    parking: 'Open gravel lot with bicycle racks',
    featured: true
  },
  {
    id: 'riverside-saturday-fair',
    name: 'Riverside Fresh Farm Fair',
    area: 'River Promenade',
    address: '88 Riverfront Esplanade, Pier 4',
    coordinates: { lat: 31.5055, lng: 74.3754 },
    distance: '3.4 km away',
    openDays: ['Saturday'],
    openDaysIndices: [6],
    openTimeHours: 8,
    closeTimeHours: 15,
    hoursDisplay: '8:00 AM – 3:00 PM',
    stallCount: 38,
    produceTypes: ['Wild Foraged Mushrooms', 'Heirloom Berries', 'Cold-Pressed Oils', 'Fresh Sea Bass'],
    description: 'Bustling waterside weekend market known for wild seasonal mushrooms, fresh berries, and live acoustic folk music.',
    bannerColor: 'amber',
    rating: 4.7,
    reviewsCount: 110,
    phone: '+1 (555) 819-3340',
    parking: 'Metered street parking & pier deck',
    featured: true
  },
  {
    id: 'sunny-meadow-market',
    name: 'Sunny Meadow Community Market',
    area: 'Eastside Suburbs',
    address: '320 Meadow Lane, Community Park',
    coordinates: { lat: 31.4890, lng: 74.3980 },
    distance: '4.1 km away',
    openDays: ['Tuesday', 'Friday'],
    openDaysIndices: [2, 5],
    openTimeHours: 9,
    closeTimeHours: 14,
    hoursDisplay: '9:00 AM – 2:00 PM',
    stallCount: 30,
    produceTypes: ['Root Vegetables', 'Stone Fruits', 'Herbal Tisanes', 'Homemade Fruit Preserves'],
    description: 'Neighborhood-friendly weekday market specializing in budget-friendly canning seconds, fresh sweet corn, and stone fruits.',
    bannerColor: 'lime',
    rating: 4.6,
    reviewsCount: 65,
    phone: '+1 (555) 671-2299',
    parking: 'Park community center lot',
    featured: false
  },
  {
    id: 'highland-eco-bazaar',
    name: 'Highland Eco Farm & Dairy Bazaar',
    area: 'North Highland Heights',
    address: '710 Skyline Boulevard, Ridgeview Park',
    coordinates: { lat: 31.5620, lng: 74.3400 },
    distance: '5.2 km away',
    openDays: ['Thursday', 'Sunday'],
    openDaysIndices: [4, 0],
    openTimeHours: 8,
    closeTimeHours: 13,
    hoursDisplay: '8:00 AM – 1:00 PM',
    stallCount: 45,
    produceTypes: ['Artisanal Cheeses', 'Pasture-Raised Poultry', 'Wild Alliums (Ramps)', 'Micro-Batched Jams'],
    description: 'High-altitude producers delivering farmstead butter, Alpine-style cheeses, and cold-climate brassicas.',
    bannerColor: 'emerald',
    rating: 4.9,
    reviewsCount: 142,
    phone: '+1 (555) 902-4411',
    parking: 'Scenic hilltop lot with EV charging',
    featured: false
  },
  {
    id: 'old-town-heritage-market',
    name: 'Old Town Heritage Produce Market',
    area: 'Historic Old Quarter',
    address: '15 Cobblestone Way, Clocktower Square',
    coordinates: { lat: 31.5122, lng: 74.3510 },
    distance: '1.9 km away',
    openDays: ['Sunday'],
    openDaysIndices: [0],
    openTimeHours: 8,
    closeTimeHours: 14,
    hoursDisplay: '8:00 AM – 2:00 PM',
    stallCount: 50,
    produceTypes: ['Ancient Heirloom Seeds & Veggies', 'Dry-Farmed Tomatoes', 'Citrus Caviar', 'Fresh Herbs'],
    description: 'Historic Sunday gathering running since 1952. Renowned for rare seed savers, dry-farmed Early Girl tomatoes, and culinary herbs.',
    bannerColor: 'teal',
    rating: 4.9,
    reviewsCount: 180,
    phone: '+1 (555) 334-1188',
    parking: 'Bicycle valets and historic tram stop',
    featured: true
  }
];

// Helper function to check if a market is currently OPEN based on day & hour
export function getMarketLiveStatus(market) {
  const now = new Date();
  const currentDayIndex = now.getDay(); // 0 = Sunday, 1 = Monday, ...
  const currentHour = now.getHours();

  const isOpenToday = market.openDaysIndices.includes(currentDayIndex);

  if (!isOpenToday) {
    // Find next open day
    return {
      isOpen: false,
      badgeText: 'Closed Today',
      color: 'bg-rose-100 text-rose-800 border-rose-200',
      reason: `Next open on ${market.openDays[0]} at ${market.hoursDisplay.split('–')[0].trim()}`
    };
  }

  if (currentHour >= market.openTimeHours && currentHour < market.closeTimeHours) {
    const hoursLeft = market.closeTimeHours - currentHour;
    return {
      isOpen: true,
      badgeText: 'OPEN NOW',
      color: 'bg-emerald-500 text-white animate-pulse',
      reason: `Open until ${market.hoursDisplay.split('–')[1].trim()} (${hoursLeft}h left)`
    };
  }

  if (currentHour < market.openTimeHours) {
    return {
      isOpen: false,
      badgeText: 'Opens Today',
      color: 'bg-amber-100 text-amber-900 border-amber-200',
      reason: `Opens at ${market.hoursDisplay.split('–')[0].trim()}`
    };
  }

  return {
    isOpen: false,
    badgeText: 'Closed for the Day',
    color: 'bg-slate-100 text-slate-700 border-slate-200',
    reason: `Closed at ${market.hoursDisplay.split('–')[1].trim()}`
  };
}

// Weekly Schedule Table structure
export const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];
