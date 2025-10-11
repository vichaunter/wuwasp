import type { Weapon } from '@/types';

const modules = import.meta.glob('./weapons/*.ts', { eager: true });

export const weapons: Weapon[] = Object.values(modules).map((module: any) => {
  // Each weapon file exports a single weapon object
  const weaponKey = Object.keys(module).find(key => key !== 'default');
  if (weaponKey) {
    return module[weaponKey];
  }
  return null;
}).filter(Boolean) as Weapon[];

