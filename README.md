# WuWasP - Wuthering Waves Ascension Planner

**Wuthering Waves Ascension Planner** es una herramienta web para planificar y optimizar la ascensión de personajes y armas en Wuthering Waves.

## 🌟 Características

- **Gestión de Personajes y Armas**: Visualiza y gestiona todos los personajes y armas del juego
- **Planificador de Ascensión**: Planifica la ascensión de múltiples personajes y armas simultáneamente
- **Gestión de Inventario**: Lleva un registro de tus materiales y calcula automáticamente qué te falta
- **Cálculo de Materiales**: Calcula automáticamente todos los materiales necesarios incluyendo:
  - Materiales de ascensión (Común, Forgery, Boss, Overworld)
  - Experiencia (EXP) para subir de nivel
  - Shell Credits necesarios
  - Sistema de síntesis de materiales (T1 → T2 → T3 → T4)
- **Priorización**: Reordena personajes y armas por prioridad con drag & drop
- **Inventario Secuencial**: Calcula qué materiales están disponibles para cada item según su prioridad
- **Búsqueda y Filtros**: Busca y filtra personajes, armas y materiales fácilmente
- **Marcado de Completados**: Marca personajes y armas como completados (se muestran al final con opacidad reducida)
- **Persistencia Local**: Todos tus datos se guardan en el navegador

## 🚀 Tecnologías

- **React 19** + **TypeScript**
- **Vite** para desarrollo y build
- **Tailwind CSS** para estilos
- **Zustand** para gestión de estado
- **dnd-kit** para drag & drop
- **React Router** para navegación
- **Vitest** para testing

## 📦 Instalación y Desarrollo

```bash
# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm dev

# Construir para producción
pnpm build

# Vista previa de producción
pnpm preview

# Ejecutar tests
pnpm test

# Ver coverage de tests
pnpm test:coverage
```

## 📁 Estructura del Proyecto

```
src/
├── components/        # Componentes React
│   ├── cards/        # Tarjetas de personajes/armas
│   └── material/     # Componentes de materiales
├── data/             # Base de datos de personajes, armas y materiales
├── pages/            # Páginas de la aplicación
├── store/            # Estado global con Zustand
├── types/            # Definiciones de TypeScript
└── utils/            # Utilidades y helpers
```

## 🎮 Uso

1. **Lista de Personajes/Armas**: Navega por todas las opciones disponibles
2. **Agregar al Planificador**: Haz clic en el botón "+" para agregar items
3. **Configurar**: Establece niveles actuales y objetivos
4. **Inventario**: Registra tus materiales actuales
5. **Planificador**: Visualiza todos los materiales necesarios y reorganiza prioridades

## 📝 Scripts de Scraping

El proyecto incluye scripts para extraer datos del juego:

```bash
# Scraping de personajes
pnpm scrape:characters

# Scraping de armas
pnpm scrape:weapons:download   # Descargar HTMLs
pnpm scrape:weapons:process    # Procesar datos
```

## 🧪 Testing

El proyecto incluye tests unitarios para las funciones críticas:

```bash
# Ejecutar todos los tests
pnpm test

# Modo UI interactivo
pnpm test:ui

# Ver coverage
pnpm test:coverage
```

## 🚢 Despliegue

El proyecto está configurado para desplegarse en **Vercel**:

1. Conecta tu repositorio a Vercel
2. El build y despliegue es automático
3. Configuración en `vercel.json`

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🙏 Créditos

- Datos del juego extraídos de [Game8](https://game8.co/games/Wuthering-Waves)
- Imágenes de materiales de [WuWa Tracker](https://wuwatracker.com)

---

**WuWasP** - Hecho con ❤️ para la comunidad de Wuthering Waves
