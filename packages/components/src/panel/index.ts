import type { App } from 'vue'
import WeuiPanel from './panel.vue'

WeuiPanel.install = (app: App) => {
  app.component(WeuiPanel.name || 'WeuiPanel', WeuiPanel)
}

export { WeuiPanel }
export type { WeuiPanelProps } from './panel.vue'
