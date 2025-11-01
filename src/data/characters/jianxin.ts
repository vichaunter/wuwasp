import type { Character } from '@/types';
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
      common: 'Whisperin Core',
      boss: 'Roaring Rock Fist',
      overworld: 'Lanternberry',
    },
    forte: {
      common: 'Whisperin Core',
      forgery: 'Cadence Seed',
      boss: 'Unending Destruction',
    },
  },
  image: '/characters/jianxin.png',
};
