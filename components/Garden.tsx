
import React, { useState } from 'react';
import { DayEntry, MoodType, getGrowthStage } from '../types';
import { MOOD_CONFIG } from '../constants';

interface GardenProps {
  entries: DayEntry[];
  currentYear: number;
  onSelectDay: (entry: DayEntry) => void;
}

const Garden: React.FC<GardenProps> = ({ entries, currentYear, onSelectDay }) => {
  const [selectedMoodGroup, setSelectedMoodGroup] = useState<MoodType | null>(null);

  const yearEntries = entries.filter(e => {
    const d = new Date(e.date + 'T12:00:00');
    return d.getFullYear() === currentYear;
  });
  
  const moodFrequency = yearEntries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const moodGroups = Object.keys(moodFrequency) as MoodType[];

  const resilienceQuotes: Record<string, string> = {
    [MoodType.SAD]: "Blue blooms are evidence of a heart that feels deeply. You are brave.",
    [MoodType.ANXIOUS]: "Even in heavy winds, these roots hold fast. You are strong and safe.",
    [MoodType.OVERWHELMED]: "Every petal here is a victory of your gentle spirit. You are doing enough.",
    [MoodType.TIRED]: "Quiet growth happens in the rest. You are beautifully human and deserving of peace.",
    [MoodType.LONELY]: "Each bloom here is a companion to your journey. You are seen and loved."
  };

  const selectedMoodConfig = selectedMoodGroup ? MOOD_CONFIG[selectedMoodGroup] : null;
  const selectedMoodEntries = selectedMoodGroup ? yearEntries.filter(e => e.mood === selectedMoodGroup) : [];

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-x-hidden float-up pb-32">
      <div className="text-center mt-12 md:mt-24 mb-16 md:mb-32 space-y-4 md:space-y-6 z-10 px-6">
        <h2 className="text-5xl md:text-9xl font-serif text-posy-ink tracking-tighter leading-none">Your {currentYear} Garden</h2>
        <p className="text-[10px] md:text-[14px] font-black text-posy-ink/30 uppercase tracking-[0.6em] md:tracking-[0.8em]">A living landscape of your heart</p>
      </div>

      <div className="relative w-full flex-1 flex flex-wrap justify-center items-end gap-x-8 md:gap-x-32 gap-y-16 md:gap-y-40 px-6 md:px-20 min-h-[400px]">
        {moodGroups.length === 0 ? (
          <div className="text-center py-48 opacity-20">
            <p className="font-serif text-4xl md:text-7xl italic text-posy-ink px-12 leading-tight">"The garden is waiting for your first bloom."</p>
          </div>
        ) : (
          moodGroups.map((mood, i) => {
            const count = moodFrequency[mood];
            const stage = getGrowthStage(count);
            const config = MOOD_CONFIG[mood];

            return (
              <div 
                key={mood} 
                className="relative group flex flex-col items-center"
                style={{ 
                  zIndex: selectedMoodGroup === mood ? 100 : 20 + i,
                  transform: `translateY(${Math.sin(i * 2) * 30}px)` 
                }}
              >
                <button
                  onClick={() => setSelectedMoodGroup(selectedMoodGroup === mood ? null : mood)}
                  className="relative transition-all duration-1000 hover:scale-110 active:scale-95 sway outline-none"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <div className={`
                    ${stage === 'tree' ? 'w-48 h-48 md:w-80 md:h-80' : stage === 'bush' ? 'w-32 h-32 md:w-60 md:h-60' : 'w-24 h-24 md:w-40 md:h-40'}
                    drop-shadow-2xl transition-all
                  `}>
                    {config.icon("w-full h-full")}
                  </div>
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Detail Popover - Placed at the very end to avoid parent transform issues */}
      {selectedMoodGroup && selectedMoodConfig && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-posy-ink/40 backdrop-blur-md" 
            onClick={() => setSelectedMoodGroup(null)}
          ></div>
          <div className="bg-posy-paper p-8 md:p-14 rounded-[48px] md:rounded-[80px] shadow-2xl border-2 border-posy-ink/5 w-full max-w-2xl relative z-[1010] animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 overflow-hidden max-h-[90vh] flex flex-col">
            <button 
              onClick={() => setSelectedMoodGroup(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-posy-ink/20 hover:text-posy-purple transition-colors p-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="overflow-y-auto pr-2 scrollbar-hide space-y-8">
              <div className="space-y-2 md:space-y-4 text-center md:text-left">
                <p className="text-[10px] md:text-[14px] font-black text-posy-purple uppercase tracking-[0.5em]">{selectedMoodConfig.label}</p>
                <h4 className="text-4xl md:text-7xl font-serif text-posy-ink leading-tight font-light">{selectedMoodConfig.flower}</h4>
              </div>
              
              {resilienceQuotes[selectedMoodGroup] && (
                <p className="text-xl md:text-3xl italic text-posy-purple font-medium leading-relaxed border-l-4 md:border-l-8 border-posy-purple/30 pl-6 md:pl-10 py-4 md:py-6 bg-posy-purple/5 rounded-r-[24px] md:rounded-r-[40px]">
                  "{resilienceQuotes[selectedMoodGroup]}"
                </p>
              )}

              <div className="space-y-4">
                <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.6em] text-posy-ink/20 border-b border-posy-ink/5 pb-4">Recent Reflections</p>
                <div className="grid grid-cols-1 gap-3">
                  {selectedMoodEntries.map(entry => (
                    <button
                      key={entry.date}
                      onClick={() => {
                        onSelectDay(entry);
                        setSelectedMoodGroup(null);
                      }}
                      className="w-full text-left px-6 py-5 md:px-10 md:py-8 rounded-[24px] md:rounded-[40px] bg-posy-bg/50 border border-posy-ink/5 hover:border-posy-purple/30 transition-all flex justify-between items-center group/date shadow-sm"
                    >
                      <span className="text-xl md:text-3xl font-serif text-posy-ink">
                        {new Date(entry.date + 'T12:00:00').toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                      </span>
                      <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-20 group-hover/date:opacity-100 group-hover/date:text-posy-purple transition-all">Open Reflection →</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Garden;
