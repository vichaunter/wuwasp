import type { Character } from '@/types';
import { Element, WeaponType } from '@/types';

export const jinhsi: Character = {
  id: 'jinhsi',
  name: 'jinhsi',
  slug: 'jinhsi',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455405',
  rarity: 5,
  element: Element.Spectro,
  weapon: WeaponType.Broadblade,
  materials: {
    ascension: {
      common: 'Howler Core',
      boss: 'Elegy Tacet Core',
      overworld: 'Loong\'s Pearl',
    },
    forte: {
      common: 'Howler Core',
      forgery: 'Waveworn Residue',
      boss: 'Sentinel\'s Dagger',
    },
  },
  image: '/characters/jinhsi.png',
};
