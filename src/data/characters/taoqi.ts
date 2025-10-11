import type { Character } from '@/types';

export const taoqi: Character = {
  id: 'taoqi',
  name: 'taoqi',
  slug: 'taoqi',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454226',
  rarity: 4,
  element: 'Spectro',
  weapon: 'Broadblade',
  materials: {
    ascension: {
      common: 'Howler Core',
      boss: 'Gold-Dissolving Feather',
      overworld: 'Iris',
    },
    forte: {
      common: 'Howler Core',
      forgery: 'Waveworn Residue',
      boss: 'Dreamless Feather',
    },
  },
  image: '/characters/taoqi.png',
};
