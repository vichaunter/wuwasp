import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const rectifier_of_voyager: Weapon = {
  id: 'rectifier-of-voyager',
  name: "Rectifier Of Voyager",
  slug: 'rectifier-of-voyager',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455919',
  rarity: 3,
  type: WeaponType.Rectifier,
  baseAtk: 300,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.RING,
    forgery: MaterialBaseName.LENTO_HELIX,
    ascension: '',
  },
  image: '/weapons/rectifier-of-voyager.png',
};
