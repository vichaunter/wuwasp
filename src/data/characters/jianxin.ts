import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const jianxin: Character = {
  id: 'jianxin',
  name: 'jianxin',
  slug: 'jianxin',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454213',
  rarity: 5,
  element: Element.Aero,
  weapon: WeaponType.Gauntlet,
  materials: {
    ascension: {
      common: MaterialBaseName.WHISPERIN_CORE,
      boss: MaterialBaseName.ROARING_ROCK_FIST,
      overworld: MaterialBaseName.LANTERNBERRY,
    },
    forte: {
      common: MaterialBaseName.WHISPERIN_CORE,
      forgery: MaterialBaseName.CADENCE_SEED,
      boss: MaterialBaseName.UNENDING_DESTRUCTION,
    },
  },
  image: '/characters/jianxin.png',
};
