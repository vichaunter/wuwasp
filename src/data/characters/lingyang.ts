import type { Character } from '@/types';
import { Element, WeaponType } from '@/types';

export const lingyang: Character = {
  id: 'lingyang',
  name: 'lingyang',
  slug: 'lingyang',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454223',
  rarity: 5,
  element: Element.Glacio,
  weapon: WeaponType.Gauntlet,
  materials: {
    ascension: {
      common: 'Whisperin Core',
      boss: 'Sound-Keeping Tacet Core',
      overworld: 'Coriolus',
    },
    forte: {
      common: 'Whisperin Core',
      forgery: 'Cadence Seed',
      boss: 'Unending Destruction',
    },
  },
  image: '/characters/lingyang.png',
};
