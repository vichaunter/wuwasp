import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const comet_flare: Weapon = {
  id: 'comet-flare',
  name: "Comet Flare",
  slug: 'comet-flare',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455925',
  rarity: 4,
  type: WeaponType.Rectifier,
  baseAtk: 412,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.RING,
    forgery: MaterialBaseName.LENTO_HELIX,
    ascension: '',
  },
  image: '/weapons/comet-flare.png',
};
