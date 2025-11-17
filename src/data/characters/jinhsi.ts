import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const jinhsi: Character = {
  id: 'jinhsi',
  name: 'jinhsi',
  slug: 'jinhsi',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455405',
  rarity: 5,
  element: Element.Spectro,
  weapon: WeaponType.Broadblade,
  materials: {
    ascension: {
      common: MaterialBaseName.HOWLER_CORE,
      boss: MaterialBaseName.ELEGY_TACET_CORE,
      overworld: 'Loong\'s Pearl',
    },
    forte: {
      common: MaterialBaseName.HOWLER_CORE,
      forgery: MaterialBaseName.WAVEWORN_RESIDUE,
      boss: 'Sentinel\'s Dagger',
    },
  },
  image: '/characters/jinhsi.png',
};
