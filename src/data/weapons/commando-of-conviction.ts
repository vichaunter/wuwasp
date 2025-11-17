import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const commando_of_conviction: Weapon = {
  id: 'commando-of-conviction',
  name: "Commando Of Conviction",
  slug: 'commando-of-conviction',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455938',
  rarity: 4,
  type: WeaponType.Sword,
  baseAtk: 412,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.INERT_METALLIC_DRIP,
    ascension: '',
  },
  image: '/weapons/commando-of-conviction.png',
};
