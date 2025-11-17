import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const training_sword: Weapon = {
  id: 'training-sword',
  name: "Training Sword",
  slug: 'training-sword',
  url: 'https://game8.co/games/Wuthering-Waves/archives/455929',
  rarity: 5,
  type: WeaponType.Sword,
  baseAtk: 0,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.INERT_METALLIC_DRIP,
    ascension: '',
  },
  image: '/weapons/training-sword.png',
};
