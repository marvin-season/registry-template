import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
    plugins: [], // 让 Vitest 解析 `tsconfig.json` 里的 `paths`
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '.'), 
        },
    },
    // 使用 Vite 的 cacheDir 配置，统一管理缓存
    cacheDir: './node_modules/.vite',
    test: {
        globals: true,
        // 禁用缓存或指定全局缓存目录
        cache: false,
        // 指定测试文件模式
        include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        // 排除不需要的目录
        exclude: ['node_modules', 'dist', '.git', '.cache']
    },
})
