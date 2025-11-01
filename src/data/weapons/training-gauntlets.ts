import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

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
    common: 'Howler Core',
    forgery: 'Cadence Seed',
    ascension: '',
  },
  image: '/weapons/training-gauntlets.png',
};
