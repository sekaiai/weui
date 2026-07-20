import type { App } from 'vue'
import WeuiMediaBox from './media-box.vue'

WeuiMediaBox.install = (app: App) => {
  app.component(WeuiMediaBox.name || 'WeuiMediaBox', WeuiMediaBox)
}

export { WeuiMediaBox }
export type { WeuiMediaBoxProps, WeuiMediaBoxEmits, WeuiMediaBoxType } from './media-box.vue'
