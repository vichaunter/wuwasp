import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const cadenza: Weapon = {
  id: 'cadenza',
  name: "Cadenza",
  slug: 'cadenza',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455903',
  rarity: 4,
  type: WeaponType.Pistol,
  baseAtk: 337,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Crude Ring',
    forgery: 'Impure Phlogiston',
    ascension: '',
  },
  image: '/weapons/cadenza.png',
};
