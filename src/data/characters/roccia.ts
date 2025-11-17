import type { Character } from '@/types';
import { MaterialBaseName } from '@/types';
import { Element, WeaponType } from '@/types';

export const roccia: Character = {
  id: 'roccia',
  name: 'roccia',
  slug: 'roccia',
  url: 'https://game8.co/games/Wuthering-Waves/archives/486246',
  rarity: 5,
  element: Element.Havoc,
  weapon: WeaponType.Gauntlet,
  materials: {
    ascension: {
      common: MaterialBaseName.TIDAL_RESIDUUM,
      boss: MaterialBaseName.CLEANSING_CONCH,
      overworld: MaterialBaseName.FIRECRACKER_JEWELWEED,
    },
    forte: {
      common: MaterialBaseName.TIDAL_RESIDUUM,
      forgery: MaterialBaseName.CADENCE_SEED,
      boss: 'The Netherworld\'s Stare',
    },
  },
  image: '/characters/roccia.png',
};
