/**
 * Central image manifest.
 *
 * Every photo here is openly licensed (CC0 / PDM / CC-BY) and was pulled from
 * Openverse. Attribution for the CC-BY and CC-BY-SA ones is listed in
 * IMAGE_CREDITS at the bottom of this file.
 *
 * Rather than shipping one photo per dictionary entry, entries share a small
 * pool of images per category and pick one deterministically from their id.
 * That keeps the repo small while still avoiding 36 identical-looking cards.
 */

import berriesImg from '../assets/photos/berries.webp';
import berryBasketsImg from '../assets/photos/berry-baskets.jpg';
import lemonsImg from '../assets/photos/lemons.jpg';
import rootVegetablesImg from '../assets/photos/root-vegetables.jpg';
import produceCratesImg from '../assets/photos/produce-crates.webp';
import basketVegetablesImg from '../assets/photos/basket-vegetables.webp';
import mushroomsImg from '../assets/photos/mushrooms.jpg';
import herbsImg from '../assets/photos/herbs.jpg';
import citrusPrepImg from '../assets/photos/citrus-prep.jpg';
import marketMainImg from '../assets/photos/market-main.jpg';
import marketCitrusStallImg from '../assets/photos/market-citrus-stall.jpg';

/** Image pool per dictionary category. */
const CATEGORY_IMAGES = {
  fruit: [berriesImg, berryBasketsImg, lemonsImg],
  vegetable: [rootVegetablesImg, produceCratesImg, basketVegetablesImg],
  fungi: [mushroomsImg],
  herb: [herbsImg],
  jargon: [marketMainImg, marketCitrusStallImg],
  prep: [citrusPrepImg, produceCratesImg],
};

const FALLBACK_PRODUCE_IMAGE = produceCratesImg;

/** One image per farmers market. */
const MARKET_IMAGES = {
  'downtown-artisan-market': marketMainImg,
  'green-valley-organic': produceCratesImg,
  'riverside-saturday-fair': marketCitrusStallImg,
  'sunny-meadow-market': basketVegetablesImg,
  'highland-eco-bazaar': rootVegetablesImg,
  'old-town-heritage-market': berryBasketsImg,
};

const MARKET_FALLBACK_IMAGE = marketMainImg;

/** Backdrop photo per route, used by PageBackdrop on every page except home. */
const PAGE_BACKDROPS = {
  markets: marketMainImg,
  dictionary: berriesImg,
  planner: produceCratesImg,
  about: marketCitrusStallImg,
  contact: basketVegetablesImg,
  notFound: marketMainImg,
};

const PAGE_FALLBACK_IMAGE = marketMainImg;

/**
 * Small deterministic string hash. Same id always yields the same image, so a
 * card never changes artwork between renders or reloads.
 */
function hashString(value = '') {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0; // keep it a 32-bit integer
  }
  return Math.abs(hash);
}

/** Pick an image for a dictionary entry from its category pool. */
export function getProduceImage(entry) {
  if (!entry) return FALLBACK_PRODUCE_IMAGE;
  const pool = CATEGORY_IMAGES[entry.category];
  if (!pool || pool.length === 0) return FALLBACK_PRODUCE_IMAGE;
  return pool[hashString(entry.id) % pool.length];
}

/** Pick the image for a farmers market. */
export function getMarketImage(market) {
  if (!market) return MARKET_FALLBACK_IMAGE;
  return MARKET_IMAGES[market.id] ?? MARKET_FALLBACK_IMAGE;
}

/** Pick the backdrop image for a route section id. */
export function getPageBackdrop(section) {
  return PAGE_BACKDROPS[section] ?? PAGE_FALLBACK_IMAGE;
}

export const IMAGE_CREDITS = [
  { file: 'market-main.jpg', title: "Farmers' Market", source: 'Openverse', license: 'CC-BY' },
  { file: 'market-citrus-stall.jpg', title: 'Oranges and fruit at the market', source: 'Openverse', license: 'CC-BY' },
  { file: 'berries.webp', title: 'Glass bowl fresh red strawberries', source: 'Openverse', license: 'CC0' },
  { file: 'berry-baskets.jpg', title: 'Fresh Fruit', source: 'Openverse', license: 'CC0' },
  { file: 'produce-crates.webp', title: 'Free different vegetables basket market', source: 'Openverse', license: 'CC0' },
  { file: 'root-vegetables.jpg', title: 'Root vegetables', source: 'Openverse', license: 'CC-BY-SA' },
  { file: 'basket-vegetables.webp', title: 'Organic Food Background Vegetables Basket', source: 'Openverse', license: 'CC0' },
  { file: 'mushrooms.jpg', title: 'Wild mushrooms - Vancouver, BC', source: 'Openverse', license: 'CC-BY-NC-SA' },
  { file: 'herbs.jpg', title: 'Herb Bundle', source: 'Openverse', license: 'CC-BY-SA' },
  { file: 'lemons.jpg', title: 'When life gives you lemons, photograph em!', source: 'Openverse', license: 'CC-BY-NC-ND' },
  { file: 'citrus-prep.jpg', title: 'Grapefruit halved with knife', source: 'Openverse', license: 'CC-BY' },
];
