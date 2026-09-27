import React from 'react';
import { Compass } from 'lucide-react';
import PageBackdrop from '../components/PageBackdrop';

export default function NotFoundPage({ onNavigate }) {
  return (
    <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
      <PageBackdrop section="notFound" />
      <div className="max-w-md text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
          <Compass className="w-7 h-7 text-emerald-600" />
        </div>
        <h1 className="text-4xl font-extrabold font-serif text-slate-900">Page Not Found</h1>
        <p className="text-sm text-slate-500">
          This stall in the market aisle is empty. Head back to the directory to find regional growers and seasonal produce.
        </p>
        <button
          onClick={() => onNavigate('home')}
          className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md active:scale-95"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}
