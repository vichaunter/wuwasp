import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const waltz_in_masquerade: Weapon = {
  id: 'waltz-in-masquerade',
  name: "Waltz In Masquerade",
  slug: 'waltz-in-masquerade',
  url: 'https://game8.co/games/Wuthering-Waves/archives/492573',
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
  image: '/weapons/waltz-in-masquerade.png',
};
