import vue from '@vitejs/plugin-vue'
import path from 'path'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd())
    return {
        plugins: [
            vue(),
            UnoCSS(),
            viteCompression(),
            AutoImport({
                imports: ['vue', 'vue-router', 'pinia'],
                resolvers: [ElementPlusResolver()],
                dts: 'src/auto-import.d.ts'
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
        resolve: {
            alias: {
                "~": path.resolve(__dirname, './'),
                "@": path.resolve(__dirname, './src')
            },
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
        },
        server: {
            port: 80,
            host: true,
            proxy: {
                [env.VITE_PROXY]: {
                    target: env.VITE_TARGET_API,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, "")
                }
            }
        }
    }
})
