import type { App } from 'vue'
import WeuiButton from './button.vue'

WeuiButton.install = (app: App) => {
  app.component(WeuiButton.name || 'WeuiButton', WeuiButton)
}

export { WeuiButton }
export type { WeuiButtonProps, WeuiButtonEmits } from './button.vue'
