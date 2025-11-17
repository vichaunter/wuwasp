import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const luminous_hymn: Weapon = {
  id: 'luminous-hymn',
  name: "Luminous Hymn",
  slug: 'luminous-hymn',
  url: 'https://game8.co/games/Wuthering-Waves/archives/498527',
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
  image: '/weapons/luminous-hymn.png',
};
