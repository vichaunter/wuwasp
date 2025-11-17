import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

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
    common: MaterialBaseName.RING,
    forgery: MaterialBaseName.LENTO_HELIX,
    ascension: '',
  },
  image: '/weapons/guardian-rectifier.png',
};
