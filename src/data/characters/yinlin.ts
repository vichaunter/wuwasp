import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const yinlin: Character = {
  id: 'yinlin',
  name: 'yinlin',
  slug: 'yinlin',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454218',
  rarity: 5,
  element: Element.Electro,
  weapon: WeaponType.Rectifier,
  materials: {
    ascension: {
      common: MaterialBaseName.WHISPERIN_CORE,
      boss: MaterialBaseName.GROUP_ABOMINATION_TACET_CORE,
      overworld: MaterialBaseName.CORIOLUS,
    },
    forte: {
      common: MaterialBaseName.WHISPERIN_CORE,
      forgery: MaterialBaseName.LENTO_HELIX,
      boss: MaterialBaseName.DREAMLESS_FEATHER,
    },
  },
  image: '/characters/yinlin.png',
};
