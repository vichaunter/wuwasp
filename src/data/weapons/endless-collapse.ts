import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const endless_collapse: Weapon = {
  id: 'endless-collapse',
  name: "Endless Collapse",
  slug: 'endless-collapse',
  url: 'https://game8.co/games/Wuthering-Waves/archives/474515',
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
  image: '/weapons/endless-collapse.png',
};
