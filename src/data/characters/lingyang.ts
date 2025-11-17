import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const lingyang: Character = {
  id: 'lingyang',
  name: 'lingyang',
  slug: 'lingyang',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454223',
  rarity: 5,
  element: Element.Glacio,
  weapon: WeaponType.Gauntlet,
  materials: {
    ascension: {
      common: MaterialBaseName.WHISPERIN_CORE,
      boss: MaterialBaseName.SOUND_KEEPING_TACET_CORE,
      overworld: MaterialBaseName.CORIOLUS,
    },
    forte: {
      common: MaterialBaseName.WHISPERIN_CORE,
      forgery: MaterialBaseName.CADENCE_SEED,
      boss: MaterialBaseName.UNENDING_DESTRUCTION,
    },
  },
  image: '/characters/lingyang.png',
};
