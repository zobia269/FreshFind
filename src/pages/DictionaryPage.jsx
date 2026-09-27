import React from 'react';
import DictionaryGrid from '../components/DictionaryGrid';
import PageBackdrop from '../components/PageBackdrop';

import { DICTIONARY_ENTRIES } from '../data/dictionaryData';

export default function DictionaryPage({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onSelectEntry,
  bookmarkedProduceIds,
  onToggleProduceBookmark,
  isInSeasonOnly,
  setIsInSeasonOnly,
}) {
  return (
    <main className="flex-1">
      <PageBackdrop section="dictionary" intensity="soft" />
      <DictionaryGrid
        entries={DICTIONARY_ENTRIES}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectEntry={onSelectEntry}
        bookmarkedIds={bookmarkedProduceIds}
        onToggleBookmark={onToggleProduceBookmark}
        isInSeasonOnly={isInSeasonOnly}
        setIsInSeasonOnly={setIsInSeasonOnly}
      />
    </main>
  );
}
