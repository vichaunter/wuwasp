import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const lumingloss: Weapon = {
  id: 'lumingloss',
  name: "Lumingloss",
  slug: 'lumingloss',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455937',
  rarity: 4,
  type: WeaponType.Sword,
  baseAtk: 387,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.INERT_METALLIC_DRIP,
    ascension: '',
  },
  image: '/weapons/lumingloss.png',
};
