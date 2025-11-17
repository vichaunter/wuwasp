import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const cantarella: Character = {
  id: 'cantarella',
  name: 'cantarella',
  slug: 'cantarella',
  url: 'https://game8.co/games/Wuthering-Waves/archives/500493',
  rarity: 5,
  element: Element.Havoc,
  weapon: WeaponType.Rectifier,
  materials: {
    ascension: {
      common: MaterialBaseName.POLYGON_CORE,
      boss: MaterialBaseName.CLEANSING_CONCH,
      overworld: MaterialBaseName.SEASIDE_CENDRELIS,
    },
    forte: {
      common: MaterialBaseName.POLYGON_CORE,
      forgery: MaterialBaseName.LENTO_HELIX,
      boss: MaterialBaseName.WHEN_IRISES_BLOOM,
    },
  },
  image: '/characters/cantarella.png',
};
