import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const lunar_cutter: Weapon = {
  id: 'lunar-cutter',
  name: "Lunar Cutter",
  slug: 'lunar-cutter',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455936',
  rarity: 4,
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
  image: '/weapons/lunar-cutter.png',
};
