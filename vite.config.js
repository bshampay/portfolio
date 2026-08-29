import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base so the build works from any GitHub Pages subpath
// without hardcoding the repo name.
export default defineConfig({
  base: './',
  plugins: [react()],
})
