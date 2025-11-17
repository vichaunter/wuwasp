import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const xiangli_yao: Character = {
  id: 'xiangli-yao',
  name: 'xiangli-yao',
  slug: 'xiangli-yao',
  url: 'https://game8.co/games/Wuthering-Waves/archives/461501',
  rarity: 5,
  element: Element.Electro,
  weapon: WeaponType.Gauntlet,
  materials: {
    ascension: {
      common: MaterialBaseName.WHISPERIN_CORE,
      boss: MaterialBaseName.HIDDEN_THUNDER_TACET_CORE,
      overworld: MaterialBaseName.VIOLET_CORAL,
    },
    forte: {
      common: MaterialBaseName.WHISPERIN_CORE,
      forgery: MaterialBaseName.CADENCE_SEED,
      boss: MaterialBaseName.UNENDING_DESTRUCTION,
    },
  },
  image: '/characters/xiangli-yao.png',
};
