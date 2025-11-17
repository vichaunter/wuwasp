import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

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
    common: MaterialBaseName.WHISPERIN_CORE,
    forgery: MaterialBaseName.WAVEWORN_RESIDUE,
    ascension: '',
  },
  image: '/weapons/lustrous-razor.png',
};
