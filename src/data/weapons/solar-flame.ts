import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const solar_flame: Weapon = {
  id: 'solar-flame',
  name: "Solar Flame",
  slug: 'solar-flame',
  url: 'https://game8.co/games/Wuthering-Waves/archives/544594',
  rarity: 4,
  type: WeaponType.Pistol,
  baseAtk: 412,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.RING,
    forgery: MaterialBaseName.IMPURE_PHLOGISTON,
    ascension: '',
  },
  image: '/weapons/solar-flame.png',
};
