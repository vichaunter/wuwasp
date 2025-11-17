import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const pistols_of_voyager: Weapon = {
  id: 'pistols-of-voyager',
  name: "Pistols Of Voyager",
  slug: 'pistols-of-voyager',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455896',
  rarity: 3,
  type: WeaponType.Pistol,
  baseAtk: 300,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.RING,
    forgery: MaterialBaseName.IMPURE_PHLOGISTON,
    ascension: '',
  },
  image: '/weapons/pistols-of-voyager.png',
};
