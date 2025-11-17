import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const broadblade_41: Weapon = {
  id: 'broadblade-41',
  name: "Broadblade 41",
  slug: 'broadblade-41',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455953',
  rarity: 4,
  type: WeaponType.Broadblade,
  baseAtk: 412,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.WHISPERIN_CORE,
    forgery: MaterialBaseName.WAVEWORN_RESIDUE,
    ascension: '',
  },
  image: '/weapons/broadblade-41.png',
};
