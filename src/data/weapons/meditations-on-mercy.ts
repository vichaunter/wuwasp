import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const meditations_on_mercy: Weapon = {
  id: 'meditations-on-mercy',
  name: "Meditations On Mercy",
  slug: 'meditations-on-mercy',
  url: 'https://game8.co/games/Wuthering-Waves/archives/492570',
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
  image: '/weapons/meditations-on-mercy.png',
};
