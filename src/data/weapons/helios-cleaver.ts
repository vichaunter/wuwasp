import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

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
    common: MaterialBaseName.WHISPERIN_CORE,
    forgery: MaterialBaseName.WAVEWORN_RESIDUE,
    ascension: '',
  },
  image: '/weapons/helios-cleaver.png',
};
