import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function DummyAuthModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('resident.shopper@freshfind.local');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Farhan Khan');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10">
        
        {/* Header with Green Theme */}
        <div className="relative bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 text-center space-y-2">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-2xl mx-auto shadow-inner">
            🌱
          </div>
          
          <h3 className="text-xl font-bold font-serif">
            {tab === 'login' ? 'Welcome to FreshFind' : 'Create Free Account'}
          </h3>
          <p className="text-xs text-emerald-200">
            {tab === 'login' 
              ? 'Access your market bookmarks & personalized visit plans'
              : 'Join local residents discovering fresh farm produce'}
          </p>

          {/* Explicit requirement badge */}
          <div className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] text-emerald-300 font-mono">
            ⚠️ Dummy UI Design (Non-Functional as requested)
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-100 bg-slate-50 text-xs font-bold">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-3 text-center transition-colors ${
              tab === 'login' 
                ? 'bg-white text-emerald-800 border-b-2 border-emerald-600' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`flex-1 py-3 text-center transition-colors ${
              tab === 'signup' 
                ? 'bg-white text-emerald-800 border-b-2 border-emerald-600' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {submitted ? (
            <div className="text-center py-8 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <p className="text-sm font-bold text-slate-900">
                Demo Auth Simulation Successful!
              </p>
              <p className="text-xs text-slate-500">
                Logged in as dummy shopper. Closing modal...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              
              {tab === 'signup' && (
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Farhan Khan"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-700">Password</label>
                  <span className="text-[10px] text-emerald-700 hover:underline cursor-pointer">
                    Forgot?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-emerald-600 accent-emerald-600" />
                  <span>Remember my preferences</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 mt-2"
              >
                <span>{tab === 'login' ? 'Sign In (Demo)' : 'Create Account (Demo)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative my-3 text-center">
                <span className="relative z-10 bg-white px-2 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  Or continue with
                </span>
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleSubmit({ preventDefault: () => {} })}
                  className="py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 font-medium text-slate-700 flex items-center justify-center gap-1.5"
                >
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit({ preventDefault: () => {} })}
                  className="py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 font-medium text-slate-700 flex items-center justify-center gap-1.5"
                >
                  <span>Apple ID</span>
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Footer Note */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-[10px] text-slate-400">
          Pure frontend single page demo — no external database connection.
        </div>

      </div>

    </div>
  );
}
