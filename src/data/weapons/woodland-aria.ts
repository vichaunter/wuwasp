import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const woodland_aria: Weapon = {
  id: 'woodland-aria',
  name: "Woodland Aria",
  slug: 'woodland-aria',
  url: 'https://game8.co/games/Wuthering-Waves/archives/514610',
  rarity: 5,
  type: WeaponType.Pistol,
  baseAtk: 500,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Crude Ring',
    forgery: 'Impure Phlogiston',
    ascension: '',
  },
  image: '/weapons/woodland-aria.png',
};
