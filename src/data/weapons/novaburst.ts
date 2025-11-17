import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const novaburst: Weapon = {
  id: 'novaburst',
  name: "Novaburst",
  slug: 'novaburst',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455902',
  rarity: 4,
  type: WeaponType.Pistol,
  baseAtk: 412,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.RING,
    forgery: MaterialBaseName.IMPURE_PHLOGISTON,
    ascension: '',
  },
  image: '/weapons/novaburst.png',
};
