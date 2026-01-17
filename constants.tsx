
import React from 'react';
import { MoodType } from './types';

// Enhanced contrast filter for all icons
const iconFilter = "drop-shadow(0 8px 12px rgba(45, 42, 38, 0.15))";

export const MOOD_CONFIG = {
  [MoodType.HAPPY]: { 
    label: 'Happy', 
    flower: 'Sunflower', 
    color: '#fde2b2', 
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/flowers/sunflower.png" alt="Sunflower" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.GRATEFUL]: { 
    label: 'Grateful', 
    flower: 'Pink Rose', 
    color: '#ffcad4',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/flowers/pink-rose.png" alt="Pink Rose" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.PEACEFUL]: { 
    label: 'Peaceful', 
    flower: 'Lotus', 
    color: '#dcd3ff',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/flowers/lotus.png" alt="Lotus" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.JOYFUL]: { 
    label: 'Joyful', 
    flower: 'Yellow Daisy', 
    color: '#fde2b2',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/flowers/yellow-daisy.png" alt="Yellow Daisy" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.LOVED]: { 
    label: 'Loved', 
    flower: 'Red Rose', 
    color: '#ffcad4',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/flowers/red-rose.png" alt="Red Rose" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.HOPEFUL]: { 
    label: 'Hopeful', 
    flower: 'Cherry Blossom', 
    color: '#ffcad4',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/flowers/cherry-blossom.png" alt="Cherry Blossom" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.CALM]: { 
    label: 'Calm', 
    flower: 'Jasmine', 
    color: '#fefdfb',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/flowers/jasmine.png" alt="Jasmine" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.EXCITED]: { 
    label: 'Excited', 
    flower: 'Marigold', 
    color: '#fde2b2',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/flowers/marigold.png" alt="Marigold" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.CONTENT]: { 
    label: 'Content', 
    flower: 'White Daisy', 
    color: '#fefdfb',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/flowers/white-daisy.png" alt="White Daisy" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.PROUD]: { 
    label: 'Proud', 
    flower: 'Yellow Rose', 
    color: '#fde2b2',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/flowers/yellow-rose.png" alt="Yellow Rose" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.ENERGIZED]: { 
    label: 'Energized', 
    flower: 'Orange Lily', 
    color: '#fde2b2',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/flowers/orange-lily.png" alt="Orange Lily" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.INSPIRED]: { 
    label: 'Inspired', 
    flower: 'Purple Tulip', 
    color: '#dcd3ff',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/flowers/purple-tulip.png" alt="Purple Tulip" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.THOUGHTFUL]: { 
    label: 'Thoughtful', 
    flower: 'Purple Iris', 
    color: '#dcd3ff',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/flowers/purple-iris.png" alt="Purple Iris" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.QUIET]: { 
    label: 'Quiet', 
    flower: 'Baby\'s Breath', 
    color: '#fefdfb',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/flowers/babys-breath.png" alt="Baby's Breath" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.REFLECTIVE]: { 
    label: 'Reflective', 
    flower: 'Chrysanthemum', 
    color: '#fefdfb',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/flowers/white-chrysanthemum.png" alt="Chrysanthemum" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.ANXIOUS]: { 
    label: 'Anxious', 
    flower: 'Lavender', 
    color: '#dcd3ff',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/flowers/lavender-stalk.png" alt="Lavender" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.SAD]: { 
    label: 'Sad', 
    flower: 'Blue Hydrangea', 
    color: '#d1e8e2',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/flowers/blue-hydrangea.png" alt="Blue Hydrangea" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.TIRED]: { 
    label: 'Tired', 
    flower: 'Red Mushroom', 
    color: '#e57373',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/flowers/red-mushroom.png" alt="Red Mushroom" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.LONELY]: { 
    label: 'Lonely', 
    flower: 'White Rose', 
    color: '#fefdfb',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/flowers/single-white-rose.png" alt="White Rose" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.OVERWHELMED]: { 
    label: 'Overwhelmed', 
    flower: 'Field Daisies', 
    color: '#fefdfb',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/flowers/cluster-field-daisies.png" alt="Field Daisies" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  }
};
