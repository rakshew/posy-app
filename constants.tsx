
import React from 'react';
import { MoodType } from './types';

// Enhanced contrast filter for all icons
const iconFilter = "drop-shadow(0 4px 6px rgba(45, 42, 38, 0.15))";

export const MOOD_CONFIG = {
  [MoodType.HAPPY]: { label: 'Happy', flower: 'Sunflower', color: '#fde2b2', 
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/sunflower.png" alt="Sunflower" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.GRATEFUL]: { label: 'Grateful', flower: 'Pink Rose', color: '#ffcad4',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/pink-rose.png" alt="Pink Rose" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.PEACEFUL]: { label: 'Peaceful', flower: 'Lotus', color: '#dcd3ff',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/lotus.png" alt="Lotus" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.JOYFUL]: { label: 'Joyful', flower: 'Yellow Daisy', color: '#fde2b2',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/yellow-daisy.png" alt="Yellow Daisy" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.LOVED]: { label: 'Loved', flower: 'Red Rose', color: '#ffcad4',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/red-rose.png" alt="Red Rose" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.HOPEFUL]: { label: 'Hopeful', flower: 'Cherry Blossom', color: '#ffcad4',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/cherry-blossom.png" alt="Cherry Blossom" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.CALM]: { label: 'Calm', flower: 'Jasmine', color: '#fefdfb',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/jasmine.png" alt="Jasmine" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.EXCITED]: { label: 'Excited', flower: 'Marigold', color: '#fde2b2',
    icon: (className: string) => (
      <div id="-marigold" className={`${className} flex items-center justify-center`}>
        <img 
          src="https://images2.imgbox.com/76/9c/C34lBDDc_o.png" 
          alt="Marigold" 
          className="w-full h-full object-contain"
          style={{ filter: iconFilter }}
        />
      </div>
    )
  },
  [MoodType.CONTENT]: { label: 'Content', flower: 'White Gerbera Daisy', color: '#fefdfb',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/white-gerbera-daisy.png" alt="White Gerbera Daisy" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.PROUD]: { label: 'Proud', flower: 'Yellow Rose', color: '#fde2b2',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/yellow-rose.png" alt="Yellow Rose" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.ENERGIZED]: { label: 'Energized', flower: 'Orange Lily', color: '#fde2b2',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/orange-lily.png" alt="Orange Lily" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.INSPIRED]: { label: 'Inspired', flower: 'Purple Tulip', color: '#dcd3ff',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/purple-tulip.png" alt="Purple Tulip" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.THOUGHTFUL]: { label: 'Thoughtful', flower: 'Purple Iris', color: '#dcd3ff',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/purple-iris.png" alt="Purple Iris" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.QUIET]: { label: 'Quiet', flower: 'Baby\'s Breath', color: '#fefdfb',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/babys-breath.png" alt="Baby's Breath" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.REFLECTIVE]: { label: 'Reflective', flower: 'White Chrysanthemum', color: '#fefdfb',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/white-chrysanthemum.png" alt="White Chrysanthemum" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.ANXIOUS]: { label: 'Anxious', flower: 'Lavender Stalk', color: '#dcd3ff',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/lavender-stalk.png" alt="Lavender Stalk" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.SAD]: { label: 'Sad', flower: 'Blue Hydrangea', color: '#d1e8e2',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/blue-hydrangea.png" alt="Blue Hydrangea" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.TIRED]: { label: 'Tired', flower: 'Red Mushroom', color: '#e57373',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/red-mushroom.png" alt="Red Mushroom" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.LONELY]: { label: 'Lonely', flower: 'Single White Rose', color: '#fefdfb',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/single-white-rose.png" alt="Single White Rose" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  },
  [MoodType.OVERWHELMED]: { label: 'Overwhelmed', flower: 'Cluster of Field Daisies', color: '#fefdfb',
    icon: (className: string) => (
      <div className={`${className} flex items-center justify-center`}>
        <img src="/images/cluster-field-daisies.png" alt="Cluster of Field Daisies" className="w-full h-full object-contain" style={{ filter: iconFilter }} />
      </div>
    )
  }
};
