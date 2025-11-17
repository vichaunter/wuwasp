import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const aether_strike: Weapon = {
  id: 'aether-strike',
  name: "Aether Strike",
  slug: 'aether-strike',
  url: 'https://game8.co/games/Wuthering-Waves/archives/544845',
  rarity: 4,
  type: WeaponType.Gauntlet,
  baseAtk: 412,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.CADENCE_SEED,
    ascension: '',
  },
  image: '/weapons/aether-strike.png',
};
