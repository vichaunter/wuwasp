import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const red_spring: Weapon = {
  id: 'red-spring',
  name: "Red Spring",
  slug: 'red-spring',
  url: 'https://game8.co/games/Wuthering-Waves/archives/483281',
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
  image: '/weapons/red-spring.png',
};
