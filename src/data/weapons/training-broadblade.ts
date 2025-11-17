import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

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
    common: MaterialBaseName.WHISPERIN_CORE,
    forgery: MaterialBaseName.WAVEWORN_RESIDUE,
    ascension: '',
  },
  image: '/weapons/training-broadblade.png',
};
