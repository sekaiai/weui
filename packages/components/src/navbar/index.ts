import type { App } from 'vue'
import WeuiNavbar from './navbar.vue'
import WeuiNavbarItem from './navbar-item.vue'

WeuiNavbar.install = (app: App) => {
  app.component(WeuiNavbar.name || 'WeuiNavbar', WeuiNavbar)
}

WeuiNavbarItem.install = (app: App) => {
  app.component(WeuiNavbarItem.name || 'WeuiNavbarItem', WeuiNavbarItem)
}

export { WeuiNavbar, WeuiNavbarItem }
export type { WeuiNavbarProps } from './navbar.vue'
export type { WeuiNavbarItemProps, WeuiNavbarItemEmits } from './navbar-item.vue'
