import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  // Necessário porque o GitHub Pages publica o projeto em
  // https://seu-usuario.github.io/biofit/ (subpasta com o nome do repo),
  // não na raiz do domínio.
  base: '/biofit/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // host: true expõe o servidor na rede local (não só localhost),
    // permitindo abrir o app no celular pelo IP do PC.
    host: true,
    port: 5173,
    strictPort: true,
  },
})
