import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const dauntless_evernight: Weapon = {
  id: 'dauntless-evernight',
  name: "Dauntless Evernight",
  slug: 'dauntless-evernight',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455949',
  rarity: 4,
  type: WeaponType.Broadblade,
  baseAtk: 337,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.WHISPERIN_CORE,
    forgery: MaterialBaseName.WAVEWORN_RESIDUE,
    ascension: '',
  },
  image: '/weapons/dauntless-evernight.png',
};
