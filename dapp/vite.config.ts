import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  server: {
    port: 3000,
    host: true // search "yarn dev vite for ip pc"
  },
  css: {
    devSourcemap: true // Bật sourcemap để nhìn được css ở vị trí nào (https://vitejs.dev/config/shared-options.html)
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
