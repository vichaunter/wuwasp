import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const defier_s_thorn: Weapon = {
  id: 'defier-s-thorn',
  name: "Defier S Thorn",
  slug: 'defier-s-thorn',
  url: 'https://game8.co/games/Wuthering-Waves/archives/524868',
  rarity: 5,
  type: WeaponType.Sword,
  baseAtk: 412,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.INERT_METALLIC_DRIP,
    ascension: '',
  },
  image: '/weapons/defier-s-thorn.png',
};
