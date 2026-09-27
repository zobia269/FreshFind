import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Eye, ChevronRight, Navigation, Sparkles } from 'lucide-react';
import useVisitorCounter from '../hooks/useVisitorCounter';

export default function TopHeaderBar({ currentBreadcrumb, onNavigateBreadcrumb }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { totalVisits, todayVisits } = useVisitorCounter();
  const [userLocation, setUserLocation] = useState({
    coords: '31.5204° N, 74.3587° E',
    area: 'Downtown Civic District',
    isLocating: false
  });

  // Real-time clock updating every 1000ms
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefreshLocation = () => {
    setUserLocation(prev => ({ ...prev, isLocating: true }));
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(4);
          const lng = position.coords.longitude.toFixed(4);
          setUserLocation({
            coords: `${lat}° N, ${lng}° E`,
            area: 'Near Your GPS Coordinates',
            isLocating: false
          });
        },
        () => {
          // Fallback if user denies permission
          setUserLocation({
            coords: '31.5204° N, 74.3587° E',
            area: 'Downtown Civic Center (Auto-Detected)',
            isLocating: false
          });
        },
        { timeout: 5000 }
      );
    } else {
      setUserLocation(prev => ({ ...prev, isLocating: false }));
    }
  };

  return (
    <div className="bg-emerald-950 text-emerald-200 border-b border-emerald-900/80 text-[11px] font-medium py-1.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-slate-300">
          <button 
            onClick={() => onNavigateBreadcrumb('home')} 
            className="hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            <span>Home</span>
          </button>
          <ChevronRight className="w-3 h-3 text-emerald-600" />
          <span className="text-emerald-400 font-semibold capitalize truncate max-w-[180px] sm:max-w-xs">
            {currentBreadcrumb || 'Farmers Markets & Guide'}
          </span>
        </div>

        {/* Right: Mandatory UI Features - Clock, Geolocation, Visitor Counter */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          
          {/* Real-time Clock */}
          <div className="flex items-center gap-1.5 text-emerald-300 font-mono" title="Live System Time">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>

          {/* Geolocation */}
          <button 
            onClick={handleRefreshLocation}
            className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-300 transition-colors"
            title="Click to detect your current location"
          >
            <MapPin className={`w-3.5 h-3.5 text-emerald-400 ${userLocation.isLocating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Near You:</span>
            <span className="text-white font-semibold">{userLocation.area}</span>
          </button>

          {/* Visitor Counter */}
          <div
            className="flex items-center gap-1.5 bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-800 text-emerald-300"
            title="Visits recorded by this browser (local only, not a site-wide total)"
          >
            <Eye className="w-3 h-3 text-emerald-400" />
            <span>Visitors: {totalVisits.toLocaleString()}</span>
            <span className="text-emerald-500/70">|</span>
            <span className="text-emerald-200 font-semibold">{todayVisits} today</span>
          </div>

        </div>

      </div>
    </div>
  );
}
