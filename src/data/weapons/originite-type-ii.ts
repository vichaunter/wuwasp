import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const originite_type_ii: Weapon = {
  id: 'originite-type-ii',
  name: "Originite Type Ii",
  slug: 'originite-type-ii',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455933',
  rarity: 3,
  type: WeaponType.Sword,
  baseAtk: 325,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Howler Core',
    forgery: 'Inert Metallic Drip',
    ascension: '',
  },
  image: '/weapons/originite-type-ii.png',
};
