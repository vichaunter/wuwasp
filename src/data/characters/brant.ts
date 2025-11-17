import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const brant: Character = {
  id: 'brant',
  name: 'brant',
  slug: 'brant',
  url: 'https://game8.co/games/Wuthering-Waves/archives/486245',
  rarity: 5,
  element: Element.Fusion,
  weapon: WeaponType.Sword,
  materials: {
    ascension: {
      common: MaterialBaseName.TIDAL_RESIDUUM,
      boss: MaterialBaseName.BLAZING_BONE,
      overworld: MaterialBaseName.GOLDEN_FLEECE,
    },
    forte: {
      common: MaterialBaseName.TIDAL_RESIDUUM,
      forgery: MaterialBaseName.INERT_METALLIC_DRIP,
      boss: 'The Netherworld\'s Stare',
    },
  },
  image: '/characters/brant.png',
};
