
import React from 'react';
import { DayEntry, MoodType } from '../types';
import { MOOD_CONFIG } from '../constants';

interface YearOverviewProps {
  entries: DayEntry[];
  year: number;
  onMonthClick: (month: number, year: number) => void;
  onYearChange: (year: number) => void;
}

const YearOverview: React.FC<YearOverviewProps> = ({ entries, year, onMonthClick, onYearChange }) => {
  const months = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(year, i, 1);
    return {
      index: i,
      name: d.toLocaleString('default', { month: 'long' }),
      daysInMonth: new Date(year, i + 1, 0).getDate(),
      offset: d.getDay()
    };
  });

  const getEntriesForMonth = (month: number) => {
    return entries.filter(e => {
      const d = new Date(e.date + 'T12:00:00');
      return d.getMonth() === month && d.getFullYear() === year;
    });
  };

  const yearEntries = entries.filter(e => {
    const d = new Date(e.date + 'T12:00:00');
    return d.getFullYear() === year;
  });

  return (
    <div className="py-4 md:py-10 animate-in fade-in slide-in-from-bottom-4 duration-700 px-2 md:px-0 space-y-12 md:space-y-24">
      {/* Header */}
      <div className="flex justify-between items-center px-4">
        <button onClick={() => onYearChange(year - 1)} className="text-posy-ink/20 hover:text-posy-purple transition-all p-3">
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="text-center">
          <h2 className="text-5xl md:text-8xl font-serif text-posy-ink tracking-tight leading-none font-light">{year}</h2>
          <p className="text-[8px] md:text-[10px] font-medium text-posy-ink/20 uppercase tracking-[0.4em] md:tracking-[0.6em] mt-2">Annual Sanctuary</p>
        </div>
        <button onClick={() => onYearChange(year + 1)} className="text-posy-ink/20 hover:text-posy-purple transition-all p-3">
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Grid of Months */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        {months.map(m => {
          const monthEntries = getEntriesForMonth(m.index);
          return (
            <button 
              key={m.name}
              onClick={() => onMonthClick(m.index, year)}
              className="posy-card p-6 md:p-10 rounded-[32px] md:rounded-[40px] text-left group hover:ring-2 hover:ring-posy-purple/10 flex flex-col bg-posy-paper"
            >
              <div className="flex justify-between items-center mb-6 min-h-[1.5rem] w-full">
                <h3 className="text-xl md:text-3xl font-serif text-posy-ink group-hover:text-posy-purple transition-colors font-light leading-none">{m.name}</h3>
                <span className="text-[7px] md:text-[9px] font-black text-posy-ink/20 uppercase tracking-widest leading-none text-right flex-shrink-0">{monthEntries.length} Blooms</span>
              </div>
              
              <div className="grid grid-cols-7 gap-1 md:gap-2">
                {Array.from({ length: m.offset }).map((_, i) => <div key={i} className="aspect-square" />)}
                {Array.from({ length: m.daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const entry = monthEntries.find(e => {
                    const d = new Date(e.date + 'T12:00:00');
                    return d.getDate() === day;
                  });
                  return (
                    <div 
                      key={day} 
                      className={`aspect-square rounded-[4px] md:rounded-[6px] transition-all duration-700
                        ${entry ? 'shadow-sm' : 'recessed-button'}
                      `}
                      style={{ 
                        backgroundColor: entry ? MOOD_CONFIG[entry.mood].color : undefined,
                      }}
                    />
                  );
                })}
              </div>
            </button>
          );
        })}
      </div>

      {/* Summary Section */}
      <div className="posy-card rounded-[40px] md:rounded-[80px] p-6 md:p-24 space-y-10 md:space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 overflow-hidden bg-posy-paper">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-4 border-b border-posy-bg pb-6 md:pb-12 text-center md:text-left">
          <div className="space-y-2 md:space-y-4">
            <h3 className="text-3xl md:text-7xl font-serif text-posy-ink leading-tight font-light">Your Year <span className="italic text-posy-purple opacity-30">in Bloom</span></h3>
            <p className="text-[8px] md:text-[10px] font-medium text-posy-ink/20 uppercase tracking-[0.4em] md:tracking-[0.6em]">A gentle history of growth</p>
          </div>
          <div className="text-[8px] md:text-[10px] font-medium uppercase text-posy-ink/20 tracking-[0.2em] md:tracking-[0.4em] italic">
            Growing Season {year}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8">
          <div className="recessed-button px-3 py-6 md:p-10 flex flex-col items-center justify-center space-y-1 md:space-y-3 shadow-inner text-center border-none bg-posy-bg/20 overflow-hidden">
            <p className="text-3xl md:text-5xl font-serif text-posy-ink font-light leading-none">{yearEntries.length}</p>
            <p className="text-[7px] md:text-[9px] font-bold uppercase text-posy-ink/30 tracking-[0.1em] md:tracking-widest leading-tight whitespace-nowrap overflow-hidden text-ellipsis w-full">Total Blooms</p>
          </div>
          <div className="recessed-button px-3 py-6 md:p-10 flex flex-col items-center justify-center space-y-1 md:space-y-3 shadow-inner text-center border-none bg-posy-bg/20 overflow-hidden">
            <p className="text-3xl md:text-5xl font-serif text-posy-ink font-light leading-none">{yearEntries.filter(e => e.affirmation).length}</p>
            <p className="text-[7px] md:text-[9px] font-bold uppercase text-posy-ink/30 tracking-[0.1em] md:tracking-widest leading-tight whitespace-nowrap overflow-hidden text-ellipsis w-full">Affirmations</p>
          </div>
          <div className="recessed-button px-3 py-6 md:p-10 flex flex-col items-center justify-center space-y-1 md:space-y-3 shadow-inner text-center border-none bg-posy-bg/20 overflow-hidden">
            <p className="text-3xl md:text-5xl font-serif text-posy-ink font-light leading-none">
              {new Set(yearEntries.map(e => e.mood)).size}
            </p>
            <p className="text-[7px] md:text-[9px] font-bold uppercase text-posy-ink/30 tracking-[0.1em] md:tracking-widest leading-tight whitespace-nowrap overflow-hidden text-ellipsis w-full">Species</p>
          </div>
          <div className="recessed-button px-3 py-6 md:p-10 flex flex-col items-center justify-center space-y-1 md:space-y-3 shadow-inner text-center border-none bg-posy-bg/20 overflow-hidden">
            <p className="text-3xl md:text-5xl font-serif text-posy-ink font-light leading-none">{year}</p>
            <p className="text-[7px] md:text-[9px] font-bold uppercase text-posy-ink/30 tracking-[0.1em] md:tracking-widest leading-tight whitespace-nowrap overflow-hidden text-ellipsis w-full">Growing Era</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearOverview;

