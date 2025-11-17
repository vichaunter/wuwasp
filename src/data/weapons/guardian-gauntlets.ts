import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const guardian_gauntlets: Weapon = {
  id: 'guardian-gauntlets',
  name: "Guardian Gauntlets",
  slug: 'guardian-gauntlets',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455908',
  rarity: 3,
  type: WeaponType.Gauntlet,
  baseAtk: 300,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.CADENCE_SEED,
    ascension: '',
  },
  image: '/weapons/guardian-gauntlets.png',
};
