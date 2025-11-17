import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const danjin: Character = {
  id: 'danjin',
  name: 'danjin',
  slug: 'danjin',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454227',
  rarity: 4,
  element: Element.Havoc,
  weapon: WeaponType.Sword,
  materials: {
    ascension: {
      common: MaterialBaseName.RING,
      boss: MaterialBaseName.STRIFE_TACET_CORE,
      overworld: MaterialBaseName.BELLE_POPPY,
    },
    forte: {
      common: MaterialBaseName.RING,
      forgery: MaterialBaseName.INERT_METALLIC_DRIP,
      boss: MaterialBaseName.DREAMLESS_FEATHER,
    },
  },
  image: '/characters/danjin.png',
};
