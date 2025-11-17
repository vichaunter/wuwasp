import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const tyro_rectifier: Weapon = {
  id: 'tyro-rectifier',
  name: "Tyro Rectifier",
  slug: 'tyro-rectifier',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455918',
  rarity: 5,
  type: WeaponType.Rectifier,
  baseAtk: 0,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.RING,
    forgery: MaterialBaseName.LENTO_HELIX,
    ascension: '',
  },
  image: '/weapons/tyro-rectifier.png',
};
