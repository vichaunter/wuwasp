import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const call_of_the_abyss: Weapon = {
  id: 'call-of-the-abyss',
  name: "Call Of The Abyss",
  slug: 'call-of-the-abyss',
  url: 'https://game8.co/games/Wuthering-Waves/archives/492574',
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
  image: '/weapons/call-of-the-abyss.png',
};
