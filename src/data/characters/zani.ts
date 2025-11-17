import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const zani: Character = {
  id: 'zani',
  name: 'zani',
  slug: 'zani',
  url: 'https://game8.co/games/Wuthering-Waves/archives/486248',
  rarity: 5,
  element: Element.Spectro,
  weapon: WeaponType.Gauntlet,
  materials: {
    ascension: {
      common: MaterialBaseName.POLYGON_CORE,
      boss: MaterialBaseName.PLATINUM_CORE,
      overworld: MaterialBaseName.SWORD_ACORUS,
    },
    forte: {
      common: MaterialBaseName.POLYGON_CORE,
      forgery: MaterialBaseName.CADENCE_SEED,
      boss: 'The Netherworld\'s Stare',
    },
  },
  image: '/characters/zani.png',
};
