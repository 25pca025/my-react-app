import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: "base" must match your GitHub repository name.
// Repository: my-react-app  ->  base: '/my-react-app/'
// The slash at the start AND the end are both required.
export default defineConfig({
  base: '/my-react-app/',
  plugins: [react()],
})
