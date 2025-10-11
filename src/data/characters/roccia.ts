import type { Character } from '@/types';

export const roccia: Character = {
  id: 'roccia',
  name: 'roccia',
  slug: 'roccia',
  url: 'https://game8.co/games/Wuthering-Waves/archives/486246',
  rarity: 5,
  element: 'Spectro',
  weapon: 'Broadblade',
  materials: {
    ascension: {
      common: 'Tidal Residuum',
      boss: 'Cleansing Conch',
      overworld: 'Firecracker Jewelweed',
    },
    forte: {
      common: 'Tidal Residuum',
      forgery: 'Cadence Seed',
      boss: 'The Netherworld\'s Stare',
    },
  },
  image: '/characters/roccia.png',
};
