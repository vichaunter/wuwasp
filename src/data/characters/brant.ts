import type { Character } from '@/types';

export const brant: Character = {
  id: 'brant',
  name: 'brant',
  slug: 'brant',
  url: 'https://game8.co/games/Wuthering-Waves/archives/486245',
  rarity: 5,
  element: 'Fusion',
  weapon: 'Sword',
  materials: {
    ascension: {
      common: 'Tidal Residuum',
      boss: 'Blazing Bone',
      overworld: 'Golden Fleece',
    },
    forte: {
      common: 'Tidal Residuum',
      forgery: 'Inert Metallic Drip',
      boss: 'The Netherworld\'s Stare',
    },
  },
  image: '/characters/brant.png',
};
