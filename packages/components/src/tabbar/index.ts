import type { App } from 'vue'
import WeuiTabbar from './tabbar.vue'
import WeuiTabbarItem from './tabbar-item.vue'

WeuiTabbar.install = (app: App) => {
  app.component(WeuiTabbar.name || 'WeuiTabbar', WeuiTabbar)
}

WeuiTabbarItem.install = (app: App) => {
  app.component(WeuiTabbarItem.name || 'WeuiTabbarItem', WeuiTabbarItem)
}

export { WeuiTabbar, WeuiTabbarItem }
export type { WeuiTabbarProps } from './tabbar.vue'
export type { WeuiTabbarItemProps, WeuiTabbarItemEmits } from './tabbar-item.vue'
