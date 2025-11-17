import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const blazing_brilliance: Weapon = {
  id: 'blazing-brilliance',
  name: "Blazing Brilliance",
  slug: 'blazing-brilliance',
  url: 'https://game8.co/games/Wuthering-Waves/archives/458273',
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
  image: '/weapons/blazing-brilliance.png',
};
