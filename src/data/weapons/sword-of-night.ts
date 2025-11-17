import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const sword_of_night: Weapon = {
  id: 'sword-of-night',
  name: "Sword Of Night",
  slug: 'sword-of-night',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455932',
  rarity: 3,
  type: WeaponType.Sword,
  baseAtk: 325,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.INERT_METALLIC_DRIP,
    ascension: '',
  },
  image: '/weapons/sword-of-night.png',
};
