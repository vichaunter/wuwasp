import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const training_pistols: Weapon = {
  id: 'training-pistols',
  name: "Training Pistols",
  slug: 'training-pistols',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455894',
  rarity: 5,
  type: WeaponType.Pistol,
  baseAtk: 0,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Crude Ring',
    forgery: 'Impure Phlogiston',
    ascension: '',
  },
  image: '/weapons/training-pistols.png',
};
