import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const stringmaster: Weapon = {
  id: 'stringmaster',
  name: "Stringmaster",
  slug: 'stringmaster',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455927',
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
  image: '/weapons/stringmaster.png',
};
