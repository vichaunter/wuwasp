import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const somnoire_anchor: Weapon = {
  id: 'somnoire-anchor',
  name: "Somnoire Anchor",
  slug: 'somnoire-anchor',
  url: 'https://game8.co/games/Wuthering-Waves/archives/483284',
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
  image: '/weapons/somnoire-anchor.png',
};
