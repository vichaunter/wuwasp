import { WeaponCard } from "@/components/cards";
import { weapons } from "@/data/weapons";

export default function WeaponList() {
  // Group weapons by rarity
  const fiveStarWeapons = weapons.filter((w) => w.rarity === 5);
  const fourStarWeapons = weapons.filter((w) => w.rarity === 4);
  const threeStarWeapons = weapons.filter((w) => w.rarity === 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Armas
        </h1>
        <p className="text-xl text-gray-400">
          Lista completa de armas disponibles
        </p>
      </div>

      {/* 5-Star Weapons */}
      {fiveStarWeapons.length > 0 && (
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-2">
              Armas de 5 Estrellas
            </h2>
            <p className="text-gray-400 text-sm">
              {fiveStarWeapons.length} armas disponibles
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fiveStarWeapons.map((weapon) => (
              <WeaponCard key={weapon.id} weapon={weapon} />
            ))}
          </div>
        </section>
      )}

      {/* 4-Star Weapons */}
      {fourStarWeapons.length > 0 && (
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-2">
              Armas de 4 Estrellas
            </h2>
            <p className="text-gray-400 text-sm">
              {fourStarWeapons.length} armas disponibles
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fourStarWeapons.map((weapon) => (
              <WeaponCard key={weapon.id} weapon={weapon} />
            ))}
          </div>
        </section>
      )}

      {/* 3-Star Weapons */}
      {threeStarWeapons.length > 0 && (
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-2">
              Armas de 3 Estrellas
            </h2>
            <p className="text-gray-400 text-sm">
              {threeStarWeapons.length} armas disponibles
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {threeStarWeapons.map((weapon) => (
              <WeaponCard key={weapon.id} weapon={weapon} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
