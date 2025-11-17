import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const bloodpact_s_pledge: Weapon = {
  id: 'bloodpact-s-pledge',
  name: "Bloodpact S Pledge",
  slug: 'bloodpact-s-pledge',
  url: 'https://game8.co/games/Wuthering-Waves/archives/506483',
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
  image: '/weapons/bloodpact-s-pledge.png',
};
