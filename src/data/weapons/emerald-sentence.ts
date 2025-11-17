import type { Weapon } from '@/types';
import { WeaponType, MaterialBaseName } from '@/types';

export const emerald_sentence: Weapon = {
  id: 'emerald-sentence',
  name: "Emerald Sentence",
  slug: 'emerald-sentence',
  url: 'https://game8.co/games/Wuthering-Waves/archives/553562',
  rarity: 5,
  type: WeaponType.Sword,
  baseAtk: 587,
  subStat: '',
  skill: '',
  skillDescription: '',
  materials: {
    common: MaterialBaseName.HOWLER_CORE,
    forgery: MaterialBaseName.INERT_METALLIC_DRIP,
    ascension: '',
  },
  image: '/weapons/emerald-sentence.png',
};
