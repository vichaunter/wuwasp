import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const fables_of_wisdom: Weapon = {
  id: 'fables-of-wisdom',
  name: "Fables Of Wisdom",
  slug: 'fables-of-wisdom',
  url: 'https://game8.co/games/Wuthering-Waves/archives/492569',
  rarity: 4,
  type: WeaponType.Sword,
  baseAtk: 462,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Howler Core',
    forgery: 'Inert Metallic Drip',
    ascension: '',
  },
  image: '/weapons/fables-of-wisdom.png',
};
