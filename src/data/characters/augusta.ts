import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const augusta: Character = {
  id: 'augusta',
  name: 'augusta',
  slug: 'augusta',
  url: 'https://game8.co/games/Wuthering-Waves/archives/524890',
  rarity: 5,
  element: Element.Electro,
  weapon: WeaponType.Broadblade,
  materials: {
    ascension: {
      common: MaterialBaseName.TIDAL_RESIDUUM,
      boss: MaterialBaseName.BLIGHTED_CROWN_OF_PUPPET_KING,
      overworld: MaterialBaseName.LUMINOUS_CALENDULA,
    },
    forte: {
      common: MaterialBaseName.TIDAL_RESIDUUM,
      forgery: MaterialBaseName.WAVEWORN_RESIDUE,
      boss: MaterialBaseName.WHEN_IRISES_BLOOM,
    },
  },
  image: '/characters/augusta.png',
};
