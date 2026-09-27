import logoImg from '../assets/imagelogo.avif';

import React, { useState } from 'react';
import { 
  Store, 
  BookOpen, 
  Search, 
  Calendar, 
  ShoppingBag, 
  User, 
  X, 
  Menu,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export default function Navbar({ 
  activeSection, 
  onNavigate, 
  searchQuery, 
  setSearchQuery, 
  basketCount, 
  onOpenBasket,
  onOpenAuthModal 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'markets', label: 'Farmers Markets' },
    { id: 'dictionary', label: 'Produce Guide' },
    { id: 'planner', label: 'Visit Planner' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-3 sm:gap-4">
          
          {/* Logo & Brand Name: "Fresh Find" */}

<img 
    src={logoImg} 
    alt="Fresh Find Logo" 
    className="w-9 h-9 object-contain rounded-lg" 
  />



          <div 
            className="flex items-center gap-2.5 cursor-pointer shrink-0" 
            onClick={() => onNavigate('home')}
          >
            
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-emerald-950 font-serif">
                  Fresh <span className="text-emerald-600">Find</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  SPA
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Local Markets & Produce Guide
              </p>
            </div>
          </div>

          {/* Search Bar (Auto-filters Markets and Products) */}
          <div className="flex-1 max-w-xs lg:max-w-sm relative hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-600/70" />
              <input
                type="text"
                placeholder="Search market, location, or product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-emerald-50/60 hover:bg-emerald-50 focus:bg-white text-xs rounded-full border border-emerald-200 focus:border-emerald-500 focus:outline-hidden text-slate-800 placeholder-slate-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links (Single Page Scroll/Switching) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Basket Drawer & Dummy Login */}
          <div className="flex items-center gap-2">
            
            {/* Market Basket */}
            <button
              onClick={onOpenBasket}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 transition-all active:scale-95 shadow-xs"
              title="Saved Markets & Items"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline font-bold">Basket</span>
              {basketCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {basketCount}
                </span>
              )}
            </button>

            {/* Dummy Login / Signup Button (Requirement #9.4) */}
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-all shadow-xs active:scale-95"
            >
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Sign In</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Search */}
        <div className="py-2.5 md:hidden border-t border-emerald-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-600/70" />
            <input
              type="text"
              placeholder="Search markets or produce..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-emerald-50/60 text-xs rounded-full border border-emerald-200 text-slate-800 focus:outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-emerald-100 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeSection === item.id
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-700 hover:bg-emerald-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

      </div>
    </header>
  );
}
