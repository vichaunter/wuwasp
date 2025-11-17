import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const lethean_elegy: Weapon = {
  id: 'lethean-elegy',
  name: "Lethean Elegy",
  slug: 'lethean-elegy',
  url: 'https://game8.co/games/Wuthering-Waves/archives/537943',
  rarity: 5,
  type: WeaponType.Rectifier,
  baseAtk: 587,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.RING,
    forgery: MaterialBaseName.LENTO_HELIX,
    ascension: '',
  },
  image: '/weapons/lethean-elegy.png',
};
