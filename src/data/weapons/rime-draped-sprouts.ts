import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const rime_draped_sprouts: Weapon = {
  id: 'rime-draped-sprouts',
  name: "Rime Draped Sprouts",
  slug: 'rime-draped-sprouts',
  url: 'https://game8.co/games/Wuthering-Waves/archives/464109',
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
  image: '/weapons/rime-draped-sprouts.png',
};
