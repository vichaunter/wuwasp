import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const galbrena: Character = {
  id: 'galbrena',
  name: 'galbrena',
  slug: 'galbrena',
  url: 'https://game8.co/games/Wuthering-Waves/archives/524888',
  rarity: 5,
  element: Element.Fusion,
  weapon: WeaponType.Pistol,
  materials: {
    ascension: {
      common: MaterialBaseName.TIDAL_RESIDUUM,
      boss: MaterialBaseName.BLIGHTED_CROWN_OF_PUPPET_KING,
      overworld: MaterialBaseName.STONE_ROSE,
    },
    forte: {
      common: MaterialBaseName.TIDAL_RESIDUUM,
      forgery: MaterialBaseName.IMPURE_PHLOGISTON,
      boss: MaterialBaseName.CURSE_OF_THE_ABYSS,
    },
  },
  image: '/characters/galbrena.png',
};
