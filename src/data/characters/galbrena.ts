import type { Character } from '@/types';
import { Element, WeaponType } from '@/types';

export const galbrena: Character = {
  id: 'galbrena',
  name: 'galbrena',
  slug: 'galbrena',
  url: 'https://game8.co/games/Wuthering-Waves/archives/524888',
  rarity: 5,
  element: Element.Fusion,
  weapon: WeaponType.Pistol,
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
