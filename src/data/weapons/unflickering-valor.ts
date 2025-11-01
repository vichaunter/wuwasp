import type { Weapon } from '@/types';
import { WeaponType } from '@/types';

export const unflickering_valor: Weapon = {
  id: 'unflickering-valor',
  name: "Unflickering Valor",
  slug: 'unflickering-valor',
  url: 'https://game8.co/games/Wuthering-Waves/archives/498528',
  rarity: 5,
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
  image: '/weapons/unflickering-valor.png',
};
