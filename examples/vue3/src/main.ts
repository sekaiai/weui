import { createApp } from 'vue'
import WeuiDesign from 'weui-uniapp-design'
import 'weui/dist/style/weui.css'
import './styles/global.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
// 全局注册所有 WeUI 组件（<weui-button>、<weui-dialog> …）
app.use(WeuiDesign)
app.use(router)
app.mount('#app')
