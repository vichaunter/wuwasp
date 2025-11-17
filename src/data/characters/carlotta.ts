import type { Character } from "@/types";
import { Element, WeaponType, MaterialBaseName } from "@/types";

export const carlotta: Character = {
  id: "carlotta",
  name: "carlotta",
  slug: "carlotta",
  url: "https://game8.co/games/Wuthering-Waves/archives/486251",
  rarity: 5,
  element: Element.Glacio,
  weapon: WeaponType.Pistol,
  materials: {
    ascension: {
      common: MaterialBaseName.POLYGON_CORE,
      boss: MaterialBaseName.PLATINUM_CORE,
      overworld: MaterialBaseName.SWORD_ACORUS,
    },
    forte: {
      common: MaterialBaseName.POLYGON_CORE,
      forgery: MaterialBaseName.IMPURE_PHLOGISTON,
      boss: MaterialBaseName.THE_NETHERWORLDS_STARE,
    },
  },
  image: "/characters/carlotta.png",
};
