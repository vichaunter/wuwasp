import type { Character } from '@/types';
import { Element, WeaponType } from '@/types';

export const danjin: Character = {
  id: 'danjin',
  name: 'danjin',
  slug: 'danjin',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454227',
  rarity: 4,
  element: Element.Havoc,
  weapon: WeaponType.Sword,
  materials: {
    ascension: {
      common: 'Crude Ring',
      boss: 'Strife Tacet Core',
      overworld: 'Belle Poppy',
    },
    forte: {
      common: 'Crude Ring',
      forgery: 'Inert Metallic Drip',
      boss: 'Dreamless Feather',
    },
  },
  image: '/characters/danjin.png',
};
