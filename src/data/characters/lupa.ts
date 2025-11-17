import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const lupa: Character = {
  id: 'lupa',
  name: 'lupa',
  slug: 'lupa',
  url: 'https://game8.co/games/Wuthering-Waves/archives/520661',
  rarity: 5,
  element: Element.Fusion,
  weapon: WeaponType.Broadblade,
  materials: {
    ascension: {
      common: MaterialBaseName.HOWLER_CORE,
      boss: MaterialBaseName.UNFADING_GLORY,
      overworld: MaterialBaseName.BLOODLEAF_VIBURNUM,
    },
    forte: {
      common: MaterialBaseName.HOWLER_CORE,
      forgery: MaterialBaseName.WAVEWORN_RESIDUE,
      boss: 'The Netherworld\'s Stare',
    },
  },
  image: '/characters/lupa.png',
};
