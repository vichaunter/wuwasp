import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const undying_flame: Weapon = {
  id: 'undying-flame',
  name: "Undying Flame",
  slug: 'undying-flame',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455900',
  rarity: 4,
  type: WeaponType.Pistol,
  baseAtk: 412,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Crude Ring',
    forgery: 'Impure Phlogiston',
    ascension: '',
  },
  image: '/weapons/undying-flame.png',
};
