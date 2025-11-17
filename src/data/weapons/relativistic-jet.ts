import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const relativistic_jet: Weapon = {
  id: 'relativistic-jet',
  name: "Relativistic Jet",
  slug: 'relativistic-jet',
  url: 'https://game8.co/games/Wuthering-Waves/archives/474513',
  rarity: 4,
  type: WeaponType.Pistol,
  baseAtk: 462,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.RING,
    forgery: MaterialBaseName.IMPURE_PHLOGISTON,
    ascension: '',
  },
  image: '/weapons/relativistic-jet.png',
};
