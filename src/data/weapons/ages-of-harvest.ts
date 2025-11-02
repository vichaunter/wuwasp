import type { Weapon } from "@/types";
import { WeaponType } from "@/types";

export const ages_of_harvest: Weapon = {
  id: "ages-of-harvest",
  name: "Ages Of Harvest",
  slug: "ages-of-harvest",
  url: "https://game8.co/games/Wuthering-Waves/archives/458249",
  rarity: 5,
  type: WeaponType.Broadblade,
  baseAtk: 587,
  subStat: "",
  skill: "",
  skillDescription: "",
  materials: {
    common: "Whisperin Core",
    forgery: "Waveworn Residue",
    ascension: "",
  },
  image: "/weapons/ages-of-harvest.png",
};
