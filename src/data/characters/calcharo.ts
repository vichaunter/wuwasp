import type { Character } from '@/types';
import { Element, WeaponType } from '@/types';

export const calcharo: Character = {
  id: 'calcharo',
  name: 'calcharo',
  slug: 'calcharo',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454217',
  rarity: 5,
  element: Element.Electro,
  weapon: WeaponType.Broadblade,
  materials: {
    ascension: {
      common: 'Crude Ring',
      boss: 'Thundering Tacet Core',
      overworld: 'Iris',
    },
    forte: {
      common: 'Crude Ring',
      forgery: 'Waveworn Residue',
      boss: 'Monument Bell',
    },
  },
  image: '/characters/calcharo.png',
};
