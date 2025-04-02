import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import ElementPlus from 'unplugin-element-plus/vite'
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // ...
    AutoImport({
      // 自动导入 Vue 相关函数
      // imports: ['vue'],
      resolvers: [
        //解决引入非组件方法ElMessage，自动导入配置增强
        ElementPlusResolver({

          // 自动导入组件的同时导入对应的方法
          importStyle: 'sass',
          // 关键：启用自动导入组件方法
          directives: true,
          version: "2.9.6" // 与安装的 Element Plus 版本一致
        })
      ],
    }),
    Components({
      resolvers: [
        //1.配置ElementPlus采用sass样式配色系统
            ElementPlusResolver({
              importStyle: "sass",
              // 自动导入图标组件
              // ssr: true,
              // 图标自动导入配置
              // icons:true
            }),
      ],
    }),
    // ElementPlus({
    //   useSource: true,
    // }),
  ],
  resolve: {
    alias: {
      //实际的路径转换 @->src
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
         // 2.自动导入定制化样式文件进行样式覆盖 + //自动导入scss文件
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
        `
      },
    },
  },
})
