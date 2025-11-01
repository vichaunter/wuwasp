import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const marcato: Weapon = {
  id: 'marcato',
  name: "Marcato",
  slug: 'marcato',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455912',
  rarity: 4,
  type: WeaponType.Gauntlet,
  baseAtk: 337,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Howler Core',
    forgery: 'Cadence Seed',
    ascension: '',
  },
  image: '/weapons/marcato.png',
};
