import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    port: 3001,
  },

  plugins: [eslint()],

  esbuild: {
    supported: {
      'top-level-await': true
    },
  },

  base: './',
  root: './src',
  build: {
    outDir: '../dist/',
    emptyOutDir: true,
    polyfillModulePreload: false,
    minify: false,

    rollupOptions: {
      input: {
        'index': resolve('src/index.html'),
        'style': resolve('src/style.css'),
        'script': resolve('src/script.js'),
        'normalize': resolve('node_modules/modern-normalize/modern-normalize.css'),
      },

      output: {
        entryFileNames: '[name].js',
        assetFileNames: ({name}) => {
          if (/\.css$/.test(name ?? '')) return '[name][extname]';

          if (/\.(ttf|woff|woff2)$/.test(name ?? '')) return 'assets/fonts/[name][extname]';

          if (/\.(svg|ico)$/.test(name ?? '')) return 'assets/icons/[name][extname]';

          if (/\.(png|jpe?g)$/.test(name ?? '')) return 'assets/images/[name][extname]';

          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
});
