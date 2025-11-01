import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const radiant_dawn: Weapon = {
  id: 'radiant-dawn',
  name: "Radiant Dawn",
  slug: 'radiant-dawn',
  url: 'https://game8.co/games/Wuthering-Waves/archives/544744',
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
  image: '/weapons/radiant-dawn.png',
};
