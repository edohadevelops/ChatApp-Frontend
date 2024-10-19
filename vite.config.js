import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.BASE_API_URL': JSON.stringify(env.BASE_API_URL)
    },
    plugins: [react()],
    server: {
      port: 3000
    }
}
})
