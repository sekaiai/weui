import type { App } from 'vue'
import WeuiIcon from './icon.vue'

WeuiIcon.install = (app: App) => {
  app.component(WeuiIcon.name || 'WeuiIcon', WeuiIcon)
}

export { WeuiIcon }
export type { WeuiIconProps } from './icon.vue'
