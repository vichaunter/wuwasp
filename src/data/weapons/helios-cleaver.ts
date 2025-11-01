import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const helios_cleaver: Weapon = {
  id: 'helios-cleaver',
  name: "Helios Cleaver",
  slug: 'helios-cleaver',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455947',
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
  image: '/weapons/helios-cleaver.png',
};
