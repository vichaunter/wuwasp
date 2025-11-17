import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const yangyang: Character = {
  id: 'yangyang',
  name: 'yangyang',
  slug: 'yangyang',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454215',
  rarity: 4,
  element: Element.Aero,
  weapon: WeaponType.Sword,
  materials: {
    ascension: {
      common: MaterialBaseName.RING,
      boss: MaterialBaseName.ROARING_ROCK_FIST,
      overworld: MaterialBaseName.WINTRY_BELL,
    },
    forte: {
      common: MaterialBaseName.RING,
      forgery: MaterialBaseName.INERT_METALLIC_DRIP,
      boss: MaterialBaseName.UNENDING_DESTRUCTION,
    },
  },
  image: '/characters/yangyang.png',
};
