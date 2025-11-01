import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const training_broadblade: Weapon = {
  id: 'training-broadblade',
  name: "Training Broadblade",
  slug: 'training-broadblade',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455941',
  rarity: 5,
  type: WeaponType.Broadblade,
  baseAtk: 0,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Waveworn Residue',
    forgery: 'Whisperin Core',
    ascension: '',
  },
  image: '/weapons/training-broadblade.png',
};
