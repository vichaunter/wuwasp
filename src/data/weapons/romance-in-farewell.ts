import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const romance_in_farewell: Weapon = {
  id: 'romance-in-farewell',
  name: "Romance In Farewell",
  slug: 'romance-in-farewell',
  url: 'https://game8.co/games/Wuthering-Waves/archives/492571',
  rarity: 4,
  type: WeaponType.Pistol,
  baseAtk: 462,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.RING,
    forgery: MaterialBaseName.IMPURE_PHLOGISTON,
    ascension: '',
  },
  image: '/weapons/romance-in-farewell.png',
};
