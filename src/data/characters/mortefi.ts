import type { Character } from '@/types';
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
      common: 'Whisperin Core',
      boss: 'Rage Tacet Core',
      overworld: 'Coriolus',
    },
    forte: {
      common: 'Whisperin Core',
      forgery: 'Impure Phlogiston',
      boss: 'Monument Bell',
    },
  },
  image: '/characters/mortefi.png',
};
