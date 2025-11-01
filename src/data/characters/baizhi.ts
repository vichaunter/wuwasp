import type { Character } from '@/types';
import { Element, WeaponType } from '@/types';

export const baizhi: Character = {
  id: 'baizhi',
  name: 'baizhi',
  slug: 'baizhi',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454224',
  rarity: 4,
  element: Element.Glacio,
  weapon: WeaponType.Rectifier,
  materials: {
    ascension: {
      common: 'Howler Core',
      boss: 'Sound-Keeping Tacet Core',
      overworld: 'Lanternberry',
    },
    forte: {
      common: 'Howler Core',
      forgery: 'Lento Helix',
      boss: 'Monument Bell',
    },
  },
  image: '/characters/baizhi.png',
};
