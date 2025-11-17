import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const rectifier_25: Weapon = {
  id: 'rectifier-25',
  name: "Rectifier 25",
  slug: 'rectifier-25',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455916',
  rarity: 4,
  type: WeaponType.Rectifier,
  baseAtk: 337,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.RING,
    forgery: MaterialBaseName.LENTO_HELIX,
    ascension: '',
  },
  image: '/weapons/rectifier-25.png',
};
