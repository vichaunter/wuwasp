import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const stonard: Weapon = {
  id: 'stonard',
  name: "Stonard",
  slug: 'stonard',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455911',
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
  image: '/weapons/stonard.png',
};
