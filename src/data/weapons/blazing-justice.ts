import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const blazing_justice: Weapon = {
  id: 'blazing-justice',
  name: "Blazing Justice",
  slug: 'blazing-justice',
  url: 'https://game8.co/games/Wuthering-Waves/archives/514609',
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
  image: '/weapons/blazing-justice.png',
};
