import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const aalto: Character = {
  id: 'aalto',
  name: 'aalto',
  slug: 'aalto',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454214',
  rarity: 4,
  element: Element.Aero,
  weapon: WeaponType.Pistol,
  materials: {
    ascension: {
      common: MaterialBaseName.HOWLER_CORE,
      boss: MaterialBaseName.ROARING_ROCK_FIST,
      overworld: MaterialBaseName.WINTRY_BELL,
    },
    forte: {
      common: MaterialBaseName.HOWLER_CORE,
      forgery: MaterialBaseName.IMPURE_PHLOGISTON,
      boss: MaterialBaseName.MONUMENT_BELL,
    },
  },
  image: '/characters/aalto.png',
};
