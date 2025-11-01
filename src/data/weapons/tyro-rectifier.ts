import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

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
    common: 'Crude Ring',
    forgery: 'Lento Helix',
    ascension: '',
  },
  image: '/weapons/tyro-rectifier.png',
};
