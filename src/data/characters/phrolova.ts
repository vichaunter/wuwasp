import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const phrolova: Character = {
  id: 'phrolova',
  name: 'phrolova',
  slug: 'phrolova',
  url: 'https://game8.co/games/Wuthering-Waves/archives/524877',
  rarity: 5,
  element: Element.Havoc,
  weapon: WeaponType.Rectifier,
  materials: {
    ascension: {
      common: MaterialBaseName.POLYGON_CORE,
      boss: MaterialBaseName.TRUTH_IN_LIES,
      overworld: MaterialBaseName.AFTERLIFE,
    },
    forte: {
      common: MaterialBaseName.POLYGON_CORE,
      forgery: MaterialBaseName.LENTO_HELIX,
      boss: 'The Netherworld\'s Stare',
    },
  },
  image: '/characters/phrolova.png',
};
