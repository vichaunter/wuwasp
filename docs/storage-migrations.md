# Sistema de Migraciones de Storage

## Resumen

El sistema de migraciones maneja automáticamente las actualizaciones de la estructura de datos guardada en `localStorage` cuando el código cambia entre versiones.

## ¿Cómo funciona?

### 1. Versionado

Cada versión de la estructura de datos tiene un número:

```typescript
// src/utils/storage-migrations.ts
export const CURRENT_STORAGE_VERSION = 2;
```

Los datos guardados en `localStorage` incluyen un campo `version`:

```typescript
{
  version: 2,
  inventory: {...},
  characterProgress: {...},
  weaponProgress: {...}
}
```

### 2. Detección Automática

Al cargar la aplicación, Zustand detecta si la versión guardada es diferente a la versión actual:

```typescript
// src/store/inventory.ts
export const useInventoryStore = create<InventoryState>()(
  persist(
    immer((set, get) => ({...})),
    {
      name: 'wuwa-planner-inventory',
      version: CURRENT_STORAGE_VERSION,
      migrate: (persistedState: any, version: number) => {
        return applyMigrations(persistedState);
      },
    }
  )
);
```

### 3. Aplicación de Migraciones

Las migraciones se aplican secuencialmente desde la versión guardada hasta la versión actual:

```
Versión guardada: 0
Versión actual: 2

Proceso:
1. Aplica migración v0→v1
2. Aplica migración v1→v2
3. Guarda los datos con version: 2
```

## Historial de Migraciones

### Versión 1 → 2 (Actualización del Circuito Forte)

**Cambios:**

- Se eliminaron campos antiguos: `passive1`, `passive2`, `bonusPassive`
- Se agregaron nuevos campos:
  - `statBonus1`, `statBonus2`, `statBonus3`, `statBonus4` (0-2 cada uno)
  - `inherentSkill1`, `inherentSkill2` (0-2 cada uno)

**Función de migración:**

```typescript
function migrateV1toV2(data: any): any {
  if (data.characterProgress) {
    Object.keys(data.characterProgress).forEach((characterId) => {
      const progress = data.characterProgress[characterId];

      if (progress.forte) {
        const oldForte = progress.forte;

        // Eliminar campos antiguos
        delete oldForte.passive1;
        delete oldForte.passive2;
        delete oldForte.bonusPassive;

        // Agregar nuevos campos con valores por defecto
        progress.forte.statBonus1 = { current: 0, target: 2 };
        progress.forte.statBonus2 = { current: 0, target: 2 };
        progress.forte.statBonus3 = { current: 0, target: 2 };
        progress.forte.statBonus4 = { current: 0, target: 2 };
        progress.forte.inherentSkill1 = { current: 0, target: 2 };
        progress.forte.inherentSkill2 = { current: 0, target: 2 };
      }
    });
  }

  return data;
}
```

## Cómo Agregar una Nueva Migración

### Paso 1: Incrementar la versión

```typescript
// src/utils/storage-migrations.ts
export const CURRENT_STORAGE_VERSION = 3; // Incrementar
```

### Paso 2: Crear la función de migración

```typescript
// En src/utils/storage-migrations.ts

function migrateV2toV3(data: any): any {
  console.log("🔄 Migrating storage from v2 to v3...");

  // Tu lógica de migración aquí
  // Por ejemplo, agregar un nuevo campo:
  if (data.weaponProgress) {
    Object.keys(data.weaponProgress).forEach((weaponId) => {
      const progress = data.weaponProgress[weaponId];

      // Agregar nuevo campo
      progress.newField = defaultValue;
    });
  }

  return data;
}
```

### Paso 3: Registrar la migración

```typescript
// En src/utils/storage-migrations.ts

const migrations: Record<number, (data: any) => any> = {
  1: migrateV1toV2,
  2: migrateV2toV3, // Agregar aquí
};
```

### Paso 4: Probar la migración

1. Crea datos con la versión anterior en `localStorage`
2. Recarga la aplicación
3. Verifica que los datos se migren correctamente
4. Comprueba la consola del navegador para ver los logs de migración

## Logs en Consola

Al migrar datos, verás estos mensajes en la consola del navegador:

```
🔧 Storage migration triggered from version 1
📦 Storage version: 1 (current: 2)
🔄 Migrating storage from v1 to v2...
  ✓ Migrated character: augusta
  ✓ Migrated character: camellya
  ✓ Migrated to version 2
✅ Migrations completed successfully
💾 Migrated data saved to localStorage
```

## Tests

El sistema de migraciones debe ser probado:

```typescript
// Ejemplo de test
it("should migrate from v1 to v2", () => {
  const oldData = {
    version: 1,
    characterProgress: {
      "test-char": {
        forte: {
          passive1: { current: 0, target: 1 },
          passive2: { current: 0, target: 1 },
          bonusPassive: { current: 0, target: 1 },
        },
      },
    },
  };

  const migrated = applyMigrations(oldData);

  expect(migrated.version).toBe(2);
  expect(
    migrated.characterProgress["test-char"].forte.statBonus1
  ).toBeDefined();
  expect(
    migrated.characterProgress["test-char"].forte.passive1
  ).toBeUndefined();
});
```

## Reseteo Manual

Si algo sale mal con las migraciones, el usuario puede resetear manualmente desde la consola del navegador:

```javascript
// Resetear todo el storage
localStorage.removeItem("wuwa-planner-inventory");
location.reload();
```

## Mejores Prácticas

1. **Nunca elimines migraciones antiguas** - Los usuarios pueden estar en versiones muy antiguas
2. **Haz migraciones pequeñas e incrementales** - Es más fácil de mantener y depurar
3. **Siempre proporciona valores por defecto** - Para campos nuevos
4. **Prueba las migraciones** - Con datos reales antes de desplegar
5. **Documenta cada migración** - Explica qué cambió y por qué
6. **Considera migrar gradualmente** - Para cambios muy grandes, usa múltiples versiones

## Solución de Problemas

### Los datos no se migran

- Verifica que `CURRENT_STORAGE_VERSION` esté incrementado
- Revisa la consola del navegador para ver errores
- Asegúrate de que la función de migración esté registrada

### La migración falla

- Los errores en las migraciones se logean en la consola
- Si una migración falla, el storage podría quedar inconsistente
- En caso de fallo, el usuario debe resetear manualmente

### Datos corruptos

- Si los datos están muy corruptos, la aplicación podría ofrecer un botón de "Reset" en la UI
- Implementar validación de datos después de las migraciones puede ayudar

## Futuras Mejoras

- [ ] UI para ver la versión actual de los datos
- [ ] Botón de "Reset Storage" en la aplicación
- [ ] Exportar/Importar datos para backup
- [ ] Validación de esquema después de migraciones
- [ ] Rollback automático si una migración falla

📊 Soy Beecthor y hoy te traigo el análisis de Bitcoin (BTC) más completo y actualizado. Hoy revisamos el precio de Bitcoin, las noticias cripto más importantes y el análisis de Bitcoin al día para entender si caerá Bitcoin hoy o si el BTC subirá con fuerza. Exploramos las ondas Elliott en Bitcoin, la situación del ETF de Bitcoin, las recientes liquidaciones de Bitcoin y lo que podría significar para la próxima proyección del precio de Bitcoin. Todo esto con una mirada profesional, técnica y enfocada en el análisis del precio de Bitcoin hoy, para que no te pierdas ni un solo movimiento del mercado.

🚀 En este video descubrirás si Bitcoin explota al alza o si se avecina una nueva corrección. Analizamos las noticias de Bitcoin más relevantes, el comportamiento del BTC hoy, y el pronóstico de Bitcoin a corto y mediano plazo. Este análisis de Bitcoin combina datos, técnica y contexto para ayudarte a entender hacia dónde podría dirigirse el precio de Bitcoin. Si te apasiona el análisis BTC, las noticias Bitcoin y todo lo relacionado con las criptomonedas, este es tu lugar: bienvenido a Beecthor, donde cada día te traigo el Bitcoin análisis más claro y actualizado.
