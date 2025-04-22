import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    root: path.join(__dirname, 'src'),
    publicDir: path.join(__dirname, 'public'),
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    base: './',
    build: {
        outDir: path.join(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, 'src/index.html')
            }
        }
    }
});