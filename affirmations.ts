
import { MoodType } from "./types";

/**
 * A collection of poetic, botanical reflections for each mood.
 * Each mood has 3 distinct options to provide variety and depth.
 */
const AFFIRMATION_LIBRARY: Record<MoodType, string[]> = {
  [MoodType.HAPPY]: [
    "May this sunlight stay with you throughout the coming days.",
    "Your joy is like a wildflower meadow, vibrant and full of uncontained light.",
    "Bask in the warmth; you have earned this golden hour in the garden."
  ],
  [MoodType.GRATEFUL]: [
    "Gratitude is the soil where the heart's most beautiful petals begin their journey.",
    "You are a collector of light, turning every small kindness into a new leaf.",
    "Thankfulness is the dew that keeps the spirit fresh even in the heat of midday."
  ],
  [MoodType.PEACEFUL]: [
    "The stillness within you is a deep pond where the world's noise cannot reach.",
    "You carry the quiet of the morning mist; soft, steady, and perfectly at ease.",
    "Peace is the garden bench where your soul can finally sit and breathe."
  ],
  [MoodType.JOYFUL]: [
    "Your laughter ripples through the leaves like a sudden, warm summer breeze.",
    "Joy is the bright nectar that calls the butterflies to your heart's center.",
    "Every spark of delight is a seed of wonder planted deep in your spirit."
  ],
  [MoodType.LOVED]: [
    "You are wrapped in the soft ivy of belonging, held firmly by those who care.",
    "Love is the trellis that supports your growth, even when the vines get heavy.",
    "You are a cherished blossom in a vast garden, never alone in your blooming."
  ],
  [MoodType.HOPEFUL]: [
    "Hope is the first sprout breaking through the frost, certain of the coming sun.",
    "You are looking toward the horizon where the sky begins to blush with dawn.",
    "Even the smallest seed carries the blueprint of a mighty tree within its shell."
  ],
  [MoodType.CALM]: [
    "Be like the moss: soft, resilient, and thriving in the quiet, shaded places.",
    "Your breath is the slow rhythm of the forest, steady and deeply grounded.",
    "The storm has passed, and the earth is drinking in the quiet that remains."
  ],
  [MoodType.EXCITED]: [
    "Expectation is a budding rose, tight with potential and ready to burst open.",
    "Your energy is a vibrant pollination, stirring the garden into a beautiful dance.",
    "The air hums with the promise of what is currently unfolding for you."
  ],
  [MoodType.CONTENT]: [
    "There is a quiet dignity in simply being exactly where you are supposed to be.",
    "You are a garden at dusk: satisfied, settled, and at home in your own skin.",
    "Enough is a beautiful word, and today you have found its secret resting place."
  ],
  [MoodType.PROUD]: [
    "Stand tall like the sunflower, reaching for the heights you have rightfully attained.",
    "Your accomplishments are the harvest of a season spent working the soil with love.",
    "Notice how far you have climbed; the view from here is truly magnificent."
  ],
  [MoodType.ENERGIZED]: [
    "Your spirit is a rushing stream, clear and powerful, carving paths through the stone.",
    "The sun has kissed your leaves, and you are vibrating with the life force of noon.",
    "Move with the wind; you are nimble, strong, and ready for the meadow's call."
  ],
  [MoodType.INSPIRED]: [
    "Ideas are falling like rain, soaking into the thirsty roots of your imagination.",
    "You are a garden in full bloom, each color a new thought waiting to be shared.",
    "The muse is a hummingbird, darting through your dreams with brilliant, iridescent wings."
  ],
  [MoodType.THOUGHTFUL]: [
    "Wisdom grows in the shadows between the trees, where the light is dappled and slow.",
    "You are weaving a tapestry of understanding from the threads of today's observations.",
    "To think deeply is to let your roots explore the hidden secrets of the earth."
  ],
  [MoodType.QUIET]: [
    "Silence is the gardener’s best friend, allowing the true growth to be heard.",
    "You are a closed bud, safe in your own company, waiting for the right moment.",
    "The most profound changes often happen in the hushed intervals between the storms."
  ],
  [MoodType.REFLECTIVE]: [
    "Your mind is a mirror-lake, showing you the sky and the trees in perfect clarity.",
    "Look back with kindness; every fallen leaf served its purpose in your story.",
    "The past is the compost that feeds the brilliant colors of your future self."
  ],
  [MoodType.ANXIOUS]: [
    "Deep roots hold steady even when the wind blows through the heavy leaves.",
    "Anxiety is a fog; it may hide the path, but the ground beneath you is solid.",
    "Breathe in the scent of damp earth; you are anchored, safe, and held."
  ],
  [MoodType.SAD]: [
    "Every garden needs rain to truly bloom in the spring. Let the water fall.",
    "Sadness is a winter season; the life is still there, resting deep underground.",
    "Your tears are a gentle washing, clearing the dust so you can see clearly again."
  ],
  [MoodType.TIRED]: [
    "Rest is just as productive as growth. Sleep well among the soft, cool moss.",
    "The sun has set on today's labor; surrender your weight to the waiting earth.",
    "You are a flower folding its petals for the night, preparing for tomorrow's light."
  ],
  [MoodType.LONELY]: [
    "Even the lone pine on the cliff is connected to the forest through its deep roots.",
    "In the silence, listen to the heartbeat of the earth; you are a part of everything.",
    "The moon watches over you tonight, a silver lantern in the garden's solitude."
  ],
  [MoodType.OVERWHELMED]: [
    "You do not have to bloom all at once. One petal, one breath, one moment at a time.",
    "When the garden feels too wild, focus on the single leaf right in front of you.",
    "The trellis is strong enough to hold you; lean back and let go of the weight."
  ]
};

/**
 * Fetches a poetic botanical reflection based on the user's mood.
 * Picks randomly from 3 options to ensure variety.
 */
export async function getAffirmation(mood: MoodType, note: string): Promise<string> {
  const options = AFFIRMATION_LIBRARY[mood] || [
    "Your heart has grown beautifully this season. Every moment is a gift.",
    "Growth is quiet, steady, and entirely your own.",
    "May your inner garden find the nourishment it needs today."
  ];

  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
