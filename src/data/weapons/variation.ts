import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const variation: Weapon = {
  id: 'variation',
  name: "Variation",
  slug: 'variation',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455923',
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
  image: '/weapons/variation.png',
};
