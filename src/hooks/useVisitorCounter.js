import { useEffect, useMemo } from 'react';

const STATS_KEY = 'freshfind_visit_stats';
const SESSION_KEY = 'freshfind_visit_recorded';

const EMPTY_STATS = {
  totalVisits: 0,
  todayVisits: 0,
  activeDays: 0,
  today: '',
};

const todayKey = () => new Date().toDateString();

const isStoredStats = value =>
  Boolean(value) && typeof value === 'object' && typeof value.totalVisits === 'number';

/**
 * Reads the stored stats, falling back to zeroes if the key is missing or was
 * written by something other than this app.
 */
function readVisitStats() {
  try {
    const stored = JSON.parse(localStorage.getItem(STATS_KEY));
    return isStoredStats(stored) ? { ...EMPTY_STATS, ...stored } : { ...EMPTY_STATS };
  } catch {
    return { ...EMPTY_STATS };
  }
}

/**
 * What the numbers should read for this page view, given what is already in
 * storage. A visit is counted once per browser session, so reloading or moving
 * between pages cannot inflate the total.
 */
function deriveStats() {
  const today = todayKey();
  const stored = readVisitStats();
  const isNewDay = stored.today !== today;

  // Already tallied earlier in this session: report storage as it stands
  if (sessionStorage.getItem(SESSION_KEY) === today) {
    return isNewDay ? { ...stored, today, todayVisits: 0 } : stored;
  }

  return {
    today,
    todayVisits: (isNewDay ? 0 : stored.todayVisits) + 1,
    totalVisits: stored.totalVisits + 1,
    activeDays: stored.activeDays + (isNewDay ? 1 : 0),
  };
}

/**
 * Visit counter for this browser.
 *
 * Scope is deliberately one device: a static site has no server to aggregate
 * hits from, so this records what actually happened locally rather than
 * inventing a number. The render derives the figures and the effect only
 * persists them, so the numbers on screen are correct on first paint and the
 * session guard keeps repeat mounts from counting the same visit twice.
 */
export default function useVisitorCounter() {
  const stats = useMemo(() => deriveStats(), []);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === stats.today) return;
    sessionStorage.setItem(SESSION_KEY, stats.today);
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }, [stats]);

  return stats;
}
