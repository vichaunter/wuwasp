import type { Character } from '@/types';
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
      common: 'Crude Ring',
      boss: 'Topological Confinement',
      overworld: 'Violet Coral',
    },
    forte: {
      common: 'Crude Ring',
      forgery: 'Cadence Seed',
      boss: 'Monument Bell',
    },
  },
  image: '/characters/youhu.png',
};
