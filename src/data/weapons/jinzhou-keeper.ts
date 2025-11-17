import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const jinzhou_keeper: Weapon = {
  id: 'jinzhou-keeper',
  name: "Jinzhou Keeper",
  slug: 'jinzhou-keeper',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455924',
  rarity: 4,
  type: WeaponType.Rectifier,
  baseAtk: 387,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.RING,
    forgery: MaterialBaseName.LENTO_HELIX,
    ascension: '',
  },
  image: '/weapons/jinzhou-keeper.png',
};
