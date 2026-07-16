import type { App } from 'vue'
import WeuiSearchbar from './searchbar.vue'

WeuiSearchbar.install = (app: App) => {
  app.component(WeuiSearchbar.name || 'WeuiSearchbar', WeuiSearchbar)
}

export { WeuiSearchbar }
export type { WeuiSearchbarProps, WeuiSearchbarEmits } from './searchbar.vue'
