# 🚀 Guía de Despliegue en Vercel

## Despliegue Automático (Recomendado)

### 1. Crear cuenta en Vercel
- Ve a [vercel.com](https://vercel.com)
- Crea una cuenta (puedes usar GitHub, GitLab o Bitbucket)

### 2. Importar Proyecto
1. Haz clic en **"New Project"**
2. Conecta tu repositorio de Git
3. Selecciona este repositorio (`wuwa-planner`)

### 3. Configurar Build
Vercel detectará automáticamente que es un proyecto Vite y usará la siguiente configuración:

```
Build Command: pnpm build
Output Directory: dist
Install Command: pnpm install
```

**No necesitas cambiar nada**, la configuración por defecto es correcta.

### 4. Variables de Entorno
No se requieren variables de entorno para este proyecto.

### 5. Desplegar
1. Haz clic en **"Deploy"**
2. Espera 1-2 minutos mientras Vercel construye y despliega tu proyecto
3. ¡Listo! Tu proyecto estará disponible en una URL como: `https://wuwasp.vercel.app`

---

## Configuración del Proyecto

El proyecto ya está configurado para Vercel con:

### `vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
Esto asegura que el routing de React Router funcione correctamente.

### `.vercelignore`
Excluye archivos innecesarios del deployment para optimizar el tamaño:
- Scripts de scraping
- Documentación (excepto README)
- Tests
- Archivos de configuración de git

---

## Despliegues Automáticos

Una vez configurado:
- ✅ Cada push a `main` desplegará automáticamente
- ✅ Los PRs generan previews automáticas
- ✅ Rollback instantáneo si algo falla

---

## Dominio Personalizado

Para usar tu propio dominio:

1. Ve a **Settings** → **Domains** en tu proyecto de Vercel
2. Agrega tu dominio personalizado
3. Configura los DNS según las instrucciones de Vercel

---

## Comandos Útiles

```bash
# Verificar build localmente antes de desplegar
pnpm build
pnpm preview

# Desplegar desde CLI (opcional)
npm i -g vercel
vercel
```

---

## Troubleshooting

### El build falla
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que `pnpm build` funciona localmente

### Las rutas no funcionan (404)
- Verifica que `vercel.json` esté en la raíz del proyecto
- Asegúrate de que está commiteado en git

### El proyecto no se actualiza
- Vercel despliega automáticamente desde `main`
- Verifica que tus cambios estén pusheados a GitHub

---

## Recursos

- [Documentación de Vercel](https://vercel.com/docs)
- [Desplegar Vite en Vercel](https://vercel.com/guides/deploying-vite-with-vercel)

