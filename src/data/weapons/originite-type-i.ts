import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const originite_type_i: Weapon = {
  id: 'originite-type-i',
  name: "Originite Type I",
  slug: 'originite-type-i',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455943',
  rarity: 3,
  type: WeaponType.Broadblade,
  baseAtk: 300,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Waveworn Residue',
    forgery: 'Whisperin Core',
    ascension: '',
  },
  image: '/weapons/originite-type-i.png',
};
