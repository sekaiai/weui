import type { App } from 'vue'
import WeuiPanel from './panel.vue'
import { WeuiMediaBox } from '../media-box'

WeuiPanel.install = (app: App) => {
  app.component(WeuiPanel.name || 'WeuiPanel', WeuiPanel)
  app.component(WeuiMediaBox.name || 'WeuiMediaBox', WeuiMediaBox)
}

export { WeuiPanel, WeuiMediaBox }
export type { WeuiPanelProps, WeuiPanelEmits, WeuiPanelItemType, PanelItem } from './panel.vue'
