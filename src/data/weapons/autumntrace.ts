import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const autumntrace: Weapon = {
  id: 'autumntrace',
  name: "Autumntrace",
  slug: 'autumntrace',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455950',
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
  image: '/weapons/autumntrace.png',
};
