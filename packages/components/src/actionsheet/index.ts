import type { App } from 'vue'
import WeuiActionsheet from './actionsheet.vue'

WeuiActionsheet.install = (app: App) => {
  app.component(WeuiActionsheet.name || 'WeuiActionsheet', WeuiActionsheet)
}

export { WeuiActionsheet }
export type { WeuiActionsheetProps, WeuiActionsheetEmits, ActionsheetItem } from './actionsheet.vue'
