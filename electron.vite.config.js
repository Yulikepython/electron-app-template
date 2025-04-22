import { defineConfig } from 'electron-vite';
import path from 'path';

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        external: ['electron']
      }
    }
  },
  preload: {
    build: {
      rollupOptions: {
        external: ['electron']
      }
    }
  },
  renderer: {
    root: path.resolve(__dirname, 'src'),
    build: {
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, 'src/index.html')
        }
      }
    }
  }
});