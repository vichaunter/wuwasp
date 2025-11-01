import type { Character } from '@/types';
import { Element, WeaponType } from '@/types';

export const lupa: Character = {
  id: 'lupa',
  name: 'lupa',
  slug: 'lupa',
  url: 'https://game8.co/games/Wuthering-Waves/archives/520661',
  rarity: 5,
  element: Element.Fusion,
  weapon: WeaponType.Broadblade,
  materials: {
    ascension: {
      common: 'Howler Core',
      boss: 'Unfading Glory',
      overworld: 'Bloodleaf Viburnum',
    },
    forte: {
      common: 'Howler Core',
      forgery: 'Waveworn Residue',
      boss: 'The Netherworld\'s Stare',
    },
  },
  image: '/characters/lupa.png',
};
