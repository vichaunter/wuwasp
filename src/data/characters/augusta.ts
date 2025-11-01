import type { Character } from '@/types';
import { Element, WeaponType } from '@/types';

export const augusta: Character = {
  id: 'augusta',
  name: 'augusta',
  slug: 'augusta',
  url: 'https://game8.co/games/Wuthering-Waves/archives/524890',
  rarity: 5,
  element: Element.Electro,
  weapon: WeaponType.Broadblade,
  materials: {
    ascension: {
      common: 'Tidal Residuum',
      boss: 'Blighted Crown of Puppet King',
      overworld: 'Luminous Calendula',
    },
    forte: {
      common: 'Tidal Residuum',
      forgery: 'Waveworn Residue',
      boss: 'When Irises Bloom',
    },
  },
  image: '/characters/augusta.png',
};
