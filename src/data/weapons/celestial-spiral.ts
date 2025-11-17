import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const celestial_spiral: Weapon = {
  id: 'celestial-spiral',
  name: "Celestial Spiral",
  slug: 'celestial-spiral',
  url: 'https://game8.co/games/Wuthering-Waves/archives/474517',
  rarity: 4,
  type: WeaponType.Gauntlet,
  baseAtk: 462,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.CADENCE_SEED,
    ascension: '',
  },
  image: '/weapons/celestial-spiral.png',
};
