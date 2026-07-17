import type { App } from 'vue'
import WeuiActionsheet from './actionsheet.vue'

WeuiActionsheet.install = (app: App) => {
  app.component(WeuiActionsheet.name || 'WeuiActionsheet', WeuiActionsheet)
}

export { WeuiActionsheet }
export { Actionsheet } from './actionsheet'
export type { WeuiActionsheetProps, WeuiActionsheetEmits, ActionsheetItem } from './actionsheet.vue'
export type { ActionsheetShowOptions, ActionsheetShowResult } from './actionsheet'
