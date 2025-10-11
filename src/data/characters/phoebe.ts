import type { Character } from '@/types';

export const phoebe: Character = {
  id: 'phoebe',
  name: 'phoebe',
  slug: 'phoebe',
  url: 'https://game8.co/games/Wuthering-Waves/archives/486244',
  rarity: 5,
  element: 'Spectro',
  weapon: 'Broadblade',
  materials: {
    ascension: {
      common: 'Whisperin Core',
      boss: 'Cleansing Conch',
      overworld: 'Firecracker Jewelweed',
    },
    forte: {
      common: 'Whisperin Core',
      forgery: 'Lento Helix',
      boss: 'Sentinel\'s Dagger',
    },
  },
  image: '/characters/phoebe.png',
};
