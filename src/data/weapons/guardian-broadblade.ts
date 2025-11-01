import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

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
    common: 'Waveworn Residue',
    forgery: 'Whisperin Core',
    ascension: '',
  },
  image: '/weapons/guardian-broadblade.png',
};
