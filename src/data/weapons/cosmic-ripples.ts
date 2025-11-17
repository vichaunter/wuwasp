import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const cosmic_ripples: Weapon = {
  id: 'cosmic-ripples',
  name: "Cosmic Ripples",
  slug: 'cosmic-ripples',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455928',
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
  image: '/weapons/cosmic-ripples.png',
};
