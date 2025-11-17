import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
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
      common: MaterialBaseName.RING,
      boss: MaterialBaseName.THUNDERING_TACET_CORE,
      overworld: MaterialBaseName.IRIS,
    },
    forte: {
      common: MaterialBaseName.RING,
      forgery: MaterialBaseName.WAVEWORN_RESIDUE,
      boss: MaterialBaseName.MONUMENT_BELL,
    },
  },
  image: '/characters/calcharo.png',
};
