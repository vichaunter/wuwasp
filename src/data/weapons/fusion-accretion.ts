import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const fusion_accretion: Weapon = {
  id: 'fusion-accretion',
  name: "Fusion Accretion",
  slug: 'fusion-accretion',
  url: 'https://game8.co/games/Wuthering-Waves/archives/474512',
  rarity: 4,
  type: WeaponType.Rectifier,
  baseAtk: 462,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.RING,
    forgery: MaterialBaseName.LENTO_HELIX,
    ascension: '',
  },
  image: '/weapons/fusion-accretion.png',
};
