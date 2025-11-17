import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const camellya: Character = {
  id: 'camellya',
  name: 'camellya',
  slug: 'camellya',
  url: 'https://game8.co/games/Wuthering-Waves/archives/473332',
  rarity: 5,
  element: Element.Havoc,
  weapon: WeaponType.Sword,
  materials: {
    ascension: {
      common: MaterialBaseName.WHISPERIN_CORE,
      boss: MaterialBaseName.TOPOLOGICAL_CONFINEMENT,
      overworld: MaterialBaseName.NOVA,
    },
    forte: {
      common: MaterialBaseName.WHISPERIN_CORE,
      forgery: MaterialBaseName.INERT_METALLIC_DRIP,
      boss: MaterialBaseName.DREAMLESS_FEATHER,
    },
  },
  image: '/characters/camellya.png',
};
