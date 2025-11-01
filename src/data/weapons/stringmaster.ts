import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const stringmaster: Weapon = {
  id: 'stringmaster',
  name: "Stringmaster",
  slug: 'stringmaster',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455927',
  rarity: 5,
  type: WeaponType.Rectifier,
  baseAtk: 500,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Crude Ring',
    forgery: 'Lento Helix',
    ascension: '',
  },
  image: '/weapons/stringmaster.png',
};
