import type { Material } from "@/types";

interface MaterialCardImageProps {
  material: Material;
  showTooltip: boolean;
  bgGradient: string;
  showTitle?: boolean;
}

export function MaterialCardImage({
  material,
  showTooltip,
  bgGradient,
  showTitle = false,
}: MaterialCardImageProps) {
  return (
    <div className="relative w-full bg-gradient-to-b from-gray-900 to-gray-950 flex flex-col">
      {/* Gradient glow behind image - intensifies on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${bgGradient} transition-opacity duration-300 ${
          showTooltip ? "opacity-70" : "opacity-30"
        } blur-2xl`}
      ></div>

      {/* Title visible - integrado con el fondo gradiente, arriba con padding */}
      {showTitle && (
        <div className="relative top-0 left-0 right-0 px-2 py-2 z-10 flex-shrink-0">
          <div className="text-xs font-medium text-white truncate text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {material.name}
          </div>
        </div>
      )}

      {/* Image container - se adapta al contenido con padding adicional si hay título */}
      <div
        className={`relative w-full flex items-center justify-center flex-shrink-0 ${
          showTitle ? "p-2 pb-3" : "p-1"
        }`}
      >
        <img
          src={`/materials/${material.id}.webp`}
          alt={material.name}
          className="w-full h-auto max-h-24 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-[1.15] group-hover:rotate-[6deg]"
          style={{ maxWidth: "100%" }}
        />
      </div>
    </div>
  );
}
