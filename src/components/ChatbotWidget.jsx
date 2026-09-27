import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, ArrowRight, Minimize2, Sparkles, Clock, MapPin, Store } from 'lucide-react';
import { FARMERS_MARKETS, getMarketLiveStatus } from '../data/marketData';
import { MONTHS } from '../data/dictionaryData';

export default function ChatbotWidget({ entries, onSelectEntry, onSelectMarket }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const currentMonthName = MONTHS[new Date().getMonth()];

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hello! **FreshFind Offline AI Assistant** hoon 🌱.\n\nBina internet ya external API ke, main aapko markets ki **Timing**, **Location/Address**, aur **Available Products** foran bata sakta hoon!`,
      suggestedChips: [
        'when opening market? (Timings)',
        'where is the market? (Locations)',
        'what products are available? (Produce list)',
        
      ]
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Pure Client-Side Keyword-Based Fake AI Engine (No Server, No API)
  const generateKeywordBotReply = (userQuery) => {
    const q = userQuery.toLowerCase().trim();

    // 1. TIMING KEYWORDS ("timing", "kb tk open hai", "hours", "schedule", "open time", "kab khulta")
    if (
      q.includes('timing') || 
      q.includes('open') || 
      q.includes('hours') || 
      q.includes('kb tk') || 
      q.includes('kab') || 
      q.includes('schedule') || 
      q.includes('time') || 
      q.includes('band')
    ) {
      const marketSummaries = FARMERS_MARKETS.map(m => {
        const st = getMarketLiveStatus(m);
        return `• **${m.name}**: ${m.openDays.join(', ')} (${m.hoursDisplay}) — *[${st.badgeText}]*`;
      }).join('\n');

      return {
        text: `🕒 **Farmers Markets Operating Hours & Timings:**\n\n${marketSummaries}\n\n*Aap visit planner ke zariye kisi bhi market ka time schedule kar sakte hain!*`,
        relatedMarket: FARMERS_MARKETS[0],
        suggestedChips: ['where is the market? (Locations)', 'what products are available? (Produce list)', 'when is the Downtown Market open?']
      };
    }

    // 2. LOCATION KEYWORDS ("location", "where", "address", "kahan hai", "area", "map", "nearby")
    if (
      q.includes('location') || 
      q.includes('where') || 
      q.includes('address') || 
      q.includes('kahan') || 
      q.includes('kha') || 
      q.includes('area') || 
      q.includes('map') || 
      q.includes('nearby') || 
      q.includes('rasta')
    ) {
      const locationSummaries = FARMERS_MARKETS.map(m => {
        return `📍 **${m.name}**\n   ${m.address} (${m.area} - ${m.distance})`;
      }).join('\n\n');

      return {
        text: `🗺️ **Nearby Farmers Markets Locations & Addresses:**\n\n${locationSummaries}\n\n*Website ke "Interactive Map" tab mein in sabhi locations ke pins live dikhaye gaye hain.*`,
        relatedMarket: FARMERS_MARKETS[0],
        suggestedChips: ['where is the market? (Locations)', 'what products are available? (Produce list)', 'when is the Downtown Market open?']
      };
    }

    // 3. PRODUCT KEYWORDS ("product", "jo web mein products hon", "available produce", "fruits", "vegetables", "sabzi", "phal")
    if (
      q.includes('product') || 
      q.includes('available') || 
      q.includes('produce') || 
      q.includes('jo web mein') || 
      q.includes('fruit') || 
      q.includes('vegetable') || 
      q.includes('sabzi') || 
      q.includes('phal') || 
      q.includes('list')
    ) {
      const sampleProduce = entries.slice(0, 6).map(e => `${e.emoji} ${e.name}`).join(', ');

      return {
        text: `🧺 **Available Products & Fresh Produce:**\n\nWeb dictionary mein 60+ fresh items mojood hain, jisme shamil hain:\n${sampleProduce}, Raw Honey, Artisan Sourdough, aur Wild Mushrooms.\n\n*Kisi bhi phal ya sabzi ka naam poochiye, main uski ripeness aur storage guide bata doonga!*`,
        relatedEntry: entries[0],
        suggestedChips: ['How to check ripe peach', 'How to pick avocado', 'What does Brix mean?']
      };
    }

    // 4. CHECK SPECIFIC MARKET NAME
    const matchedMarket = FARMERS_MARKETS.find(m => 
      q.includes(m.name.toLowerCase()) || 
      m.area.toLowerCase().split(' ').some(w => w.length > 3 && q.includes(w))
    );

    if (matchedMarket) {
      const st = getMarketLiveStatus(matchedMarket);
      return {
        text: `🏛️ **${matchedMarket.name}**\n\n📍 **Location**: ${matchedMarket.address} (${matchedMarket.distance})\n🕒 **Days & Hours**: ${matchedMarket.openDays.join(', ')}: ${matchedMarket.hoursDisplay}\n⚡ **Live Status**: ${st.badgeText} (${st.reason})\n🧺 **Produce**: ${matchedMarket.produceTypes.join(', ')}\n🚗 **Parking**: ${matchedMarket.parking}`,
        relatedMarket: matchedMarket,
        suggestedChips: ['Plan visit to this market', 'Other market locations', 'Operating hours']
      };
    }

    // 5. CHECK SPECIFIC PRODUCE ITEM
    const matchedProduce = entries.find(e => 
      q.includes(e.name.toLowerCase()) || 
      (e.altNames && e.altNames.some(a => q.includes(a.toLowerCase())))
    );

    if (matchedProduce) {
      let advice = `**${matchedProduce.name}** ${matchedProduce.emoji} (${matchedProduce.scientificName || matchedProduce.category}):\n${matchedProduce.shortDefinition}\n\n`;
      if (matchedProduce.ripenessGuide) {
        advice += `👁️ **Look**: ${matchedProduce.ripenessGuide.look}\n✋ **Feel**: ${matchedProduce.ripenessGuide.feel}\n👃 **Smell**: ${matchedProduce.ripenessGuide.smell}\n⚠️ **Avoid**: ${matchedProduce.ripenessGuide.avoid}`;
      }
      return {
        text: advice,
        relatedEntry: matchedProduce,
        suggestedChips: [`How to store ${matchedProduce.name}?`, 'Market timings', 'Other fresh products']
      };
    }

    // 6. DEFAULT FALLBACK REPLY (As required by project specs)
    return {
      text: `Shukriya! Main FreshFind ka **Pure Frontend Keyword Assistant** hoon.\n\nAap mujhse 3 ahem cheezein pooch sakte hain:\n1. **Timing**: "Market kb tk open hai?"\n2. **Location**: "Market ka address/kahan hai?"\n3. **Products**: "Jo web mein products hon?"\n\nAap kya janna chahte hain?`,
      suggestedChips: [
        'Market kb tk open hai? (Timings)',
        'Market kahan hai? (Locations)',
        'Jo web mein products hon? (Produce)'
      ]
    };
  };

  const handleSendMessage = (messageText) => {
    const text = messageText || inputMessage;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Fast local response simulation (300ms)
    setTimeout(() => {
      const botResponse = generateKeywordBotReply(text);
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse.text,
        relatedEntry: botResponse.relatedEntry,
        relatedMarket: botResponse.relatedMarket,
        suggestedChips: botResponse.suggestedChips
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 300);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-full shadow-2xl shadow-emerald-900/30 border border-emerald-400/40 transition-all hover:scale-105 active:scale-95"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-emerald-200" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-lime-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-lime-400" />
          </div>
          <span className="text-xs font-bold tracking-wide">
            Ask Market AI
          </span>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[400px] h-[550px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-lg shadow-inner">
                <Sparkles className="w-4 h-4 text-emerald-200" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-serif flex items-center gap-1.5">
                  FreshFind Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h4>
                <p className="text-[10px] text-emerald-200">
                  Pure Frontend Keyword AI • No API/Server
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Close chat"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#f8faf8]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Market Link Card */}
                  {msg.relatedMarket && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 bg-emerald-50/80 p-2 rounded-xl">
                      <div className="flex items-center gap-2 min-w-0">
                        <Store className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span className="font-bold text-slate-900 block truncate text-[11px]">
                          {msg.relatedMarket.name}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          if (onSelectMarket) onSelectMarket(msg.relatedMarket);
                          setIsOpen(false);
                        }}
                        className="text-[10px] font-bold text-emerald-800 bg-white hover:bg-emerald-100 px-2 py-1 rounded-lg border border-emerald-200 flex items-center gap-1 shrink-0"
                      >
                        View Market <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Produce Link Card */}
                  {msg.relatedEntry && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 bg-emerald-50/80 p-2 rounded-xl">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-lg shrink-0">{msg.relatedEntry.emoji}</span>
                        <span className="font-bold text-slate-900 block truncate text-[11px]">
                          {msg.relatedEntry.name}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          if (onSelectEntry) onSelectEntry(msg.relatedEntry);
                          setIsOpen(false);
                        }}
                        className="text-[10px] font-bold text-emerald-800 bg-white hover:bg-emerald-100 px-2 py-1 rounded-lg border border-emerald-200 flex items-center gap-1 shrink-0"
                      >
                        Inspect <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Quick Reply Suggestion Chips */}
                {msg.suggestedChips && msg.suggestedChips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {msg.suggestedChips.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(chip)}
                        className="text-[10px] font-medium bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 px-2.5 py-1 rounded-full border border-slate-200 transition-colors shadow-2xs"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 bg-white rounded-2xl border border-slate-200 w-16 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask: timing, location, or product..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white transition-all shadow-xs shrink-0 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
