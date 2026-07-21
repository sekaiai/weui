import type { App } from 'vue'
import WeuiTextarea from './textarea.vue'

WeuiTextarea.install = (app: App) => {
  app.component(WeuiTextarea.name || 'WeuiTextarea', WeuiTextarea)
}

export { WeuiTextarea }
export type { WeuiTextareaProps, WeuiTextareaEmits } from './textarea.vue'
