import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const rover_aero: Character = {
  id: 'rover-aero',
  name: 'rover-aero',
  slug: 'rover-aero',
  url: 'https://game8.co/games/Wuthering-Waves/archives/505267',
  rarity: 5,
  element: Element.Aero,
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
      boss: MaterialBaseName.WHEN_IRISES_BLOOM,
    },
  },
  image: '/characters/rover-aero.png',
};
