import type { App } from 'vue'
import WeuiFormExtra from './form-extra.vue'

WeuiFormExtra.install = (app: App) => {
  app.component(WeuiFormExtra.name!, WeuiFormExtra)
}

export { WeuiFormExtra }
export type { WeuiFormExtraProps } from './form-extra.vue'
