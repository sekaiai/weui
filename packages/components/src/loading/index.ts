import type { App } from 'vue'
import WeuiLoading from './loading.vue'

WeuiLoading.install = (app: App) => {
  app.component(WeuiLoading.name || 'WeuiLoading', WeuiLoading)
}

export { WeuiLoading }
export type { WeuiLoadingProps } from './loading.vue'
