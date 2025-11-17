import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const youhu: Character = {
  id: 'youhu',
  name: 'youhu',
  slug: 'youhu',
  url: 'https://game8.co/games/Wuthering-Waves/archives/463668',
  rarity: 4,
  element: Element.Glacio,
  weapon: WeaponType.Gauntlet,
  materials: {
    ascension: {
      common: MaterialBaseName.RING,
      boss: MaterialBaseName.TOPOLOGICAL_CONFINEMENT,
      overworld: MaterialBaseName.VIOLET_CORAL,
    },
    forte: {
      common: MaterialBaseName.RING,
      forgery: MaterialBaseName.CADENCE_SEED,
      boss: MaterialBaseName.MONUMENT_BELL,
    },
  },
  image: '/characters/youhu.png',
};
