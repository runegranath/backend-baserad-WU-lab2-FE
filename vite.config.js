import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        add: resolve(__dirname, 'src/add.html'),
        about: resolve(__dirname, 'src/about.html'),
      },
    },
  },
});