import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const gauntlets_of_voyager: Weapon = {
  id: 'gauntlets-of-voyager',
  name: "Gauntlets Of Voyager",
  slug: 'gauntlets-of-voyager',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455909',
  rarity: 3,
  type: WeaponType.Gauntlet,
  baseAtk: 325,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Howler Core',
    forgery: 'Cadence Seed',
    ascension: '',
  },
  image: '/weapons/gauntlets-of-voyager.png',
};
