import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const hollow_mirage: Weapon = {
  id: 'hollow-mirage',
  name: "Hollow Mirage",
  slug: 'hollow-mirage',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455913',
  rarity: 4,
  type: WeaponType.Gauntlet,
  baseAtk: 412,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Howler Core',
    forgery: 'Cadence Seed',
    ascension: '',
  },
  image: '/weapons/hollow-mirage.png',
};
