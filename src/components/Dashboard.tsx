import { useEffect, useState } from 'react';
import { ViewState, EggLogEntry, CoopCheckEntry, FlockHealthEntry } from '../types';
import { storage } from '../utils/storage';
import { ClipboardList, Activity, Thermometer, Egg } from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: ViewState) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [eggLogs, setEggLogs] = useState<EggLogEntry[]>([]);
  const [coopChecks, setCoopChecks] = useState<CoopCheckEntry[]>([]);
  const [healthEntries, setHealthEntries] = useState<FlockHealthEntry[]>([]);

  useEffect(() => {
    setEggLogs(storage.getEggLogs().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setCoopChecks(storage.getCoopChecks().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setHealthEntries(storage.getHealthEntries().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  // Compute 7-day average lay rate
  const recent7EggLogs = eggLogs.slice(0, 7);
  const avgLayRate = recent7EggLogs.length > 0
    ? Math.round(recent7EggLogs.reduce((sum, log) => sum + log.layRate, 0) / recent7EggLogs.length)
    : null;

  // Last coop check
  const lastCoopCheck = coopChecks[0] || null;

  // Active health watches
  const activeWatches = healthEntries.filter(e => e.status !== 'Healthy');

  // Preview lists
  const recentEggLogsPreview = eggLogs.slice(0, 5);
  const activeWatchesPreview = activeWatches.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Hero Header */}
      <div className="bg-board text-kraft p-6 sm:p-8 rounded-sm shadow-sm border-l-8 border-board-dark flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif tracking-tight mb-2 text-ink">Poultry Operations</h1>
          <p className="text-ink-soft text-lg max-w-2xl">Daily logs, coop conditions, and flock health tracking.</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* 7-day Lay Rate */}
        <div className="bg-kraft-light border border-line p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4 text-ink-soft">
            <Egg className="w-5 h-5 text-rust" />
            <h3 className="font-medium">7-Day Lay Rate</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-mono font-medium text-ink">
              {avgLayRate !== null ? `${avgLayRate}%` : '—'}
            </span>
          </div>
        </div>

        {/* Total Logs */}
        <div className="bg-kraft-light border border-line p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4 text-ink-soft">
            <ClipboardList className="w-5 h-5 text-rust" />
            <h3 className="font-medium">Total Egg Logs</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-mono font-medium text-ink">
              {eggLogs.length}
            </span>
          </div>
        </div>

        {/* Last Coop Check */}
        <div className="bg-kraft-light border border-line p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4 text-ink-soft">
            <Thermometer className="w-5 h-5 text-rust" />
            <h3 className="font-medium">Last Coop Temp</h3>
          </div>
          {lastCoopCheck ? (
            <div>
              <span className="text-4xl font-mono font-medium text-ink">{lastCoopCheck.temperature}°F</span>
              <div className={`mt-2 text-xs font-bold uppercase tracking-wide px-2 py-1 inline-block ${
                lastCoopCheck.flag === 'danger' ? 'bg-red text-kraft' :
                lastCoopCheck.flag === 'warning' ? 'bg-amber text-ink' :
                'bg-green text-kraft'
              }`}>
                {lastCoopCheck.flagMessage}
              </div>
            </div>
          ) : (
            <span className="text-4xl font-mono font-medium text-ink">—</span>
          )}
        </div>

        {/* Active Watches */}
        <div className="bg-kraft-light border border-line p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4 text-ink-soft">
            <Activity className="w-5 h-5 text-rust" />
            <h3 className="font-medium">Active Watches</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-mono font-medium text-ink">
              {activeWatches.length}
            </span>
          </div>
        </div>
      </div>

      {/* Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Recent Egg Logs */}
        <div className="bg-kraft-light border border-line">
          <div className="p-4 sm:p-5 border-b border-line flex items-center justify-between">
            <h3 className="font-serif text-lg text-ink flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-rust" />
              Recent Logs
            </h3>
            <button 
              onClick={() => onNavigate('egg-log')}
              className="text-sm font-medium text-rust hover:text-rust-dark transition-colors"
            >
              View all →
            </button>
          </div>
          <div className="p-0">
            {recentEggLogsPreview.length > 0 ? (
              <div className="divide-y divide-line">
                {recentEggLogsPreview.map(log => (
                  <div key={log.id} className="p-4 sm:p-5 flex justify-between items-center hover:bg-kraft transition-colors">
                    <div className="font-mono text-sm text-ink-soft">{log.date}</div>
                    <div className="text-right">
                      <div className="font-mono font-medium text-ink">{log.eggsCollected} eggs</div>
                      <div className="text-xs text-ink-soft">{log.layRate}% lay rate</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-ink-soft">
                <p>No entries yet.</p>
                <button 
                  onClick={() => onNavigate('egg-log')}
                  className="mt-4 px-4 py-2 border border-rust text-rust hover:bg-rust hover:text-kraft transition-colors text-sm font-medium"
                >
                  Log first collection
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Active Watches Preview */}
        <div className="bg-kraft-light border border-line">
          <div className="p-4 sm:p-5 border-b border-line flex items-center justify-between">
            <h3 className="font-serif text-lg text-ink flex items-center gap-2">
              <Activity className="w-5 h-5 text-rust" />
              Active Watches
            </h3>
            <button 
              onClick={() => onNavigate('flock-health')}
              className="text-sm font-medium text-rust hover:text-rust-dark transition-colors"
            >
              Manage →
            </button>
          </div>
          <div className="p-0">
            {activeWatchesPreview.length > 0 ? (
              <div className="divide-y divide-line">
                {activeWatchesPreview.map(watch => (
                  <div key={watch.id} className="p-4 sm:p-5 flex flex-col gap-2 hover:bg-kraft transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-ink">{watch.flockId}</div>
                      <div className={`text-xs font-bold uppercase tracking-wide px-2 py-1 ${
                        watch.status === 'Sick' ? 'bg-red text-kraft' : 'bg-amber text-ink'
                      }`}>
                        {watch.status}
                      </div>
                    </div>
                    <p className="text-sm text-ink-soft">{watch.note}</p>
                    <div className="font-mono text-xs text-ink-soft">{watch.date}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-ink-soft">
                <p>No active watches. Flock is healthy.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
