import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const rover_spectro: Character = {
  id: 'rover-spectro',
  name: 'rover-spectro',
  slug: 'rover-spectro',
  url: 'https://game8.co/games/Wuthering-Waves/archives/454228',
  rarity: 5,
  element: Element.Spectro,
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
      boss: MaterialBaseName.UNENDING_DESTRUCTION,
    },
  },
  image: '/characters/rover-spectro.png',
};
