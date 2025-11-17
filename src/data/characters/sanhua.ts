import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const sanhua: Character = {
  id: 'sanhua',
  name: 'sanhua',
  slug: 'sanhua',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454225',
  rarity: 4,
  element: Element.Glacio,
  weapon: WeaponType.Sword,
  materials: {
    ascension: {
      common: MaterialBaseName.WHISPERIN_CORE,
      boss: MaterialBaseName.SOUND_KEEPING_TACET_CORE,
      overworld: MaterialBaseName.WINTRY_BELL,
    },
    forte: {
      common: MaterialBaseName.WHISPERIN_CORE,
      forgery: MaterialBaseName.INERT_METALLIC_DRIP,
      boss: MaterialBaseName.UNENDING_DESTRUCTION,
    },
  },
  image: '/characters/sanhua.png',
};
