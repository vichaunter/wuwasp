import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const ciaccona: Character = {
  id: "ciaccona",
  name: "ciaccona",
  slug: "ciaccona",
  url: "https://game8.co/games/Wuthering-Waves/archives/507924",
  rarity: 5,
  element: Element.Aero,
  weapon: WeaponType.Pistol,
  materials: {
    ascension: {
      common: MaterialBaseName.TIDAL_RESIDUUM,
      boss: MaterialBaseName.BLAZING_BONE,
      overworld: MaterialBaseName.GOLDEN_FLEECE,
    },
    forte: {
      common: MaterialBaseName.TIDAL_RESIDUUM,
      forgery: MaterialBaseName.IMPURE_PHLOGISTON,
      boss: MaterialBaseName.WHEN_IRISES_BLOOM,
    },
  },
  image: "/characters/ciaccona.png",
};
