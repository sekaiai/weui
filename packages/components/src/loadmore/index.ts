import type { App } from 'vue'
import WeuiLoadmore from './loadmore.vue'

WeuiLoadmore.install = (app: App) => {
  app.component(WeuiLoadmore.name || 'WeuiLoadmore', WeuiLoadmore)
}

export { WeuiLoadmore }
export type { WeuiLoadmoreProps } from './loadmore.vue'
