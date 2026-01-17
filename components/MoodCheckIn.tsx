
import React, { useState, useRef, useMemo } from 'react';
import { MoodType, DayEntry, UserSettings, UserGoal } from '../types';
import { MOOD_CONFIG } from '../constants';
import { getAffirmation } from '../geminiService';

interface MoodCheckInProps {
  onSave: (entry: DayEntry) => void;
  onCancel: () => void;
  targetDate?: Date;
  userSettings: UserSettings;
  onUpdateSettings?: (settings: UserSettings) => void;
}

const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const SUGGESTED_ICONS = ['✨', '📖', '🧘', '🍵', '🛌', '🚶', '✍️', '🎹', '🎨', '🧼', '🌱', '🍎'];

const MoodCheckIn: React.FC<MoodCheckInProps> = ({ onSave, onCancel, targetDate, userSettings, onUpdateSettings }) => {
  const [step, setStep] = useState<'emotion' | 'writing' | 'planting'>('emotion');
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState('');
  const [media, setMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | undefined>();
  const [affirmation, setAffirmation] = useState<string | null>(null);
  const [activeGoals, setActiveGoals] = useState<Record<string, boolean>>({});
  
  // Custom Ritual Modal state
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoalLabel, setNewGoalLabel] = useState('');
  const [newGoalIcon, setNewGoalIcon] = useState('✨');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const moodList = Object.keys(MOOD_CONFIG) as MoodType[];

  // Memoize enabled goals
  const enabledGoals = useMemo(() => {
    return userSettings.goals.filter(g => g.enabled);
  }, [userSettings.goals]);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    setStep('writing');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith('video/');
      setMediaType(isVideo ? 'video' : 'image');
      const reader = new FileReader();
      reader.onloadend = () => {
        setMedia(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleGoal = (id: string) => {
    setActiveGoals(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddGoal = () => {
    if (newGoalLabel.trim() && onUpdateSettings) {
      const id = 'custom-' + Date.now();
      const newGoal: UserGoal = {
        id,
        label: newGoalLabel.trim(),
        enabled: true,
        icon: newGoalIcon
      };
      onUpdateSettings({ 
        ...userSettings, 
        goals: [...userSettings.goals, newGoal] 
      });
      setActiveGoals(prev => ({ ...prev, [id]: true }));
      setIsAddingGoal(false);
      setNewGoalLabel('');
      setNewGoalIcon('✨');
    }
  };

  const handlePlant = async () => {
    if (!selectedMood) return;
    setStep('planting');
    const genAffirmation = await getAffirmation(selectedMood, note);
    setAffirmation(genAffirmation);
  };

  const handleFinish = () => {
    if (!selectedMood || !affirmation) return;
    const finalDate = targetDate || new Date();
    onSave({
      date: toDateKey(finalDate),
      mood: selectedMood,
      note,
      affirmation,
      media: media || undefined,
      mediaType,
      goals: activeGoals
    });
  };

  if (step === 'planting') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6 md:px-12 float-up duration-200">
        <div className="relative mb-4 md:mb-6 group">
           <div className={`w-32 h-32 md:w-64 md:h-64 mx-auto relative transition-all duration-300 ${affirmation ? 'scale-100' : 'bloom'}`}>
              <div className="absolute inset-0 bg-posy-purple/10 rounded-full blur-3xl scale-150 animate-pulse"></div>
              {MOOD_CONFIG[selectedMood!].icon("w-full h-full drop-shadow-2xl sway")}
           </div>
           
           <div className="mt-4 md:mt-6 space-y-1 md:space-y-2">
             <h2 className="text-2xl md:text-4xl font-serif text-posy-ink tracking-tight font-light">
               {affirmation ? "The Garden Whispers" : "Placing in soil..."}
             </h2>
             {!affirmation && <p className="text-sm md:text-lg font-sans italic text-posy-ink/40">"Nurturing your moment..."</p>}
           </div>
        </div>
        
        {affirmation && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-4 md:space-y-8 flex flex-col items-center">
            <p className="text-lg md:text-2xl font-serif text-posy-purple max-w-xl leading-relaxed px-4 md:px-8 italic font-light">
              "{affirmation}"
            </p>
            <button
              onClick={handleFinish}
              className="px-8 md:px-14 py-3 md:py-5 rounded-full bg-posy-purple text-white font-black tracking-[0.4em] uppercase text-[9px] md:text-[10px] shadow-lg hover:bg-posy-ink transition-all transform hover:scale-[1.05] active:scale-95"
            >
              Continue to Garden
            </button>
          </div>
        )}
      </div>
    );
  }

  if (step === 'writing') {
    const config = MOOD_CONFIG[selectedMood!];

    return (
      <div className="py-2 md:py-6 max-w-2xl mx-auto space-y-6 md:space-y-10 float-up px-4 md:px-6 duration-200">
        <div className="flex flex-col items-center relative">
           <button 
             onClick={() => setStep('emotion')}
             className="md:absolute left-0 top-1/2 md:-translate-y-1/2 text-[8px] md:text-[10px] font-medium uppercase tracking-[0.2em] md:tracking-[0.3em] text-posy-ink/30 hover:text-posy-purple transition-colors flex items-center gap-2 mb-3 md:mb-0"
           >
             ← Change Emotion
           </button>
           <div className="w-16 h-16 md:w-32 md:h-32 mb-2 md:mb-4 sway">
              {config.icon("w-full h-full drop-shadow-lg")}
           </div>
           <div className="text-center space-y-0.5 md:space-y-1">
             <h2 className="text-xl md:text-5xl font-serif text-posy-ink leading-tight font-light italic">Your {config.flower}</h2>
             <p className="text-[7px] md:text-[10px] uppercase font-bold tracking-[0.3em] md:tracking-[0.4em] text-posy-purple/40">{config.label}</p>
           </div>
        </div>

        <div className="space-y-6 md:space-y-10">
          <div className="space-y-4">
            <textarea
              autoFocus
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Reflect on your day..."
              className="w-full h-24 md:h-40 bg-white rounded-[16px] md:rounded-[32px] p-4 md:p-8 focus:ring-8 focus:ring-posy-purple/5 outline-none resize-none text-base md:text-xl font-sans italic font-light border border-posy-purple/5 shadow-sm"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <p className="text-[8px] md:text-[10px] font-medium uppercase tracking-[0.3em] md:tracking-[0.4em] text-posy-ink/20">Daily Nurture</p>
              {onUpdateSettings && (
                <button 
                  onClick={() => setIsAddingGoal(true)}
                  className="text-[7px] md:text-[9px] font-bold uppercase tracking-widest text-posy-purple hover:opacity-60 transition-opacity"
                >
                  + Add Option
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
              {enabledGoals.length > 0 ? enabledGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`flex items-center gap-2 md:gap-4 p-3 md:p-5 rounded-[12px] md:rounded-[20px] border transition-all text-left
                    ${activeGoals[goal.id] 
                      ? 'bg-posy-purple/10 border-posy-purple/20 shadow-inner scale-[0.98]' 
                      : 'bg-white border-posy-purple/5 hover:border-posy-purple/10 shadow-sm'}
                  `}
                >
                  <span className="text-base md:text-xl">{goal.icon}</span>
                  <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${activeGoals[goal.id] ? 'text-posy-purple' : 'text-posy-ink/40'}`}>
                    {goal.label}
                  </span>
                </button>
              )) : (
                <div className="col-span-full py-4 text-center border-2 border-dashed border-posy-purple/10 rounded-[16px]">
                  <p className="text-[8px] font-medium uppercase tracking-widest text-posy-ink/20">No tools enabled.</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*,video/*" className="hidden" />
            
            {media ? (
              <div className="relative rounded-[16px] md:rounded-[32px] overflow-hidden border-2 md:border-4 border-white shadow-xl aspect-video bg-posy-bg">
                {mediaType === 'video' ? (
                  <video src={media} className="w-full h-full object-cover" controls />
                ) : (
                  <img src={media} className="w-full h-full object-cover" />
                )}
                <button onClick={() => setMedia(null)} className="absolute top-2 right-2 md:top-4 md:right-4 bg-posy-ink/60 text-white p-2 rounded-full backdrop-blur-md">
                  <svg className="w-3 h-3 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 md:py-6 rounded-[16px] md:rounded-[32px] border-2 border-dashed border-posy-purple/10 text-posy-purple/40 hover:border-posy-purple/30 hover:text-posy-purple transition-all flex items-center justify-center gap-2 group"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">📸</span>
                <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest">Attach Memory</span>
              </button>
            )}

            <button
              onClick={handlePlant}
              className="w-full py-4 md:py-6 rounded-full bg-posy-purple text-white font-black tracking-[0.4em] uppercase text-[9px] md:text-[11px] shadow-md mt-1 md:mt-4 hover:bg-posy-ink transition-all"
            >
              Bloom Moment
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="py-2 md:py-8 space-y-4 md:space-y-10 float-up px-3 md:px-6 max-w-6xl mx-auto duration-200">
      <div className="text-center space-y-1 md:space-y-3">
        <h2 className="text-xl md:text-5xl font-serif text-posy-ink tracking-tight font-light leading-tight">
          {targetDate ? `Planting for ${targetDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}` : "How are you blooming?"}
        </h2>
        <p className="text-[7px] md:text-[10px] font-medium text-posy-ink/20 uppercase tracking-[0.4em] md:tracking-[0.5em]">Pick your heart's flower</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6">
        {moodList.map((mood) => {
          const config = MOOD_CONFIG[mood];
          return (
            <button
              key={mood}
              onClick={() => handleMoodSelect(mood)}
              className="flex flex-col items-center p-3 md:p-6 rounded-[16px] md:rounded-[32px] bg-white border border-posy-purple/5 hover:border-posy-purple/20 transition-all duration-300 hover:scale-105 active:scale-95 group shadow-sm hover:shadow-xl relative overflow-hidden"
            >
              <div className="w-8 h-8 md:w-16 md:h-16 mb-2 md:mb-4 transition-transform group-hover:scale-110">
                {config.icon("w-full h-full")}
              </div>
              <div className="text-center space-y-0.5">
                <span className="text-[7px] md:text-[9px] uppercase font-bold tracking-[0.1em] md:tracking-[0.2em] text-posy-ink/30 group-hover:text-posy-purple block transition-colors">
                  {config.label}
                </span>
                <span className="text-[10px] md:text-sm font-serif italic text-posy-ink/20 group-hover:text-posy-ink/60 block transition-all">
                  {config.flower}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="text-center py-2 md:py-4">
        <button onClick={onCancel} className="text-[8px] md:text-[10px] font-medium uppercase text-posy-ink/20 tracking-[0.4em] hover:text-posy-ink transition-colors">Discard Seed</button>
      </div>
    </div>
  );
};

export default MoodCheckIn;
