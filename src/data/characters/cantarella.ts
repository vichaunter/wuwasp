import type { Character } from '@/types';
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
      common: 'Polygon Core',
      boss: 'Cleansing Conch',
      overworld: 'Seaside Cendrelis',
    },
    forte: {
      common: 'Polygon Core',
      forgery: 'Lento Helix',
      boss: 'When Irises Bloom',
    },
  },
  image: '/characters/cantarella.png',
};
