import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const augment: Weapon = {
  id: 'augment',
  name: "Augment",
  slug: 'augment',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455926',
  rarity: 4,
  type: WeaponType.Rectifier,
  baseAtk: 412,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Crude Ring',
    forgery: 'Lento Helix',
    ascension: '',
  },
  image: '/weapons/augment.png',
};
