import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

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
    common: 'Howler Core',
    forgery: 'Inert Metallic Drip',
    ascension: '',
  },
  image: '/weapons/sword-of-night.png',
};
