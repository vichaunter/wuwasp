import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const originite_type_i: Weapon = {
  id: 'originite-type-i',
  name: "Originite Type I",
  slug: 'originite-type-i',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455943',
  rarity: 3,
  type: WeaponType.Broadblade,
  baseAtk: 300,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.WHISPERIN_CORE,
    forgery: MaterialBaseName.WAVEWORN_RESIDUE,
    ascension: '',
  },
  image: '/weapons/originite-type-i.png',
};
