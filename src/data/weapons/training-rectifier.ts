import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const training_rectifier: Weapon = {
  id: 'training-rectifier',
  name: "Training Rectifier",
  slug: 'training-rectifier',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455917',
  rarity: 5,
  type: WeaponType.Rectifier,
  baseAtk: 0,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Crude Ring',
    forgery: 'Lento Helix',
    ascension: '',
  },
  image: '/weapons/training-rectifier.png',
};
