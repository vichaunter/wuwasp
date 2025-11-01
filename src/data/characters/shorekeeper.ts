import type { Character } from '@/types';
import { Element, WeaponType } from '@/types';

export const shorekeeper: Character = {
  id: 'shorekeeper',
  name: 'shorekeeper',
  slug: 'shorekeeper',
  url: 'https://game8.co/games/Wuthering-Waves/archives/463667',
  rarity: 5,
  element: Element.Spectro,
  weapon: WeaponType.Rectifier,
  materials: {
    ascension: {
      common: 'Whisperin Core',
      boss: 'Topological Confinement',
      overworld: 'Nova',
    },
    forte: {
      common: 'Whisperin Core',
      forgery: 'Lento Helix',
      boss: 'Sentinel\'s Dagger',
    },
  },
  image: '/characters/shorekeeper.png',
};
