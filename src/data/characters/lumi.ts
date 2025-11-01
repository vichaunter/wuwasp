import type { Character } from '@/types';
import { Element, WeaponType } from '@/types';

export const lumi: Character = {
  id: 'lumi',
  name: 'lumi',
  slug: 'lumi',
  url: 'https://game8.co/games/Wuthering-Waves/archives/473488',
  rarity: 4,
  element: Element.Electro,
  weapon: WeaponType.Broadblade,
  materials: {
    ascension: {
      common: 'Howler Core',
      boss: 'Thundering Tacet Core',
      overworld: 'Terraspawn Fungus',
    },
    forte: {
      common: 'Howler Core',
      forgery: 'Waveworn Residue',
      boss: 'Sentinel\'s Dagger',
    },
  },
  image: '/characters/lumi.png',
};
