import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
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
      common: MaterialBaseName.WHISPERIN_CORE,
      boss: MaterialBaseName.TRUTH_IN_LIES,
      overworld: MaterialBaseName.WINTRY_BELL,
    },
    forte: {
      common: MaterialBaseName.WHISPERIN_CORE,
      forgery: MaterialBaseName.INERT_METALLIC_DRIP,
      boss: MaterialBaseName.CURSE_OF_THE_ABYSS,
    },
  },
  image: "/characters/qiuyuan.png",
};
