import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const lustrous_razor: Weapon = {
  id: 'lustrous-razor',
  name: "Lustrous Razor",
  slug: 'lustrous-razor',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455952',
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
  image: '/weapons/lustrous-razor.png',
};
