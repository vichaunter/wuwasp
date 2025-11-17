import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const guardian_broadblade: Weapon = {
  id: 'guardian-broadblade',
  name: "Guardian Broadblade",
  slug: 'guardian-broadblade',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455944',
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
  image: '/weapons/guardian-broadblade.png',
};
