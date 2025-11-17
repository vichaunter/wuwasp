import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const whispers_of_sirens: Weapon = {
  id: 'whispers-of-sirens',
  name: "Whispers Of Sirens",
  slug: 'whispers-of-sirens',
  url: 'https://game8.co/games/Wuthering-Waves/archives/506482',
  rarity: 5,
  type: WeaponType.Rectifier,
  baseAtk: 500,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.RING,
    forgery: MaterialBaseName.LENTO_HELIX,
    ascension: '',
  },
  image: '/weapons/whispers-of-sirens.png',
};
