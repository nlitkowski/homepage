import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base works for both user (<name>.github.io) and project (<name>.github.io/<repo>) pages.
export default defineConfig({
  base: './',
  plugins: [react()],
})
