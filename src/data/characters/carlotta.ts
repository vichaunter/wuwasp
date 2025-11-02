import type { Character } from "@/types";
import { Element, WeaponType } from "@/types";

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
      common: "Polygon Core",
      boss: "Platinum Core",
      overworld: "Sword Acorus",
    },
    forte: {
      common: "Polygon Core",
      forgery: "Impure Phlogiston",
      boss: "The Netherworld's Stare",
    },
  },
  image: "/characters/carlotta.png",
};
