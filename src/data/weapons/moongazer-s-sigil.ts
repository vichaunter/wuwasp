import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const moongazer_s_sigil: Weapon = {
  id: 'moongazer-s-sigil',
  name: "Moongazer S Sigil",
  slug: 'moongazer-s-sigil',
  url: 'https://game8.co/games/Wuthering-Waves/archives/544474',
  rarity: 5,
  type: WeaponType.Gauntlet,
  baseAtk: 500,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.CADENCE_SEED,
    ascension: '',
  },
  image: '/weapons/moongazer-s-sigil.png',
};
