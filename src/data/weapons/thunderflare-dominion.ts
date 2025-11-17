import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const thunderflare_dominion: Weapon = {
  id: 'thunderflare-dominion',
  name: "Thunderflare Dominion",
  slug: 'thunderflare-dominion',
  url: 'https://game8.co/games/Wuthering-Waves/archives/544473',
  rarity: 5,
  type: WeaponType.Broadblade,
  baseAtk: 675,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.WHISPERIN_CORE,
    forgery: MaterialBaseName.WAVEWORN_RESIDUE,
    ascension: '',
  },
  image: '/weapons/thunderflare-dominion.png',
};
