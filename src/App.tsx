import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Terminal, 
  Network, 
  Search, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  ChevronRight,
  Shield,
  HelpCircle,
  Hash,
  X,
  Menu
} from 'lucide-react';
import { DocContent } from './components/DocContent';
import { Playground } from './components/Playground';
import { RouterSimulator } from './components/RouterSimulator';
import { BrokerName } from './types';
import { DOC_SECTIONS } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<'docs' | 'playground' | 'router'>('docs');
  const [activeSection, setActiveSection] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Highlighting/State transfer from docs to playground
  const [playgroundBroker, setPlaygroundBroker] = useState<BrokerName>('oanda');
  const [playgroundOperation, setPlaygroundOperation] = useState<string>('');

  // Mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleJumpToPlayground = (broker: BrokerName, operation: string) => {
    setPlaygroundBroker(broker);
    setPlaygroundOperation(operation);
    setActiveTab('playground');
    // Scroll to top of window to see the playground immediately
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter TOC or document structure based on search
  const filteredSections = useMemo(() => {
    if (!searchQuery) return DOC_SECTIONS;
    const query = searchQuery.toLowerCase();
    return DOC_SECTIONS.filter(section => {
      const titleMatches = section.title.toLowerCase().includes(query) || (section.subtitle && section.subtitle.toLowerCase().includes(query));
      const subsectionsMatch = section.subsections?.some(sub => sub.title.toLowerCase().includes(query));
      return titleMatches || subsectionsMatch;
    });
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Top Banner / Corporate Header */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-40 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          
          {/* Logo Brand Block */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 rounded-lg text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 lg:hidden focus:outline-hidden"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs tracking-wider uppercase font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  NGL TRADEMIND
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              </div>
              <h1 className="text-sm font-bold text-zinc-900 tracking-tight sm:text-base mt-0.5">
                Broker API Integration Guide
              </h1>
            </div>
          </div>

          {/* Navigation Controls / Main Tabs */}
          <div className="hidden md:flex items-center gap-1 bg-zinc-100 p-1 rounded-lg border border-zinc-200">
            <button
              onClick={() => setActiveTab('docs')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition ${
                activeTab === 'docs'
                  ? 'bg-white text-zinc-900 shadow-xs font-bold'
                  : 'text-zinc-600 hover:text-zinc-900 font-semibold'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              Complete Guide
            </button>
            <button
              onClick={() => {
                setActiveTab('playground');
                setPlaygroundOperation('');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition ${
                activeTab === 'playground'
                  ? 'bg-white text-zinc-900 shadow-xs font-bold'
                  : 'text-zinc-600 hover:text-zinc-900 font-semibold'
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              API Playground
            </button>
            <button
              onClick={() => setActiveTab('router')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition ${
                activeTab === 'router'
                  ? 'bg-white text-zinc-900 shadow-xs font-bold'
                  : 'text-zinc-600 hover:text-zinc-900 font-semibold'
              }`}
            >
              <Network className="h-3.5 w-3.5" />
              Symbol Router
            </button>
          </div>

          {/* South Africa Corporate Seal */}
          <div className="hidden sm:flex flex-col items-end text-[10px] text-zinc-400 font-mono">
            <div className="flex items-center gap-1 font-semibold text-zinc-500">
              <MapPin className="h-3 w-3 text-zinc-400" />
              <span>Cape Town, SA</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Calendar className="h-3 w-3 text-zinc-400" />
              <span>June 2026 — v1.0</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sticky Tab bar */}
      <div className="md:hidden bg-zinc-50 border-b border-zinc-200 grid grid-cols-3 p-1 sticky top-16 z-30">
        <button
          onClick={() => { setActiveTab('docs'); setIsMobileMenuOpen(false); }}
          className={`py-2 text-[11px] font-bold text-center rounded-lg ${activeTab === 'docs' ? 'bg-white text-zinc-900 shadow-2xs font-extrabold' : 'text-zinc-500'}`}
        >
          Guide
        </button>
        <button
          onClick={() => { setActiveTab('playground'); setPlaygroundOperation(''); setIsMobileMenuOpen(false); }}
          className={`py-2 text-[11px] font-bold text-center rounded-lg ${activeTab === 'playground' ? 'bg-white text-zinc-900 shadow-2xs font-extrabold' : 'text-zinc-500'}`}
        >
          Playground
        </button>
        <button
          onClick={() => { setActiveTab('router'); setIsMobileMenuOpen(false); }}
          className={`py-2 text-[11px] font-bold text-center rounded-lg ${activeTab === 'router' ? 'bg-white text-zinc-900 shadow-2xs font-extrabold' : 'text-zinc-500'}`}
        >
          Router
        </button>
      </div>

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        
        {/* Sidebar Navigation */}
        <aside className={`
          fixed lg:sticky top-16 lg:top-16 bottom-0 left-0 z-35 w-72 bg-white border-r border-zinc-200 p-6 overflow-y-auto transform transition-transform duration-300 lg:transform-none lg:block
          ${isMobileMenuOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="space-y-6">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search specs and rules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-50 hover:bg-zinc-100/50 focus:bg-white text-xs text-zinc-700 pl-9 pr-3 py-3 rounded-lg border border-zinc-200 outline-hidden focus:border-indigo-500 transition"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-3.5 p-0.5 rounded-full hover:bg-zinc-200 text-zinc-400 hover:text-zinc-600"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Document Structure / Table of Contents */}
            <div className="space-y-1">
              <div className="flex items-center justify-between px-2 pb-2">
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                  Table of Contents
                </span>
                {activeSection !== 'all' && (
                  <button 
                    onClick={() => { setActiveSection('all'); setActiveTab('docs'); }}
                    className="text-[10px] text-indigo-600 hover:underline font-semibold font-mono"
                  >
                    Reset View
                  </button>
                )}
              </div>

              {filteredSections.map(section => (
                <div key={section.id} className="space-y-1">
                  <button
                    onClick={() => {
                      setActiveSection(section.id);
                      setActiveTab('docs');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-bold transition flex items-center justify-between ${
                      activeTab === 'docs' && activeSection === section.id
                        ? 'bg-indigo-50/50 text-indigo-600 font-extrabold border-l-2 border-indigo-600 pl-2'
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                    }`}
                  >
                    <span className="truncate">{section.title.split('—')[0]}</span>
                    <ChevronRight className={`h-3 w-3 transition-transform ${activeSection === section.id ? 'rotate-90 text-indigo-600' : 'text-zinc-300'}`} />
                  </button>

                  {/* Subsections list if active */}
                  {section.subsections && (activeSection === section.id || searchQuery) && (
                    <div className="pl-4 space-y-1 border-l border-zinc-100 ml-3 py-1">
                      {section.subsections.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => {
                            setActiveSection(section.id);
                            setActiveTab('docs');
                            setIsMobileMenuOpen(false);
                            // Scroll to standard anchor
                            const element = document.getElementById(sub.id);
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }}
                          className="w-full text-left px-2 py-1 rounded text-[11px] text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50/60 block truncate font-medium"
                        >
                          {sub.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Corporate Info Block */}
            <div className="pt-6 border-t border-zinc-150 space-y-3.5">
              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-150">
                <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold block">
                  Mandated Client Body
                </span>
                <span className="text-xs font-bold text-zinc-800 block mt-1">
                  NeuroGrowth Labs
                </span>
                <p className="text-[10px] text-zinc-500 mt-1 leading-normal font-medium">
                  Authorised Financial Service Provider research team reference. Cape Town, SA.
                </p>
              </div>

              <div className="p-3 bg-zinc-900 text-white rounded-xl text-center">
                <span className="text-[9px] font-mono text-emerald-400 uppercase font-extrabold tracking-wider block">
                  API ROUTER READY
                </span>
                <span className="text-[11px] font-medium text-zinc-300 block mt-1">
                  Three Venues Integrated
                </span>
                <button
                  onClick={() => { setActiveTab('router'); setIsMobileMenuOpen(false); }}
                  className="mt-2.5 w-full bg-white hover:bg-zinc-100 text-zinc-900 text-[10px] font-extrabold py-1.5 rounded-lg transition inline-flex items-center justify-center gap-1"
                >
                  Inspect Routes
                  <ArrowRight className="h-3 w-3 text-zinc-800" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile drawer */}
        {isMobileMenuOpen && (
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/25 z-30 lg:hidden"
          ></div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-x-hidden">
          
          {/* Welcome Dashboard Block - Desktop only */}
          <div className="mb-8 p-6 sm:p-8 bg-white border border-zinc-150 rounded-2xl shadow-2xs relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-50/40 rounded-full blur-2xl pointer-events-none"></div>
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
                <span className="text-xs font-mono font-bold tracking-wider text-indigo-600 uppercase">
                  Technical Specification Guide
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 mt-2">
                NGL TRADEMIND BROKER API INTEGRATION GUIDE
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1 leading-relaxed max-w-3xl">
                Connecting the NeuroGrowth Labs AI trading agent to live execution venues. Fully implements multi-market trading mandates across forex, commodities, global equities, and cryptocurrencies.
              </p>
              
              {/* Stats / Indicators in Welcome Block */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-zinc-100">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase tracking-wider font-semibold">OANDA Venue</span>
                  <span className="text-xs font-bold text-emerald-700 mt-0.5 block">Forex & Commodity CFDs</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase tracking-wider font-semibold">Alpaca Venue</span>
                  <span className="text-xs font-bold text-indigo-700 mt-0.5 block">US Equities (NYSE, NASDAQ)</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase tracking-wider font-semibold">Binance Venue</span>
                  <span className="text-xs font-bold text-amber-700 mt-0.5 block">Cryptocurrency Spot & OCO</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase tracking-wider font-semibold">Decoupled Adapter</span>
                  <span className="text-xs font-bold text-purple-700 mt-0.5 block">Routing Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Render Active View Tab */}
          <div className="space-y-12">
            {activeTab === 'docs' && (
              <DocContent 
                activeSection={activeSection} 
                onJumpToPlayground={handleJumpToPlayground} 
              />
            )}

            {activeTab === 'playground' && (
              <div className="space-y-6">
                <div className="border-b border-zinc-200 pb-4">
                  <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
                    API Playground Console
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    Test endpoint parameters, inspect generated client-side SDK code templates, and simulate API response payloads.
                  </p>
                </div>
                <Playground 
                  initialBroker={playgroundBroker} 
                  initialOperation={playgroundOperation} 
                />
              </div>
            )}

            {activeTab === 'router' && (
              <div className="space-y-6">
                <div className="border-b border-zinc-200 pb-4">
                  <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
                    Adapter Decoupler & Router
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    Under standard TradeMind guidelines, the central AI signal engine never speaks directly to individual brokers. It routes commands via symbolic ticker pattern matching.
                  </p>
                </div>
                <RouterSimulator />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modern, Clean Footer */}
      <footer className="bg-white border-t border-zinc-200 py-6 px-4 text-center text-xs text-zinc-400 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div>
            © 2026 NeuroGrowth Labs. All rights reserved. Cape Town, South Africa.
          </div>
          <div className="flex gap-4 font-semibold text-zinc-500">
            <span>Version 1.0</span>
            <span>·</span>
            <span>REST & WebSocket Specifications</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
