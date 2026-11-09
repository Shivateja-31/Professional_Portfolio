import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    watch: {
      ignored: [
        '**/public/**',
        '**/*.mp4',
        '**/*.mov',
        '**/*.webm',
        '**/*.jpeg',
        '**/*.jpg',
        '**/*.png',
        '**/dist/**',
        '**/scratch/**'
      ]
    }
  },
  preview: {
    port: 3000,
    host: true
  }
})
