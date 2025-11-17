import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const gauntlets_of_night: Weapon = {
  id: 'gauntlets-of-night',
  name: "Gauntlets Of Night",
  slug: 'gauntlets-of-night',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455910',
  rarity: 3,
  type: WeaponType.Gauntlet,
  baseAtk: 325,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.CADENCE_SEED,
    ascension: '',
  },
  image: '/weapons/gauntlets-of-night.png',
};
