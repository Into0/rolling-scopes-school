import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: './',
  plugins: [tsconfigPaths()],
  build: {
    emptyOutDir: true,
    minify: true,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});