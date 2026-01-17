
import React from 'react';
import { MoodType } from './types';
import { 
  Sun, Heart, Wind, Flower, Sparkles, Cloud, Moon, Zap, 
  Lightbulb, Coffee, BookOpen, Anchor, CloudRain, 
  BatteryLow, Ghost, AlertCircle, Trees, Leaf, Smile, Star
} from 'lucide-react';

// Enhanced contrast filter for all icons
const iconFilter = "drop-shadow(0 8px 12px rgba(45, 42, 38, 0.15))";

interface MoodIconProps {
  className: string;
  color?: string;
}

/**
 * A wrapper to render Lucide icons with consistent botanical styling.
 */
const BotanicalIcon: React.FC<{ Icon: any, className: string, color: string }> = ({ Icon, className, color }) => {
  return (
    <div className={`${className} flex items-center justify-center p-1 md:p-2`} style={{ filter: iconFilter, color }}>
      <Icon className="w-full h-full" strokeWidth={1.5} />
    </div>
  );
};

export const MOOD_CONFIG = {
  [MoodType.HAPPY]: { 
    label: 'Happy', 
    flower: 'Sunflower', 
    color: '#fde2b2', 
    Icon: (props: MoodIconProps) => <BotanicalIcon Icon={Sun} color="#FFB800" {...props} />
  },
  [MoodType.GRATEFUL]: { 
    label: 'Grateful', 
    flower: 'Pink Rose', 
    color: '#ffcad4',
    Icon: (props: MoodIconProps) => <BotanicalIcon Icon={Heart} color="#E5989B" {...props} />
  },
  [MoodType.PEACEFUL]: { 
    label: 'Peaceful', 
    flower: 'Lotus', 
    color: '#dcd3ff',
    Icon: (props: MoodIconProps) => <BotanicalIcon Icon={Flower} color="#9B8ADE" {...props} />
  },
  [MoodType.JOYFUL]: { 
    label: 'Joyful', 
    flower: 'Yellow Daisy', 
    color: '#fde2b2',
    Icon: (props: MoodIconProps) => <BotanicalIcon Icon={Sparkles} color="#FBC02D" {...props} />
  },
  [MoodType.LOVED]: { 
    label: 'Loved', 
    flower: 'Red Rose', 
    color: '#ffcad4',
    Icon: (props: MoodIconProps) => <BotanicalIcon Icon={Heart} color="#D32F2F" {...props} />
  },
  [MoodType.HOPEFUL]: { 
    label: 'Hopeful', 
    flower: 'Cherry Blossom', 
    color: '#ffcad4',
    Icon: (props: MoodIconProps) => <BotanicalIcon Icon={Leaf} color="#F06292" {...props} />
  },
  [MoodType.CALM]: { 
    label: 'Calm', 
    flower: 'Jasmine', 
    color: '#fefdfb',
    Icon: (props: MoodIconProps) => <BotanicalIcon Icon={Wind} color="#90A4AE" {...props} />
  },
  [MoodType.EXCITED]: { 
    label: 'Excited', 
    flower: 'Marigold', 
    color: '#fde2b2',
    Icon: (props: MoodIconProps) => <BotanicalIcon Icon={Zap} color="#FF9800" {...props} />
  },
  [MoodType.CONTENT]: { 
    label: 'Content', 
    flower: 'White Daisy', 
    color: '#fefdfb',
    Icon: (props: MoodIconProps) => <BotanicalIcon Icon={Smile} color="#81C784" {...props} />
  },
  [MoodType.PROUD]: { 
    label: 'Proud', 
    flower: 'Yellow Rose', 
    color: '#fde2b2',
    Icon: (props: MoodIconProps) => <BotanicalIcon Icon={Star} color="#FBC02D" {...props} />
  },
  [MoodType.ENERGIZED]: { 
    label: 'Energized', 
    flower: 'Orange Lily', 
    color: '#fde2b2',
    Icon: (props: MoodIconProps) => <BotanicalIcon Icon={Zap} color="#FF5722" {...props} />
  },
  [MoodType.INSPIRED]: { 
    label: 'Inspired', 
    flower: 'Purple Tulip', 
    color: '#dcd3ff',
    Icon: (props: MoodIconProps) => <BotanicalIcon Icon={Lightbulb} color="#9C27B0" {...props} />
  },
  [MoodType.THOUGHTFUL]: { 
    label: 'Thoughtful', 
    flower: 'Purple Iris', 
    color: '#dcd3ff',
    Icon: (props: MoodIconProps) => <BotanicalIcon Icon={BookOpen} color="#5C6BC0" {...props} />
  },
  [MoodType.QUIET]: { 
    label: 'Quiet', 
    flower: 'Baby\'s Breath', 
    color: '#fefdfb',
    Icon: (props: MoodIconProps) => <BotanicalIcon Icon={Cloud} color="#BDBDBD" {...props} />
  },
  [MoodType.REFLECTIVE]: { 
    label: 'Reflective', 
    flower: 'Chrysanthemum', 
    color: '#fefdfb',
    Icon: (props: MoodIconProps) => <BotanicalIcon Icon={Moon} color="#455A64" {...props} />
  },
  [MoodType.ANXIOUS]: { 
    label: 'Anxious', 
    flower: 'Lavender', 
    color: '#dcd3ff',
    Icon: (props: MoodIconProps) => <BotanicalIcon Icon={Wind} color="#7E57C2" {...props} />
  },
  [MoodType.SAD]: { 
    label: 'Sad', 
    flower: 'Blue Hydrangea', 
    color: '#d1e8e2',
    Icon: (props: MoodIconProps) => <BotanicalIcon Icon={CloudRain} color="#42A5F5" {...props} />
  },
  [MoodType.TIRED]: { 
    label: 'Tired', 
    flower: 'Red Mushroom', 
    color: '#e57373',
    Icon: (props: MoodIconProps) => <BotanicalIcon Icon={BatteryLow} color="#EF5350" {...props} />
  },
  [MoodType.LONELY]: { 
    label: 'Lonely', 
    flower: 'White Rose', 
    color: '#fefdfb',
    Icon: (props: MoodIconProps) => <BotanicalIcon Icon={Ghost} color="#9E9E9E" {...props} />
  },
  [MoodType.OVERWHELMED]: { 
    label: 'Overwhelmed', 
    flower: 'Field Daisies', 
    color: '#fefdfb',
    Icon: (props: MoodIconProps) => <BotanicalIcon Icon={AlertCircle} color="#FF7043" {...props} />
  }
};
