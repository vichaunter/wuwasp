import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

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
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.CADENCE_SEED,
    ascension: '',
  },
  image: '/weapons/gauntlets-of-voyager.png',
};
