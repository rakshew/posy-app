
import React, { useState } from 'react';
import { MOOD_CONFIG } from '../constants';
import { MoodType, DayEntry } from '../types';

interface FloristViewProps {
  entries: DayEntry[];
}

const COMMUNITY_BOUQUETS = [
  { id: 1, name: "Eleanor's Garden", blooms: [MoodType.HAPPY, MoodType.PEACEFUL, MoodType.JOYFUL], message: "A week of quiet sun." },
  { id: 2, name: "Saffron Lane", blooms: [MoodType.REFLECTIVE, MoodType.QUIET, MoodType.THOUGHTFUL], message: "Listening to the winter rain." },
  { id: 3, name: "Wildwood Studio", blooms: [MoodType.ENERGIZED, MoodType.INSPIRED, MoodType.EXCITED], message: "A season of new ideas!" },
  { id: 4, name: "The Quiet Meadow", blooms: [MoodType.CALM, MoodType.PEACEFUL, MoodType.CONTENT], message: "Finding rest in the small things." }
];

const FloristView: React.FC<FloristViewProps> = ({ entries }) => {
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
  const [mixedBouquet, setMixedBouquet] = useState<DayEntry[] | null>(null);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentYear = new Date().getFullYear();

  const toggleMonth = (idx: number) => {
    if (selectedMonths.includes(idx)) {
      setSelectedMonths(selectedMonths.filter(m => m !== idx));
    } else {
      setSelectedMonths([...selectedMonths, idx]);
    }
  };

  const generateMix = () => {
    const mixed = entries.filter(e => {
      const d = new Date(e.date + 'T12:00:00');
      return selectedMonths.includes(d.getMonth()) && d.getFullYear() === currentYear;
    });
    setMixedBouquet(mixed.length > 0 ? mixed : null);
    if (mixed.length === 0) alert("No blooms found in those months to mix!");
  };

  return (
    <div className="py-6 md:py-20 space-y-12 md:space-y-40 float-up animate-in fade-in duration-700">
      {/* Header */}
      <div className="text-center space-y-4 md:space-y-10 px-6">
        <p className="text-[9px] md:text-[12px] font-black text-posy-purple/60 uppercase tracking-[0.5em] md:tracking-[0.8em]">THE VILLAGE FLORIST</p>
        <h2 className="text-4xl md:text-9xl font-serif text-posy-ink tracking-tighter leading-none">
          Shared <span className="italic opacity-50 text-posy-purple">Sanctuaries</span>
        </h2>
        <p className="max-w-2xl mx-auto text-posy-ink/40 font-serif text-lg md:text-2xl italic leading-relaxed">
          "A garden is meant to be shared. Here, we admire the quiet growth of neighbors."
        </p>
      </div>

      {/* Seasonal Mixer Section */}
      <section className="bg-white rounded-[32px] md:rounded-[80px] p-6 md:p-24 shadow-2xl border border-posy-purple/5 space-y-8 md:space-y-20">
        <div className="text-center space-y-2">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-posy-purple">Custom Arrangement</p>
          <h3 className="text-3xl md:text-6xl font-serif text-posy-ink leading-tight">Generate a <span className="italic text-posy-purple opacity-60">Seasonal Mix</span></h3>
          <p className="text-posy-ink/30 font-serif italic text-base md:text-lg">Select months to mix your heart's evolution.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {months.map((m, i) => (
              <button
                key={m}
                onClick={() => toggleMonth(i)}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-full border-2 text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all
                  ${selectedMonths.includes(i) 
                    ? 'bg-posy-purple border-posy-purple text-white shadow-lg scale-105' 
                    : 'bg-white border-posy-purple/10 text-posy-ink/40 hover:border-posy-purple/40'}
                `}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <button 
              onClick={generateMix}
              className="px-8 py-4 md:px-12 md:py-5 bg-posy-ink text-white rounded-full font-black uppercase tracking-[0.4em] text-[9px] md:text-[10px] shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Generate Mix →
            </button>
          </div>
        </div>

        {mixedBouquet && (
          <div className="animate-in fade-in zoom-in-95 duration-700 relative aspect-video w-full max-w-5xl mx-auto bg-posy-bg/50 rounded-[32px] md:rounded-[64px] border-2 md:border-4 border-white shadow-inner flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
             <div className="relative flex flex-wrap justify-center gap-1 md:gap-2 p-4 md:p-12">
               {mixedBouquet.slice(0, 30).map((entry, idx) => (
                 <div key={idx} className="w-10 h-10 md:w-32 md:h-32 sway" style={{ animationDelay: `${idx * 0.1}s` }}>
                   {MOOD_CONFIG[entry.mood].icon("w-full h-full")}
                 </div>
               ))}
             </div>
             <div className="absolute bottom-4 bg-white/90 backdrop-blur-md px-6 py-2 md:px-10 md:py-4 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] shadow-lg whitespace-nowrap">
                Seasonal Composition ({selectedMonths.length} Months)
             </div>
          </div>
        )}
      </section>

      {/* Community Gallery */}
      <div className="space-y-8 md:space-y-20">
        <div className="px-6 space-y-1">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-posy-purple/60">Community Collection</p>
          <h3 className="text-2xl md:text-5xl font-serif text-posy-ink">Global <span className="italic opacity-40">Monthly Bouquets</span></h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 px-2 md:px-0">
          {COMMUNITY_BOUQUETS.map((garden) => (
            <div key={garden.id} className="bg-white rounded-[24px] md:rounded-[48px] p-6 md:p-12 shadow-xl border border-posy-purple/5 hover:border-posy-purple/20 transition-all group">
              <div className="flex flex-col gap-6">
                {/* Visual Cluster */}
                <div className="flex -space-x-4 md:-space-x-12 hover:space-x-1 transition-all duration-500 py-4 md:py-6 px-4 justify-center bg-posy-bg/30 rounded-[24px] md:rounded-[40px] shadow-inner">
                  {garden.blooms.map((mood, idx) => (
                    <div key={idx} className="w-12 h-12 md:w-32 md:h-32 drop-shadow-lg sway" style={{ animationDelay: `${idx * 0.3}s` }}>
                      {MOOD_CONFIG[mood].icon("w-full h-full")}
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 text-center">
                  <div className="space-y-1">
                    <p className="text-[7px] md:text-[8px] font-black uppercase text-posy-purple/40 tracking-[0.3em] md:tracking-[0.4em]">VILLAGE GARDEN</p>
                    <h3 className="text-2xl md:text-4xl font-serif text-posy-ink break-words leading-tight">{garden.name}</h3>
                  </div>
                  <p className="text-posy-ink/60 font-serif italic text-base md:text-lg leading-snug px-4">"{garden.message}"</p>
                  <div className="flex gap-4 justify-center pt-1 md:pt-2">
                    <button className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-posy-ink/30 hover:text-posy-purple transition-colors">Gift Seed</button>
                    <button className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-posy-ink/30 hover:text-posy-purple transition-colors">View Garden</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future Ideation Section */}
      <section className="bg-posy-paper rounded-[32px] md:rounded-[80px] p-8 md:p-32 border-2 border-posy-purple/10 text-center space-y-10 md:space-y-24 shadow-sm">
        <div className="space-y-4">
          <h3 className="text-3xl md:text-8xl font-serif text-posy-ink tracking-tighter leading-tight">A Blooming <br/><span className="italic text-posy-purple opacity-40">Connection</span></h3>
          <p className="text-posy-purple font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-[8px] md:text-xs">COMING SOON TO THE VILLAGE</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12 text-left max-w-6xl mx-auto">
          <div className="space-y-4 p-6 md:p-12 rounded-[24px] md:rounded-[40px] bg-white border border-posy-purple/5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-posy-yellow/20 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🏡</div>
            <h4 className="text-xl md:text-3xl font-serif text-posy-ink">Local Florists</h4>
            <p className="text-base text-posy-ink/50 font-serif italic leading-relaxed">Connect with friends to see their seasonal gardens in real-time.</p>
          </div>
          <div className="space-y-4 p-6 md:p-12 rounded-[24px] md:rounded-[40px] bg-white border border-posy-purple/5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-posy-salmon/20 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🎁</div>
            <h4 className="text-xl md:text-3xl font-serif text-posy-ink">Gift a Bouquet</h4>
            <p className="text-base text-posy-ink/50 font-serif italic leading-relaxed">Send collections of moments to someone needing sunshine.</p>
          </div>
          <div className="space-y-4 p-6 md:p-12 rounded-[24px] md:rounded-[40px] bg-white border border-posy-purple/5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-posy-mint/20 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🌱</div>
            <h4 className="text-xl md:text-3xl font-serif text-posy-ink">Seed Trading</h4>
            <p className="text-base text-posy-ink/50 font-serif italic leading-relaxed">Exchange rare mood-seeds with the community to grow new varieties.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FloristView;
