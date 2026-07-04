import { ViewState } from '../types';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-ink text-kraft mt-12 py-8 border-t-4 border-rust">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <div className="font-serif font-bold text-xl mb-1 text-board">RuralOpsTools</div>
            <div className="text-sm text-line">Poultry Management</div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-kraft-light">
            <a href="https://ruralopstools.com" className="hover:text-board transition-colors text-rust font-medium">All tools ↗</a>
            <button onClick={() => onNavigate('about')} className="hover:text-board transition-colors">About</button>
            <button onClick={() => onNavigate('privacy')} className="hover:text-board transition-colors">Privacy Policy</button>
            <button onClick={() => onNavigate('legal')} className="hover:text-board transition-colors">Legal</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-board transition-colors">Contact</button>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-ink-soft flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ink-soft">
          <p>© {year} RuralOpsTools. All rights reserved.</p>
          <p>Operated by Microtree LLC · Texas</p>
        </div>
      </div>
    </footer>
  );
}
