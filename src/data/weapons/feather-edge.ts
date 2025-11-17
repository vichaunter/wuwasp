import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const feather_edge: Weapon = {
  id: 'feather-edge',
  name: "Feather Edge",
  slug: 'feather-edge',
  url: 'https://game8.co/games/Wuthering-Waves/archives/544590',
  rarity: 4,
  type: WeaponType.Sword,
  baseAtk: 412,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.INERT_METALLIC_DRIP,
    ascension: '',
  },
  image: '/weapons/feather-edge.png',
};
