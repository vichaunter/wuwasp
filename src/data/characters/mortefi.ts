import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const mortefi: Character = {
  id: 'mortefi',
  name: 'mortefi',
  slug: 'mortefi',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454222',
  rarity: 4,
  element: Element.Fusion,
  weapon: WeaponType.Pistol,
  materials: {
    ascension: {
      common: MaterialBaseName.WHISPERIN_CORE,
      boss: MaterialBaseName.RAGE_TACET_CORE,
      overworld: MaterialBaseName.CORIOLUS,
    },
    forte: {
      common: MaterialBaseName.WHISPERIN_CORE,
      forgery: MaterialBaseName.IMPURE_PHLOGISTON,
      boss: MaterialBaseName.MONUMENT_BELL,
    },
  },
  image: '/characters/mortefi.png',
};
