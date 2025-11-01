import type { Character } from '@/types';
import { Element, WeaponType } from '@/types';

export const yuanwu: Character = {
  id: 'yuanwu',
  name: 'yuanwu',
  slug: 'yuanwu',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454219',
  rarity: 4,
  element: Element.Electro,
  weapon: WeaponType.Gauntlet,
  materials: {
    ascension: {
      common: 'Crude Ring',
      boss: 'Hidden Thunder Tacet Core',
      overworld: 'Terraspawn Fungus',
    },
    forte: {
      common: 'Crude Ring',
      forgery: 'Cadence Seed',
      boss: 'Unending Destruction',
    },
  },
  image: '/characters/yuanwu.png',
};
