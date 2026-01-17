
import React, { useState, useEffect } from 'react';
import { DayEntry, MoodType, UserSettings } from './types';
import Garden from './components/Garden';
import MoodCheckIn from './components/MoodCheckIn';
import CalendarView from './components/CalendarView';
import BouquetExport from './components/BouquetExport';
import YearOverview from './components/YearOverview'; 
import FloristView from './components/FloristView';
import SettingsView from './components/SettingsView';
import { MOOD_CONFIG } from './constants';

const DEFAULT_SETTINGS: UserSettings = {
  goals: [
    { id: 'water', label: 'Drank Water', enabled: true, icon: '💧' },
    { id: 'fruit', label: 'Ate Fruits', enabled: true, icon: '🍎' },
    { id: 'outside', label: 'Step Outside', enabled: true, icon: '🌲' },
    { id: 'move', label: 'Gentle Movement', enabled: true, icon: '🧘' },
    { id: 'period', label: "It's my period today", enabled: false, icon: '🩸' }
  ],
  palette: 'classic',
  isDarkMode: false,
  isHighContrast: false,
  isLargeText: false
};

const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const App: React.FC = () => {
  const [entries, setEntries] = useState<DayEntry[]>([]);
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [view, setView] = useState<'year' | 'calendar' | 'garden' | 'checkin' | 'bouquet' | 'florist' | 'settings'>('year');
  const [selectedDay, setSelectedDay] = useState<DayEntry | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [checkinDate, setCheckinDate] = useState<Date>(new Date());

  useEffect(() => {
    const savedEntries = localStorage.getItem('posy_garden_entries');
    const savedSettings = localStorage.getItem('posy_settings');
    if (savedEntries) setEntries(JSON.parse(savedEntries));
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      const mergedGoals = [...DEFAULT_SETTINGS.goals];
      parsed.goals?.forEach((g: any) => {
        const index = mergedGoals.findIndex(dg => dg.id === g.id);
        if (index > -1) {
          mergedGoals[index] = g;
        } else {
          mergedGoals.push(g);
        }
      });
      setSettings({ ...DEFAULT_SETTINGS, ...parsed, goals: mergedGoals });
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-rose', 'theme-forest', 'high-contrast', 'large-text');
    if (settings.isDarkMode) root.classList.add('dark');
    if (settings.isHighContrast) root.classList.add('high-contrast');
    if (settings.isLargeText) root.classList.add('large-text');
    if (settings.palette === 'rose') root.classList.add('theme-rose');
    if (settings.palette === 'forest') root.classList.add('theme-forest');
  }, [settings]);

  const saveEntries = (newEntries: DayEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem('posy_garden_entries', JSON.stringify(newEntries));
  };

  const handleUpdateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    localStorage.setItem('posy_settings', JSON.stringify(newSettings));
  };

  const addEntry = (entry: DayEntry) => {
    const dateKey = entry.date;
    const filtered = entries.filter(e => e.date !== dateKey);
    const updated = [...filtered, entry];
    saveEntries(updated);
    setView('garden');
  };

  const navigateToMonth = (month: number, year: number) => {
    setCurrentDate(new Date(year, month, 1));
    setView('calendar');
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateKey = toDateKey(clickedDate);
    const existingEntry = entries.find(e => e.date === dateKey);

    if (existingEntry) {
      setSelectedDay(existingEntry);
    } else {
      setCheckinDate(clickedDate);
      setView('checkin');
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto flex flex-col relative overflow-hidden transition-all duration-700">
      <header className={`pt-4 md:pt-12 pb-2 md:pb-8 px-6 md:px-12 flex justify-between items-center z-50 transition-all duration-700 ${view === 'checkin' || view === 'bouquet' ? 'opacity-30 blur-sm pointer-events-none' : 'opacity-100'}`}>
        <h1 onClick={() => setView('year')} className="text-3xl md:text-6xl font-serif text-posy-ink tracking-tighter cursor-pointer hover:opacity-60 transition-all transform hover:scale-105 active:scale-95">Posy</h1>
        <nav className="flex gap-3 md:gap-8 items-center">
          {['year', 'garden', 'florist', 'settings'].map((v) => (
            <button key={v} onClick={() => setView(v as any)} className={`text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all pb-1 ${view === v ? 'text-posy-purple border-b-2 border-posy-purple/30' : 'text-posy-ink/40 hover:text-posy-ink'}`}>{v}</button>
          ))}
        </nav>
      </header>

      <main className="flex-1 px-4 md:px-8 pb-32 overflow-y-auto scrollbar-hide">
        {view === 'year' && <YearOverview entries={entries} year={currentDate.getFullYear()} onMonthClick={navigateToMonth} onYearChange={(y) => setCurrentDate(new Date(y, 0, 1))} />}
        {view === 'calendar' && (
          <div className="relative">
            <button onClick={() => setView('year')} className="md:absolute top-0 left-0 p-4 text-posy-ink/60 hover:text-posy-ink transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest z-50">← All Months</button>
            <CalendarView entries={entries} onSelectEntry={setSelectedDay} onDayClick={handleDayClick} onViewBouquet={() => setView('bouquet')} externalDate={currentDate} onDateChange={setCurrentDate} />
          </div>
        )}
        {view === 'garden' && <Garden entries={entries} onSelectDay={(entry) => setSelectedDay(entry)} currentYear={currentDate.getFullYear()} />}
        {view === 'checkin' && <MoodCheckIn targetDate={checkinDate} onSave={addEntry} onCancel={() => setView('calendar')} userSettings={settings} onUpdateSettings={handleUpdateSettings} />}
        {view === 'bouquet' && (
          <div className="relative">
            <button onClick={() => setView('calendar')} className="absolute top-0 left-0 p-4 md:p-6 text-posy-ink/60 hover:text-posy-ink transition-all z-[100] flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em]">← Back</button>
            <BouquetExport entries={entries} onShareWithFlorist={() => setView('florist')} />
          </div>
        )}
        {view === 'florist' && <FloristView entries={entries} />}
        {view === 'settings' && <SettingsView settings={settings} onUpdateSettings={handleUpdateSettings} />}
      </main>

      {(view === 'calendar' || view === 'year' || view === 'florist' || view === 'settings') && (
        <div className="fixed bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-50 w-full px-6 flex justify-center">
          <button onClick={() => { setCheckinDate(new Date()); setView('checkin'); }} className="btn-village px-8 md:px-14 py-4 md:py-5 bg-posy-purple text-white shadow-2xl">Plant a Bloom 🌸</button>
        </div>
      )}

      {selectedDay && (
        <div className="fixed inset-0 bg-posy-ink/60 backdrop-blur-xl z-[200] flex items-center justify-center p-3 md:p-8 animate-in fade-in duration-300" onClick={() => setSelectedDay(null)}>
          <div className="bg-posy-paper rounded-2xl md:rounded-[60px] p-4 md:p-12 max-w-4xl w-full shadow-2xl transform transition-all relative overflow-y-auto max-h-[95vh] border-2 border-posy-ink/10" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedDay(null)} className="absolute top-3 right-3 md:top-8 md:right-8 text-posy-ink/30 hover:text-posy-purple transition-all p-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" /></svg></button>
            <div className="space-y-6 md:space-y-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-12">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-24 h-24 md:w-56 md:h-56 sway mb-2 md:mb-6">
                    {React.createElement(MOOD_CONFIG[selectedDay.mood].Icon, { className: "w-full h-full" })}
                  </div>
                  <p className="text-[8px] md:text-[10px] font-black text-posy-purple uppercase tracking-[0.4em] mb-1">{MOOD_CONFIG[selectedDay.mood].label}</p>
                  <h3 className="text-lg md:text-3xl font-serif text-posy-ink italic">{MOOD_CONFIG[selectedDay.mood].flower}</h3>
                </div>
                <div className="flex-1 space-y-3 md:space-y-6 text-center md:text-left">
                  <p className="text-[8px] md:text-[10px] font-black text-posy-ink/40 uppercase tracking-[0.4em]">{new Date(selectedDay.date + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  <h3 className="text-xl md:text-5xl font-serif text-posy-ink leading-none">Your Thought</h3>
                  <div className="bg-posy-bg/50 p-4 md:p-8 rounded-[16px] md:rounded-[40px] italic text-base md:text-xl text-posy-ink/90 leading-relaxed border border-posy-purple/5">"{selectedDay.note || 'A quiet space for growth.'}"</div>
                  {selectedDay.affirmation && <div className="pt-1 md:pt-4 space-y-1 md:space-y-2"><p className="text-[7px] md:text-[9px] uppercase tracking-[0.4em] text-posy-purple font-black">Posy Reflection</p><p className="text-posy-ink font-serif text-lg md:text-2xl italic opacity-90">{selectedDay.affirmation}</p></div>}
                </div>
              </div>
              {selectedDay.media && <div className="space-y-2 md:space-y-4"><p className="text-[8px] md:text-[10px] font-black text-posy-ink/40 uppercase tracking-[0.4em]">Captured Memory</p><div className="rounded-[16px] md:rounded-[40px] overflow-hidden border-2 md:border-8 border-white shadow-xl bg-posy-bg aspect-video">{selectedDay.mediaType === 'video' ? <video src={selectedDay.media} controls className="w-full h-full object-cover" /> : <img src={selectedDay.media} className="w-full h-full object-cover" />}</div></div>}
              {selectedDay.goals && Object.values(selectedDay.goals).some(v => v) && (
                <div className="space-y-2 md:space-y-4 pt-1 md:pt-4">
                  <p className="text-[8px] md:text-[10px] font-black text-posy-ink/40 uppercase tracking-[0.4em]">Rituals Completed</p>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {settings.goals.map(goal => selectedDay.goals?.[goal.id] && (
                      <div key={goal.id} className="bg-posy-purple/5 px-3 md:px-6 py-1.5 md:py-3 rounded-full flex items-center gap-2 md:gap-3 border border-posy-purple/10">
                        <span className="text-xs md:text-lg">{goal.icon}</span>
                        <span className="text-[7px] md:text-[10px] font-black uppercase tracking-widest text-posy-purple">{goal.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
