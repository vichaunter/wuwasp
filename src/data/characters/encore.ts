import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const encore: Character = {
  id: 'encore',
  name: 'encore',
  slug: 'encore',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454221',
  rarity: 5,
  element: Element.Fusion,
  weapon: WeaponType.Rectifier,
  materials: {
    ascension: {
      common: MaterialBaseName.WHISPERIN_CORE,
      boss: MaterialBaseName.RAGE_TACET_CORE,
      overworld: MaterialBaseName.PECOK_FLOWER,
    },
    forte: {
      common: MaterialBaseName.WHISPERIN_CORE,
      forgery: MaterialBaseName.LENTO_HELIX,
      boss: MaterialBaseName.UNENDING_DESTRUCTION,
    },
  },
  image: '/characters/encore.png',
};
