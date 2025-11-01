import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const rectifier_of_night: Weapon = {
  id: 'rectifier-of-night',
  name: "Rectifier Of Night",
  slug: 'rectifier-of-night',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455920',
  rarity: 3,
  type: WeaponType.Rectifier,
  baseAtk: 325,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Crude Ring',
    forgery: 'Lento Helix',
    ascension: '',
  },
  image: '/weapons/rectifier-of-night.png',
};
