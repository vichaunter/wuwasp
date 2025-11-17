import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const broadblade_of_voyager: Weapon = {
  id: 'broadblade-of-voyager',
  name: "Broadblade Of Voyager",
  slug: 'broadblade-of-voyager',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455945',
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
  image: '/weapons/broadblade-of-voyager.png',
};
