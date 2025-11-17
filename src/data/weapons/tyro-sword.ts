import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const tyro_sword: Weapon = {
  id: 'tyro-sword',
  name: "Tyro Sword",
  slug: 'tyro-sword',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455930',
  rarity: 5,
  type: WeaponType.Sword,
  baseAtk: 0,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.INERT_METALLIC_DRIP,
    ascension: '',
  },
  image: '/weapons/tyro-sword.png',
};
