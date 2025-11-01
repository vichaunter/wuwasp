import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const tyro_gauntlets: Weapon = {
  id: 'tyro-gauntlets',
  name: "Tyro Gauntlets",
  slug: 'tyro-gauntlets',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455906',
  rarity: 5,
  type: WeaponType.Gauntlet,
  baseAtk: 0,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Howler Core',
    forgery: 'Cadence Seed',
    ascension: '',
  },
  image: '/weapons/tyro-gauntlets.png',
};
