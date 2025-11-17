import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const iuno: Character = {
  id: "iuno",
  name: "iuno",
  slug: "iuno",
  url: "https://game8.co/games/Wuthering-Waves/archives/524889",
  rarity: 5,
  element: Element.Aero,
  weapon: WeaponType.Gauntlet,
  materials: {
    ascension: {
      common: MaterialBaseName.POLYGON_CORE,
      boss: MaterialBaseName.ABYSSAL_HUSK,
      overworld: MaterialBaseName.SILVERGLOW_BLOOM,
    },
    forte: {
      common: MaterialBaseName.POLYGON_CORE,
      forgery: MaterialBaseName.CADENCE_SEED,
      boss: MaterialBaseName.THE_NETHERWORLDS_STARE,
    },
  },
  image: "/characters/iuno.png",
};
