import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const guardian_sword: Weapon = {
  id: 'guardian-sword',
  name: "Guardian Sword",
  slug: 'guardian-sword',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455934',
  rarity: 3,
  type: WeaponType.Sword,
  baseAtk: 300,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: 'Howler Core',
    forgery: 'Inert Metallic Drip',
    ascension: '',
  },
  image: '/weapons/guardian-sword.png',
};
