import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

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
    common: MaterialBaseName.WHISPERIN_CORE,
    forgery: MaterialBaseName.WAVEWORN_RESIDUE,
    ascension: '',
  },
  image: '/weapons/wildfire-mark.png',
};
