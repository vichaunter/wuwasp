import type { Character } from '@/types';
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
      common: 'Whisperin Core',
      boss: '',
      overworld: 'Pecok Flower',
    },
    forte: {
      common: 'Whisperin Core',
      forgery: 'Inert Metallic Drip',
      boss: 'Unending Destruction',
    },
  },
  image: '/characters/rover-spectro.png',
};
