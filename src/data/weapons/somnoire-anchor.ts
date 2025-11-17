import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const somnoire_anchor: Weapon = {
  id: 'somnoire-anchor',
  name: "Somnoire Anchor",
  slug: 'somnoire-anchor',
  url: 'https://game8.co/games/Wuthering-Waves/archives/483284',
  rarity: 4,
  type: WeaponType.Sword,
  baseAtk: 462,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.INERT_METALLIC_DRIP,
    ascension: '',
  },
  image: '/weapons/somnoire-anchor.png',
};
