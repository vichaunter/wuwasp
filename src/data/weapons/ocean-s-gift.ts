import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const ocean_s_gift: Weapon = {
  id: 'ocean-s-gift',
  name: "Ocean S Gift",
  slug: 'ocean-s-gift',
  url: 'https://game8.co/games/Wuthering-Waves/archives/498526',
  rarity: 4,
  type: WeaponType.Rectifier,
  baseAtk: 462,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.RING,
    forgery: MaterialBaseName.LENTO_HELIX,
    ascension: '',
  },
  image: '/weapons/ocean-s-gift.png',
};
