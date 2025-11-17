import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const cartethyia: Character = {
  id: 'cartethyia',
  name: 'cartethyia',
  slug: 'cartethyia',
  url: 'https://game8.co/games/Wuthering-Waves/archives/507777',
  rarity: 5,
  element: Element.Aero,
  weapon: WeaponType.Sword,
  materials: {
    ascension: {
      common: MaterialBaseName.TIDAL_RESIDUUM,
      boss: MaterialBaseName.UNFADING_GLORY,
      overworld: MaterialBaseName.BAMBOO_IRIS,
    },
    forte: {
      common: MaterialBaseName.TIDAL_RESIDUUM,
      forgery: MaterialBaseName.INERT_METALLIC_DRIP,
      boss: MaterialBaseName.WHEN_IRISES_BLOOM,
    },
  },
  image: '/characters/cartethyia.png',
};
