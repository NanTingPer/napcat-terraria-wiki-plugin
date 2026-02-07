import { resolve } from 'path';
import { defineConfig } from 'vite';
import nodeResolve from '@rollup/plugin-node-resolve';
import { builtinModules } from 'module';
//tsc && 
export default defineConfig({
    build: {
        target: 'esnext',
        minify: false, // 不压缩，方便调试
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
            fileName: () => 'index.mjs',
        },
        rollupOptions: {
            output: {
                inlineDynamicImports: true  
            },
            // 排除 Node.js 内置模块和 napcat-types
            external: [ ...builtinModules, 
                        ...builtinModules.map(m => `node:${m}`), 
                        'napcat-types'],
        },
    },
    plugins: [nodeResolve()],
});
//"puppeteer": "^24.37.2"