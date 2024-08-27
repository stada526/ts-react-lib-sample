import { defineConfig } from 'vite'
import { resolve } from "path";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import react from '@vitejs/plugin-react-swc'
import { name } from "./package.json";

const formattedName = name.match(/[^/]+$/)?.[0] ?? name;


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  },
  build: {
    outDir: 'dist', // default の設定と同じ
    lib: {
      // entry: 'src/index.ts',
      entry: resolve(__dirname, "src/index.ts"),
      name: formattedName,
      // fileName: 'index',
      fileName: "index",
      formats: ['es', 'umd'], // default の設定と同じ
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})

