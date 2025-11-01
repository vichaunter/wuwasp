import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const originite_type_v: Weapon = {
  id: 'originite-type-v',
  name: "Originite Type V",
  slug: 'originite-type-v',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455921',
  rarity: 3,
  type: WeaponType.Rectifier,
  baseAtk: 300,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Crude Ring',
    forgery: 'Lento Helix',
    ascension: '',
  },
  image: '/weapons/originite-type-v.png',
};
