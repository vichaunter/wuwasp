import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const lux_umbra: Weapon = {
  id: 'lux-umbra',
  name: "Lux Umbra",
  slug: 'lux-umbra',
  url: 'https://game8.co/games/Wuthering-Waves/archives/553561',
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
  image: '/weapons/lux-umbra.png',
};
