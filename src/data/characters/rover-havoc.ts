import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const rover_havoc: Character = {
  id: 'rover-havoc',
  name: 'rover-havoc',
  slug: 'rover-havoc',
  url: 'https://game8.co/games/Wuthering-Waves/archives/456120',
  rarity: 5,
  element: Element.Havoc,
  weapon: WeaponType.Sword,
  materials: {
    ascension: {
      common: MaterialBaseName.WHISPERIN_CORE,
      boss: '',
      overworld: MaterialBaseName.PECOK_FLOWER,
    },
    forte: {
      common: MaterialBaseName.WHISPERIN_CORE,
      forgery: MaterialBaseName.INERT_METALLIC_DRIP,
      boss: MaterialBaseName.DREAMLESS_FEATHER,
    },
  },
  image: '/characters/rover-havoc.png',
};
