import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

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
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.CADENCE_SEED,
    ascension: '',
  },
  image: '/weapons/marcato.png',
};
