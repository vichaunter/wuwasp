import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const waning_redshift: Weapon = {
  id: 'waning-redshift',
  name: "Waning Redshift",
  slug: 'waning-redshift',
  url: 'https://game8.co/games/Wuthering-Waves/archives/474514',
  rarity: 4,
  type: WeaponType.Broadblade,
  baseAtk: 462,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.WHISPERIN_CORE,
    forgery: MaterialBaseName.WAVEWORN_RESIDUE,
    ascension: '',
  },
  image: '/weapons/waning-redshift.png',
};
