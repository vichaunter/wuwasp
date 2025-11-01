import type { Character } from '@/types';
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
      common: 'Tidal Residuum',
      boss: 'Unfading Glory',
      overworld: 'Bamboo Iris',
    },
    forte: {
      common: 'Tidal Residuum',
      forgery: 'Inert Metallic Drip',
      boss: 'When Irises Bloom',
    },
  },
  image: '/characters/cartethyia.png',
};
