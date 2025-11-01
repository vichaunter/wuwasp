import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const guardian_rectifier: Weapon = {
  id: 'guardian-rectifier',
  name: "Guardian Rectifier",
  slug: 'guardian-rectifier',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455922',
  rarity: 3,
  type: WeaponType.Rectifier,
  baseAtk: 325,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Crude Ring',
    forgery: 'Lento Helix',
    ascension: '',
  },
  image: '/weapons/guardian-rectifier.png',
};
