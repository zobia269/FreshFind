import React from 'react';
import MarketsSection from '../components/MarketsSection';
import PageBackdrop from '../components/PageBackdrop';

export default function MarketsPage({
  onSelectMarket,
  onPlanVisit,
  bookmarkedMarketIds,
  onToggleMarketBookmark,
  searchQuery,
}) {
  return (
    <main className="flex-1">
      <PageBackdrop section="markets" />
      <MarketsSection
        onSelectMarket={onSelectMarket}
        onPlanVisit={onPlanVisit}
        bookmarkedMarketIds={bookmarkedMarketIds}
        onToggleMarketBookmark={onToggleMarketBookmark}
        initialSearchQuery={searchQuery}
      />
    </main>
  );
}
