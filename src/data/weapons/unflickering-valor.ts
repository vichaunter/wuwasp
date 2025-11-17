import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

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
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.INERT_METALLIC_DRIP,
    ascension: '',
  },
  image: '/weapons/unflickering-valor.png',
};
