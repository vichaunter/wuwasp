import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const changli: Character = {
  id: 'changli',
  name: 'changli',
  slug: 'changli',
  url: 'https://game8.co/games/Wuthering-Waves/archives/452826',
  rarity: 5,
  element: Element.Fusion,
  weapon: WeaponType.Sword,
  materials: {
    ascension: {
      common: MaterialBaseName.RING,
      boss: MaterialBaseName.RAGE_TACET_CORE,
      overworld: MaterialBaseName.PAVO_PLUM,
    },
    forte: {
      common: MaterialBaseName.RING,
      forgery: MaterialBaseName.INERT_METALLIC_DRIP,
      boss: 'Sentinel\'s Dagger',
    },
  },
  image: '/characters/changli.png',
};
