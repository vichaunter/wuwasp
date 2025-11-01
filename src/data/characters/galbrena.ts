import type { Character } from '@/types';

export const galbrena: Character = {
  id: 'galbrena',
  name: 'galbrena',
  slug: 'galbrena',
  url: 'https://game8.co/games/Wuthering-Waves/archives/524888',
  rarity: 5,
  element: 'Fusion',
  weapon: 'Pistols',
  materials: {
    ascension: {
      common: 'Tidal Residuum',
      boss: 'Blighted Crown of Puppet King',
      overworld: 'Stone Rose',
    },
    forte: {
      common: 'Tidal Residuum',
      forgery: 'Impure Phlogiston',
      boss: 'Curse of the Abyss',
    },
  },
  image: '/characters/galbrena.png',
};
