import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const originite_type_iii: Weapon = {
  id: 'originite-type-iii',
  name: "Originite Type Iii",
  slug: 'originite-type-iii',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455898',
  rarity: 3,
  type: WeaponType.Pistol,
  baseAtk: 325,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Crude Ring',
    forgery: 'Impure Phlogiston',
    ascension: '',
  },
  image: '/weapons/originite-type-iii.png',
};
