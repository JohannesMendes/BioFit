import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  // No GitHub Pages o projeto fica em https://seu-usuario.github.io/biofit/
  // (subpasta com o nome do repo), então precisa de base '/biofit/'.
  // Já no app nativo (Capacitor) o app carrega direto na raiz do WebView,
  // então o build pro celular precisa de base '/'. Alternamos com a env
  // CAPACITOR=true, setada no script de build do app (veja package.json).
  base: process.env.CAPACITOR ? '/' : '/biofit/',
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
