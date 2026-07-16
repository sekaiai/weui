import type { App } from 'vue'
import WeuiList from './list.vue'

WeuiList.install = (app: App) => {
  app.component(WeuiList.name || 'WeuiList', WeuiList)
}

export { WeuiList }
export type { WeuiListProps } from './list.vue'
