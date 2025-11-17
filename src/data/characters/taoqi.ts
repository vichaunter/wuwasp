import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const taoqi: Character = {
  id: 'taoqi',
  name: 'taoqi',
  slug: 'taoqi',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454226',
  rarity: 4,
  element: Element.Havoc,
  weapon: WeaponType.Broadblade,
  materials: {
    ascension: {
      common: MaterialBaseName.HOWLER_CORE,
      boss: MaterialBaseName.GOLD_DISSOLVING_FEATHER,
      overworld: MaterialBaseName.IRIS,
    },
    forte: {
      common: MaterialBaseName.HOWLER_CORE,
      forgery: MaterialBaseName.WAVEWORN_RESIDUE,
      boss: MaterialBaseName.DREAMLESS_FEATHER,
    },
  },
  image: '/characters/taoqi.png',
};
