import type { Character } from '@/types';
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
      common: 'Whisperin Core',
      boss: 'Sound-Keeping Tacet Core',
      overworld: 'Wintry Bell',
    },
    forte: {
      common: 'Whisperin Core',
      forgery: 'Inert Metallic Drip',
      boss: 'Unending Destruction',
    },
  },
  image: '/characters/sanhua.png',
};
