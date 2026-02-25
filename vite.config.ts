import devServer from '@hono/vite-dev-server'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
    plugins: [
      devServer({
        entry: 'src/index.tsx'
      })
    ]
  }
})
