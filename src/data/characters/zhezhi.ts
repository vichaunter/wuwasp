import type { Character } from '@/types';
import { Element, WeaponType } from '@/types';

export const zhezhi: Character = {
  id: 'zhezhi',
  name: 'zhezhi',
  slug: 'zhezhi',
  url: 'https://game8.co/games/Wuthering-Waves/archives/461497',
  rarity: 5,
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
  image: '/characters/zhezhi.png',
};
