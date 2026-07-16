import type { App } from 'vue'
import WeuiInput from './input.vue'

WeuiInput.install = (app: App) => {
  app.component(WeuiInput.name || 'WeuiInput', WeuiInput)
}

export { WeuiInput }
export type { WeuiInputProps, WeuiInputEmits } from './input.vue'
