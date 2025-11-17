import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
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
      common: MaterialBaseName.HOWLER_CORE,
      boss: MaterialBaseName.SOUND_KEEPING_TACET_CORE,
      overworld: MaterialBaseName.LANTERNBERRY,
    },
    forte: {
      common: MaterialBaseName.HOWLER_CORE,
      forgery: MaterialBaseName.LENTO_HELIX,
      boss: MaterialBaseName.MONUMENT_BELL,
    },
  },
  image: '/characters/baizhi.png',
};
