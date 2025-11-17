import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const phoebe: Character = {
  id: 'phoebe',
  name: 'phoebe',
  slug: 'phoebe',
  url: 'https://game8.co/games/Wuthering-Waves/archives/486244',
  rarity: 5,
  element: Element.Spectro,
  weapon: WeaponType.Rectifier,
  materials: {
    ascension: {
      common: MaterialBaseName.WHISPERIN_CORE,
      boss: MaterialBaseName.CLEANSING_CONCH,
      overworld: MaterialBaseName.FIRECRACKER_JEWELWEED,
    },
    forte: {
      common: MaterialBaseName.WHISPERIN_CORE,
      forgery: MaterialBaseName.LENTO_HELIX,
      boss: 'Sentinel\'s Dagger',
    },
  },
  image: '/characters/phoebe.png',
};
