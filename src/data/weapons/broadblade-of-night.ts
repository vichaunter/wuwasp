import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const broadblade_of_night: Weapon = {
  id: 'broadblade-of-night',
  name: "Broadblade Of Night",
  slug: 'broadblade-of-night',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455946',
  rarity: 3,
  type: WeaponType.Broadblade,
  baseAtk: 325,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.WHISPERIN_CORE,
    forgery: MaterialBaseName.WAVEWORN_RESIDUE,
    ascension: '',
  },
  image: '/weapons/broadblade-of-night.png',
};
