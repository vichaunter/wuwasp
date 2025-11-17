import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const tragicomedy: Weapon = {
  id: 'tragicomedy',
  name: "Tragicomedy",
  slug: 'tragicomedy',
  url: 'https://game8.co/games/Wuthering-Waves/archives/491971',
  rarity: 5,
  type: WeaponType.Gauntlet,
  baseAtk: 587,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.CADENCE_SEED,
    ascension: '',
  },
  image: '/weapons/tragicomedy.png',
};
