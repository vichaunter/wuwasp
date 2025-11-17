import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const tyro_broadblade: Weapon = {
  id: 'tyro-broadblade',
  name: "Tyro Broadblade",
  slug: 'tyro-broadblade',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455942',
  rarity: 5,
  type: WeaponType.Broadblade,
  baseAtk: 0,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.WHISPERIN_CORE,
    forgery: MaterialBaseName.WAVEWORN_RESIDUE,
    ascension: '',
  },
  image: '/weapons/tyro-broadblade.png',
};
