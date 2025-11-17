import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const lumi: Character = {
  id: 'lumi',
  name: 'lumi',
  slug: 'lumi',
  url: 'https://game8.co/games/Wuthering-Waves/archives/473488',
  rarity: 4,
  element: Element.Electro,
  weapon: WeaponType.Broadblade,
  materials: {
    ascension: {
      common: MaterialBaseName.HOWLER_CORE,
      boss: MaterialBaseName.THUNDERING_TACET_CORE,
      overworld: MaterialBaseName.TERRASPAWN_FUNGUS,
    },
    forte: {
      common: MaterialBaseName.HOWLER_CORE,
      forgery: MaterialBaseName.WAVEWORN_RESIDUE,
      boss: 'Sentinel\'s Dagger',
    },
  },
  image: '/characters/lumi.png',
};
