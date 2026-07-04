import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CoopCheckEntry } from '../types';
import { storage } from '../utils/storage';
import { CheckSquare, Trash2, Info } from 'lucide-react';
import { format } from 'date-fns';

export function CoopChecklist() {
  const [checks, setChecks] = useState<CoopCheckEntry[]>([]);
  
  // Form state
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [temperature, setTemperature] = useState('');
  const [ventilation, setVentilation] = useState(false);
  const [bedding, setBedding] = useState(false);
  const [water, setWater] = useState(false);
  const [predator, setPredator] = useState(false);

  useEffect(() => {
    setChecks(storage.getCoopChecks().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  const getFlagDetails = (temp: number): { flag: 'ok' | 'warning' | 'danger', message: string } => {
    if (temp <= 20) return { flag: 'danger', message: 'Frost risk — check for comb frostbite' };
    if (temp >= 21 && temp <= 32) return { flag: 'warning', message: 'Cold — confirm water is not freezing' };
    if (temp >= 90) return { flag: 'danger', message: 'Heat stress risk — ensure shade and water' };
    return { flag: 'ok', message: 'Within typical range' };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tempNum = parseFloat(temperature);
    
    if (isNaN(tempNum)) return;

    const { flag, message } = getFlagDetails(tempNum);

    const newEntry: CoopCheckEntry = {
      id: uuidv4(),
      date,
      temperature: tempNum,
      ventilationClear: ventilation,
      beddingDry: bedding,
      waterNotFrozen: water,
      predatorProofingChecked: predator,
      flag,
      flagMessage: message,
    };

    const updatedChecks = [newEntry, ...checks].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setChecks(updatedChecks);
    storage.setCoopChecks(updatedChecks);
    
    // Reset form
    setTemperature('');
    setVentilation(false);
    setBedding(false);
    setWater(false);
    setPredator(false);
  };

  const handleDelete = (id: string) => {
    const updatedChecks = checks.filter(check => check.id !== id);
    setChecks(updatedChecks);
    storage.setCoopChecks(updatedChecks);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b-2 border-line pb-4">
        <div className="flex items-center gap-3 mb-2">
          <CheckSquare className="w-8 h-8 text-board" />
          <h1 className="text-3xl font-serif text-ink tracking-tight">Coop Inspection Checklist</h1>
        </div>
        <p className="text-ink-soft">Log daily coop conditions to prevent environmental stress and predator issues.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form & Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-kraft-light border border-line p-5 sm:p-6">
            <h2 className="font-serif text-xl mb-4 text-ink">New Inspection</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="date" className="block text-sm font-medium text-ink-soft">Date</label>
                  <input
                    type="date"
                    id="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-kraft border border-line px-3 py-2 text-ink focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="temp" className="block text-sm font-medium text-ink-soft">Temperature (°F)</label>
                  <input
                    type="number"
                    id="temp"
                    required
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    className="w-full bg-kraft border border-line px-3 py-2 text-ink focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust font-mono"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="block text-sm font-medium text-ink-soft mb-2">Checklist Items</p>
                
                <label className="flex items-center gap-3 p-3 bg-kraft border border-line cursor-pointer hover:bg-white transition-colors">
                  <input 
                    type="checkbox" 
                    checked={ventilation}
                    onChange={(e) => setVentilation(e.target.checked)}
                    className="w-5 h-5 accent-rust text-rust bg-white border-line rounded-sm focus:ring-rust focus:ring-offset-kraft" 
                  />
                  <span className="text-ink text-sm">Ventilation clear and functioning</span>
                </label>

                <label className="flex items-center gap-3 p-3 bg-kraft border border-line cursor-pointer hover:bg-white transition-colors">
                  <input 
                    type="checkbox" 
                    checked={bedding}
                    onChange={(e) => setBedding(e.target.checked)}
                    className="w-5 h-5 accent-rust text-rust bg-white border-line rounded-sm focus:ring-rust focus:ring-offset-kraft" 
                  />
                  <span className="text-ink text-sm">Bedding dry and sufficient</span>
                </label>

                <label className="flex items-center gap-3 p-3 bg-kraft border border-line cursor-pointer hover:bg-white transition-colors">
                  <input 
                    type="checkbox" 
                    checked={water}
                    onChange={(e) => setWater(e.target.checked)}
                    className="w-5 h-5 accent-rust text-rust bg-white border-line rounded-sm focus:ring-rust focus:ring-offset-kraft" 
                  />
                  <span className="text-ink text-sm">Water sources fresh and not frozen</span>
                </label>

                <label className="flex items-center gap-3 p-3 bg-kraft border border-line cursor-pointer hover:bg-white transition-colors">
                  <input 
                    type="checkbox" 
                    checked={predator}
                    onChange={(e) => setPredator(e.target.checked)}
                    className="w-5 h-5 accent-rust text-rust bg-white border-line rounded-sm focus:ring-rust focus:ring-offset-kraft" 
                  />
                  <span className="text-ink text-sm">Predator-proofing intact</span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-rust hover:bg-rust-dark text-kraft font-medium py-3 px-4 transition-colors border border-transparent focus:outline-none focus:ring-2 focus:ring-rust focus:ring-offset-2 focus:ring-offset-kraft"
                >
                  Save Inspection
                </button>
              </div>
            </form>
          </div>

          <div className="bg-kraft border border-line p-5">
            <h3 className="font-medium text-ink flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-rust" />
              Temperature Flags
            </h3>
            <ul className="text-sm text-ink-soft space-y-2">
              <li><strong className="text-red">≤ 20°F:</strong> Danger. Frostbite risk for combs/wattles.</li>
              <li><strong className="text-amber">21–32°F:</strong> Warning. Monitor water sources for freezing.</li>
              <li><strong className="text-red">≥ 90°F:</strong> Danger. Heat stress risk. Ensure shade/water.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Stats & History */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-kraft-light border border-line p-4 sm:p-5">
              <div className="text-sm text-ink-soft mb-1 font-medium uppercase tracking-wider">Latest Temp</div>
              <div className="text-3xl sm:text-4xl font-mono font-medium text-ink">{checks.length > 0 ? `${checks[0].temperature}°F` : '—'}</div>
            </div>
            <div className="bg-kraft-light border border-line p-4 sm:p-5">
              <div className="text-sm text-ink-soft mb-1 font-medium uppercase tracking-wider">Total Inspections</div>
              <div className="text-3xl sm:text-4xl font-mono font-medium text-ink">{checks.length}</div>
            </div>
          </div>

          <div className="bg-kraft-light border border-line overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-line">
              <h2 className="font-serif text-xl text-ink">Inspection History</h2>
            </div>
            
            {checks.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-line">
                  <thead className="bg-kraft">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-ink-soft uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-ink-soft uppercase tracking-wider">Temp</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-ink-soft uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-ink-soft uppercase tracking-wider">Checks Passed</th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-ink-soft uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-kraft-light divide-y divide-line">
                    {checks.map(check => {
                      const passedChecks = [check.ventilationClear, check.beddingDry, check.waterNotFrozen, check.predatorProofingChecked].filter(Boolean).length;
                      return (
                        <tr key={check.id} className="hover:bg-kraft transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap font-mono text-sm text-ink">{check.date}</td>
                          <td className="px-4 py-3 whitespace-nowrap font-mono text-sm text-ink">{check.temperature}°F</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`text-xs font-bold uppercase tracking-wide px-2 py-1 ${
                              check.flag === 'danger' ? 'bg-red text-kraft' :
                              check.flag === 'warning' ? 'bg-amber text-ink' :
                              'bg-green text-kraft'
                            }`}>
                              {check.flagMessage}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap font-mono text-sm text-ink">
                            {passedChecks}/4
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                            <button 
                              onClick={() => handleDelete(check.id)}
                              className="text-red hover:text-ink-soft transition-colors p-1"
                              title="Delete entry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center text-ink-soft">
                <p>No entries yet — add your first check on the left.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
