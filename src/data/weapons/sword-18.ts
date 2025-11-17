import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const sword_18: Weapon = {
  id: 'sword-18',
  name: "Sword 18",
  slug: 'sword-18',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455940',
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
  image: '/weapons/sword-18.png',
};
