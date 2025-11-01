import type { Character } from '@/types';
import { Element, WeaponType } from '@/types';

export const qiuyuan: Character = {
  id: "qiuyuan",
  name: "Qiuyuan",
  slug: "qiuyuan",
  url: "https://game8.co/games/Wuthering-Waves/archives/524882",
  rarity: 5,
  element: Element.Aero,
  weapon: WeaponType.Sword,
  materials: {
    ascension: {
      common: "Whisperin Core",
      boss: "Truth in Lies",
      overworld: "Wintry Bell",
    },
    forte: {
      common: "Whisperin Core",
      forgery: "Inert Metallic Drip",
      boss: "Curse of the Abyss",
    },
  },
  image: "/characters/qiuyuan.png",
};
