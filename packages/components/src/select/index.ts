import type { App } from 'vue'
import WeuiSelect from './select.vue'

WeuiSelect.install = (app: App) => {
  app.component(WeuiSelect.name || 'WeuiSelect', WeuiSelect)
}

export { WeuiSelect }
export type { WeuiSelectProps, WeuiSelectEmits } from './select.vue'
