import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const static_mist: Weapon = {
  id: 'static-mist',
  name: "Static Mist",
  slug: 'static-mist',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455904',
  rarity: 5,
  type: WeaponType.Pistol,
  baseAtk: 587,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.RING,
    forgery: MaterialBaseName.IMPURE_PHLOGISTON,
    ascension: '',
  },
  image: '/weapons/static-mist.png',
};
