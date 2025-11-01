import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const originite_type_iv: Weapon = {
  id: 'originite-type-iv',
  name: "Originite Type Iv",
  slug: 'originite-type-iv',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455907',
  rarity: 3,
  type: WeaponType.Gauntlet,
  baseAtk: 300,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Howler Core',
    forgery: 'Cadence Seed',
    ascension: '',
  },
  image: '/weapons/originite-type-iv.png',
};
