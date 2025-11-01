import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const the_last_dance: Weapon = {
  id: 'the-last-dance',
  name: "The Last Dance",
  slug: 'the-last-dance',
  url: 'https://game8.co/games/Wuthering-Waves/archives/491970',
  rarity: 5,
  type: WeaponType.Pistol,
  baseAtk: 500,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Crude Ring',
    forgery: 'Impure Phlogiston',
    ascension: '',
  },
  image: '/weapons/the-last-dance.png',
};
