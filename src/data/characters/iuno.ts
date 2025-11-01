import type { Character } from '@/types';
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
      common: "Polygon Core",
      boss: "Abyssal Husk",
      overworld: "Silverglow Bloom",
    },
    forte: {
      common: "Polygon Core",
      forgery: "Cadence Seed",
      boss: "The Netherworld's Stare",
    },
  },
  image: "/characters/iuno.png",
};
