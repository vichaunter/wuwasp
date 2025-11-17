import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const beguiling_melody: Weapon = {
  id: 'beguiling-melody',
  name: "Beguiling Melody",
  slug: 'beguiling-melody',
  url: 'https://game8.co/games/Wuthering-Waves/archives/458986',
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
  image: '/weapons/beguiling-melody.png',
};
