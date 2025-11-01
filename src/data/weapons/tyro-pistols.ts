import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const tyro_pistols: Weapon = {
  id: 'tyro-pistols',
  name: "Tyro Pistols",
  slug: 'tyro-pistols',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455895',
  rarity: 5,
  type: WeaponType.Pistol,
  baseAtk: 0,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Crude Ring',
    forgery: 'Impure Phlogiston',
    ascension: '',
  },
  image: '/weapons/tyro-pistols.png',
};
