import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const pistols_of_night: Weapon = {
  id: 'pistols-of-night',
  name: "Pistols Of Night",
  slug: 'pistols-of-night',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455897',
  rarity: 3,
  type: WeaponType.Pistol,
  baseAtk: 325,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.RING,
    forgery: MaterialBaseName.IMPURE_PHLOGISTON,
    ascension: '',
  },
  image: '/weapons/pistols-of-night.png',
};
