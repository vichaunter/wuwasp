import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const training_gauntlets: Weapon = {
  id: 'training-gauntlets',
  name: "Training Gauntlets",
  slug: 'training-gauntlets',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455905',
  rarity: 5,
  type: WeaponType.Gauntlet,
  baseAtk: 0,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.CADENCE_SEED,
    ascension: '',
  },
  image: '/weapons/training-gauntlets.png',
};
