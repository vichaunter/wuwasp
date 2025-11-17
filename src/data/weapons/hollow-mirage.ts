import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

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
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.CADENCE_SEED,
    ascension: '',
  },
  image: '/weapons/hollow-mirage.png',
};
