import React from 'react';
import HeroSection from '../components/HeroSection';
import FeatureHighlights from '../components/FeatureHighlights';
import ProduceSpotlight from '../components/ProduceSpotlight';

export default function HomePage({
  onNavigate,
  onSelectMarket,
  onSelectEntry,
  featuredEntry,
  bookmarkedProduceIds,
  onToggleProduceBookmark,
  onOpenBasket,
}) {
  return (
    <main className="flex-1 space-y-4">
      <HeroSection
        onNavigate={onNavigate}
        onSelectMarket={onSelectMarket}
        onSelectEntry={onSelectEntry}
        featuredEntry={featuredEntry}
        onOpenPlanner={() => onNavigate('planner')}
      />

      <FeatureHighlights onOpenBasket={onOpenBasket} />

      <ProduceSpotlight
        onSelectEntry={onSelectEntry}
        bookmarkedProduceIds={bookmarkedProduceIds}
        onToggleProduceBookmark={onToggleProduceBookmark}
      />
    </main>
  );
}
