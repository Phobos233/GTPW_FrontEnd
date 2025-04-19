
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { zhCn } from 'element-plus/es/locales.mjs'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Echarts from 'vue-echarts'
import * as echarts from 'echarts'

const app = createApp(App)

app.use(ElementPlus, {locale:zhCn})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  
// 使用组件
app.component('e-charts',Echarts)
// 全局挂载 echarts
app.config.globalProperties.$echarts = echarts
app.use(router)
app.mount('#app')
