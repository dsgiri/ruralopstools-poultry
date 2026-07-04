/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ViewState } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { Dashboard } from './components/Dashboard';
import { EggLog } from './components/EggLog';
import { CoopChecklist } from './components/CoopChecklist';
import { FlockHealth } from './components/FlockHealth';
import { About, Privacy, Legal, Contact } from './components/InfoPages';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  // Simple scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
    // Update document title for SEO based on view
    const viewTitles: Record<ViewState, string> = {
      'dashboard': 'Dashboard — Poultry | RuralOpsTools',
      'egg-log': 'Egg Production Log — Poultry | RuralOpsTools',
      'coop-checklist': 'Coop Inspection Checklist — Poultry | RuralOpsTools',
      'flock-health': 'Flock Health Tracker — Poultry | RuralOpsTools',
      'about': 'About — Poultry | RuralOpsTools',
      'privacy': 'Privacy Policy — Poultry | RuralOpsTools',
      'contact': 'Contact — Poultry | RuralOpsTools',
      'legal': 'Legal — Poultry | RuralOpsTools',
    };
    document.title = viewTitles[currentView] || 'Poultry | RuralOpsTools';
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'egg-log':
        return <EggLog />;
      case 'coop-checklist':
        return <CoopChecklist />;
      case 'flock-health':
        return <FlockHealth />;
      case 'about':
        return <About />;
      case 'privacy':
        return <Privacy />;
      case 'legal':
        return <Legal />;
      case 'contact':
        return <Contact />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-kraft text-ink font-sans selection:bg-rust selection:text-kraft">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      {/* AdSense Responsive Slot Placeholder */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
        <div className="w-full h-[90px] bg-kraft-light border border-line flex flex-col items-center justify-center text-ink-soft opacity-60">
          <span className="text-xs uppercase tracking-widest font-bold mb-1">Advertisement</span>
          <span className="text-sm">Responsive Ad Unit Placeholder</span>
        </div>
      </div>
      
      <Footer onNavigate={setCurrentView} />
      <CookieBanner onNavigate={setCurrentView} />
    </div>
  );
}
