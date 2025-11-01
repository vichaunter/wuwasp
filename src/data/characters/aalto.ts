import type { Character } from '@/types';
import { Element, WeaponType } from '@/types';

export const aalto: Character = {
  id: 'aalto',
  name: 'aalto',
  slug: 'aalto',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454214',
  rarity: 4,
  element: Element.Aero,
  weapon: WeaponType.Pistol,
  materials: {
    ascension: {
      common: 'Howler Core',
      boss: 'Roaring Rock Fist',
      overworld: 'Wintry Bell',
    },
    forte: {
      common: 'Howler Core',
      forgery: 'Impure Phlogiston',
      boss: 'Monument Bell',
    },
  },
  image: '/characters/aalto.png',
};
