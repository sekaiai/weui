import type { App } from 'vue'
import WeuiBadge from './badge.vue'

WeuiBadge.install = (app: App) => {
  app.component(WeuiBadge.name || 'WeuiBadge', WeuiBadge)
}

export { WeuiBadge }
export type { WeuiBadgeProps } from './badge.vue'
