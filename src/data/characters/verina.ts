import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const verina: Character = {
  id: 'verina',
  name: 'verina',
  slug: 'verina',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454229',
  rarity: 5,
  element: Element.Spectro,
  weapon: WeaponType.Rectifier,
  materials: {
    ascension: {
      common: MaterialBaseName.HOWLER_CORE,
      boss: MaterialBaseName.ELEGY_TACET_CORE,
      overworld: MaterialBaseName.BELLE_POPPY,
    },
    forte: {
      common: MaterialBaseName.HOWLER_CORE,
      forgery: MaterialBaseName.LENTO_HELIX,
      boss: MaterialBaseName.MONUMENT_BELL,
    },
  },
  image: '/characters/verina.png',
};
