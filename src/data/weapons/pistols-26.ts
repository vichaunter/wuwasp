import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const pistols_26: Weapon = {
  id: 'pistols-26',
  name: "Pistols 26",
  slug: 'pistols-26',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455974',
  rarity: 4,
  type: WeaponType.Pistol,
  baseAtk: 387,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.RING,
    forgery: MaterialBaseName.IMPURE_PHLOGISTON,
    ascension: '',
  },
  image: '/weapons/pistols-26.png',
};
