import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const sword_of_voyager: Weapon = {
  id: 'sword-of-voyager',
  name: "Sword Of Voyager",
  slug: 'sword-of-voyager',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455931',
  rarity: 3,
  type: WeaponType.Sword,
  baseAtk: 300,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.INERT_METALLIC_DRIP,
    ascension: '',
  },
  image: '/weapons/sword-of-voyager.png',
};
