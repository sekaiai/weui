import type { App } from 'vue'
import WeuiFormOpr from './form-opr.vue'

WeuiFormOpr.install = (app: App) => {
  app.component(WeuiFormOpr.name!, WeuiFormOpr)
}

export { WeuiFormOpr }
export type { WeuiFormOprProps } from './form-opr.vue'
