import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
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
      common: MaterialBaseName.WHISPERIN_CORE,
      boss: MaterialBaseName.TOPOLOGICAL_CONFINEMENT,
      overworld: MaterialBaseName.NOVA,
    },
    forte: {
      common: MaterialBaseName.WHISPERIN_CORE,
      forgery: MaterialBaseName.LENTO_HELIX,
      boss: 'Sentinel\'s Dagger',
    },
  },
  image: '/characters/shorekeeper.png',
};
