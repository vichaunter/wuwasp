import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const verdant_summit: Weapon = {
  id: 'verdant-summit',
  name: "Verdant Summit",
  slug: 'verdant-summit',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455951',
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
  image: '/weapons/verdant-summit.png',
};
