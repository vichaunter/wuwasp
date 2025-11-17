import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const jiyan: Character = {
  id: 'jiyan',
  name: 'jiyan',
  slug: 'jiyan',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454216',
  rarity: 5,
  element: Element.Aero,
  weapon: WeaponType.Broadblade,
  materials: {
    ascension: {
      common: MaterialBaseName.HOWLER_CORE,
      boss: MaterialBaseName.ROARING_ROCK_FIST,
      overworld: MaterialBaseName.PECOK_FLOWER,
    },
    forte: {
      common: MaterialBaseName.HOWLER_CORE,
      forgery: MaterialBaseName.WAVEWORN_RESIDUE,
      boss: MaterialBaseName.MONUMENT_BELL,
    },
  },
  image: '/characters/jiyan.png',
};
