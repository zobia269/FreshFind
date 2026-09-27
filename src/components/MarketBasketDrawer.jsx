import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  CheckSquare, 
  Square, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  Store, 
  MapPin, 
  FileText,
  StickyNote,
  NotebookPen,
  Save
} from 'lucide-react';

const NOTE_MAX_LENGTH = 240;

/**
 * Inline note editor shared by the market and produce rows.
 *
 * Saving is explicit so a half-typed note is never persisted by accident, and
 * Ctrl/Cmd + Enter saves while Escape abandons the edit.
 */
function NoteEditor({ initialValue, hasExisting, onSave, onCancel }) {
  const [draft, setDraft] = useState(initialValue);
  const trimmed = draft.trim();

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onCancel();
      return;
    }
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onSave(trimmed);
    }
  };

  return (
    <div className="mt-2 space-y-1.5 rounded-xl border border-emerald-200 bg-emerald-50/50 p-2.5">
      <textarea
        autoFocus
        value={draft}
        maxLength={NOTE_MAX_LENGTH}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g. Ask the grower about canning seconds; bring small cash for eggs..."
        rows={2}
        className="w-full text-[11px] leading-relaxed p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-emerald-500 resize-none"
      />

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onSave(trimmed)}
          disabled={!trimmed}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600 transition-colors"
        >
          <Save className="w-3 h-3" />
          {hasExisting ? 'Update Note' : 'Save Note'}
        </button>

        <button
          onClick={onCancel}
          className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-[11px] font-semibold hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>

        <span className="ml-auto text-[10px] text-slate-400 font-mono">
          {trimmed.length}/{NOTE_MAX_LENGTH}
        </span>
      </div>

      <p className="text-[10px] text-slate-500">
        Ctrl + Enter to save &middot; Esc to cancel
      </p>
    </div>
  );
}

export default function MarketBasketDrawer({ 
  isOpen, 
  onClose, 
  bookmarkedEntries, 
  bookmarkedMarkets,
  onClearBasket,
  onSelectEntry,
  onSelectMarket,
  itemNotes,
  onSaveItemNote
}) {
  const [checkedIds, setCheckedIds] = useState([]);
  const [marketNotes, setMarketNotes] = useState(() => {
    return localStorage.getItem('freshfind_market_notes') || '';
  });
  const [copied, setCopied] = useState(false);

  // Which row currently has its note editor open, and the text being typed
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [savedNoteId, setSavedNoteId] = useState(null);

  if (!isOpen) return null;

  const toggleCheck = (id) => {
    setCheckedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleNotesChange = (e) => {
    setMarketNotes(e.target.value);
    localStorage.setItem('freshfind_market_notes', e.target.value);
  };

  const getNote = (id) => itemNotes?.[id]?.text || '';

  const openNoteEditor = (id) => {
    setSavedNoteId(null);
    setEditingNoteId(id);
  };

  const closeNoteEditor = () => {
    setEditingNoteId(null);
  };

  const handleSaveNote = (id, text) => {
    onSaveItemNote(id, text);
    setEditingNoteId(null);
    // Brief check on the row so it is obvious the note was stored
    setSavedNoteId(id);
    setTimeout(() => setSavedNoteId(prev => (prev === id ? null : prev)), 1600);
  };

  const noteCount = Object.values(itemNotes || {}).filter(note => note?.text).length;

  const handleCopyList = () => {
    const marketLines = (bookmarkedMarkets || []).map(m => {
      const note = getNote(m.id);
      return `📍 ${m.name} (${m.address} - ${m.hoursDisplay})${note ? `\n   📝 Note: ${note}` : ''}`;
    });
    const produceLines = (bookmarkedEntries || []).map(e => {
      const note = getNote(e.id);
      return `🌱 ${e.name} (${e.peakSeason})${note ? `\n   📝 Note: ${note}` : ''}`;
    });
    
    const text = `🛒 FreshFind Market Day Plan & Basket:

--- SAVED FARMERS MARKETS ---
${marketLines.length > 0 ? marketLines.join('\n') : 'No markets saved yet'}

--- TARGET FRESH PRODUCE ---
${produceLines.length > 0 ? produceLines.join('\n') : 'No produce saved yet'}

--- PERSONAL NOTES ---
${marketNotes || 'None'}
`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportJSON = () => {
    const exportData = {
      savedMarkets: bookmarkedMarkets,
      savedProduce: bookmarkedEntries,
      notes: marketNotes,
      itemNotes,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `freshfind-market-basket-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const totalCount = (bookmarkedEntries?.length || 0) + (bookmarkedMarkets?.length || 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Advanced Market Basket
              </h3>
              <p className="text-xs text-slate-500">
                {totalCount} saved items & markets for your trip
                {noteCount > 0 && ` · ${noteCount} ${noteCount === 1 ? 'note' : 'notes'}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body (GUI) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
          
          {/* SECTION A: SAVED MARKETS */}
          {bookmarkedMarkets && bookmarkedMarkets.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-emerald-600" />
                <span>Saved Farmers Markets ({bookmarkedMarkets.length})</span>
              </span>

              <div className="space-y-2">
                {bookmarkedMarkets.map(market => {
                  const note = getNote(market.id);
                  const isEditing = editingNoteId === market.id;
                  const wasJustSaved = savedNoteId === market.id;

                  return (
                    <div
                      key={market.id}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div 
                          onClick={() => onSelectMarket(market)}
                          className="cursor-pointer min-w-0"
                        >
                          <h4 className="font-bold text-slate-900 truncate text-xs hover:text-emerald-700">
                            {market.name}
                          </h4>
                          <p className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-emerald-600" />
                            {market.address} ({market.distance})
                          </p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {note && !isEditing && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 rounded-md px-1.5 py-0.5">
                              Noted
                            </span>
                          )}

                          <button
                            onClick={() => openNoteEditor(market.id)}
                            className={`p-1 transition-colors ${
                              wasJustSaved
                                ? 'text-emerald-600'
                                : note
                                  ? 'text-amber-600 hover:text-amber-800'
                                  : 'text-slate-400 hover:text-emerald-600'
                            }`}
                            title={note ? 'Edit your note for this market' : 'Add a note for this market'}
                          >
                            {wasJustSaved ? <Check className="w-3.5 h-3.5" /> : <NotebookPen className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {note && !isEditing && (
                        <p className="text-[11px] leading-relaxed text-amber-950 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1.5 flex items-start gap-1.5">
                          <StickyNote className="w-3 h-3 mt-0.5 shrink-0 text-amber-600" />
                          <span className="line-clamp-2">{note}</span>
                        </p>
                      )}

                      {isEditing && (
                        <NoteEditor
                          initialValue={note}
                          hasExisting={Boolean(note)}
                          onSave={(text) => handleSaveNote(market.id, text)}
                          onCancel={closeNoteEditor}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION B: TARGET PRODUCE CHECKLIST */}
          {bookmarkedEntries && bookmarkedEntries.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Target Fresh Produce Checklist ({bookmarkedEntries.length})
              </span>

              <div className="space-y-2">
                {bookmarkedEntries.map(entry => {
                  const isChecked = checkedIds.includes(entry.id);
                  const note = getNote(entry.id);
                  const isEditing = editingNoteId === entry.id;
                  const wasJustSaved = savedNoteId === entry.id;

                  return (
                    <div
                      key={entry.id}
                      className={`p-3 rounded-2xl border transition-all space-y-2 ${
                        isChecked 
                          ? 'bg-slate-50 border-slate-200 opacity-60' 
                          : 'bg-white border-slate-200 hover:border-emerald-300 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <button
                            onClick={() => toggleCheck(entry.id)}
                            className="text-emerald-700 shrink-0"
                          >
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-300" />
                            )}
                          </button>

                          <div 
                            onClick={() => onSelectEntry(entry)}
                            className="cursor-pointer min-w-0"
                          >
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm">{entry.emoji}</span>
                              <span className={`font-bold truncate text-xs ${isChecked ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                                {entry.name}
                              </span>
                              {note && !isEditing && (
                                <StickyNote className="w-3 h-3 text-amber-600 shrink-0" />
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 block truncate">
                              Peak: {entry.peakSeason}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => openNoteEditor(entry.id)}
                          className={`p-1 shrink-0 transition-colors ${
                            wasJustSaved
                              ? 'text-emerald-600'
                              : note
                                ? 'text-amber-600 hover:text-amber-800'
                                : 'text-slate-400 hover:text-emerald-600'
                          }`}
                          title={note ? 'Edit your note for this produce' : 'Add a note for this produce'}
                        >
                          {wasJustSaved ? <Check className="w-3.5 h-3.5" /> : <NotebookPen className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {note && !isEditing && (
                        <p className="text-[11px] leading-relaxed text-amber-950 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1.5 flex items-start gap-1.5">
                          <StickyNote className="w-3 h-3 mt-0.5 shrink-0 text-amber-600" />
                          <span className="line-clamp-2">{note}</span>
                        </p>
                      )}

                      {isEditing && (
                        <NoteEditor
                          initialValue={note}
                          hasExisting={Boolean(note)}
                          onSave={(text) => handleSaveNote(entry.id, text)}
                          onCancel={closeNoteEditor}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {totalCount === 0 && (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
                🧺
              </div>
              <p className="text-sm font-bold text-slate-700">Your Basket is Empty</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Bookmark local markets and fresh fruits/vegetables to assemble your market shopping itinerary.
              </p>
            </div>
          )}

          {/* 2. PERSONAL NOTES TEXTAREA (Requirement #7.2) */}
          <div className="space-y-1.5 pt-3 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>Personal Market Notes & Grower Reminders:</span>
            </label>
            <textarea
              value={marketNotes}
              onChange={handleNotesChange}
              placeholder="e.g. Ask grower about canning seconds of Early Girl tomatoes; bring small cash bills for eggs; arrive by 9:00 AM..."
              rows={3}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-emerald-500 bg-white"
            />
          </div>

        </div>

        {/* 3. EXPORT & SHARE BUTTONS (Requirement #7.3) */}
        {totalCount > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2 text-xs">
            <div className="grid grid-cols-3 gap-2">
              
              <button
                onClick={handleCopyList}
                className="py-2 px-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 font-bold text-slate-700 flex items-center justify-center gap-1 shadow-2xs"
                title="Copy text list"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleExportJSON}
                className="py-2 px-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 font-bold text-slate-700 flex items-center justify-center gap-1 shadow-2xs"
                title="Export as JSON file"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>JSON</span>
              </button>

              <button
                onClick={handlePrint}
                className="py-2 px-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 font-bold text-slate-700 flex items-center justify-center gap-1 shadow-2xs"
                title="Print shopping itinerary"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Print</span>
              </button>

            </div>

            <button
              onClick={onClearBasket}
              className="w-full text-center text-[11px] text-rose-600 hover:text-rose-800 font-semibold py-1 transition-colors"
            >
              Clear All Saved Items
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
