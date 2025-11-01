import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const training_sword: Weapon = {
  id: 'training-sword',
  name: "Training Sword",
  slug: 'training-sword',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455929',
  rarity: 5,
  type: WeaponType.Sword,
  baseAtk: 0,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Howler Core',
    forgery: 'Inert Metallic Drip',
    ascension: '',
  },
  image: '/weapons/training-sword.png',
};
