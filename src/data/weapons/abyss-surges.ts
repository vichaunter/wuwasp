import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const abyss_surges: Weapon = {
  id: 'abyss-surges',
  name: "Abyss Surges",
  slug: 'abyss-surges',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455915',
  rarity: 5,
  type: WeaponType.Gauntlet,
  baseAtk: 587,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.CADENCE_SEED,
    ascension: '',
  },
  image: '/weapons/abyss-surges.png',
};
