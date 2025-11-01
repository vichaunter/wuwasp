import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const wildfire_mark: Weapon = {
  id: 'wildfire-mark',
  name: "Wildfire Mark",
  slug: 'wildfire-mark',
  url: 'https://game8.co/games/Wuthering-Waves/archives/524869',
  rarity: 5,
  type: WeaponType.Broadblade,
  baseAtk: 587,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Waveworn Residue',
    forgery: 'Whisperin Core',
    ascension: '',
  },
  image: '/weapons/wildfire-mark.png',
};
