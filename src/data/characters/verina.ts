import type { Character } from '@/types';

export const verina: Character = {
  id: 'verina',
  name: 'verina',
  slug: 'verina',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454229',
  rarity: 5,
  element: 'Spectro',
  weapon: 'Rectifier',
  materials: {
    ascension: {
      common: 'Howler Core',
      boss: 'Elegy Tacet Core',
      overworld: 'Belle Poppy',
    },
    forte: {
      common: 'Howler Core',
      forgery: 'Lento Helix',
      boss: 'Monument Bell',
    },
  },
  image: '/characters/verina.png',
};
