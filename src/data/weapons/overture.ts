import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const overture: Weapon = {
  id: 'overture',
  name: "Overture",
  slug: 'overture',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455935',
  rarity: 4,
  type: WeaponType.Sword,
  baseAtk: 337,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Howler Core',
    forgery: 'Inert Metallic Drip',
    ascension: '',
  },
  image: '/weapons/overture.png',
};
