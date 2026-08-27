import type { App } from 'vue'
import WeuiRadio from './radio.vue'
import WeuiRadioGroup from './radio-group.vue'

WeuiRadio.install = (app: App) => {
  app.component(WeuiRadio.name || 'WeuiRadio', WeuiRadio)
}

WeuiRadioGroup.install = (app: App) => {
  app.component(WeuiRadioGroup.name || 'WeuiRadioGroup', WeuiRadioGroup)
}

export { WeuiRadio, WeuiRadioGroup }
export type { WeuiRadioProps, WeuiRadioEmits } from './radio.vue'
export type { WeuiRadioGroupProps, WeuiRadioGroupEmits } from './radio-group.vue'
