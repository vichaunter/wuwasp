import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const yuanwu: Character = {
  id: 'yuanwu',
  name: 'yuanwu',
  slug: 'yuanwu',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454219',
  rarity: 4,
  element: Element.Electro,
  weapon: WeaponType.Gauntlet,
  materials: {
    ascension: {
      common: MaterialBaseName.RING,
      boss: MaterialBaseName.HIDDEN_THUNDER_TACET_CORE,
      overworld: MaterialBaseName.TERRASPAWN_FUNGUS,
    },
    forte: {
      common: MaterialBaseName.RING,
      forgery: MaterialBaseName.CADENCE_SEED,
      boss: MaterialBaseName.UNENDING_DESTRUCTION,
    },
  },
  image: '/characters/yuanwu.png',
};
