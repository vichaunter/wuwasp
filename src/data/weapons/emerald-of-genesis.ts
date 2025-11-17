import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const emerald_of_genesis: Weapon = {
  id: 'emerald-of-genesis',
  name: "Emerald Of Genesis",
  slug: 'emerald-of-genesis',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455939',
  rarity: 5,
  type: WeaponType.Sword,
  baseAtk: 587,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.INERT_METALLIC_DRIP,
    ascension: '',
  },
  image: '/weapons/emerald-of-genesis.png',
};
