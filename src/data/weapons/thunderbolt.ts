import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const thunderbolt: Weapon = {
  id: 'thunderbolt',
  name: "Thunderbolt",
  slug: 'thunderbolt',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455901',
  rarity: 4,
  type: WeaponType.Pistol,
  baseAtk: 387,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Crude Ring',
    forgery: 'Impure Phlogiston',
    ascension: '',
  },
  image: '/weapons/thunderbolt.png',
};
