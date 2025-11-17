import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const stellar_symphony: Weapon = {
  id: 'stellar-symphony',
  name: "Stellar Symphony",
  slug: 'stellar-symphony',
  url: 'https://game8.co/games/Wuthering-Waves/archives/474386',
  rarity: 5,
  type: WeaponType.Rectifier,
  baseAtk: 412,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.RING,
    forgery: MaterialBaseName.LENTO_HELIX,
    ascension: '',
  },
  image: '/weapons/stellar-symphony.png',
};
