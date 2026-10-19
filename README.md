# Grafiquitos

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Aplicacion de visualizacion de datos desarrollada con React y Vite.

## Desarrollo local

Requisitos: Node.js y npm.

```bash
npm install
npm run dev
```

Vite mostrara la URL local en la terminal.

## Build de produccion

Para comprobar que la aplicacion compila correctamente:

```bash
npm run build
```

El resultado se genera en `dist/`.

## Despliegue en GitHub Pages

El proyecto publica `dist/` en la rama `gh-pages` mediante el paquete `gh-pages`.
La URL publica es:

<https://ignaciomg3.github.io/grafiquitos/>

Desde `main`, ejecutar:

```bash
npm run deploy
```

El script ejecuta primero `npm run build` y despues actualiza la rama `gh-pages` en el repositorio remoto.

### Configuracion de GitHub

En el repositorio, abrir **Settings > Pages** y seleccionar:

- **Source:** Deploy from a branch
- **Branch:** `gh-pages`
- **Folder:** `/ (root)`

Cada nuevo despliegue debe partir de la version que se quiera publicar en `main` y volver a ejecutar `npm run deploy`.
