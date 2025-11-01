import type { Character } from '@/types';
import { Element, WeaponType } from '@/types';

export const camellya: Character = {
  id: 'camellya',
  name: 'camellya',
  slug: 'camellya',
  url: 'https://game8.co/games/Wuthering-Waves/archives/473332',
  rarity: 5,
  element: Element.Havoc,
  weapon: WeaponType.Sword,
  materials: {
    ascension: {
      common: 'Whisperin Core',
      boss: 'Topological Confinement',
      overworld: 'Nova',
    },
    forte: {
      common: 'Whisperin Core',
      forgery: 'Inert Metallic Drip',
      boss: 'Dreamless Feather',
    },
  },
  image: '/characters/camellya.png',
};
