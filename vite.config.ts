import { defineConfig } from 'vite';
import vue from "@vitejs/plugin-vue2";
import dts from "vite-plugin-dts";

export default defineConfig({
    build: {
        target: "modules",
        // outDir: 'dist',
        minify: false,
        cssCodeSplit: true,
        rollupOptions: {
            // 忽略的打包文件
            external: ['vue', 'ant-design-vue'],
            input: ['src/index.ts'],
            output: [
                {
                    format: 'es',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    assetFileNames: `styles/[name].css`,
                    dir:'es',
                    preserveModulesRoot: 'src'
                },
                {
                    format: 'cjs',
                    entryFileNames: '[name].js',
                    assetFileNames: `styles/[name].css`,
                    preserveModules: true,
                    dir: 'lib',
                    preserveModulesRoot: 'src'
                }
            ]
        },
        lib: {
            entry: './index.ts',
            formats: ['es', 'cjs']
        }
    },
    plugins: [
        vue(),
        dts({
            outputDir: ['es', 'lib'],
            include: './src'
        })
    ]
})