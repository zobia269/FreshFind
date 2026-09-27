import React from 'react';
import VisitPlanner from '../components/VisitPlanner';
import PageBackdrop from '../components/PageBackdrop';

import { DICTIONARY_ENTRIES } from '../data/dictionaryData';

export default function PlannerPage({ initialMarket }) {
  return (
    <main className="flex-1">
      <PageBackdrop section="planner" />
      <VisitPlanner initialMarket={initialMarket} entries={DICTIONARY_ENTRIES} />
    </main>
  );
}
