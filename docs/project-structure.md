# Estructura del Proyecto

## Carpetas principales

### `/src`
Código fuente de la aplicación.

- **`/pages`**: Páginas de la aplicación (rutas)
- **`/components`**: Componentes reutilizables de React
- **`/data`**: Archivos de datos de personajes y materiales
- **`/types`**: Definiciones de tipos TypeScript
- **`/utils`**: Funciones de utilidad
- **`/hooks`**: Custom hooks de React
- **`/store`**: Gestión de localStorage para persistencia de datos

### `/scripts`
Scripts de utilidad para importar/actualizar datos del juego.

### `/docs`
Documentación del proyecto.

## Tecnologías

- **React 18** con TypeScript
- **Vite** como bundler
- **Tailwind CSS v4** para estilos
- **React Router** para navegación
- **Vitest** para unit testing
- **localStorage** para persistencia de datos del usuario
- **pnpm** como gestor de paquetes

## Características

- ✅ Imports absolutos con alias `@/` (en lugar de imports relativos)
- ✅ Unit testing con Vitest + Testing Library
- ✅ Configuración lista para Vercel

## Comandos

```bash
pnpm install         # Instalar dependencias
pnpm dev             # Servidor de desarrollo
pnpm build           # Build de producción
pnpm preview         # Vista previa del build
pnpm test            # Ejecutar tests en modo watch
pnpm test run        # Ejecutar tests una vez
pnpm test:ui         # Ejecutar tests con UI
pnpm test:coverage   # Ejecutar tests con coverage
```

## Imports

El proyecto usa imports absolutos con el alias `@/`:

```typescript
// ✅ Correcto
import { Home } from '@/pages/Home'
import { storage } from '@/store/storage'
import type { Character } from '@/types'

// ❌ Evitar (imports relativos)
import { Home } from '../../pages/Home'
import { storage } from '../store/storage'
```

## Deploy

El proyecto está configurado para desplegarse en Vercel. El archivo `vercel.json` configura las rewrites necesarias para el routing del lado del cliente.

