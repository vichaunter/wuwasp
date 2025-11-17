import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const amity_accord: Weapon = {
  id: 'amity-accord',
  name: "Amity Accord",
  slug: 'amity-accord',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455914',
  rarity: 4,
  type: WeaponType.Gauntlet,
  baseAtk: 337,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.CADENCE_SEED,
    ascension: '',
  },
  image: '/weapons/amity-accord.png',
};
