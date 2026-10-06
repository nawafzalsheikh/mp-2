import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

//vite config
export default defineConfig({
  plugins: [react()],
})
