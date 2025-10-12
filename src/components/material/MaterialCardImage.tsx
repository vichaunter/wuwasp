import type { Material } from "@/types";

interface MaterialCardImageProps {
  material: Material;
  showTooltip: boolean;
  bgGradient: string;
}

export function MaterialCardImage({
  material,
  showTooltip,
  bgGradient,
}: MaterialCardImageProps) {
  return (
    <div className="relative w-full aspect-square bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Gradient glow behind image - intensifies on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${bgGradient} transition-opacity duration-300 ${
          showTooltip ? "opacity-70" : "opacity-30"
        } blur-2xl`}
      ></div>

      {/* Image container */}
      <div className="relative w-full h-full flex items-center justify-center p-3">
        <img
          src={`/materials/${material.id}.webp`}
          alt={material.name}
          className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-[1.15] group-hover:rotate-[6deg]"
        />
      </div>
    </div>
  );
}
