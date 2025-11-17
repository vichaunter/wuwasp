import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const discord: Weapon = {
  id: 'discord',
  name: "Discord",
  slug: 'discord',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455948',
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
  image: '/weapons/discord.png',
};
