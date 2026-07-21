import type { App } from 'vue'
import WeuiSwitch from './switch-ctrl.vue'

WeuiSwitch.install = (app: App) => {
  app.component(WeuiSwitch.name || 'WeuiSwitch', WeuiSwitch)
}

export { WeuiSwitch }
export type { WeuiSwitchProps, WeuiSwitchEmits } from './switch-ctrl.vue'
