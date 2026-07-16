import type { App } from 'vue'
import WeuiOverlayHost from './overlay-host.vue'

WeuiOverlayHost.install = (app: App) => {
  app.component(WeuiOverlayHost.name || 'WeuiOverlayHost', WeuiOverlayHost)
}

export { WeuiOverlayHost }
export type { OverlayItem } from './overlay-host.vue'
