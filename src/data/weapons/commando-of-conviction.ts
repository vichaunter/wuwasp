import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const commando_of_conviction: Weapon = {
  id: 'commando-of-conviction',
  name: "Commando Of Conviction",
  slug: 'commando-of-conviction',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455938',
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
  image: '/weapons/commando-of-conviction.png',
};
