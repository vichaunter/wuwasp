import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const lumingloss: Weapon = {
  id: 'lumingloss',
  name: "Lumingloss",
  slug: 'lumingloss',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455937',
  rarity: 4,
  type: WeaponType.Sword,
  baseAtk: 387,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Howler Core',
    forgery: 'Inert Metallic Drip',
    ascension: '',
  },
  image: '/weapons/lumingloss.png',
};
