import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const aureate_zenith: Weapon = {
  id: 'aureate-zenith',
  name: "Aureate Zenith",
  slug: 'aureate-zenith',
  url: 'https://game8.co/games/Wuthering-Waves/archives/544589',
  rarity: 4,
  type: WeaponType.Broadblade,
  baseAtk: 412,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Waveworn Residue',
    forgery: 'Whisperin Core',
    ascension: '',
  },
  image: '/weapons/aureate-zenith.png',
};
