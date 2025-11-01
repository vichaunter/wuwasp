import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

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
    common: 'Howler Core',
    forgery: 'Inert Metallic Drip',
    ascension: '',
  },
  image: '/weapons/lunar-cutter.png',
};
