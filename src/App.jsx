import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation, useParams } from 'react-router-dom';

import TopHeaderBar from './components/TopHeaderBar';
import Navbar from './components/Navbar';
import MarketDetailModal from './components/MarketDetailModal';
import ProduceDetailModal from './components/ProduceDetailModal';
import DummyAuthModal from './components/DummyAuthModal';
import MarketBasketDrawer from './components/MarketBasketDrawer';
import ChatbotWidget from './components/ChatbotWidget';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import MarketsPage from './pages/MarketsPage';
import DictionaryPage from './pages/DictionaryPage';
import PlannerPage from './pages/PlannerPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

import { DICTIONARY_ENTRIES } from './data/dictionaryData';
import { FARMERS_MARKETS } from './data/marketData';

// Section id -> URL path. Every page now has its own addressable route.
const ROUTE_PATHS = {
  home: '/',
  markets: '/markets',
  dictionary: '/dictionary',
  planner: '/planner',
  about: '/about',
  contact: '/contact',
};

const PATH_TO_SECTION = Object.fromEntries(
  Object.entries(ROUTE_PATHS).map(([id, path]) => [path, id])
);

// Resets scroll position on every route change so pages always open at the top.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

/**
 * Matches deep permalink paths of the form /dictionary/:entryId and
 * /markets/:marketId, which open that card's detail view directly.
 */
function parseDeepLink(pathname) {
  const match = /^\/(dictionary|markets)\/([^/]+)\/?$/.exec(pathname);
  if (!match) return null;
  return {
    base: match[1] === 'dictionary' ? ROUTE_PATHS.dictionary : ROUTE_PATHS.markets,
    kind: match[1] === 'dictionary' ? 'entry' : 'market',
    id: decodeURIComponent(match[2]),
  };
}

/**
 * Guards a deep permalink route: if the id in the URL does not exist, fall back
 * to the plain listing page instead of rendering an empty detail view.
 */
function DeepLinkGuard({ kind, base, children }) {
  const { entryId, marketId } = useParams();
  const id = kind === 'entry' ? entryId : marketId;

  const exists = kind === 'entry'
    ? DICTIONARY_ENTRIES.some(e => e.id === id)
    : FARMERS_MARKETS.some(m => m.id === id);

  if (!exists) return <Navigate to={base} replace />;
  return children;
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  // NOTE: the open detail modal is derived from the URL (see parseDeepLink below),
  // so there is deliberately no selectedEntry / selectedMarket state here.
  const [plannerMarket, setPlannerMarket] = useState(FARMERS_MARKETS[0]);
  const [isInSeasonOnly, setIsInSeasonOnly] = useState(false);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Bookmarked Produce IDs with LocalStorage
  const [bookmarkedProduceIds, setBookmarkedProduceIds] = useState(() => {
    try {
      const saved = localStorage.getItem('freshfind_bookmarks');
      return saved ? JSON.parse(saved) : ['black-mission-fig', 'meyer-lemon', 'morel-mushroom'];
    } catch {
      return ['black-mission-fig', 'meyer-lemon', 'morel-mushroom'];
    }
  });

  // Bookmarked Market IDs with LocalStorage
  const [bookmarkedMarketIds, setBookmarkedMarketIds] = useState(() => {
    try {
      const saved = localStorage.getItem('freshfind_market_bookmarks');
      return saved ? JSON.parse(saved) : ['downtown-artisan-market', 'green-valley-organic'];
    } catch {
      return ['downtown-artisan-market', 'green-valley-organic'];
    }
  });

  useEffect(() => {
    localStorage.setItem('freshfind_bookmarks', JSON.stringify(bookmarkedProduceIds));
  }, [bookmarkedProduceIds]);

  useEffect(() => {
    localStorage.setItem('freshfind_market_bookmarks', JSON.stringify(bookmarkedMarketIds));
  }, [bookmarkedMarketIds]);

  /*
   * Per-item personal notes, keyed by produce id or market id (both id spaces
   * are unique, so one map covers the whole basket). A note is either absent or
   * { text, updatedAt }; saving an empty text removes the entry again.
   */
  const [itemNotes, setItemNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('freshfind_item_notes');
      const parsed = saved ? JSON.parse(saved) : null;
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('freshfind_item_notes', JSON.stringify(itemNotes));
  }, [itemNotes]);

  // Timestamp is read here, outside the updater, so the updater stays pure.
  const saveItemNote = useCallback((id, text) => {
    const updatedAt = new Date().toISOString();
    setItemNotes(prev => {
      const next = { ...prev };
      if (text) {
        next[id] = { text, updatedAt };
      } else {
        delete next[id];
      }
      return next;
    });
  }, []);

  const toggleProduceBookmark = (id) => {
    setBookmarkedProduceIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleMarketBookmark = (id) => {
    setBookmarkedMarketIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleClearBasket = () => {
    if (window.confirm('Clear all saved markets and produce items from your basket?')) {
      setBookmarkedProduceIds([]);
      setBookmarkedMarketIds([]);
    }
  };

  // Route-driven navigation: Navbar / Hero / Footer all call this with a section id
  const handleNavigate = useCallback((sectionId) => {
    navigate(ROUTE_PATHS[sectionId] ?? '/');
  }, [navigate]);

  /*
   * The URL is the single source of truth for the detail modals.
   *
   * /dictionary/<entryId> and /markets/<marketId> are real, shareable permalinks,
   * so the open item is derived from the path rather than mirrored into state.
   * That means back/forward, a pasted link and a fresh load all behave the same,
   * and no effect is needed to keep state in sync with the address bar.
   */
  const deepLink = useMemo(() => parseDeepLink(location.pathname), [location.pathname]);

  const selectedEntry = useMemo(() => {
    if (deepLink?.kind !== 'entry') return null;
    return DICTIONARY_ENTRIES.find(e => e.id === deepLink.id) ?? null;
  }, [deepLink]);

  const selectedMarket = useMemo(() => {
    if (deepLink?.kind !== 'market') return null;
    return FARMERS_MARKETS.find(m => m.id === deepLink.id) ?? null;
  }, [deepLink]);

  /** Open a produce entry by pushing its permalink. */
  const openEntry = useCallback((entry) => {
    navigate(`${ROUTE_PATHS.dictionary}/${entry.id}`);
  }, [navigate]);

  /** Open a market by pushing its permalink. */
  const openMarket = useCallback((market) => {
    navigate(`${ROUTE_PATHS.markets}/${market.id}`);
  }, [navigate]);

  // Closing a permalinked modal steps back to the listing page
  const closeEntry = useCallback(() => {
    navigate(ROUTE_PATHS.dictionary);
  }, [navigate]);

  const closeMarket = useCallback(() => {
    navigate(ROUTE_PATHS.markets);
  }, [navigate]);

  // The search box lives in the Navbar, so results are only visible on pages that
  // filter by it. Typing from any other page jumps to the Produce Guide.
  useEffect(() => {
    if (!searchQuery.trim()) return;
    if (location.pathname.startsWith(ROUTE_PATHS.dictionary) || location.pathname.startsWith(ROUTE_PATHS.markets)) return;
    const timer = setTimeout(() => navigate(ROUTE_PATHS.dictionary), 400);
    return () => clearTimeout(timer);
  }, [searchQuery, location.pathname, navigate]);

  const handlePlanVisitToMarket = (market) => {
    setPlannerMarket(market);
    navigate(ROUTE_PATHS.planner);
  };

  // Active nav item is derived straight from the URL. Prefix matching keeps the
  // nav highlighted on deep permalinks like /dictionary/meyer-lemon.
  const activeSection = useMemo(() => {
    const path = location.pathname;
    const match = Object.keys(ROUTE_PATHS)
      .sort((a, b) => ROUTE_PATHS[b].length - ROUTE_PATHS[a].length)
      .find(id => id !== 'home' && path.startsWith(ROUTE_PATHS[id]));
    return match ?? (path === '/' ? 'home' : PATH_TO_SECTION[path] ?? 'home');
  }, [location.pathname]);

  const featuredEntry = useMemo(
    () => DICTIONARY_ENTRIES.find(e => e.id === 'black-mission-fig') || DICTIONARY_ENTRIES[0],
    []
  );
  const bookmarkedEntries = DICTIONARY_ENTRIES.filter(e => bookmarkedProduceIds.includes(e.id));
  const bookmarkedMarkets = FARMERS_MARKETS.filter(m => bookmarkedMarketIds.includes(m.id));
  const totalBasketCount = bookmarkedEntries.length + bookmarkedMarkets.length;

  // Breadcrumb title generator
  const getBreadcrumbTitle = () => {
    if (selectedMarket) return `Markets > ${selectedMarket.name}`;
    if (selectedEntry) return `Produce Guide > ${selectedEntry.name}`;
    switch (activeSection) {
      case 'markets': return 'Farmers Markets & Schedules';
      case 'dictionary': return 'Product Guide & Ripeness';
      case 'planner': return 'Visit Planner';
      case 'about': return 'About FreshFind';
      case 'contact': return 'Community Contact';
      default: return 'Farmers Markets & Produce Guide';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] text-slate-800 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      <ScrollToTop />

      {/* 1. Mandatory Top Header: Clock, Geolocation, Visitor Counter, Breadcrumbs */}
      <TopHeaderBar
        currentBreadcrumb={getBreadcrumbTitle()}
        onNavigateBreadcrumb={handleNavigate}
      />

      {/* 2. Main Sticky Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        basketCount={totalBasketCount}
        onOpenBasket={() => setIsBasketOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* 3. Routed Page Content */}
      <Routes>
        <Route
          path={ROUTE_PATHS.home}
          element={
            <HomePage
              onNavigate={handleNavigate}
              onSelectMarket={openMarket}
              onSelectEntry={openEntry}
              featuredEntry={featuredEntry}
              bookmarkedProduceIds={bookmarkedProduceIds}
              onToggleProduceBookmark={toggleProduceBookmark}
              onOpenBasket={() => setIsBasketOpen(true)}
            />
          }
        />

        <Route
          path={`${ROUTE_PATHS.markets}/:marketId`}
          element={
            <DeepLinkGuard kind="market" base={ROUTE_PATHS.markets}>
              <MarketsPage
                onSelectMarket={openMarket}
                onPlanVisit={handlePlanVisitToMarket}
                bookmarkedMarketIds={bookmarkedMarketIds}
                onToggleMarketBookmark={toggleMarketBookmark}
                searchQuery={searchQuery}
              />
            </DeepLinkGuard>
          }
        />
        <Route
          path={ROUTE_PATHS.markets}
          element={
            <MarketsPage
              onSelectMarket={openMarket}
              onPlanVisit={handlePlanVisitToMarket}
              bookmarkedMarketIds={bookmarkedMarketIds}
              onToggleMarketBookmark={toggleMarketBookmark}
              searchQuery={searchQuery}
            />
          }
        />

        <Route
          path={`${ROUTE_PATHS.dictionary}/:entryId`}
          element={
            <DeepLinkGuard kind="entry" base={ROUTE_PATHS.dictionary}>
              <DictionaryPage
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSelectEntry={openEntry}
                bookmarkedProduceIds={bookmarkedProduceIds}
                onToggleProduceBookmark={toggleProduceBookmark}
                isInSeasonOnly={isInSeasonOnly}
                setIsInSeasonOnly={setIsInSeasonOnly}
              />
            </DeepLinkGuard>
          }
        />
        <Route
          path={ROUTE_PATHS.dictionary}
          element={
            <DictionaryPage
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectEntry={openEntry}
              bookmarkedProduceIds={bookmarkedProduceIds}
              onToggleProduceBookmark={toggleProduceBookmark}
              isInSeasonOnly={isInSeasonOnly}
              setIsInSeasonOnly={setIsInSeasonOnly}
            />
          }
        />

        <Route
          path={ROUTE_PATHS.planner}
          element={<PlannerPage initialMarket={plannerMarket} />}
        />

        <Route path={ROUTE_PATHS.about} element={<AboutPage />} />
        <Route path={ROUTE_PATHS.contact} element={<ContactPage />} />

        {/* Backwards-compatible redirects for the old single-page anchors */}
        <Route path="/contact-section" element={<Navigate to={ROUTE_PATHS.contact} replace />} />
        <Route path="/about-contact" element={<Navigate to={ROUTE_PATHS.about} replace />} />
        <Route path="/home" element={<Navigate to={ROUTE_PATHS.home} replace />} />
        <Route path="*" element={<NotFoundPage onNavigate={handleNavigate} />} />
      </Routes>

      {/* MODAL 1: Produce Detail Modal with Sensory Ripeness & Speech */}
      {selectedEntry && (
        <ProduceDetailModal
          entry={selectedEntry}
          onClose={closeEntry}
          isBookmarked={bookmarkedProduceIds.includes(selectedEntry.id)}
          onToggleBookmark={toggleProduceBookmark}
        />
      )}

      {/* MODAL 2: Market Detail Modal */}
      {selectedMarket && (
        <MarketDetailModal
          market={selectedMarket}
          onClose={closeMarket}
          onPlanVisit={handlePlanVisitToMarket}
          isBookmarked={bookmarkedMarketIds.includes(selectedMarket.id)}
          onToggleBookmark={toggleMarketBookmark}
        />
      )}

      {/* MODAL 3: Dummy Login / Signup Design Modal (Requirement #9.4) */}
      <DummyAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* DRAWER: Advanced Bookmarking System (GUI, Personal Notes, Export & Share) */}
      <MarketBasketDrawer
        isOpen={isBasketOpen}
        onClose={() => setIsBasketOpen(false)}
        bookmarkedEntries={bookmarkedEntries}
        bookmarkedMarkets={bookmarkedMarkets}
        itemNotes={itemNotes}
        onSaveItemNote={saveItemNote}
        onClearBasket={handleClearBasket}
        onSelectEntry={(entry) => {
          openEntry(entry);
          setIsBasketOpen(false);
        }}
        onSelectMarket={(market) => {
          openMarket(market);
          setIsBasketOpen(false);
        }}
      />

      {/* WIDGET: Fake AI Chatbot (Offline Keyword Matcher: Timing, Location, Produce) */}
      <ChatbotWidget
        entries={DICTIONARY_ENTRIES}
        onSelectEntry={openEntry}
        onSelectMarket={openMarket}
      />

      {/* FOOTER */}
      <Footer
        onOpenDictionary={() => handleNavigate('dictionary')}
        onOpenInspector={() => handleNavigate('markets')}
        onOpenQuiz={() => handleNavigate('dictionary')}
      />

    </div>
  );
}
